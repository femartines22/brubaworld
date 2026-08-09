/**
 * Monta o "Calendário de Conteúdo" no Notion:
 *   - cria as propriedades (pilar, formato, plataforma, status, CTA…)
 *   - popula as duas primeiras semanas com ideias de post
 *
 * Uso:  node scripts/setup-calendario-notion.js
 *
 * Rodar de novo recria os posts de exemplo (vai duplicar) — a estrutura,
 * essa é atualizada sem duplicar.
 */

const fs = require("fs");
const path = require("path");

// ID do banco "Calendário de Conteúdo"
const CALENDARIO_ID = "3b61f30a355880a0b0b6d9b062247ac5";

function loadEnv() {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  const env = {};
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    let v = t.slice(i + 1).trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    env[t.slice(0, i).trim()] = v;
  }
  return env;
}

const API_KEY = loadEnv().NOTION_API_KEY;
if (!API_KEY) {
  console.error("NOTION_API_KEY não encontrada no .env.local.");
  process.exit(1);
}

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

const opt = (name, color = "default") => ({ name, color });

// ---------- estrutura ----------
const PROPRIEDADES = {
  Data: { date: {} },

  Pilar: {
    select: {
      options: [
        opt("Destino", "blue"),
        opt("Dica Prática", "green"),
        opt("Bastidor", "orange"),
        opt("Prova Social", "purple"),
        opt("Oferta", "pink"),
      ],
    },
  },

  Formato: {
    select: {
      options: [
        opt("Reel", "red"),
        opt("Carrossel", "blue"),
        opt("Story", "yellow"),
        opt("Post único", "gray"),
      ],
    },
  },

  Plataforma: {
    multi_select: {
      options: [opt("Instagram", "purple"), opt("TikTok", "gray")],
    },
  },

  Status: {
    select: {
      options: [
        opt("Ideia", "gray"),
        opt("Roteirizado", "yellow"),
        opt("Gravado", "orange"),
        opt("Editado", "blue"),
        opt("Publicado", "green"),
      ],
    },
  },

  CTA: {
    select: {
      options: [
        opt("Nenhum", "default"),
        opt("Link na bio", "pink"),
        opt("Comenta", "blue"),
        opt("Salva esse post", "green"),
        opt("Manda DM", "purple"),
        opt("Compartilha", "orange"),
      ],
    },
  },

  "Destino / Tema": { rich_text: {} },
  Gancho: { rich_text: {} },
};

// ---------- posts das duas primeiras semanas ----------
// 5 posts por semana: 2 Destino, 1 Dica, 1 Bastidor, 1 Oferta ou Prova Social
const POSTS = [
  // Semana 1
  {
    titulo: "Os 5 erros que todo mundo comete em Paris",
    data: "2026-08-10",
    pilar: "Dica Prática",
    formato: "Carrossel",
    tema: "Paris",
    gancho: "O nº 3 me custou meio dia de viagem",
    cta: "Salva esse post",
  },
  {
    titulo: "Montmartre às 7h da manhã",
    data: "2026-08-11",
    pilar: "Destino",
    formato: "Reel",
    tema: "Paris",
    gancho: "Ninguém te conta que Montmartre é outro lugar antes das 8h",
    cta: "Comenta",
  },
  {
    titulo: "Como eu escolho onde comer numa cidade nova",
    data: "2026-08-13",
    pilar: "Bastidor",
    formato: "Reel",
    tema: "Método",
    gancho: "Meu critério não tem nada a ver com nota no Google",
    cta: "Nenhum",
  },
  {
    titulo: "A padaria de Paris que eu voltaria só por ela",
    data: "2026-08-14",
    pilar: "Destino",
    formato: "Reel",
    tema: "Paris",
    gancho: "Fui 4 vezes em 5 dias. Sem exagero.",
    cta: "Salva esse post",
  },
  {
    titulo: "Guia Paris em 5 Dias — o que tem dentro",
    data: "2026-08-16",
    pilar: "Oferta",
    formato: "Carrossel",
    tema: "Produto",
    gancho: "Tudo que eu queria ter tido na minha primeira vez",
    cta: "Link na bio",
  },

  // Semana 2
  {
    titulo: "Quanto custa 5 dias em Paris (real, com valores)",
    data: "2026-08-17",
    pilar: "Dica Prática",
    formato: "Carrossel",
    tema: "Paris",
    gancho: "Passagem, hotel, comida, passeio. Tudo aberto.",
    cta: "Salva esse post",
  },
  {
    titulo: "Bruges parece cenário de filme",
    data: "2026-08-18",
    pilar: "Destino",
    formato: "Reel",
    tema: "Bélgica",
    gancho: "A cidade mais subestimada da Europa",
    cta: "Comenta",
  },
  {
    titulo: "O que a Simone falou depois de Malta",
    data: "2026-08-20",
    pilar: "Prova Social",
    formato: "Story",
    tema: "Depoimento",
    gancho: "Print da conversa",
    cta: "Manda DM",
  },
  {
    titulo: "Meu ano morando em Lille",
    data: "2026-08-21",
    pilar: "Bastidor",
    formato: "Reel",
    tema: "História pessoal",
    gancho: "Como uma cidade que ninguém conhece mudou meu jeito de viajar",
    cta: "Nenhum",
  },
  {
    titulo: "Roteiro personalizado: como funciona",
    data: "2026-08-23",
    pilar: "Oferta",
    formato: "Carrossel",
    tema: "Serviço",
    gancho: "Você me conta a viagem, eu monto o resto",
    cta: "Link na bio",
  },
];

