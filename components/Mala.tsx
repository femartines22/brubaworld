// Mala de viagem decorativa em SVG com a paleta da marca.
// Mesmo idioma visual do Globo: traço fino preto, gradiente amarelo→rosa, formas simplificadas.
export default function Mala({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="Ilustração de uma mala de viagem"
    >
      <defs>
        <linearGradient id="mala-fundo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7E455" />
          <stop offset="100%" stopColor="#F2277E" />
        </linearGradient>
        <radialGradient id="mala-brilho" cx="32%" cy="24%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <clipPath id="mala-recorte">
          <rect x="72" y="104" width="176" height="156" rx="24" />
        </clipPath>
      </defs>

      {/* Halo externo */}
      <circle cx="160" cy="176" r="140" fill="#F2277E" opacity="0.06" />
      <circle cx="160" cy="176" r="126" fill="#F2277E" opacity="0.08" />

      {/* Alça */}
      <path
        d="M126 104 v-18 q0 -14 14 -14 h40 q14 0 14 14 v18"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
      <path
        d="M138 104 v-14 q0 -6 6 -6 h32 q6 0 6 6 v14"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.22"
        strokeWidth="1.6"
      />

      {/* Corpo */}
      <rect x="72" y="104" width="176" height="156" rx="24" fill="url(#mala-fundo)" />

      <g clipPath="url(#mala-recorte)">
        {/* Cintas verticais */}
        <g stroke="#111111" strokeOpacity="0.22" strokeWidth="1.6" fill="none">
          <line x1="112" y1="104" x2="112" y2="260" />
          <line x1="208" y1="104" x2="208" y2="260" />
        </g>
        <rect x="106" y="104" width="12" height="156" fill="#111111" fillOpacity="0.1" />
        <rect x="202" y="104" width="12" height="156" fill="#111111" fillOpacity="0.1" />

        {/* Costura interna */}
        <rect
          x="84"
          y="116"
          width="152"
          height="132"
          rx="16"
          fill="none"
          stroke="#111111"
          strokeOpacity="0.22"
          strokeWidth="1.6"
          strokeDasharray="5 6"
        />

        {/* Adesivos de viagem */}
        <g>
          <circle cx="160" cy="168" r="21" fill="#FAFAF8" fillOpacity="0.85" />
          <circle
            cx="160"
            cy="168"
            r="21"
            fill="none"
            stroke="#111111"
            strokeOpacity="0.3"
            strokeWidth="1.6"
          />
          {/* Aviãozinho do adesivo */}
          <path
            d="M148 172 l24 -10 -10 10 6 6 -4 3 -6 -6 -10 -3 Z"
            fill="#F2277E"
            fillOpacity="0.85"
          />
          <ellipse
            cx="132"
            cy="222"
            rx="15"
            ry="10"
            fill="#F7E455"
            fillOpacity="0.9"
            stroke="#111111"
            strokeOpacity="0.3"
            strokeWidth="1.6"
            transform="rotate(-12 132 222)"
          />
          <rect
            x="182"
            y="128"
            width="30"
            height="18"
            rx="4"
            fill="#FAFAF8"
            fillOpacity="0.8"
            stroke="#111111"
            strokeOpacity="0.26"
            strokeWidth="1.6"
            transform="rotate(8 197 137)"
          />
        </g>

        {/* Brilho */}
        <rect x="72" y="104" width="176" height="156" rx="24" fill="url(#mala-brilho)" />
      </g>

      {/* Fechos */}
      <rect x="120" y="98" width="16" height="12" rx="3" fill="#111111" fillOpacity="0.55" />
      <rect x="184" y="98" width="16" height="12" rx="3" fill="#111111" fillOpacity="0.55" />

      {/* Contorno */}
      <rect
        x="72"
        y="104"
        width="176"
        height="156"
        rx="24"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />

      {/* Pés */}
      <rect x="104" y="260" width="22" height="8" rx="4" fill="#111111" fillOpacity="0.4" />
      <rect x="194" y="260" width="22" height="8" rx="4" fill="#111111" fillOpacity="0.4" />

      {/* Rastro de viagem */}
      <path
        d="M36 292 Q160 274 284 292"
        fill="none"
        stroke="#F2277E"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="7 9"
      />
      <circle cx="284" cy="120" r="7" fill="#F2277E" />
      <circle cx="44" cy="140" r="5" fill="#F7E455" stroke="#111111" strokeOpacity="0.3" />
    </svg>
  );
}
