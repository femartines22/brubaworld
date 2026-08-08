/**
 * Cria no banco "CRM BRUBAWORLD" as propriedades usadas para registrar,
 * na mão, as respostas que o lead dá no WhatsApp.
 *
 * Uso:  node scripts/setup-crm-notion.js
 *
 * Lê NOTION_API_KEY e NOTION_DATABASE_ID do .env.local.
 * Rodar mais de uma vez é seguro: o Notion atualiza o que já existe
 * em vez de duplicar.
 */

const fs = require("fs");
const path = require("path");

// ---------- lê o .env.local sem depender de biblioteca externa ----------
function loadEnv() {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("Não encontrei o arquivo .env.local em", envPath);
    process.exit(1);
  }
  const env = {};
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    env[key] = value;
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

// ---------- atalhos para montar as opções ----------
const opt = (name, color = "default") => ({ name, color });
const select = (...options) => ({ select: { options } });
const multi = (...options) => ({ multi_select: { options } });
const texto = () => ({ rich_text: {} });
const numero = () => ({ number: { format: "number" } });
const data = () => ({ date: {} });

// ---------- as propriedades a criar ----------
const properties = {
  "Data Estimada": data(),

  "Com Quem Viaja": select(
    opt("Sozinho(a)", "blue"),
    opt("Casal", "pink"),
    opt("Família", "green"),
    opt("Amigos", "orange"),
    opt("Grupo grande", "purple")
  ),

  "Nº de Pessoas": numero(),

  "Duração (dias)": numero(),

  "Primeira Vez no Destino": select(
    opt("Sim", "green"),
    opt("Não", "gray")
  ),

  "Já Resolvido": multi(
    opt("Passagem comprada", "green"),
    opt("Hospedagem reservada", "blue"),
    opt("Seguro viagem", "purple"),
    opt("Nada ainda", "red")
  ),

  "Ritmo": select(
    opt("Intenso — aproveitar cada minuto", "red"),
    opt("Equilibrado", "yellow"),
    opt("Tranquilo — sem pressa", "green")
  ),

  "Interesses": multi(
    opt("Gastronomia", "orange"),
    opt("Museus e arte", "purple"),
    opt("Compras", "pink"),
    opt("Vida noturna", "red"),
    opt("Natureza", "green"),
    opt("História", "brown"),
    opt("Fotografia", "blue"),
    opt("Praia", "yellow"),
    opt("Vinhos", "purple")
  ),

  "Restrições": texto(),

  "Orçamento": select(
    opt("Até R$ 10 mil", "gray"),
    opt("R$ 10 a 20 mil", "blue"),
    opt("R$ 20 a 40 mil", "green"),
    opt("Acima de R$ 40 mil", "purple"),
    opt("Não informado", "default")
  ),

  "Termômetro": select(
    opt("🔥 Quente", "red"),
    opt("🟡 Morno", "yellow"),
    opt("🧊 Frio", "blue")
  ),

  "Observações": texto(),
};

// ---------- envia para o Notion ----------
async function run() {
  console.log(`Atualizando o banco ${DATABASE_ID}...\n`);

  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({ properties }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Erro do Notion:\n", body);
    process.exit(1);
  }

  const result = await response.json();

  console.log("Pronto. Propriedades no banco agora:\n");
  for (const [name, prop] of Object.entries(result.properties)) {
    const isNew = Object.prototype.hasOwnProperty.call(properties, name);
    console.log(`  ${isNew ? "+" : " "} ${name.padEnd(28)} ${prop.type}`);
  }
  console.log("\nAbra o CRM BRUBAWORLD no Notion para conferir.");
}

run().catch((error) => {
  console.error("Falhou:", error);
  process.exit(1);
});
