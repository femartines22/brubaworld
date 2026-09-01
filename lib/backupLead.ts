/**
 * Cópia de segurança de cada lead, enviada por e-mail antes de tentar o Notion.
 *
 * Existe porque em agosto de 2026 a integração com o Notion quebrou por uma
 * diferença de nome numa coluna, e os leads daquele período se perderam por
 * completo: não havia nenhum outro lugar guardando os dados.
 *
 * Funciona com Resend ou Formspree, o que estiver configurado.
 * Se nenhum estiver, apenas registra o lead no log e segue.
 */

export type Lead = {
  name: string;
  phone: string;
  destino: string;
  age?: string;
  primeiraVez?: string;
  dataEstimada?: string;
  observacoes?: string;
  instagram?: string;
  email?: string;
};

const DESTINO_EMAIL = process.env.LEAD_BACKUP_EMAIL || "brubaworld@gmail.com";

function formatar(lead: Lead) {
  const linhas = [
    `Nome: ${lead.name}`,
    `Telefone: ${lead.phone}`,
    `Destino: ${lead.destino}`,
    lead.age ? `Idade: ${lead.age}` : "",
    lead.primeiraVez ? `Primeira vez no destino: ${lead.primeiraVez}` : "",
    lead.dataEstimada ? `Quando pretende ir: ${lead.dataEstimada}` : "",
    lead.observacoes ? `Observações: ${lead.observacoes}` : "",
    lead.instagram ? `Instagram: ${lead.instagram}` : "",
    lead.email ? `Email: ${lead.email}` : "",
    "",
    `Recebido em: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`,
  ];
  return linhas.filter(Boolean).join("\n");
}

async function viaResend(lead: Lead): Promise<boolean> {
  const chave = process.env.RESEND_API_KEY;
  if (!chave) return false;

  const remetente = process.env.RESEND_FROM || "onboarding@resend.dev";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${chave}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: remetente,
      to: [DESTINO_EMAIL],
      subject: `Novo lead: ${lead.name} — ${lead.destino}`,
      text: formatar(lead),
    }),
  });

  if (!res.ok) {
    console.error("[backup] Resend recusou:", await res.text());
    return false;
  }
  return true;
}

async function viaFormspree(lead: Lead): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_FORMSPREE_URL;
  if (!url) return false;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Novo lead: ${lead.name} — ${lead.destino}`,
      ...lead,
    }),
  });

  if (!res.ok) {
    console.error("[backup] Formspree recusou:", await res.text());
    return false;
  }
  return true;
}

/**
 * Tenta guardar o lead fora do Notion. Nunca lança erro: uma falha aqui
 * não pode impedir o lead de seguir para o CRM.
 */
export async function guardarCopia(lead: Lead): Promise<boolean> {
  // O log é a última linha de defesa. Mesmo sem e-mail configurado,
  // os dados ficam recuperáveis pelos logs do Vercel por algumas horas.
  console.log("[lead] recebido:", JSON.stringify(lead));

  try {
    if (await viaResend(lead)) {
      console.log("[backup] Cópia enviada por e-mail (Resend).");
      return true;
    }
    if (await viaFormspree(lead)) {
      console.log("[backup] Cópia enviada por e-mail (Formspree).");
      return true;
    }
    console.warn(
      "[backup] Nenhum destino de e-mail configurado. " +
        "Defina RESEND_API_KEY para ter cópia dos leads fora do Notion."
    );
    return false;
  } catch (erro) {
    console.error("[backup] Falhou ao enviar a cópia:", erro);
    return false;
  }
}
