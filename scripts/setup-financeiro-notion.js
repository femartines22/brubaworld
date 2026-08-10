/**
 * Transforma a base "Receitas" numa base de lançamentos (entradas e saídas).
 *
 * O que faz:
 *   - adiciona a coluna Tipo (Entrada / Saída)
 *   - renomeia "Origem" para "Categoria" e inclui as categorias de despesa
 *   - cria a fórmula "No caixa", que soma entradas e subtrai saídas
 *   - adiciona campos de comprovante e de referência da venda
 *
 * Uso:  node scripts/setup-financeiro-notion.js <URL_DA_PAGINA_PARCERIAS_E_RECEITAS>
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
const achou = entrada && entrada.replace(/-/g, "").match(/[0-9a-f]{32}/i);
if (!achou) {
  console.error(
    "Faltou a URL da página.\n\n" +
      "  node scripts/setup-financeiro-notion.js <URL da página Parcerias e Receitas>\n"
  );
  process.exit(1);
}
const PAGE_ID = achou[0];

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

const opt = (name, color = "default") => ({ name, color });

async function api(url, options = {}) {
  const res = await fetch(url, { headers: HEADERS, ...options });
  if (!res.ok) {
    const body = await res.text();
    console.error("Erro do Notion:\n", body);
    process.exit(1);
  }
  return res.json();
}

async function run() {
  // Acha a base "Receitas" dentro da página
  const filhos = await api(
    `https://api.notion.com/v1/blocks/${PAGE_ID}/children?page_size=100`
  );
  const bloco = filhos.results.find(
    (b) =>
      b.type === "child_database" &&
      b.child_database.title.trim().toLowerCase() === "receitas"
  );
  if (!bloco) {
    console.error("Não achei a base 'Receitas' nessa página.");
    process.exit(1);
  }

  console.log("Ajustando a base de lançamentos...\n");

  const propriedades = {
    // Entrada ou saída. É o que faz a fórmula do saldo funcionar.
    Tipo: {
      select: {
        options: [opt("Entrada", "green"), opt("Saída", "red")],
      },
    },

    // "Origem" vira "Categoria" e passa a cobrir também as despesas.
    Origem: {
      name: "Categoria",
      select: {
        options: [
          // entradas
          opt("Guia pronto", "blue"),
          opt("Roteiro personalizado", "pink"),
          opt("Parceria paga", "green"),
          opt("Publi", "purple"),
          opt("Comissão / afiliado", "orange"),
          // saídas
          opt("Passagem", "red"),
          opt("Hospedagem", "red"),
          opt("Alimentação em viagem", "red"),
          opt("Transporte", "red"),
          opt("Ingressos e passeios", "red"),
          opt("Ferramentas e assinaturas", "brown"),
          opt("Anúncios", "brown"),
          opt("Equipamento", "brown"),
          opt("Taxas e impostos", "gray"),
          // "Outro" já existe com a cor cinza. O Notion recusa mudar a cor
          // de uma opção existente, então precisa repetir a mesma.
          opt("Outro", "gray"),
        ],
      },
    },

    // Soma entradas e subtrai saídas. É esta coluna que se soma no rodapé.
    "No caixa": {
      formula: {
        expression:
          'if(prop("Tipo") == "Saída", -1 * prop("Valor"), prop("Valor"))',
      },
    },

    // Referência da venda na Kiwify, usada para não duplicar lançamento.
    "ID do pedido": { rich_text: {} },
    Comprovante: { files: {} },
  };

  const db = await api(`https://api.notion.com/v1/databases/${bloco.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: [{ text: { content: "Financeiro" } }],
      properties: propriedades,
    }),
  });

  console.log("Colunas agora:");
  Object.values(db.properties).forEach((p) =>
    console.log(`   ${p.name.padEnd(24)} ${p.type}`)
  );

  // Marca os lançamentos que já existiam como Entrada
  const existentes = await api(
    `https://api.notion.com/v1/databases/${bloco.id}/query`,
    { method: "POST", body: JSON.stringify({ page_size: 100 }) }
  );

  let marcados = 0;
  for (const pagina of existentes.results) {
    if (pagina.properties?.Tipo?.select) continue;
    await fetch(`https://api.notion.com/v1/pages/${pagina.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ properties: { Tipo: { select: { name: "Entrada" } } } }),
    });
    marcados++;
  }
  if (marcados) console.log(`\n${marcados} lançamento(s) existente(s) marcado(s) como Entrada.`);

  console.log("\nPronto. A base agora se chama Financeiro.\n");
  console.log("No Notion, monte a visualização assim:");
  console.log("  1. Agrupe por Data (Agrupar por → Data → Mês)");
  console.log("  2. No rodapé da coluna 'No caixa', escolha Soma");
  console.log("  3. O número que aparecer em cada mês é o seu lucro do mês");
}

run().catch((e) => {
  console.error("Falhou:", e);
  process.exit(1);
});
