// Ponte entre o quiz e o formulário de roteiro sob medida.
// O quiz dispara o evento; ComoViajar abre a aba certa e FormularioLead
// preenche destino e observações. Assim nenhum dos dois precisa conhecer o outro.

export const EVENTO_QUERO_ROTEIRO = "bruba:quero-roteiro";

export type PedidoRoteiro = { destino: string; observacoes: string };

export function pedirRoteiro(pedido: PedidoRoteiro) {
  window.dispatchEvent(new CustomEvent<PedidoRoteiro>(EVENTO_QUERO_ROTEIRO, { detail: pedido }));

  // Espera o React trocar a aba: se "Guias Prontos" estiver aberta,
  // o formulário ainda está escondido e não teria para onde rolar.
  setTimeout(() => {
    document.getElementById("form-personalizado")?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Destino já vem preenchido; o próximo campo que falta é o nome.
    // No celular não foca, senão o teclado abre no meio da rolagem.
    if (window.matchMedia("(pointer: fine)").matches) {
      document.getElementById("name")?.focus({ preventScroll: true });
    }
  }, 50);
}
