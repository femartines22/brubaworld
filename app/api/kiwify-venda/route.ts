import { NextRequest, NextResponse } from "next/server";

/**
 * Recebe os avisos de venda da Kiwify e lança na base Financeiro do Notion.
 *
 * Configuração na Kiwify: Apps → Webhooks → Criar Webhook
 *   URL: https://www.brubaworld.com.br/api/kiwify-venda?token=SEU_TOKEN
 *   Eventos: compra aprovada (e reembolso, se quiser lançar o estorno)
 *
 * Variáveis necessárias:
 *   NOTION_API_KEY          (já existe)
 *   NOTION_FINANCEIRO_ID    id da base Financeiro
 *   KIWIFY_WEBHOOK_TOKEN    senha que você inventa e coloca na URL acima
 */

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const FINANCEIRO_ID = process.env.NOTION_FINANCEIRO_ID;
const WEBHOOK_TOKEN = process.env.KIWIFY_WEBHOOK_TOKEN;
const NOTION_VERSION = "2022-06-28";

const HEADERS = {
  Authorization: `Bearer ${NOTION_API_KEY}`,
  "Content-Type": "application/json",
  "Notion-Version": NOTION_VERSION,
};

/** Busca um valor em vários caminhos possíveis do JSON. */
function pegar(objeto: Record<string, unknown>, caminhos: string[]): unknown {
  for (const caminho of caminhos) {
    let atual: unknown = objeto;
    for (const parte of caminho.split(".")) {
      if (atual && typeof atual === "object" && parte in (atual as object)) {
        atual = (atual as Record<string, unknown>)[parte];
      } else {
        atual = undefined;
        break;
      }
    }
    if (atual !== undefined && atual !== null && atual !== "") return atual;
  }
  return undefined;
}

/**
 * A Kiwify manda valores em centavos na maior parte dos campos.
 * Acima de mil, assume centavos e divide; abaixo, trata como reais.
 */
function paraReais(valor: unknown): number | undefined {
  if (valor === undefined || valor === null) return undefined;
  const n = typeof valor === "string" ? Number(valor.replace(",", ".")) : Number(valor);
  if (!Number.isFinite(n)) return undefined;
  return n >= 1000 ? n / 100 : n;
}

