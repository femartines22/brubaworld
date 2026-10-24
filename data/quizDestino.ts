// Quiz "descubra seu próximo destino".
// Destinos do mundo todo, não só os que a Bruba já visitou.
// Para adicionar um destino, inclua um item em `destinos` com os mesmos campos —
// a pontuação em `pontuar` usa só esses campos, não há nada a mudar nas perguntas.

export type Estilo = "cultura" | "gastronomia" | "natureza" | "praia" | "agito";
export type Clima = "calor" | "ameno" | "frio";
export type Companhia = "sozinha" | "casal" | "amigas" | "familia";
export type Duracao = "curta" | "semana" | "longa";
/** 1 = base, 2 = econômico, 3 = sem economizar */
export type Orcamento = 1 | 2 | 3;

export type Respostas = {
  estilo: Estilo;
  orcamento: Orcamento;
  clima: Clima | "tantoFaz";
  duracao: Duracao;
  companhia: Companhia;
};

export type Destino = {
  id: string;
  cidade: string;
  /** Nome do país como está em components/Bandeira.tsx (sem bandeira lá, ela só não aparece). */
  pais: string;
  estilos: Estilo[];
  custo: Orcamento;
  climas: Clima[];
  /** Destinos perto do Brasil funcionam numa viagem curta; os longe pedem mais dias. */
  perto: boolean;
  /** Tão longe que só vale a pena com 10 dias ou mais (Ásia, Oceania). */
  pedeLonga?: boolean;
  /** A primeira companhia da lista é o público ideal do destino. */
  companhias: Companhia[];
  /** Frase da Bruba explicando por que o destino combina. */
  porque: string;
  /** Duas ou três coisas que entram no roteiro. */
  naoPerca: string[];
  melhorEpoca: string;
  /** Guia pronto à venda para esse destino, se existir. */
  guia?: { titulo: string; preco: string; href: string };
  gradiente: string;
};

