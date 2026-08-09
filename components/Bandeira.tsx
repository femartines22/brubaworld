/**
 * Bandeiras desenhadas em SVG.
 *
 * Emoji de bandeira não renderiza no Windows (aparece como "BR", "FR", "GB"),
 * então aqui elas são desenhadas de verdade e ficam iguais em qualquer sistema.
 *
 * Como são exibidas pequenas (~18px), os desenhos são simplificados:
 * brasões e emblemas viram formas básicas, que é tudo que se distingue nesse tamanho.
 */

const W = 24;
const H = 16;

/** Faixas horizontais de mesma altura, de cima para baixo. */
function faixasH(cores: string[]) {
  const alt = H / cores.length;
  return cores.map((cor, i) => (
    <rect key={i} x="0" y={i * alt} width={W} height={alt} fill={cor} />
  ));
}

/** Faixas verticais de mesma largura, da esquerda para a direita. */
function faixasV(cores: string[]) {
  const larg = W / cores.length;
  return cores.map((cor, i) => (
    <rect key={i} x={i * larg} y="0" width={larg} height={H} fill={cor} />
  ));
}

/** Cruz escandinava, deslocada para a esquerda. */
function cruzNordica(fundo: string, cruz: string) {
  return (
    <>
      <rect width={W} height={H} fill={fundo} />
      <rect x="7" y="0" width="3" height={H} fill={cruz} />
      <rect x="0" y="6.5" width={W} height="3" fill={cruz} />
    </>
  );
}