export async function POST(request: NextRequest) {
  // 1. Confere a senha da URL antes de qualquer coisa.
  const token = request.nextUrl.searchParams.get("token");
  if (!WEBHOOK_TOKEN || token !== WEBHOOK_TOKEN) {
    console.warn("[kiwify] Recusado: token ausente ou incorreto.");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!NOTION_API_KEY || !FINANCEIRO_ID) {
    console.error("[kiwify] Faltam NOTION_API_KEY ou NOTION_FINANCEIRO_ID.");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ error: "json inválido" }, { status: 400 });
  }

  // Deixa o payload no log para conferir o formato real no primeiro teste.
  console.log("[kiwify] payload:", JSON.stringify(corpo));

  // 2. Só lança venda aprovada. Os outros eventos são ignorados sem erro.
  const status = String(
    pegar(corpo, ["order_status", "status", "Commissions.status"]) ?? ""
  ).toLowerCase();
  const aprovada = ["paid", "approved", "aprovado", "aprovada", "compra aprovada"].some(
    (s) => status.includes(s)
  );
  if (!aprovada) {
    console.log(`[kiwify] Ignorado, status "${status}".`);
    return NextResponse.json({ ok: true, ignorado: status }, { status: 200 });
  }

  // 3. Extrai os dados, tolerando variações de nome de campo.
  const pedido = String(
    pegar(corpo, ["order_id", "order_ref", "id", "checkout_link"]) ?? ""
  );
  const produto = String(
    pegar(corpo, ["Product.product_name", "product.product_name", "product_name"]) ??
      "Guia brubaworld"
  );
  const cliente = String(
    pegar(corpo, ["Customer.full_name", "customer.full_name", "customer_name"]) ?? ""
  );

  // Prioriza o valor líquido, que é o que de fato cai na conta.
  const valor =
    paraReais(
      pegar(corpo, [
        "Commissions.my_commission",
        "commissions.my_commission",
        "Commissions.charge_amount",
        "commissions.charge_amount",
        "charge_amount",
      ])
    ) ?? 0;

  const dataISO = String(
    pegar(corpo, ["created_at", "approved_date", "order_date"]) ?? ""
  );
  const data = dataISO ? dataISO.slice(0, 10) : new Date().toISOString().slice(0, 10);

  try {
    // 4. Lê o schema para descobrir os nomes reais das colunas.
    //    A coluna de título muda de nome conforme quem criou a base.
    const schemaRes = await fetch(
      `https://api.notion.com/v1/databases/${FINANCEIRO_ID}`,
      { headers: HEADERS }
    );
    if (!schemaRes.ok) {
      const detalhe = await schemaRes.text();
      console.error("[kiwify] Não consegui ler a base:", detalhe);
      return NextResponse.json({ error: "notion", detalhe }, { status: 500 });
    }
    const schema = await schemaRes.json();
    const props: Record<string, { name: string; type: string }> = schema.properties;

    /** Acha uma coluna pelo tipo ou por qualquer um dos nomes aceitos. */
    const achar = (nomes: string[], tipo?: string) =>
      Object.values(props).find(
        (p) =>
          (tipo ? p.type === tipo : true) &&
          (nomes.length === 0 ||
            nomes.some((n) => n.toLowerCase() === p.name.toLowerCase()))
      );

    const colTitulo = achar([], "title");
    const colData = achar(["Data"], "date");
    const colTipo = achar(["Tipo"], "select");
    const colCategoria = achar(["Categoria", "Origem"], "select");
    const colValor = achar(["Valor"], "number");
    const colRecebimento = achar(["Recebimento"], "select");
    const colPedido = achar(["ID do pedido"], "rich_text");

    // 5. Se esse pedido já foi lançado, não duplica.
    if (pedido && colPedido) {
      const busca = await fetch(
        `https://api.notion.com/v1/databases/${FINANCEIRO_ID}/query`,
        {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify({
            filter: { property: colPedido.name, rich_text: { equals: pedido } },
            page_size: 1,
          }),
        }
      );
      if (busca.ok) {
        const { results } = await busca.json();
        if (results.length) {
          console.log(`[kiwify] Pedido ${pedido} já lançado, ignorando.`);
          return NextResponse.json({ ok: true, duplicado: true }, { status: 200 });
        }
      }
    }

    // 6. Monta o lançamento só com as colunas que existem de verdade.
    const descricao = cliente ? `${produto} — ${cliente}` : produto;
    const properties: Record<string, unknown> = {};

    if (colTitulo)
      properties[colTitulo.name] = { title: [{ text: { content: descricao } }] };
    if (colData) properties[colData.name] = { date: { start: data } };
    if (colTipo) properties[colTipo.name] = { select: { name: "Entrada" } };
    if (colCategoria)
      properties[colCategoria.name] = { select: { name: "Guia pronto" } };
    if (colValor) properties[colValor.name] = { number: valor };
    if (colRecebimento)
      properties[colRecebimento.name] = { select: { name: "Kiwify" } };
    if (colPedido && pedido)
      properties[colPedido.name] = { rich_text: [{ text: { content: pedido } }] };

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        parent: { database_id: FINANCEIRO_ID },
        properties,
      }),
    });

    if (!res.ok) {
      const detalhe = await res.text();
      console.error("[kiwify] Erro ao gravar no Notion:", detalhe);
      return NextResponse.json({ error: "notion", detalhe }, { status: 500 });
    }

    console.log(`[kiwify] Lançado: ${descricao} — R$ ${valor}`);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (erro) {
    console.error("[kiwify] Erro inesperado:", erro);
    return NextResponse.json({ error: String(erro) }, { status: 500 });
  }
}

/** A Kiwify checa se o endereço existe antes de salvar o webhook. */
export async function GET() {
  return NextResponse.json({ ok: true, servico: "kiwify-venda" }, { status: 200 });
}