export const destinos: Destino[] = [
  {
    id: "paris",
    cidade: "Paris",
    pais: "França",
    estilos: ["cultura", "gastronomia"],
    custo: 3,
    climas: ["ameno", "frio"],
    perto: false,
    companhias: ["casal", "sozinha", "amigas"],
    porque:
      "Museu de manhã, bistrô no almoço e a cidade inteira pra caminhar. É o destino que eu mais conheço, morei lá.",
    naoPerca: ["um fim de tarde no Marais", "padaria de bairro no café da manhã", "Montmartre cedinho, antes da multidão"],
    melhorEpoca: "abril a junho, setembro e outubro",
    guia: { titulo: "Paris em 5 Dias", preco: "R$ 69,90", href: "/roteiros/paris" },
    gradiente: "linear-gradient(160deg, #F3B896 0%, #EE8FA0 55%, #B87FA8 100%)",
  },
  {
    id: "lisboa",
    cidade: "Lisboa e Porto",
    pais: "Portugal",
    estilos: ["gastronomia", "cultura", "praia"],
    custo: 2,
    climas: ["ameno", "calor"],
    perto: false,
    companhias: ["casal", "familia", "sozinha", "amigas"],
    porque:
      "A porta de entrada mais fácil da Europa: mesmo idioma, comida boa e preço que cabe no bolso.",
    naoPerca: ["pastel de nata em Belém", "pôr do sol num miradouro", "um dia de trem até o Porto"],
    melhorEpoca: "abril a outubro",
    gradiente: "linear-gradient(160deg, #F6D49A 0%, #EFB08A 55%, #D98C8C 100%)",
  },
  {
    id: "roma",
    cidade: "Roma e Florença",
    pais: "Itália",
    estilos: ["cultura", "gastronomia"],
    custo: 2,
    climas: ["calor", "ameno"],
    perto: false,
    companhias: ["casal", "familia", "amigas", "sozinha"],
    porque:
      "História em cada esquina e a melhor comida do mundo. Dá pra sair do Coliseu direto pra uma trattoria.",
    naoPerca: ["Vaticano logo na abertura", "gelato depois do jantar", "trem rápido até Florença"],
    melhorEpoca: "abril a junho, setembro e outubro",
    gradiente: "linear-gradient(160deg, #F2C48D 0%, #E39A6F 55%, #B9725E 100%)",
  },
  {
    id: "barcelona",
    cidade: "Barcelona",
    pais: "Espanha",
    estilos: ["praia", "agito", "gastronomia"],
    custo: 2,
    climas: ["calor"],
    perto: false,
    companhias: ["amigas", "casal", "sozinha"],
    porque:
      "Praia de dia, tapas à noite e Gaudí no meio do caminho. Cidade grande com cara de férias.",
    naoPerca: ["Sagrada Família com ingresso marcado", "vermute no Born", "fim de tarde na Barceloneta"],
    melhorEpoca: "maio a setembro",
    gradiente: "linear-gradient(160deg, #F7D58B 0%, #F2A07B 55%, #E06D8A 100%)",
  },
  {
    id: "londres",
    cidade: "Londres",
    pais: "Inglaterra",
    estilos: ["agito", "cultura"],
    custo: 3,
    climas: ["ameno", "frio"],
    perto: false,
    companhias: ["sozinha", "amigas", "familia", "casal"],
    porque:
      "Museus de graça, mercados, musicais e um bairro diferente por dia. Nunca falta o que fazer.",
    naoPerca: ["um musical no West End", "Borough Market no almoço", "passeio por Notting Hill"],
    melhorEpoca: "maio a setembro",
    guia: { titulo: "Paris e Londres em 1 Semana", preco: "R$ 89,90", href: "/roteiros/paris-londres-1-semana" },
    gradiente: "linear-gradient(160deg, #C3D6D9 0%, #9FB6BE 55%, #7B93A6 100%)",
  },
  {
    id: "praga",
    cidade: "Praga e Budapeste",
    pais: "República Tcheca",
    estilos: ["cultura", "agito"],
    custo: 1,
    climas: ["frio", "ameno"],
    perto: false,
    companhias: ["amigas", "casal", "sozinha"],
    porque:
      "Cenário de conto de fadas gastando bem menos que no resto da Europa. No inverno fica ainda mais bonita.",
    naoPerca: ["Ponte Carlos ao amanhecer", "banhos termais em Budapeste", "mercado de Natal, se for em dezembro"],
    melhorEpoca: "maio a setembro, ou dezembro pelo Natal",
    gradiente: "linear-gradient(160deg, #BFD3D6 0%, #9FB6BE 60%, #7E93A4 100%)",
  },
  {
    id: "amsterdam",
    cidade: "Amsterdam",
    pais: "Holanda",
    estilos: ["cultura", "agito"],
    custo: 3,
    climas: ["frio", "ameno"],
    perto: false,
    companhias: ["amigas", "casal", "sozinha"],
    porque:
      "Canais, bicicleta e museus incríveis numa cidade que dá pra fazer toda a pé. Combina com Bruges num bate-volta.",
    naoPerca: ["Museu Van Gogh", "pedalar pelo Jordaan", "bate-volta até Bruges"],
    melhorEpoca: "abril e maio, pelas tulipas",
    gradiente: "linear-gradient(160deg, #F4C1A0 0%, #E58F83 55%, #A97A9C 100%)",
  },
  {
    id: "malta",
    cidade: "Malta",
    pais: "Malta",
    estilos: ["praia", "natureza", "cultura"],
    custo: 2,
    climas: ["calor"],
    perto: false,
    companhias: ["casal", "amigas", "familia"],
    porque:
      "Mar azul-turquesa, cidade medieval e tudo pertinho. Um segredo do Mediterrâneo que pouca gente conhece.",
    naoPerca: ["Blue Lagoon em Comino", "um fim de tarde em Valeta", "Mdina à noite"],
    melhorEpoca: "maio a outubro",
    gradiente: "linear-gradient(160deg, #F6C9A8 0%, #E9A48C 55%, #C98BA0 100%)",
  },
  {
    id: "suica",
    cidade: "Alpes suíços",
    pais: "Suíça",
    estilos: ["natureza"],
    custo: 3,
    climas: ["frio", "ameno"],
    perto: false,
    companhias: ["casal", "familia"],
    porque:
      "Montanha, lago e trem panorâmico. É a viagem pra quem quer paisagem de cartão-postal o dia inteiro.",
    naoPerca: ["trem panorâmico entre as montanhas", "um dia em Lucerna", "fondue depois da neve"],
    melhorEpoca: "junho a setembro, ou dezembro a março pela neve",
    gradiente: "linear-gradient(160deg, #D4E1E4 0%, #A9C1C9 55%, #8098AC 100%)",
  },
  {
    id: "edimburgo",
    cidade: "Edimburgo e Highlands",
    pais: "Escócia",
    estilos: ["natureza", "cultura"],
    custo: 2,
    climas: ["frio", "ameno"],
    perto: false,
    companhias: ["sozinha", "casal", "amigas"],
    porque:
      "Castelo no centro da cidade e, a uma hora dali, as paisagens mais dramáticas da Europa.",
    naoPerca: ["subir o Arthur's Seat", "a Royal Mile num fim de tarde", "excursão pelas Highlands"],
    melhorEpoca: "maio a setembro",
    gradiente: "linear-gradient(160deg, #C9D3C4 0%, #9FB2A6 55%, #7D8E9E 100%)",
  },
  {
    id: "nova-york",
    cidade: "Nova York",
    pais: "Estados Unidos",
    estilos: ["agito", "cultura"],
    custo: 3,
    climas: ["frio", "ameno", "calor"],
    perto: false,
    companhias: ["amigas", "sozinha", "casal", "familia"],
    porque:
      "A cidade que nunca para: show, compra, museu e um bairro com cara diferente a cada parada de metrô.",
    naoPerca: ["Central Park de bicicleta", "um espetáculo na Broadway", "pôr do sol num rooftop"],
    melhorEpoca: "abril a junho, setembro a dezembro",
    gradiente: "linear-gradient(160deg, #E7C3A8 0%, #C99C9C 55%, #8B87A8 100%)",
  },
  {
    id: "buenos-aires",
    cidade: "Buenos Aires",
    pais: "Argentina",
    estilos: ["gastronomia", "cultura", "agito"],
    custo: 1,
    climas: ["ameno", "frio", "calor"],
    perto: true,
    companhias: ["casal", "amigas", "sozinha", "familia"],
    porque:
      "Pertinho, sem fuso e com cara de Europa. Carne, vinho e tango num fim de semana prolongado.",
    naoPerca: ["um asado numa parrilla de bairro", "feira de San Telmo no domingo", "show de tango"],
    melhorEpoca: "março a maio, setembro a novembro",
    gradiente: "linear-gradient(160deg, #CFE0EA 0%, #A8C4D8 55%, #8C9EC0 100%)",
  },
  {
    id: "uruguai",
    cidade: "Montevidéu e Punta del Este",
    pais: "Uruguai",
    estilos: ["praia", "gastronomia"],
    custo: 2,
    climas: ["calor", "ameno"],
    perto: true,
    companhias: ["casal", "familia", "amigas", "sozinha"],
    porque:
      "Praia, parrilla e pôr do sol sem pressa, a um voo curtinho de casa. Perfeito pra um feriado.",
    naoPerca: ["almoço no Mercado del Puerto", "pôr do sol em Casapueblo", "caminhar pela Rambla"],
    melhorEpoca: "dezembro a março",
    gradiente: "linear-gradient(160deg, #F7DDA4 0%, #EDB48C 55%, #8FB3C9 100%)",
  },
  {
    id: "chile",
    cidade: "Santiago e os Andes",
    pais: "Chile",
    estilos: ["natureza", "gastronomia"],
    custo: 1,
    climas: ["frio", "ameno"],
    perto: true,
    companhias: ["casal", "familia", "amigas"],
    porque:
      "Neve na Cordilheira de manhã e vinícola à tarde, a poucas horas de voo do Brasil.",
    naoPerca: ["um dia de neve na Cordilheira", "visita a uma vinícola no Vale do Maipo", "Cerro San Cristóbal no fim do dia"],
    melhorEpoca: "junho a agosto pela neve, ou outubro a março",
    gradiente: "linear-gradient(160deg, #DCE4E8 0%, #B2C2CE 55%, #9A93AE 100%)",
  },
  {
    id: "cidade-do-cabo",
    cidade: "Cidade do Cabo",
    pais: "África do Sul",
    estilos: ["natureza", "praia", "gastronomia"],
    custo: 2,
    climas: ["calor", "ameno"],
    perto: false,
    companhias: ["casal", "amigas", "sozinha"],
    porque:
      "Montanha, mar e vinícolas na mesma cidade, com o real rendendo bem. Uma das viagens que mais me surpreenderam.",
    naoPerca: ["subir a Table Mountain", "pinguins em Boulders Beach", "um dia nas vinícolas de Stellenbosch"],
    melhorEpoca: "outubro a abril",
    gradiente: "linear-gradient(160deg, #F2CF9B 0%, #DDA27E 55%, #9C8A7A 100%)",
  },
  {
    id: "santorini",
    cidade: "Atenas e Santorini",
    pais: "Grécia",
    estilos: ["cultura", "praia"],
    custo: 3,
    climas: ["calor"],
    perto: false,
    companhias: ["casal", "amigas"],
    porque:
      "Casinha branca, mar azul e o pôr do sol mais famoso do mundo, depois de uns dias entre as ruínas de Atenas.",
    naoPerca: ["pôr do sol em Oia", "Acrópole logo na abertura", "passeio de barco pela caldeira"],
    melhorEpoca: "maio, junho e setembro",
    gradiente: "linear-gradient(160deg, #F4E3C6 0%, #A9CBE0 55%, #5E8FC0 100%)",
  },
  {
    id: "croacia",
    cidade: "Dubrovnik e Split",
    pais: "Croácia",
    estilos: ["praia", "cultura"],
    custo: 2,
    climas: ["calor"],
    perto: false,
    companhias: ["familia", "casal", "amigas"],
    porque:
      "Cidade murada à beira do Adriático e ilha atrás de ilha pra explorar de barco. Praia europeia sem o preço da Grécia.",
    naoPerca: ["caminhar sobre as muralhas de Dubrovnik", "um dia de barco pelas ilhas", "Palácio de Diocleciano em Split"],
    melhorEpoca: "maio, junho e setembro",
    gradiente: "linear-gradient(160deg, #F2D6A8 0%, #9CC3C9 55%, #5F94AA 100%)",
  },
  {
    id: "istambul",
    cidade: "Istambul e Capadócia",
    pais: "Turquia",
    estilos: ["cultura", "gastronomia"],
    custo: 1,
    climas: ["ameno", "frio", "calor"],
    perto: false,
    companhias: ["casal", "amigas", "sozinha", "familia"],
    porque:
      "Entre a Europa e a Ásia: bazar, mesquita, comida de rua incrível e o céu cheio de balões na Capadócia.",
    naoPerca: ["voo de balão ao amanhecer na Capadócia", "Grande Bazar sem pressa", "pôr do sol no Bósforo"],
    melhorEpoca: "abril a junho, setembro e outubro",
    gradiente: "linear-gradient(160deg, #F6C39A 0%, #E2917E 55%, #A86F86 100%)",
  },
  {
    id: "marrocos",
    cidade: "Marrakech e o deserto",
    pais: "Marrocos",
    estilos: ["cultura", "natureza"],
    custo: 1,
    climas: ["calor", "ameno"],
    perto: false,
    companhias: ["amigas", "casal", "sozinha"],
    porque:
      "Cores, cheiros e mercados que parecem de outro mundo, e uma noite dormindo no Saara.",
    naoPerca: ["Praça Jemaa el-Fna ao anoitecer", "noite num acampamento no Saara", "Jardim Majorelle"],
    melhorEpoca: "março a maio, outubro e novembro",
    gradiente: "linear-gradient(160deg, #F4C08A 0%, #E08C5E 55%, #B5604E 100%)",
  },
  {
    id: "islandia",
    cidade: "Islândia",
    pais: "Islândia",
    estilos: ["natureza"],
    custo: 3,
    climas: ["frio"],
    perto: false,
    companhias: ["casal", "amigas", "sozinha"],
    porque:
      "Cachoeira, geleira, vulcão e, com sorte, aurora boreal. É a natureza mais impressionante que dá pra ver de carro.",
    naoPerca: ["Círculo Dourado", "praia de areia preta em Vík", "caçar aurora boreal no inverno"],
    melhorEpoca: "junho a agosto, ou setembro a março pela aurora",
    gradiente: "linear-gradient(160deg, #D7E3EA 0%, #9DB8C9 55%, #6E7FA6 100%)",
  },
  {
    id: "dubai",
    cidade: "Dubai",
    pais: "Emirados Árabes",
    estilos: ["agito", "praia"],
    custo: 3,
    climas: ["calor"],
    perto: false,
    companhias: ["amigas", "casal", "familia"],
    porque:
      "Tudo é o maior do mundo: prédio, shopping, parque. E ainda tem praia e safári no deserto.",
    naoPerca: ["Burj Khalifa no fim da tarde", "safári no deserto", "Dubai Mall e a fonte dançante"],
    melhorEpoca: "novembro a março",
    gradiente: "linear-gradient(160deg, #F6D7A0 0%, #E7A877 55%, #B9806A 100%)",
  },
  {
    id: "maldivas",
    cidade: "Maldivas",
    pais: "Maldivas",
    estilos: ["praia"],
    custo: 3,
    climas: ["calor"],
    perto: false,
    companhias: ["casal"],
    porque:
      "Bangalô sobre a água e um mar que parece piscina. A lua de mel dos sonhos.",
    naoPerca: ["mergulho com snorkel no recife", "jantar na areia", "uma noite em bangalô sobre a água"],
    melhorEpoca: "dezembro a abril",
    gradiente: "linear-gradient(160deg, #CDEDEA 0%, #8FD0D6 55%, #4FA3C0 100%)",
  },
  {
    id: "japao",
    cidade: "Tóquio e Kyoto",
    pais: "Japão",
    estilos: ["cultura", "gastronomia", "agito"],
    custo: 3,
    climas: ["ameno", "frio", "calor"],
    perto: false,
    pedeLonga: true,
    companhias: ["sozinha", "casal", "amigas", "familia"],
    porque:
      "Neon e templo milenar na mesma viagem, a comida mais caprichada do mundo e uma cidade segura pra andar a qualquer hora.",
    naoPerca: ["cruzamento de Shibuya à noite", "templos de Kyoto bem cedo", "um izakaya de bairro"],
    melhorEpoca: "março e abril pelas cerejeiras, ou outubro e novembro",
    gradiente: "linear-gradient(160deg, #F8D3D8 0%, #E9A3B2 55%, #A67C9E 100%)",
  },
  {
    id: "bali",
    cidade: "Bali",
    pais: "Indonésia",
    estilos: ["natureza", "praia"],
    custo: 1,
    climas: ["calor"],
    perto: false,
    pedeLonga: true,
    companhias: ["casal", "sozinha", "amigas"],
    porque:
      "Arrozal, templo, cachoeira e praia, gastando pouco por dia. Uma viagem pra desacelerar de verdade.",
    naoPerca: ["arrozais de Tegallalang", "templo Uluwatu no pôr do sol", "um dia nas Ilhas Gili"],
    melhorEpoca: "abril a outubro",
    gradiente: "linear-gradient(160deg, #D9E8B8 0%, #A3C99A 55%, #6F9F8A 100%)",
  },
  {
    id: "tailandia",
    cidade: "Bangkok e as ilhas",
    pais: "Tailândia",
    estilos: ["praia", "agito", "gastronomia"],
    custo: 1,
    climas: ["calor"],
    perto: false,
    pedeLonga: true,
    companhias: ["amigas", "sozinha", "casal"],
    porque:
      "Comida de rua inesquecível em Bangkok e depois praia de água transparente em Phi Phi e Krabi, tudo barato.",
    naoPerca: ["mercado noturno em Bangkok", "passeio de barco por Phi Phi", "pad thai na rua"],
    melhorEpoca: "novembro a março",
    gradiente: "linear-gradient(160deg, #F8DC9C 0%, #8ED0C4 55%, #4B9CB0 100%)",
  },
  {
    id: "mexico",
    cidade: "Cancún e Tulum",
    pais: "México",
    estilos: ["praia", "agito"],
    custo: 2,
    climas: ["calor"],
    perto: false,
    companhias: ["amigas", "casal", "familia", "sozinha"],
    porque:
      "Mar do Caribe, cenotes pra nadar e ruína maia na beira da praia, com voo direto do Brasil.",
    naoPerca: ["nadar num cenote", "ruínas de Tulum de frente pro mar", "um dia em Isla Mujeres"],
    melhorEpoca: "dezembro a abril",
    gradiente: "linear-gradient(160deg, #F6E3B0 0%, #9FD8CF 55%, #4FA9B8 100%)",
  },
  {
    id: "orlando",
    cidade: "Orlando",
    pais: "Estados Unidos",
    estilos: ["agito"],
    custo: 3,
    climas: ["calor", "ameno"],
    perto: false,
    companhias: ["familia", "amigas", "casal"],
    porque:
      "Parque de manhã à noite, montanha-russa e personagem pra todo lado. Ninguém da família volta sem sorrir.",
    naoPerca: ["Magic Kingdom com fogos no fim do dia", "Universal e o mundo do Harry Potter", "um dia de compras nos outlets"],
    melhorEpoca: "fevereiro a maio, setembro a novembro",
    gradiente: "linear-gradient(160deg, #F9D5A7 0%, #F0A3B4 55%, #9C8FC9 100%)",
  },
  {
    id: "peru",
    cidade: "Cusco e Machu Picchu",
    pais: "Peru",
    estilos: ["natureza", "cultura"],
    custo: 1,
    climas: ["ameno", "frio"],
    perto: true,
    companhias: ["amigas", "sozinha", "casal", "familia"],
    porque:
      "Uma das maravilhas do mundo pertinho de casa, com montanha, história inca e a comida que mais cresce no mundo.",
    naoPerca: ["Machu Picchu ao amanhecer", "Vale Sagrado", "um ceviche em Lima na volta"],
    melhorEpoca: "maio a setembro",
    gradiente: "linear-gradient(160deg, #E9D7B0 0%, #B9B68E 55%, #7C8C78 100%)",
  },
  {
    id: "cartagena",
    cidade: "Cartagena",
    pais: "Colômbia",
    estilos: ["praia", "cultura", "agito"],
    custo: 1,
    climas: ["calor"],
    perto: true,
    companhias: ["amigas", "casal", "sozinha", "familia"],
    porque:
      "Cidade colorida de muralha, noite animada e ilha de mar caribenho a um passeio de barco. Tudo num feriado.",
    naoPerca: ["pôr do sol na muralha", "dia de barco nas Ilhas do Rosário", "noite em Getsemaní"],
    melhorEpoca: "dezembro a abril",
    gradiente: "linear-gradient(160deg, #F7D58B 0%, #F09A86 55%, #4FA9B8 100%)",
  },
  {
    id: "patagonia",
    cidade: "Patagônia",
    pais: "Argentina",
    estilos: ["natureza"],
    custo: 2,
    climas: ["frio"],
    perto: true,
    companhias: ["casal", "amigas", "sozinha"],
    porque:
      "Geleira gigante, lago azul-turquesa e trilha com vista de cartão-postal, sem precisar cruzar o oceano.",
    naoPerca: ["Glaciar Perito Moreno", "trilha em El Chaltén", "navegar pelo Canal de Beagle em Ushuaia"],
    melhorEpoca: "outubro a abril",
    gradiente: "linear-gradient(160deg, #DCE8EE 0%, #A4C7D6 55%, #6F95B0 100%)",
  },
  {
    id: "noronha",
    cidade: "Fernando de Noronha",
    pais: "Brasil",
    estilos: ["praia", "natureza"],
    custo: 3,
    climas: ["calor"],
    perto: true,
    companhias: ["casal", "amigas"],
    porque:
      "As praias mais bonitas do Brasil, mergulho com tartaruga e golfinho, sem passaporte nem fuso.",
    naoPerca: ["Baía do Sancho", "mergulho com tartarugas", "pôr do sol no Forte do Boldró"],
    melhorEpoca: "agosto a janeiro",
    gradiente: "linear-gradient(160deg, #F5E0A6 0%, #8CCFC0 55%, #3E9BA8 100%)",
  },
];

