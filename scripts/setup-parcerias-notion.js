/**
 * Preenche as bases "Parcerias" e "Receitas" que já existem na página
 * "Parcerias e Receitas" do Notion: cria as propriedades e insere exemplos.
 *
 * Uso:  node scripts/setup-parcerias-notion.js <URL_DA_PAGINA>
 *
 * A página precisa ter a integração "Site Brubaworld" conectada
 * (menu "..." → Conexões → Site Brubaworld).
 */

const fs = require("fs");
const path = require("path");

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

const entrada = process.argv[2];
if (!entrada) {
  console.error(
    "Faltou o endereço da página.\n\n" +
      "  node scripts/setup-parcerias-notion.js <cole a URL da página>\n"
  );
  process.exit(1);
}
const achou = entrada.replace(/-/g, "").match(/[0-9a-f]{32}/i);
if (!achou) {
  console.error("Não achei o ID nesse endereço:", entrada);
  process.exit(1);
}
const PAGE_ID = achou[0];

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

const opt = (name, color = "default") => ({ name, color });
const dinheiro = () => ({ number: { format: "real" } });

// ------------------------------------------------------- propriedades
const PROPS_PARCERIAS = {
  Tipo: {
    select: {
      options: [
        opt("Hotel", "blue"),
        opt("Restaurante", "orange"),
        opt("Marca", "purple"),
        opt("Experiência / passeio", "green"),
        opt("Companhia aérea", "red"),
        opt("Agência / turismo", "brown"),
        opt("Outro", "default"),
      ],
    },
  },

  Etapa: {
    select: {
      options: [
        opt("Prospecção", "gray"),
        opt("Contato feito", "blue"),
        opt("Negociando", "yellow"),
        opt("Fechada", "green"),
        opt("Em produção", "orange"),
        opt("Entregue", "purple"),
        opt("Recusada", "red"),
        opt("Pausada", "brown"),
      ],
    },
  },

  // Texto livre de propósito: uma parceria pode cobrir mais de um país
  // e o campo não deve travar a escrita.
  "País": { rich_text: {} },

  Cidade: { rich_text: {} },

  Modelo: {
    select: {
      options: [
        opt("Permuta", "purple"),
        opt("Cachê", "green"),
        opt("Permuta + cachê", "blue"),
        opt("Comissão / afiliado", "orange"),
        opt("Cortesia sem contrapartida", "gray"),
      ],
    },
  },

  "Valor em dinheiro": dinheiro(),
  "Valor da permuta": dinheiro(),

  "Entregáveis": {
    multi_select: {
      options: [
        opt("Reel", "red"),
        opt("Stories", "yellow"),
        opt("Post no feed", "blue"),
        opt("TikTok", "gray"),
        opt("Vídeo longo", "purple"),
        opt("Menção no guia", "green"),
        opt("Fotos", "orange"),
      ],
    },
  },

  "Primeiro contato": { date: {} },
  Fechamento: { date: {} },
  "Prazo de entrega": { date: {} },
  "Publicado em": { date: {} },

  "Vídeo (Drive/YouTube)": { url: {} },
  "Pasta no Drive": { url: {} },
  "Link publicado": { url: {} },

  "Pessoa de contato": { rich_text: {} },
  "Email / WhatsApp": { rich_text: {} },
  "Observações": { rich_text: {} },
};

const PROPS_RECEITAS = {
  Data: { date: {} },
  Origem: {
    select: {
      options: [
        opt("Guia pronto", "blue"),
        opt("Roteiro personalizado", "pink"),
        opt("Parceria paga", "green"),
        opt("Publi", "purple"),
        opt("Comissão / afiliado", "orange"),
        opt("Outro", "gray"),
      ],
    },
  },
  Valor: dinheiro(),
  Recebimento: {
    select: {
      options: [
        opt("Pix", "green"),
        opt("Kiwify", "blue"),
        opt("Transferência", "gray"),
        opt("Permuta (sem dinheiro)", "purple"),
      ],
    },
  },
  "Destino relacionado": { rich_text: {} },
  "Observações": { rich_text: {} },
};

// ------------------------------------------------------------ exemplos
const EX_PARCERIAS = [
  {
    __titulo: "Hôtel des Grands Boulevards",
    Tipo: "Hotel",
    Etapa: "Negociando",
    "País": "França",
    Cidade: "Paris",
    Modelo: "Permuta",
    "Valor da permuta": 2400,
    "Entregáveis": ["Reel", "Stories"],
    "Primeiro contato": "2026-08-04",
    "Pessoa de contato": "Camille, marketing",
    "Observações":
      "Ofereceram 2 diárias por 1 reel e 5 stories. Aguardando resposta sobre a data.",
  },
  {
    __titulo: "Le Comptoir du Relais",
    Tipo: "Restaurante",
    Etapa: "Entregue",
    "País": "França",
    Cidade: "Paris",
    Modelo: "Cortesia sem contrapartida",
    "Valor da permuta": 380,
    "Entregáveis": ["Stories", "Menção no guia"],
    "Primeiro contato": "2026-06-10",
    Fechamento: "2026-06-18",
    "Publicado em": "2026-07-02",
    "Observações": "Entrou no Paris à Table. Relacionamento bom, vale repetir.",
  },
  {
    __titulo: "Marca de mala (exemplo)",
    Tipo: "Marca",
    Etapa: "Prospecção",
    "País": "Brasil",
    Cidade: "São Paulo",
    Modelo: "Permuta + cachê",
    "Valor em dinheiro": 1500,
    "Valor da permuta": 900,
    "Entregáveis": ["Reel", "TikTok", "Post no feed"],
    "Primeiro contato": "2026-08-08",
    "Observações": "Ainda não mandei proposta. Atualizar mídia kit antes.",
  },
];