async function run() {
  // 1. Descobre o nome da propriedade de título
  const res = await fetch(`https://api.notion.com/v1/databases/${CALENDARIO_ID}`, {
    headers: HEADERS,
  });
  if (!res.ok) {
    console.error("Erro ao ler o calendário:\n", await res.text());
    console.error(
      "\nSe deu 'object_not_found', a integração 'Site Brubaworld' não está\n" +
        "conectada a esta página. No Notion: ... → Conexões → Site Brubaworld."
    );
    process.exit(1);
  }
  const db = await res.json();
  const tituloProp = Object.values(db.properties).find((p) => p.type === "title");

  // 2. Cria as propriedades
  console.log("Criando a estrutura...");
  const patch = await fetch(`https://api.notion.com/v1/databases/${CALENDARIO_ID}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({
      title: [{ text: { content: "Calendário de Conteúdo" } }],
      properties: PROPRIEDADES,
    }),
  });
  if (!patch.ok) {
    console.error("Erro ao criar propriedades:\n", await patch.text());
    process.exit(1);
  }
  console.log("Estrutura pronta.\n");

  // 3. Insere os posts
  console.log("Inserindo os posts das duas primeiras semanas...\n");
  for (const p of POSTS) {
    const body = {
      parent: { database_id: CALENDARIO_ID },
      properties: {
        [tituloProp.name]: { title: [{ text: { content: p.titulo } }] },
        Data: { date: { start: p.data } },
        Pilar: { select: { name: p.pilar } },
        Formato: { select: { name: p.formato } },
        Plataforma: { multi_select: [{ name: "Instagram" }, { name: "TikTok" }] },
        Status: { select: { name: "Ideia" } },
        CTA: { select: { name: p.cta } },
        "Destino / Tema": { rich_text: [{ text: { content: p.tema } }] },
        Gancho: { rich_text: [{ text: { content: p.gancho } }] },
      },
    };

    const r = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(body),
    });

    if (r.ok) {
      console.log(`  ${p.data}  ${p.pilar.padEnd(14)} ${p.titulo}`);
    } else {
      console.error(`  FALHOU: ${p.titulo}`);
      console.error("   ", (await r.text()).slice(0, 200));
    }
  }

  console.log("\nPronto. Abra o Calendário de Conteúdo no Notion.");
  console.log("Dica: crie uma visualização em Calendário agrupando por Pilar.");
}

run().catch((e) => {
  console.error("Falhou:", e);
  process.exit(1);
});
