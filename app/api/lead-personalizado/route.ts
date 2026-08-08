import { NextRequest, NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function POST(request: NextRequest) {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
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
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const notionBody = {
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Nome: {
          title: [{ text: { content: name } }],
        },
        Idade: {
          number: Number(age),
        },
        Telefone: {
          phone_number: phone,
        },
        Email: {
          email,
        },
        Instagram: {
          rich_text: [{ text: { content: instagram || "" } }],
        },
        Destino: {
          rich_text: [{ text: { content: destino } }],
        },
        Status: {
          select: { name: "Novo" },
        },
      },
    };

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify(notionBody),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json({ error: "Notion API error.", details: errorBody }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unexpected error.", details: String(error) }, { status: 500 });
  }
}
