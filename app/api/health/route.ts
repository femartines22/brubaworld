import { NextResponse } from "next/server";

/**
 * Verificação de saúde das integrações.
 *
 * Abra https://www.brubaworld.com.br/api/health no navegador para conferir
 * token, permissão e schema sem precisar preencher o formulário.
 *
 * Nada de secreto aparece na resposta: só nomes de coluna e status.
 */

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_FINANCEIRO_ID = process.env.NOTION_FINANCEIRO_ID;
const NOTION_VERSION = "2022-06-28";

// Colunas que a rota do formulário espera encontrar no CRM.
const COLUNAS_ESPERADAS = [
  "Nome",
  "Número",
  "Destino Desejado",
  "Idade",
  "Primeira Vez no Destino",
  "Data Estimada",
  "Observações",
  "Instagram",
  "Email",
];

type Checagem = {
  item: string;
  ok: boolean;
  detalhe: string;
};

function normalize(v: string) {
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

async function lerBanco(id: string) {
  const res = await fetch(`https://api.notion.com/v1/databases/${id}`, {
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
    },
  });
  return { ok: res.ok, status: res.status, corpo: await res.json() };
}

export async function GET() {
  const checagens: Checagem[] = [];

  // 1. As variáveis existem?
  checagens.push({
    item: "Variável NOTION_API_KEY",
    ok: Boolean(NOTION_API_KEY),
    detalhe: NOTION_API_KEY ? "definida" : "AUSENTE — cadastre no Vercel",
  });
  checagens.push({
    item: "Variável NOTION_DATABASE_ID",
    ok: Boolean(NOTION_DATABASE_ID),
    detalhe: NOTION_DATABASE_ID ? "definida" : "AUSENTE — cadastre no Vercel",
  });

  const temEmail = Boolean(
    process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_FORMSPREE_URL
  );
  checagens.push({
    item: "Cópia do lead por e-mail",
    ok: temEmail,
    detalhe: temEmail
      ? process.env.RESEND_API_KEY
        ? "Resend configurado"
        : "Formspree configurado"
      : "nenhum destino — leads dependem só do Notion",
  });

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    return NextResponse.json(
      { saudavel: false, checagens },
      { status: 503 }
    );
  }

  // 2. O token funciona e o CRM está compartilhado?
  try {
    const crm = await lerBanco(NOTION_DATABASE_ID);

    if (!crm.ok) {
      const motivo =
        crm.status === 401
          ? "token inválido ou revogado — gere outro em notion.so/my-integrations"
          : crm.status === 404
            ? "banco não encontrado ou integração sem acesso — reconecte em '...' → Conexões"
            : `erro ${crm.status}`;
      checagens.push({ item: "Acesso ao CRM", ok: false, detalhe: motivo });
      return NextResponse.json({ saudavel: false, checagens }, { status: 503 });
    }

    checagens.push({
      item: "Acesso ao CRM",
      ok: true,
      detalhe: crm.corpo.title?.[0]?.plain_text ?? "conectado",
    });

    // 3. As colunas que o formulário usa existem?
    const nomes: string[] = Object.values(crm.corpo.properties ?? {}).map(
      (p) => (p as { name: string }).name
    );
    const faltando = COLUNAS_ESPERADAS.filter(
      (esperada) => !nomes.some((n) => normalize(n) === normalize(esperada))
    );

    checagens.push({
      item: "Colunas do formulário",
      ok: faltando.length === 0,
      detalhe:
        faltando.length === 0
          ? `${COLUNAS_ESPERADAS.length} colunas encontradas`
          : `faltando: ${faltando.join(", ")}`,
    });

    // 4. Existe uma etapa inicial de funil para o lead cair?
    // O CRM tem mais de uma coluna do tipo Status. A do funil é a que tem a etapa "Lead Novo".
    type ColunaStatus = { name: string; type: string; status?: { options?: { name: string }[] } };
    const colunasStatus = (Object.values(crm.corpo.properties ?? {}) as ColunaStatus[]).filter(
      (p) => p.type === "status"
    );
    const statusProp =
      colunasStatus.find((p) => (p.status?.options ?? []).some((o) => o.name.trim() === "Lead Novo")) ??
      colunasStatus[0];

    const opcoes = statusProp?.status?.options ?? [];
    checagens.push({
      item: "Etapas do funil",
      ok: opcoes.length > 0,
      detalhe: opcoes.length
        ? `lead entra em "${opcoes[0].name}" · ${opcoes.length} etapas`
        : "nenhuma etapa configurada",
    });

    // 5. A base Financeiro, se estiver configurada
    if (NOTION_FINANCEIRO_ID) {
      const fin = await lerBanco(NOTION_FINANCEIRO_ID);
      checagens.push({
        item: "Acesso ao Financeiro (Kiwify)",
        ok: fin.ok,
        detalhe: fin.ok
          ? fin.corpo.title?.[0]?.plain_text ?? "conectado"
          : `erro ${fin.status} — confira a conexão da integração`,
      });
    }
  } catch (erro) {
    checagens.push({
      item: "Conexão com o Notion",
      ok: false,
      detalhe: String(erro),
    });
  }

  const saudavel = checagens.every((c) => c.ok);

  return NextResponse.json(
    {
      saudavel,
      resumo: saudavel
        ? "Tudo certo. O formulário deve funcionar."
        : "Há algo errado. Veja os itens marcados como false.",
      verificadoEm: new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      }),
      checagens,
    },
    { status: saudavel ? 200 : 503 }
  );
}