const BANDEIRAS: Record<string, React.ReactNode> = {
  // ---------- Europa ----------
  Espanha: (
    <>
      <rect width={W} height={H} fill="#C60B1E" />
      <rect y="4" width={W} height="8" fill="#FFC400" />
    </>
  ),

  Portugal: (
    <>
      <rect width={W} height={H} fill="#DA291C" />
      <rect width="9.6" height={H} fill="#046A38" />
      <circle cx="9.6" cy="8" r="2.7" fill="#FFE900" />
      <circle cx="9.6" cy="8" r="1.6" fill="#DA291C" />
    </>
  ),

  França: <>{faixasV(["#002395", "#FFFFFF", "#ED2939"])}</>,
  Itália: <>{faixasV(["#008C45", "#F4F5F0", "#CD212A"])}</>,
  Alemanha: <>{faixasH(["#000000", "#DD0000", "#FFCE00"])}</>,
  Holanda: <>{faixasH(["#AE1C28", "#FFFFFF", "#21468B"])}</>,
  Bélgica: <>{faixasV(["#000000", "#FAE042", "#ED2939"])}</>,

  Suíça: (
    <>
      <rect width={W} height={H} fill="#DA291C" />
      <rect x="10.5" y="3" width="3" height="10" fill="#FFFFFF" />
      <rect x="7" y="6.5" width="10" height="3" fill="#FFFFFF" />
    </>
  ),

  Áustria: <>{faixasH(["#ED2939", "#FFFFFF", "#ED2939"])}</>,
  Suécia: cruzNordica("#006AA7", "#FECC00"),
  Dinamarca: cruzNordica("#C8102E", "#FFFFFF"),

  Escócia: (
    <>
      <rect width={W} height={H} fill="#005EB8" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="3.2" />
    </>
  ),

  Inglaterra: (
    <>
      <rect width={W} height={H} fill="#FFFFFF" />
      <rect x="10" y="0" width="4" height={H} fill="#CE1124" />
      <rect x="0" y="6" width={W} height="4" fill="#CE1124" />
    </>
  ),

  "República Tcheca": (
    <>
      <rect width={W} height="8" fill="#FFFFFF" />
      <rect y="8" width={W} height="8" fill="#D7141A" />
      <path d="M0 0 L12 8 L0 16 Z" fill="#11457E" />
    </>
  ),

  Hungria: <>{faixasH(["#CE2939", "#FFFFFF", "#477050"])}</>,

  Malta: (
    <>
      <rect width={W} height={H} fill="#CF142B" />
      <rect width="12" height={H} fill="#FFFFFF" />
      <path d="M2 2.5 h1.6 v1.4 h1.4 v1.6 h-1.4 v1.4 h-1.6 v-1.4 h-1.4 v-1.6 h1.4 z" fill="#CCCCCC" />
    </>
  ),

  Vaticano: (
    <>
      <rect width={W} height={H} fill="#FFFFFF" />
      <rect width="12" height={H} fill="#FFE000" />
      <circle cx="18" cy="8" r="2.6" fill="#D9C89E" />
    </>
  ),

  // ---------- América do Sul ----------
  Argentina: (
    <>
      {faixasH(["#74ACDF", "#FFFFFF", "#74ACDF"])}
      <circle cx="12" cy="8" r="2" fill="#F6B40E" />
    </>
  ),

  Uruguai: (
    <>
      <rect width={W} height={H} fill="#FFFFFF" />
      <rect y="2" width={W} height="2" fill="#0038A8" />
      <rect y="6" width={W} height="2" fill="#0038A8" />
      <rect y="10" width={W} height="2" fill="#0038A8" />
      <rect y="14" width={W} height="2" fill="#0038A8" />
      <rect width="10" height="8" fill="#FFFFFF" />
      <circle cx="5" cy="4" r="2.2" fill="#F6B40E" />
    </>
  ),

  Chile: (
    <>
      <rect width={W} height="8" fill="#FFFFFF" />
      <rect y="8" width={W} height="8" fill="#D52B1E" />
      <rect width="8" height="8" fill="#0039A6" />
      <path d="M4 1.8 l0.8 2.2 h2.3 l-1.9 1.4 0.7 2.2 -1.9 -1.4 -1.9 1.4 0.7 -2.2 -1.9 -1.4 h2.3 z" fill="#FFFFFF" />
    </>
  ),

  Paraguai: (
    <>
      {faixasH(["#D52B1E", "#FFFFFF", "#0038A8"])}
      <circle cx="12" cy="8" r="2.3" fill="#FFFFFF" stroke="#0038A8" strokeWidth="0.5" />
      <circle cx="12" cy="8" r="1" fill="#F6B40E" />
    </>
  ),

  // ---------- América do Norte ----------
  "Estados Unidos": (
    <>
      <rect width={W} height={H} fill="#FFFFFF" />
      {[0, 2, 4, 6].map((i) => (
        <rect key={i} y={i * 2.286} width={W} height="2.286" fill="#B22234" />
      ))}
      {[1, 3, 5].map((i) => (
        <rect key={`b${i}`} y={i * 2.286} width={W} height="2.286" fill="#FFFFFF" />
      ))}
      <rect width="10" height="8" fill="#3C3B6E" />
      {[
        [2, 2],
        [5, 2],
        [8, 2],
        [3.5, 4],
        [6.5, 4],
        [2, 6],
        [5, 6],
        [8, 6],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="0.7" fill="#FFFFFF" />
      ))}
    </>
  ),

  Bahamas: (
    <>
      {faixasH(["#00778B", "#FFC72C", "#00778B"])}
      <path d="M0 0 L10 8 L0 16 Z" fill="#000000" />
    </>
  ),

  // ---------- África ----------
  // O "Y" deitado aponta para a esquerda: dois braços saem dos cantos
  // e se encontram no meio, seguindo em faixa única até a borda direita.
  "África do Sul": (
    <>
      <rect width={W} height="8" fill="#DE3831" />
      <rect y="8" width={W} height="8" fill="#002395" />
      {/* Contorno branco do Y */}
      <path
        d="M-1 -2 L11 8 L25 8 M-1 18 L11 8"
        stroke="#FFFFFF"
        strokeWidth="6.4"
        fill="none"
      />
      {/* Faixa verde do Y */}
      <path
        d="M-1 -2 L11 8 L25 8 M-1 18 L11 8"
        stroke="#007A4D"
        strokeWidth="3.4"
        fill="none"
      />
      {/* Cunha amarela e triângulo preto na tralha */}
      <path d="M0 -0.5 L9.6 8 L0 16.5 Z" fill="#FFB612" />
      <path d="M0 1.8 L7.2 8 L0 14.2 Z" fill="#000000" />
    </>
  ),

  // ---------- Extras usados na seção "Quem faz" ----------
  Brasil: (
    <>
      <rect width={W} height={H} fill="#009B3A" />
      <path d="M12 1.6 L22.4 8 L12 14.4 L1.6 8 Z" fill="#FEDF00" />
      <circle cx="12" cy="8" r="3.4" fill="#002776" />
      <path d="M8.8 7 q3.2 1.6 6.4 0.3" stroke="#FFFFFF" strokeWidth="0.7" fill="none" />
    </>
  ),

  "Reino Unido": (
    <>
      <rect width={W} height={H} fill="#012169" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="3.4" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.8" />
      <rect x="9.5" y="0" width="5" height={H} fill="#FFFFFF" />
      <rect x="0" y="5.5" width={W} height="5" fill="#FFFFFF" />
      <rect x="10.5" y="0" width="3" height={H} fill="#C8102E" />
      <rect x="0" y="6.5" width={W} height="3" fill="#C8102E" />
    </>
  ),
};

export default function Bandeira({
  pais,
  className = "w-[18px] h-3",
}: {
  pais: string;
  className?: string;
}) {
  const desenho = BANDEIRAS[pais];
  if (!desenho) return null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`${className} shrink-0 rounded-[2px] ring-1 ring-grafite/10`}
      role="img"
      aria-label={`Bandeira: ${pais}`}
    >
      {desenho}
    </svg>
  );
}
