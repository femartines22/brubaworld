/**
 * Reconfigura o funil do "CRM BRUBAWORLD":
 *   - adiciona os estágios novos ao Status
 *   - cria as propriedades de acompanhamento (follow-ups, datas, motivo da perda)
 *
 * Uso:  node scripts/setup-funil-notion.js
 *
 * IMPORTANTE: este script NÃO apaga os estágios antigos. A API do Notion
 * não remove opções de Status que já estejam em uso — se removesse, os cards
 * ficariam órfãos. Os estágios antigos que sobrarem devem ser apagados
 * na mão, no Notion, depois de mover os cards.
 */

const fs = require("fs");
const path = require("path");

function loadEnv() {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("Não encontrei o .env.local em", envPath);
    process.exit(1);
  }
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

// Estágios do funil, na ordem em que devem aparecer no quadro.
const ESTAGIOS = [
  { name: "Lead Novo", color: "gray" },
  { name: "Contato Feito", color: "blue" },
  { name: "Descoberta", color: "purple" },
  { name: "Proposta Enviada", color: "orange" },
  { name: "Negociação", color: "yellow" },
  { name: "Fechado", color: "green" },
  { name: "Entregue", color: "brown" },
  { name: "Congelado", color: "default" },
  { name: "Perdido", color: "red" },
];

const opt = (name, color = "default") => ({ name, color });

async function run() {
  // 1. Lê o schema atual para descobrir o nome exato da propriedade de status
  //    (no CRM da Bruba ela se chama "Status:", com dois-pontos).
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
    headers: HEADERS,
  });
  if (!res.ok) {
    console.error("Erro ao ler o banco:\n", await res.text());
    process.exit(1);
  }
  const db = await res.json();

  const statusProp = Object.values(db.properties).find((p) => p.type === "status");
  if (!statusProp) {
    console.error("Não encontrei uma propriedade do tipo Status neste banco.");
    process.exit(1);
  }

  const existentes = (statusProp.status?.options ?? []).map((o) => o.name);
  const novos = ESTAGIOS.filter((e) => !existentes.includes(e.name));

  console.log(`Propriedade de status: "${statusProp.name}"`);
  console.log("Estágios que já existem:", existentes.join(", ") || "(nenhum)");
  console.log("Estágios a adicionar:  ", novos.map((e) => e.name).join(", ") || "(nenhum)");
  console.log("");

  // 2. Monta as propriedades novas de acompanhamento.
  const properties = {
    "Follow-ups": { number: { format: "number" } },
    "Último Contato": { date: {} },
    "Próxima Ação": { date: {} },
    "Valor Proposto": { number: { format: "real" } },
    "Motivo da Perda": {
      select: {
        options: [
          opt("Preço", "red"),
          opt("Sem data definida", "yellow"),
          opt("Vai montar sozinha", "orange"),
          opt("Sem resposta", "gray"),
          opt("Destino não atendido", "purple"),
          opt("Outro", "default"),
        ],
      },
    },
  };

  // 3. A API do Notion só aceita ACRESCENTAR opções de Status —
  //    por isso mandamos a lista existente somada às novas.
  if (novos.length) {
    properties[statusProp.name] = {
      status: {
        options: [...(statusProp.status?.options ?? []), ...novos],
      },
    };
  }

  const patch = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({ properties }),
  });

  if (!patch.ok) {
    const body = await patch.text();
    console.error("Erro do Notion:\n", body);
    if (body.includes("status")) {
      console.error(
        "\nSe o erro for sobre o Status: a API do Notion às vezes recusa mudanças\n" +
          "nessa propriedade. Nesse caso, crie os estágios na mão no Notion —\n" +
          "as outras propriedades deste script já terão sido aplicadas."
      );
    }
    process.exit(1);
  }

  const result = await patch.json();
  const finalStatus = Object.values(result.properties).find((p) => p.type === "status");

  console.log("Pronto.\n");
  console.log("Estágios do funil agora:");
  (finalStatus?.status?.options ?? []).forEach((o) => console.log("   " + o.name));
  console.log("\nPropriedades de acompanhamento:");
  ["Follow-ups", "Último Contato", "Próxima Ação", "Valor Proposto", "Motivo da Perda"].forEach(
    (n) => console.log("   " + n + (result.properties[n] ? "" : "  (falhou)"))
  );
  console.log(
    "\nFalta fazer na mão no Notion: mover os cards para os estágios novos\n" +
      "e depois apagar os estágios antigos que ficaram vazios."
  );
}

run().catch((e) => {
  console.error("Falhou:", e);
  process.exit(1);
});
