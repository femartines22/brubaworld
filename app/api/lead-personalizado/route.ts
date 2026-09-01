import { NextRequest, NextResponse } from "next/server";
import { guardarCopia } from "@/lib/backupLead";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_VERSION = "2022-06-28";

type OpcaoStatus = { id: string; name: string };
type NotionProperty = {
  id: string;
  name: string;
  type: string;
  status?: { options?: OpcaoStatus[] };
  select?: { options?: OpcaoStatus[] };
};

/**
 * Normaliza o nome de uma propriedade para comparação:
 * remove acentos, pontuação e espaços, e passa para minúsculas.
 * Assim "Destino Desejado", "destino-desejado" e "Destino:" viram "destinodesejado".
 */
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

/** Procura uma propriedade no schema aceitando qualquer um dos apelidos informados. */
function findProperty(
  properties: Record<string, NotionProperty>,
  aliases: string[]
): NotionProperty | undefined {
  const wanted = aliases.map(normalize);
  return Object.values(properties).find((prop) =>
    wanted.includes(normalize(prop.name))
  );
}

/** Monta o valor no formato que o Notion espera para aquele tipo de propriedade. */
function buildValue(type: string, value: string) {
  switch (type) {
    case "title":
      return { title: [{ text: { content: value } }] };
    case "rich_text":
      return { rich_text: [{ text: { content: value } }] };
    case "number": {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? { number: parsed } : null;
    }
    case "phone_number":
      return { phone_number: value };
    case "email":
      return { email: value };
    case "select":
      return { select: { name: value } };
    case "status":
      return { status: { name: value } };
    case "date":
      return { date: { start: value } };
    case "checkbox":
      return { checkbox: value === "Sim" || value === "true" };
    case "url":
      return { url: value };
    default:
      return null;
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const {
    name,
    phone,
    destino,
    age,
    primeiraVez,
    dataEstimada,
    observacoes,
    instagram,
    email,
  } = data as {
    name?: string;
    phone?: string;
    destino?: string;
    age?: string;
    primeiraVez?: string;
    dataEstimada?: string;
    observacoes?: string;
    instagram?: string;
    email?: string;
  };

  // Só nome, telefone e destino são obrigatórios. Os demais campos
  // simplesmente não vão para o Notion quando chegam vazios.
  if (!name || !phone || !destino) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // Guarda a cópia ANTES de falar com o Notion. Se a integração estiver fora,
  // o lead ainda chega por e-mail em vez de se perder.
  const temCopia = await guardarCopia({
    name,
    phone,
    destino,
    age,
    primeiraVez,
    dataEstimada,
    observacoes,
    instagram,
    email,
  });

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error(
      "[lead] Variáveis do Notion ausentes. Confira NOTION_API_KEY e NOTION_DATABASE_ID."
    );
    // Com cópia garantida, o lead não se perdeu: pode mostrar sucesso.
    return temCopia
      ? NextResponse.json({ success: true, apenasCopia: true }, { status: 200 })
      : NextResponse.json(
          { error: "Notion credentials are not configured." },
          { status: 500 }
        );
  }

  const headers = {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  };

  try {
    // 1. Lê o schema do banco para descobrir os nomes e tipos reais das propriedades.
    const schemaRes = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`,
      { headers }
    );

    if (!schemaRes.ok) {
      const details = await schemaRes.text();
      console.error("[lead] Falha ao ler o schema do banco:", details);
      if (temCopia) {
        return NextResponse.json({ success: true, apenasCopia: true }, { status: 200 });
      }
      return NextResponse.json(
        { error: "Não foi possível ler o banco do Notion.", details },
        { status: 500 }
      );
    }

    const schema = await schemaRes.json();
    const schemaProps: Record<string, NotionProperty> = schema.properties ?? {};

    // Descobre o nome REAL da primeira etapa do funil, em vez de confiar
    // num texto fixo. Um espaço a mais no Notion já quebrava o envio inteiro.
    const statusProp = Object.values(schemaProps).find((p) => p.type === "status");
    const opcoes = statusProp?.status?.options ?? [];
    const etapaInicial =
      opcoes.find((o) => normalize(o.name) === normalize("Lead Novo"))?.name ??
      opcoes[0]?.name ??
      "";

    if (opcoes.length && !opcoes.some((o) => o.name === "Lead Novo")) {
      console.warn(
        `[lead] "Lead Novo" não bate exatamente. Usando "${etapaInicial}". ` +
          `Opções no Notion: ${opcoes.map((o) => `"${o.name}"`).join(", ")}`
      );
    }

    // 2. Casa cada campo do formulário com a propriedade correspondente.
    //    Os apelidos cobrem variações de escrita para o mapeamento não quebrar
    //    se alguém renomear a coluna no Notion.
    const mapping: { aliases: string[]; value: string }[] = [
      { aliases: ["Nome", "Name"], value: name },
      { aliases: ["Número", "Numero", "Telefone", "WhatsApp", "Phone"], value: phone },
      { aliases: ["Destino Desejado", "Destino", "Destination"], value: destino },
      { aliases: ["Idade", "Age"], value: age || "" },
      {
        aliases: ["Primeira Vez no Destino", "Primeira Vez"],
        value: primeiraVez || "",
      },
      { aliases: ["Data Estimada", "Data da Viagem"], value: dataEstimada || "" },
      { aliases: ["Observações", "Observacoes", "Notas"], value: observacoes || "" },
      { aliases: ["Instagram", "Insta"], value: instagram || "" },
      { aliases: ["Email", "E-mail"], value: email || "" },
      // Primeira coluna do funil, lida do próprio Notion logo acima.
      { aliases: ["Status"], value: etapaInicial },
    ];

    const properties: Record<string, unknown> = {};

    for (const { aliases, value } of mapping) {
      if (!value) continue;
      const prop = findProperty(schemaProps, aliases);
      if (!prop) {
        console.warn(`[lead] Propriedade não encontrada no Notion: ${aliases[0]}`);
        continue;
      }
      const built = buildValue(prop.type, value);
      if (built) properties[prop.name] = built;
    }

    // 3. O título da página é o que aparece no card do quadro.
    //    Se ainda não foi preenchido acima, usa o nome da pessoa.
    const titleProp = Object.values(schemaProps).find((p) => p.type === "title");
    if (titleProp && !properties[titleProp.name]) {
      properties[titleProp.name] = { title: [{ text: { content: name } }] };
    }

    // 4. Cria a página.
    const criar = (props: Record<string, unknown>) =>
      fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers,
        body: JSON.stringify({
          parent: { database_id: NOTION_DATABASE_ID },
          properties: props,
        }),
      });

    let response = await criar(properties);

    // 5. Se o Notion recusou alguma propriedade, tenta de novo com o mínimo.
    //    Perder um lead é muito pior do que perder um campo do lead.
    if (!response.ok) {
      const detalhe = await response.text();
      console.error("[lead] Notion recusou o envio completo:", detalhe);
      console.error("[lead] Campos enviados:", Object.keys(properties).join(", "));

      const essencial: Record<string, unknown> = {};
      if (titleProp) {
        essencial[titleProp.name] = { title: [{ text: { content: name } }] };
      }
      // Telefone e destino são o que a Bruba precisa para responder.
      for (const chave of ["Número", "Numero", "Telefone", "Destino Desejado", "Destino"]) {
        const prop = findProperty(schemaProps, [chave]);
        if (!prop || essencial[prop.name]) continue;
        const valor = chave.startsWith("Destino") ? destino : phone;
        const built = buildValue(prop.type, valor);
        if (built) essencial[prop.name] = built;
      }
      // O resto do que foi preenchido vai no corpo da página, para nada se perder.
      const resumo = [
        `Telefone: ${phone}`,
        `Destino: ${destino}`,
        age ? `Idade: ${age}` : "",
        primeiraVez ? `Primeira vez: ${primeiraVez}` : "",
        dataEstimada ? `Quando pretende ir: ${dataEstimada}` : "",
        observacoes ? `Observações: ${observacoes}` : "",
        instagram ? `Instagram: ${instagram}` : "",
        email ? `Email: ${email}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      response = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers,
        body: JSON.stringify({
          parent: { database_id: NOTION_DATABASE_ID },
          properties: essencial,
          children: [
            {
              object: "block",
              type: "callout",
              callout: {
                rich_text: [
                  {
                    text: {
                      content:
                        "Alguns campos não puderam ser gravados nas colunas. Dados completos:\n\n" +
                        resumo,
                    },
                  },
                ],
                icon: { emoji: "⚠️" },
              },
            },
          ],
        }),
      });

      if (!response.ok) {
        const detalhe2 = await response.text();
        console.error("[lead] Falhou até no modo mínimo:", detalhe2);
        if (temCopia) {
          return NextResponse.json({ success: true, apenasCopia: true }, { status: 200 });
        }
        return NextResponse.json(
          { error: "Notion API error.", details: detalhe2 },
          { status: 500 }
        );
      }

      console.warn("[lead] Salvo em modo mínimo. Confira o card no Notion.");
      return NextResponse.json({ success: true, parcial: true }, { status: 200 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[lead] Erro inesperado:", error);
    return NextResponse.json(
      { error: "Unexpected error.", details: String(error) },
      { status: 500 }
    );
  }
}
