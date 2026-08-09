// Países que a Bruba já visitou pessoalmente, agrupados por continente.
// Para adicionar um país novo, inclua o nome no continente certo —
// o contador, os subtotais e a grade na home se atualizam sozinhos.

export const paisesPorContinente = [
  {
    continente: "Europa",
    paises: [
      "Espanha",
      "Portugal",
      "França",
      "Itália",
      "Alemanha",
      "Holanda",
      "Bélgica",
      "Suíça",
      "Áustria",
      "Suécia",
      "Dinamarca",
      "Escócia",
      "Inglaterra",
      "República Tcheca",
      "Hungria",
      "Malta",
      "Vaticano",
    ],
  },
  {
    continente: "América do Sul",
    paises: ["Argentina", "Uruguai", "Chile", "Paraguai"],
  },
  {
    continente: "América do Norte",
    paises: ["Estados Unidos", "Bahamas"],
  },
  {
    continente: "África",
    paises: ["África do Sul"],
  },
];

// Lista plana — usada pelo contador e por qualquer lugar que só precise dos nomes.
export const paisesVisitados = paisesPorContinente.flatMap((g) => g.paises);

// País em que a Bruba é especialista. Recebe destaque visual (estrela) na
// grade de países, com legenda explicando o que a estrela significa.
export const paisDestaque = "França";
export const legendaDestaque = "especialista em paris";
