import { NextRequest, NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_VERSION = "2022-06-28";

type NotionProperty = { id: string; name: string; type: string };

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
    case "url":
      return { url: value };
    default:
      return null;
  }
}

export async function POST(request: NextRequest) {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error(
      "[lead] Variáveis do Notion ausentes. Confira NOTION_API_KEY e NOTION_DATABASE_ID."
    );
    return NextResponse.json(
      { error: "Notion credentials are not configured." },
      { status: 500 }
    );
  }

  const data = await request.json();
  const { name, age, phone, email, instagram, destino } = data as {
    name?: string;
    age?: string;
    phone?: string;
    email?: string;
    instagram?: string;
    destino?: string;
  };

  if (!name || !age || !phone || !email || !destino) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
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
      return NextResponse.json(
        { error: "Não foi possível ler o banco do Notion.", details },
        { status: 500 }
      );
    }

    const schema = await schemaRes.json();
    const schemaProps: Record<string, NotionProperty> = schema.properties ?? {};

    // 2. Casa cada campo do formulário com a propriedade correspondente.
    //    Os apelidos cobrem variações de escrita para o mapeamento não quebrar
    //    se alguém renomear a coluna no Notion.
    const mapping: { aliases: string[]; value: string }[] = [
      { aliases: ["Nome", "Name"], value: name },
      { aliases: ["Idade", "Age"], value: age },
      { aliases: ["Número", "Numero", "Telefone", "WhatsApp", "Phone"], value: phone },
      { aliases: ["Email", "E-mail"], value: email },
      { aliases: ["Instagram", "Insta"], value: instagram || "" },
      { aliases: ["Destino Desejado", "Destino", "Destination"], value: destino },
      { aliases: ["Status"], value: "Forms Preenchido" },
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
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers,
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("[lead] Erro da API do Notion:", details);
      return NextResponse.json(
        { error: "Notion API error.", details },
        { status: 500 }
      );
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