type Opcao<T> = { valor: T; rotulo: string; detalhe?: string };

type Pergunta<K extends keyof Respostas> = {
  chave: K;
  titulo: string;
  opcoes: Opcao<Respostas[K]>[];
};

export const perguntas: [
  Pergunta<"estilo">,
  Pergunta<"orcamento">,
  Pergunta<"clima">,
  Pergunta<"duracao">,
  Pergunta<"companhia">,
] = [
  {
    chave: "estilo",
    titulo: "Qual vibe mais corresponde a você numa viagem?",
    opcoes: [
      { valor: "cultura", rotulo: "Museu, história e ruazinha antiga" },
      { valor: "gastronomia", rotulo: "Comer e beber bem, sem culpa" },
      { valor: "natureza", rotulo: "Paisagem, montanha e ar livre" },
      { valor: "praia", rotulo: "Mar, sol e pé na areia" },
      { valor: "agito", rotulo: "Cidade grande, show e vida noturna" },
    ],
  },
  {
    chave: "orcamento",
    titulo: "Quanto você quer gastar por dia na sua viagem?",
    opcoes: [
      { valor: 1, rotulo: "Base", detalhe: "até R$ 500 por dia" },
      { valor: 2, rotulo: "Econômico", detalhe: "de R$ 500 a R$ 1.000 por dia" },
      { valor: 3, rotulo: "Sem economizar", detalhe: "mais de R$ 1.000 por dia" },
    ],
  },
  {
    chave: "clima",
    titulo: "E o clima dos sonhos?",
    opcoes: [
      { valor: "calor", rotulo: "Calor e sol" },
      { valor: "ameno", rotulo: "Fresquinho, de casaco leve" },
      { valor: "frio", rotulo: "Frio de verdade, quem sabe neve" },
      { valor: "tantoFaz", rotulo: "Tanto faz, eu me adapto" },
    ],
  },
  {
    chave: "duracao",
    titulo: "Por quanto tempo você quer viajar?",
    opcoes: [
      { valor: "curta", rotulo: "Até 5 dias", detalhe: "um feriado prolongado" },
      { valor: "semana", rotulo: "Uma semana" },
      { valor: "longa", rotulo: "10 dias ou mais" },
    ],
  },
  {
    chave: "companhia",
    titulo: "Com quem você vai?",
    opcoes: [
      { valor: "sozinha", rotulo: "Sozinho(a)" },
      { valor: "casal", rotulo: "Em casal" },
      { valor: "amigas", rotulo: "Com amigas ou amigos" },
      { valor: "familia", rotulo: "Em família" },
    ],
  },
];

