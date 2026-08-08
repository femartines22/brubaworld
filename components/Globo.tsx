// Globo wireframe — a grade é projetada de verdade sobre a esfera
// (projeção ortográfica), então os meridianos e paralelos curvam certo.
// Sem imagem externa: escala em qualquer tamanho sem perder nitidez.

const R = 96;
const CX = 130;
const CY = 130;
const TILT = (18 * Math.PI) / 180; // inclinação do eixo
const LON0 = (10 * Math.PI) / 180; // longitude central

type Ponto = { x: number; y: number; z: number };

function projetar(latGraus: number, lonGraus: number): Ponto {
  const lat = (latGraus * Math.PI) / 180;
  const lon = (lonGraus * Math.PI) / 180;
  const dl = lon - LON0;
  const x = Math.cos(lat) * Math.sin(dl);
  const y =
    Math.cos(TILT) * Math.sin(lat) - Math.sin(TILT) * Math.cos(lat) * Math.cos(dl);
  const z =
    Math.sin(TILT) * Math.sin(lat) + Math.cos(TILT) * Math.cos(lat) * Math.cos(dl);
  return { x: CX + R * x, y: CY - R * y, z };
}

/** Devolve os trechos visíveis (z > 0) de uma linha da grade. */
function linha(
  fixo: "lat" | "lon",
  valor: number,
  de: number,
  ate: number,
  passo = 3
): string[] {
  const trechos: string[] = [];
  let atual: string[] = [];

  for (let v = de; v <= ate; v += passo) {
    const p = fixo === "lat" ? projetar(valor, v) : projetar(v, valor);
    if (p.z > 0) {
      atual.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    } else if (atual.length > 1) {
      trechos.push(atual.join(" "));
      atual = [];
    } else {
      atual = [];
    }
  }
  if (atual.length > 1) trechos.push(atual.join(" "));
  return trechos;
}

const paralelos = [-60, -30, 0, 30, 60].flatMap((lat) => linha("lat", lat, -180, 180));
const meridianos = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180].flatMap(
  (lon) => linha("lon", lon, -90, 90)
);

export default function Globo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 260"
      className={className}
      role="img"
      aria-label="Ilustração de um globo terrestre"
    >
      {/* Preenchimento suave da esfera */}
      <circle cx={CX} cy={CY} r={R} fill="#F2277E" fillOpacity="0.04" />

      {/* Grade */}
      <g
        fill="none"
        stroke="#F2277E"
        strokeOpacity="0.5"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        {paralelos.map((pontos, i) => (
          <polyline key={`p${i}`} points={pontos} />
        ))}
        {meridianos.map((pontos, i) => (
          <polyline key={`m${i}`} points={pontos} />
        ))}
      </g>

      {/* Contorno */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#F2277E" strokeWidth="1.8" />

      {/* Órbita */}
      <ellipse
        cx={CX}
        cy={CY}
        rx={R * 1.22}
        ry={R * 0.42}
        fill="none"
        stroke="#F2277E"
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeDasharray="5 8"
        transform={`rotate(-22 ${CX} ${CY})`}
      />
      <circle cx={CX + R * 1.1} cy={CY - R * 0.55} r="5" fill="#F2277E" />
      <circle cx={CX - R * 1.13} cy={CY + R * 0.5} r="4" fill="#F7E455" />
    </svg>
  );
}
