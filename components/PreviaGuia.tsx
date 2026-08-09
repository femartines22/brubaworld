/**
 * Prévia visual do guia: capa central com duas páginas internas abertas em leque.
 *
 * Todos os deslocamentos são proporcionais à variável --capa (definida com
 * clamp), nunca em pixel fixo. Com offset fixo, a página da esquerda saía da
 * viewport em telas de ~375px.
 */
export default function PreviaGuia() {
  return (
    <div
      className="relative mx-auto flex items-end justify-center"
      style={
        {
          // largura da capa: mínimo 150px, ideal 38% da largura da tela, máximo 210px
          "--capa": "clamp(150px, 38vw, 210px)",
          width: "calc(var(--capa) * 2.5)",
          height: "calc(var(--capa) * 1.5)",
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* Página da esquerda */}
      <div
        className="absolute bottom-0 bg-white rounded-lg shadow-[0_20px_50px_-30px_rgba(43,43,43,0.55)] origin-bottom-right"
        style={{
          width: "calc(var(--capa) * 0.82)",
          height: "calc(var(--capa) * 1.18)",
          left: "calc(50% - var(--capa) * 1.02)",
          transform: "rotate(-11deg)",
          padding: "calc(var(--capa) * 0.09)",
        }}
      >
        <span
          className="block font-jakarta font-semibold text-rosa uppercase tracking-[0.14em]"
          style={{ fontSize: "calc(var(--capa) * 0.055)" }}
        >
          Dia 01
        </span>
        <div className="mt-2 space-y-1.5">
          {[100, 82, 92, 70, 88, 60].map((w, i) => (
            <span
              key={i}
              className="block bg-grafite/10 rounded-full"
              style={{ width: `${w}%`, height: "calc(var(--capa) * 0.022)" }}
            />
          ))}
        </div>
      </div>

      {/* Página da direita */}
      <div
        className="absolute bottom-0 bg-white rounded-lg shadow-[0_20px_50px_-30px_rgba(43,43,43,0.55)] origin-bottom-left"
        style={{
          width: "calc(var(--capa) * 0.82)",
          height: "calc(var(--capa) * 1.18)",
          left: "calc(50% + var(--capa) * 0.2)",
          transform: "rotate(11deg)",
          padding: "calc(var(--capa) * 0.09)",
        }}
      >
        <span
          className="block font-jakarta font-semibold text-rosa uppercase tracking-[0.14em]"
          style={{ fontSize: "calc(var(--capa) * 0.055)" }}
        >
          Dia 02
        </span>
        <div className="mt-2 space-y-1.5">
          {[90, 100, 74, 86, 64, 80].map((w, i) => (
            <span
              key={i}
              className="block bg-grafite/10 rounded-full"
              style={{ width: `${w}%`, height: "calc(var(--capa) * 0.022)" }}
            />
          ))}
        </div>
      </div>

      {/* Capa, na frente */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center shadow-[0_26px_60px_-28px_rgba(43,43,43,0.6)]"
        style={{
          width: "var(--capa)",
          height: "calc(var(--capa) * 1.42)",
          background: "linear-gradient(165deg, #F3A97F 0%, #EE7E96 52%, #A96FA8 100%)",
          padding: "calc(var(--capa) * 0.1)",
        }}
      >
        <span
          className="font-jakarta font-medium text-white/70 uppercase tracking-[0.22em] leading-relaxed"
          style={{ fontSize: "calc(var(--capa) * 0.05)" }}
        >
          Guia de viagem
        </span>
        <span
          className="font-display font-bold text-white leading-[1.12] mt-2"
          style={{ fontSize: "calc(var(--capa) * 0.145)" }}
        >
          Paris em 5 Dias
        </span>
        <span
          className="font-script italic text-white/85 mt-2"
          style={{ fontSize: "calc(var(--capa) * 0.075)" }}
        >
          by bruba
        </span>
      </div>
    </div>
  );
}
