// Passaporte aberto decorativo em SVG com a paleta da marca.
// Mesmo idioma visual do Globo: traço fino preto, gradiente amarelo→rosa, formas simplificadas.
export default function Passaporte({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="Ilustração de um passaporte aberto com carimbos"
    >
      <defs>
        <linearGradient id="passaporte-capa" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7E455" />
          <stop offset="100%" stopColor="#F2277E" />
        </linearGradient>
        <radialGradient id="passaporte-brilho" cx="30%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <clipPath id="passaporte-recorte">
          <path d="M52 96 q54 -18 108 0 q54 18 108 0 v136 q-54 18 -108 0 q-54 -18 -108 0 Z" />
        </clipPath>
      </defs>

      {/* Halo externo */}
      <circle cx="160" cy="164" r="140" fill="#F2277E" opacity="0.06" />
      <circle cx="160" cy="164" r="126" fill="#F2277E" opacity="0.08" />

      {/* Capa (fundo, levemente maior que as páginas) */}
      <path
        d="M46 90 q57 -20 114 0 q57 20 114 0 v148 q-57 20 -114 0 q-57 -20 -114 0 Z"
        fill="url(#passaporte-capa)"
      />

      {/* Páginas abertas */}
      <path
        d="M52 96 q54 -18 108 0 q54 18 108 0 v136 q-54 18 -108 0 q-54 -18 -108 0 Z"
        fill="#FAFAF8"
      />

      <g clipPath="url(#passaporte-recorte)">
        {/* Vinco central */}
        <line
          x1="160"
          y1="88"
          x2="160"
          y2="248"
          stroke="#111111"
          strokeOpacity="0.22"
          strokeWidth="1.6"
        />

        {/* Linhas de texto — página esquerda */}
        <g stroke="#111111" strokeOpacity="0.22" strokeWidth="1.6" fill="none">
          <line x1="72" y1="188" x2="140" y2="196" />
          <line x1="72" y1="202" x2="128" y2="209" />
          <line x1="72" y1="216" x2="136" y2="223" />
        </g>

        {/* Foto — página esquerda */}
        <rect
          x="72"
          y="118"
          width="42"
          height="52"
          rx="6"
          fill="#F7E455"
          fillOpacity="0.7"
          stroke="#111111"
          strokeOpacity="0.3"
          strokeWidth="1.6"
          transform="rotate(-4 93 144)"
        />
        <circle cx="92" cy="138" r="9" fill="#111111" fillOpacity="0.35" />
        <path
          d="M80 162 q13 -12 26 0"
          fill="#111111"
          fillOpacity="0.35"
        />

        {/* Carimbo redondo — página direita */}
        <g transform="rotate(-14 216 148)">
          <circle
            cx="216"
            cy="148"
            r="27"
            fill="none"
            stroke="#F2277E"
            strokeOpacity="0.75"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <circle
            cx="216"
            cy="148"
            r="19"
            fill="none"
            stroke="#F2277E"
            strokeOpacity="0.6"
            strokeWidth="1.6"
          />
          {/* Aviãozinho do carimbo */}
          <path
            d="M204 152 l24 -10 -10 10 6 6 -4 3 -6 -6 -10 -3 Z"
            fill="#F2277E"
            fillOpacity="0.75"
          />
        </g>

        {/* Carimbo retangular — página direita */}
        <rect
          x="188"
          y="192"
          width="58"
          height="26"
          rx="5"
          fill="none"
          stroke="#111111"
          strokeOpacity="0.35"
          strokeWidth="1.6"
          transform="rotate(6 217 205)"
        />
        <line
          x1="196"
          y1="203"
          x2="238"
          y2="208"
          stroke="#111111"
          strokeOpacity="0.28"
          strokeWidth="1.6"
        />

        {/* Brilho */}
        <path
          d="M52 96 q54 -18 108 0 q54 18 108 0 v136 q-54 18 -108 0 q-54 -18 -108 0 Z"
          fill="url(#passaporte-brilho)"
        />
      </g>

      {/* Contorno das páginas */}
      <path
        d="M52 96 q54 -18 108 0 q54 18 108 0 v136 q-54 18 -108 0 q-54 -18 -108 0 Z"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />

      {/* Rota pontilhada com destino */}
      <path
        d="M48 60 Q160 30 272 60"
        fill="none"
        stroke="#F2277E"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="7 9"
      />
      <circle cx="272" cy="60" r="7" fill="#F2277E" />
      <circle cx="48" cy="272" r="5" fill="#F7E455" stroke="#111111" strokeOpacity="0.3" />
    </svg>
  );
}