const EX_RECEITAS = [
  {
    __titulo: "Guias vendidos na Kiwify (julho)",
    Data: "2026-07-31",
    Origem: "Guia pronto",
    Valor: 1250.6,
    Recebimento: "Kiwify",
    "Observações": "Repasse consolidado do mês.",
  },
  {
    __titulo: "Roteiro personalizado — Paris, 7 dias",
    Data: "2026-08-02",
    Origem: "Roteiro personalizado",
    Valor: 490,
    Recebimento: "Pix",
    "Destino relacionado": "Paris",
  },
];

// ----------------------------------------------------------- execução
async function api(url, options = {}) {
  const res = await fetch(url, { headers: HEADERS, ...options });
  if (!res.ok) {
    const body = await res.text();
    if (body.includes("object_not_found")) {
      console.error(
        "\nA integração 'Site Brubaworld' não está conectada a esta página.\n" +
          "No Notion: abra a página → menu '...' → Conexões → Site Brubaworld.\n"
      );
    } else {
      console.error("Erro do Notion:\n", body);
    }
    process.exit(1);
  }
  return res.json();
}

/** Acha as bases filhas da página pelo título. */
async function acharBases() {
  const filhos = await api(
    `https://api.notion.com/v1/blocks/${PAGE_ID}/children?page_size=100`
  );
  const bases = {};
  for (const bloco of filhos.results) {
    if (bloco.type !== "child_database") continue;
    const titulo = bloco.child_database.title.trim().toLowerCase();
    bases[titulo] = bloco.id;
  }
  return bases;
}

function montar(schemaProps, dados, nomeTitulo) {
  const props = { [nomeTitulo]: { title: [{ text: { content: dados.__titulo } }] } };
  for (const [chave, valor] of Object.entries(dados)) {
    if (chave === "__titulo") continue;
    const def = schemaProps[chave];
    if (!def || valor === undefined || valor === "") continue;
    switch (def.type) {
      case "rich_text":
        props[chave] = { rich_text: [{ text: { content: String(valor) } }] };
        break;
      case "number":
        props[chave] = { number: Number(valor) };
        break;
      case "select":
        props[chave] = { select: { name: String(valor) } };
        break;
      case "multi_select":
        props[chave] = { multi_select: valor.map((n) => ({ name: n })) };
        break;
      case "date":
        props[chave] = { date: { start: String(valor) } };
        break;
      case "url":
        props[chave] = { url: String(valor) };
        break;
    }
  }
  return props;
}

async function preencher(dbId, propriedades, exemplos, rotulo) {
  console.log(`\n${rotulo}: criando as colunas...`);
  const db = await api(`https://api.notion.com/v1/databases/${dbId}`, {
    method: "PATCH",
    body: JSON.stringify({ properties: propriedades }),
  });

  const nomeTitulo = Object.values(db.properties).find((p) => p.type === "title").name;
  console.log(`${rotulo}: ${Object.keys(propriedades).length} colunas criadas.`);

  console.log(`${rotulo}: inserindo exemplos...`);
  for (const ex of exemplos) {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties: montar(db.properties, ex, nomeTitulo),
      }),
    });
    console.log(res.ok ? `  ok   ${ex.__titulo}` : `  FALHOU  ${ex.__titulo}`);
    if (!res.ok) console.error("   ", (await res.text()).slice(0, 250));
  }
}

async function run() {
  console.log(`Lendo a página ${PAGE_ID}...`);
  const bases = await acharBases();

  const idParcerias = bases["parcerias"];
  const idReceitas = bases["receitas"];

  if (!idParcerias || !idReceitas) {
    console.error(
      "\nNão encontrei as duas bases na página.\n" +
        "Encontrei: " +
        (Object.keys(bases).join(", ") || "(nenhuma)") +
        "\nAs bases precisam se chamar exatamente 'Parcerias' e 'Receitas'.\n"
    );
    process.exit(1);
  }

  await preencher(idParcerias, PROPS_PARCERIAS, EX_PARCERIAS, "Parcerias");
  await preencher(idReceitas, PROPS_RECEITAS, EX_RECEITAS, "Receitas");

  console.log("\nPronto.\n");
  console.log("Sugestões de visualização no Notion:");
  console.log("  Parcerias → Quadro agrupado por Etapa (vira o funil de parceria)");
  console.log("  Parcerias → Quadro agrupado por País (mostra onde há cobertura)");
  console.log("  Receitas  → Tabela agrupada por mês, com soma na coluna Valor");
}

run().catch((e) => {
  console.error("Falhou:", e);
  process.exit(1);
});
