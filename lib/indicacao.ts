/**
 * Programa de indicação.
 *
 * A cliente recebe no app um link pessoal: brubaworld.com.br/?ref=CODIGO.
 * Quem chega por esse link tem o código guardado no navegador por 60 dias
 * e ele vai junto com o formulário para o CRM, na coluna "Indicada por".
 * O desconto (15% no roteiro personalizado) é aplicado pela Bruna na proposta.
 */

const CHAVE = "bw_indicacao";
const VALIDADE_DIAS = 60;

/** Aceita só letras, números e hífen, de 3 a 24 caracteres. */
export function codigoValido(valor: string | null | undefined): string | null {
  if (!valor) return null;
  const limpo = valor.trim().toUpperCase();
  return /^[A-Z0-9-]{3,24}$/.test(limpo) ? limpo : null;
}

export function guardarIndicacao(codigo: string) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ codigo, em: Date.now() }));
  } catch {
    // Navegador sem armazenamento: segue sem guardar.
  }
}

export function lerIndicacao(): string | null {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return null;
    const { codigo, em } = JSON.parse(bruto) as { codigo?: string; em?: number };
    if (!em || Date.now() - em > VALIDADE_DIAS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(CHAVE);
      return null;
    }
    return codigoValido(codigo);
  } catch {
    return null;
  }
}
