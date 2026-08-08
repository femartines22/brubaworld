// Globo decorativo desenhado em SVG com a paleta da marca.
// Sem dependência de imagem externa — escala em qualquer tamanho sem perder nitidez.
export default function Globo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="Ilustração de um globo terrestre"
    >
      <defs>
        <linearGradient id="globo-fundo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7E455" />
          <stop offset="100%" stopColor="#F2277E" />
        </linearGradient>
        <radialGradient id="globo-brilho" cx="32%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <clipPath id="globo-recorte">
          <circle cx="160" cy="160" r="126" />
        </clipPath>
      </defs>

      {/* Halo externo */}
      <circle cx="160" cy="160" r="150" fill="#F2277E" opacity="0.06" />
      <circle cx="160" cy="160" r="138" fill="#F2277E" opacity="0.08" />

      {/* Esfera */}
      <circle cx="160" cy="160" r="126" fill="url(#globo-fundo)" />

      <g clipPath="url(#globo-recorte)">
        {/* Paralelos */}
        <g stroke="#111111" strokeOpacity="0.22" strokeWidth="1.6" fill="none">
          <line x1="34" y1="160" x2="286" y2="160" />
          <path d="M40 106 Q160 88 280 106" />
          <path d="M40 214 Q160 232 280 214" />
          <path d="M62 62 Q160 44 258 62" />
          <path d="M62 258 Q160 276 258 258" />
        </g>

        {/* Meridianos */}
        <g stroke="#111111" strokeOpacity="0.22" strokeWidth="1.6" fill="none">
          <line x1="160" y1="34" x2="160" y2="286" />
          <ellipse cx="160" cy="160" rx="42" ry="126" />
          <ellipse cx="160" cy="160" rx="84" ry="126" />
        </g>

        {/* Massas de terra estilizadas */}
        <g fill="#111111" fillOpacity="0.82">
          {/* Europa / África */}
          <path d="M150 74 q26 -6 40 10 q12 14 2 26 q-14 16 -4 30 q10 14 2 30 q-8 16 -20 14 q-14 -2 -16 -20 q-2 -18 -12 -26 q-12 -10 -6 -26 q6 -16 14 -38 Z" />
          {/* Américas */}
          <path d="M92 96 q22 -4 30 14 q8 18 -6 28 q-14 10 -8 26 q6 16 -6 26 q-12 10 -22 -4 q-10 -14 -4 -34 q6 -20 -2 -32 q-8 -12 18 -24 Z" />
          {/* Ásia / Oceania */}
          <path d="M212 108 q22 6 24 26 q2 20 -14 26 q-16 6 -12 22 q4 16 -10 18 q-14 2 -16 -16 q-2 -18 8 -32 q10 -14 8 -28 q-2 -14 12 -16 Z" />
          <ellipse cx="234" cy="216" rx="17" ry="11" />
          <ellipse cx="196" cy="240" rx="9" ry="6" />
        </g>

        {/* Brilho */}
        <circle cx="160" cy="160" r="126" fill="url(#globo-brilho)" />
      </g>

      {/* Contorno */}
      <circle
        cx="160"
        cy="160"
        r="126"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />

      {/* Órbita */}
      <ellipse
        cx="160"
        cy="160"
        rx="150"
        ry="56"
        fill="none"
        stroke="#F2277E"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="7 9"
        transform="rotate(-24 160 160)"
      />
      <circle cx="288" cy="98" r="7" fill="#F2277E" />
      <circle cx="40" cy="228" r="5" fill="#F7E455" stroke="#111111" strokeOpacity="0.3" />
    </svg>
  );
}
