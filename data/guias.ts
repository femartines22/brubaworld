// Guias prontos à venda. Usado na lista de guias e no painel "Guias Prontos" da home.
// O preço aqui precisa bater com o preço na Kiwify.

export type Guia = {
  id: string;
  badge: string;
  titulo: string;
  subtitulo: string;
  transformacao: string;
  precoRiscado: string;
  preco: string;
  href: string;
  /** FOTO: capa do guia, horizontal. Enquanto não chega, a capa é um campo de cor com este nome. */
  etiquetaFoto: string;
  /** Cor do campo da capa e do botão. Paris e Londres divide rosa e azul. */
  cor: "rosa" | "manteiga" | "parisLondres";
};

export const guias: Guia[] = [
  {
    id: "paris-5-dias",
    badge: "Guia de Viagem",
    titulo: "Paris em 5 Dias",
    subtitulo: "o guia da sua primeira viagem",
    transformacao: "Sua primeira vez em Paris, sem estresse e sem perder nada.",
    precoRiscado: "R$ 109,90",
    preco: "R$ 69,90",
    href: "/roteiros/paris",
    etiquetaFoto: "Torre Eiffel",
    cor: "rosa",
  },
  {
    id: "paris-a-table",
    badge: "Guia de Restaurantes",
    titulo: "Paris à Table",
    subtitulo: "bistrôs, padarias e mesas favoritas",
    transformacao: "Comer bem em Paris sem cair em armadilha de turista.",
    precoRiscado: "",
    preco: "R$ 49,90",
    href: "/roteiros/paris-a-table",
    etiquetaFoto: "Bistrô parisiense",
    cor: "manteiga",
  },
  {
    id: "paris-londres-1-semana",
    badge: "Guia de Viagem",
    titulo: "Paris e Londres em 1 Semana",
    subtitulo: "duas capitais, um roteiro completo",
    transformacao: "Sua semana entre Paris e Londres organizada passo a passo.",
    precoRiscado: "R$ 129,90",
    preco: "R$ 89,90",
    href: "/roteiros/paris-londres-1-semana",
    etiquetaFoto: "Big Ben, Londres",
    cor: "parisLondres",
  },
];

export const guiaEmBreve = {
  badge: "Novo guia",
  titulo: "Próximo destino",
  subtitulo: "em produção",
  transformacao: "Mais um roteiro testado de pertinho, chegando em breve.",
};
