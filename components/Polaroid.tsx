import Image from "next/image";

type Props = {
  /** FOTO: imagem de viagem, quadrada. Quando vazio, mostra o gradiente de placeholder. */
  src?: string;
  legenda: string;
  etiqueta: string;
  /** Rotação em graus. Use valores pequenos, entre -6 e 6. */
  rotacao?: number;
  /** Gradiente do placeholder, no estilo golden hour. */
  gradiente?: string;
  className?: string;
};

export default function Polaroid({
  src,
  legenda,
  etiqueta,
  rotacao = 0,
  gradiente = "linear-gradient(160deg, #F6C9A8 0%, #E9A48C 55%, #C98BA0 100%)",
  className = "",
}: Props) {
  return (
    <figure
      className={`bg-white p-3 pb-2 rounded-sm shadow-[0_18px_40px_-24px_rgba(43,43,43,0.5)] ${className}`}
      style={{ transform: `rotate(${rotacao}deg)` }}
    >
      <div className="relative aspect-square overflow-hidden" style={{ background: gradiente }}>
        {src ? (
          <Image
            src={src}
            alt={legenda}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            {/* Grão sutil para o placeholder não parecer quebrado */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 bg-grafite/55 text-white/90 font-jakarta font-medium text-[9px] uppercase tracking-[0.12em] px-2 py-1 rounded-full backdrop-blur-sm">
              {etiqueta}
            </span>
          </>
        )}
      </div>
      <figcaption className="font-script italic text-grafite/70 text-sm text-center pt-2">
        {legenda}
      </figcaption>
    </figure>
  );
}
