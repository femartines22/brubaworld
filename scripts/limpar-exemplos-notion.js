/**
 * Remove os registros de exemplo criados pelos scripts de montagem.
 *
 * Uso:
 *   node scripts/limpar-exemplos-notion.js <URL_DA_PAGINA>              (só lista)
 *   node scripts/limpar-exemplos-notion.js <URL_DA_PAGINA> --duplicados (apaga repetidos)
 *   node scripts/limpar-exemplos-notion.js <URL_DA_PAGINA> --todos      (apaga todos os exemplos)
 *
 * Sem opção nenhuma, o script apenas mostra o que faria. Nada é apagado.
 * O Notion move para a lixeira, então dá para recuperar em caso de engano.
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
const entrada = process.argv[2];
const modo = process.argv.includes("--todos")
  ? "todos"
  : process.argv.includes("--duplicados")
    ? "duplicados"
    : "listar";

const achou = entrada && entrada.replace(/-/g, "").match(/[0-9a-f]{32}/i);
if (!API_KEY || !achou) {
  console.error(
    "Uso: node scripts/limpar-exemplos-notion.js <URL da página> [--duplicados|--todos]"
  );
  process.exit(1);
}
const PAGE_ID = achou[0];

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

// Títulos que os scripts de montagem inseriram como exemplo.
const EXEMPLOS = [
  "Hôtel des Grands Boulevards",
  "Le Comptoir du Relais",
  "Marca de mala (exemplo)",
  "Guias vendidos na Kiwify (julho)",
  "Roteiro personalizado — Paris, 7 dias",
];

async function api(url, options = {}) {
  const res = await fetch(url, { headers: HEADERS, ...options });
  if (!res.ok) {
    console.error("Erro do Notion:\n", await res.text());
    process.exit(1);
  }
  return res.json();
}

function tituloDe(pagina) {
  const prop = Object.values(pagina.properties).find((p) => p.type === "title");
  return prop?.title?.[0]?.plain_text ?? "(sem título)";
}

async function processar(dbId, nomeBase) {
  const { results } = await api(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: "POST",
    body: JSON.stringify({ page_size: 100 }),
  });

  const vistos = new Set();
  const apagar = [];

  for (const pagina of results) {
    const titulo = tituloDe(pagina);
    const ehExemplo = EXEMPLOS.includes(titulo);

    if (modo === "todos" && ehExemplo) {
      apagar.push({ id: pagina.id, titulo, motivo: "exemplo" });
    } else if (vistos.has(titulo)) {
      apagar.push({ id: pagina.id, titulo, motivo: "repetido" });
    }
    vistos.add(titulo);
  }

  console.log(`\n${nomeBase}: ${results.length} registro(s)`);
  if (!apagar.length) {
    console.log("  nada a remover");
    return 0;
  }

  for (const item of apagar) {
    if (modo === "listar") {
      console.log(`  seria removido (${item.motivo}): ${item.titulo}`);
    } else {
      await fetch(`https://api.notion.com/v1/pages/${item.id}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify({ archived: true }),
      });
      console.log(`  removido (${item.motivo}): ${item.titulo}`);
    }
  }
  return apagar.length;
}

async function run() {
  const filhos = await api(
    `https://api.notion.com/v1/blocks/${PAGE_ID}/children?page_size=100`
  );

  let total = 0;
  for (const bloco of filhos.results) {
    if (bloco.type !== "child_database") continue;
    total += await processar(bloco.id, bloco.child_database.title);
  }

  console.log("");
  if (modo === "listar") {
    console.log(`${total} registro(s) seriam removidos. Nada foi apagado ainda.`);
    console.log("Para apagar de verdade, rode o comando de novo com --duplicados");
  } else {
    console.log(`${total} registro(s) movido(s) para a lixeira do Notion.`);
  }
}

run().catch((e) => {
  console.error("Falhou:", e);
  process.exit(1);
});