/** Soma pontos de um destino para as respostas dadas. Quanto maior, melhor. */
function pontuar(d: Destino, r: Respostas) {
  let pontos = 0;

  // O estilo é o que mais pesa; o primeiro estilo da lista é a "vocação" do destino.
  const posEstilo = d.estilos.indexOf(r.estilo);
  if (posEstilo === 0) pontos += 5;
  else if (posEstilo > 0) pontos += 3;

  // Destino mais caro que o orçamento perde bastante; mais barato perde um pouco,
  // pra quem quer gastar mais não cair sempre no econômico.
  const diferenca = d.custo - r.orcamento;
  if (diferenca > 0) pontos -= diferenca * 3;
  else if (diferenca < 0) pontos -= 1;
  else pontos += 2;

  if (r.clima === "tantoFaz") pontos += 1;
  else if (d.climas[0] === r.clima) pontos += 3;
  else if (d.climas.includes(r.clima)) pontos += 1;
  else pontos -= 2;

  // Viagem curta pede destino perto; viagem longa favorece o outro lado do oceano.
  if (r.duracao === "curta") pontos += d.perto ? 4 : -2;
  if (r.duracao === "longa") pontos += d.perto ? -1 : 1;
  if (d.pedeLonga && r.duracao !== "longa") pontos -= 4;

  if (d.companhias[0] === r.companhia) pontos += 2;
  else if (d.companhias.includes(r.companhia)) pontos += 1;

  return pontos;
}

/** Devolve o destino principal e uma segunda opção. Empates ficam com a ordem da lista. */
export function sugerirDestinos(r: Respostas): [Destino, Destino] {
  const ordenados = destinos
    .map((d, i) => ({ d, i, pontos: pontuar(d, r) }))
    .sort((a, b) => b.pontos - a.pontos || a.i - b.i);
  return [ordenados[0].d, ordenados[1].d];
}

/** Texto com as respostas, para ir no campo de observações do formulário. */
export function resumoRespostas(r: Respostas) {
  return perguntas
    .map((p) => {
      const opcao = (p.opcoes as Opcao<unknown>[]).find((o) => o.valor === r[p.chave]);
      return opcao ? `${opcao.rotulo}${opcao.detalhe ? ` (${opcao.detalhe})` : ""}` : "";
    })
    .filter(Boolean)
    .join(" · ");
}
