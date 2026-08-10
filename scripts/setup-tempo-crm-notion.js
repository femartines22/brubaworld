/**
 * Adiciona ao CRM os campos de tempo:
 *
 *   Dias no funil   (fórmula)  quantos dias desde que o lead entrou. Automático.
 *   Status desde    (data)     quando o lead entrou no status atual. Manual.
 *   Dias no status  (fórmula)  quantos dias parado no status atual.
 *   Atenção         (fórmula)  marca quem está parado tempo demais.
 *
 * Uso:  node scripts/setup-tempo-crm-notion.js
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

const env = loadEnv();
const API_KEY = env.NOTION_API_KEY;
const DATABASE_ID = env.NOTION_DATABASE_ID;

if (!API_KEY || !DATABASE_ID) {
  console.error("NOTION_API_KEY ou NOTION_DATABASE_ID não encontrados no .env.local.");
  process.exit(1);
}

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

async function api(url, options = {}) {
  const res = await fetch(url, { headers: HEADERS, ...options });
  if (!res.ok) {
    console.error("Erro do Notion:\n", await res.text());
    process.exit(1);
  }
  return res.json();
}

async function run() {
  // Descobre como se chama a coluna de data de criação neste banco.
  const db = await api(`https://api.notion.com/v1/databases/${DATABASE_ID}`);
  const criadoEm = Object.values(db.properties).find((p) => p.type === "created_time");

  if (!criadoEm) {
    console.error(
      "Não achei uma coluna do tipo 'Criado em' (created time) neste banco.\n" +
        "Crie uma no Notion e rode de novo."
    );
    process.exit(1);
  }

  console.log(`Usando a coluna de criação: "${criadoEm.name}"\n`);

  const properties = {
    // Tempo total desde que o lead chegou. Não depende de nada manual.
    "Dias no funil": {
      formula: {
        expression: `dateBetween(now(), prop("${criadoEm.name}"), "days")`,
      },
    },

    // Preencher com a data em que o lead entrou no status atual.
    // Atualizar sempre que mover o card de coluna.
    "Status desde": { date: {} },

    // Dias parados no status atual.
    // Enquanto "Status desde" estiver vazia, usa a data de criação —
    // um card recém-criado está no status atual desde que nasceu.
    "Dias no status": {
      formula: {
        expression:
          `dateBetween(now(), if(empty(prop("Status desde")), prop("${criadoEm.name}"), prop("Status desde")), "days")`,
      },
    },

    // Sinaliza quem está parado tempo demais, para aparecer de relance.
    // Os prazos seguem o SLA: 3 dias sem mexer já pede atenção.
    "Atenção": {
      formula: {
        expression:
          `if(dateBetween(now(), if(empty(prop("Status desde")), prop("${criadoEm.name}"), prop("Status desde")), "days") >= 7, "🔴 parado", ` +
          `if(dateBetween(now(), if(empty(prop("Status desde")), prop("${criadoEm.name}"), prop("Status desde")), "days") >= 3, "🟡 cobrar", "🟢 ok"))`,
      },
    },
  };

  const resultado = await api(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
    method: "PATCH",
    body: JSON.stringify({ properties }),
  });

  console.log("Colunas criadas:");
  ["Dias no funil", "Status desde", "Dias no status", "Atenção"].forEach((n) =>
    console.log(`   ${n}${resultado.properties[n] ? "" : "   (falhou)"}`)
  );

  console.log("\nComo usar:");
  console.log("  Toda vez que mover um card de coluna, atualize 'Status desde' para hoje.");
  console.log("  A coluna 'Atenção' mostra sozinha quem está parado:");
  console.log("     🟢 até 2 dias    🟡 3 a 6 dias    🔴 7 dias ou mais");
}

run().catch((e) => {
  console.error("Falhou:", e);
  process.exit(1);
});
