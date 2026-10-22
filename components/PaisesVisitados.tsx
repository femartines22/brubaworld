import {
  paisesVisitados,
  paisesPorContinente,
  paisDestaque,
  legendaDestaque,
} from "@/data/paisesVisitados";
import Bandeira from "@/components/Bandeira";

// Estrela do país em destaque, desenhada (o caractere ★ vira emoji em alguns sistemas).
function Estrela() {
  return (
    <svg viewBox="0 0 16 16" className="inline-block w-[0.85em] h-[0.85em] align-[-0.05em]" aria-hidden="true">
      <path d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.5l-4.2 2.3 1-4.6L1.3 6l4.7-.5z" fill="currentColor" />
    </svg>
  );
}

// Países visitados, em folha única como um cardápio impresso: continente, contagem, países.
export default function PaisesVisitados() {
  return (
    <section
      id="paises"
      aria-labelledby="titulo-paises"
      className="scroll-mt-6 bg-white rounded-2xl px-5 py-12 lg:px-12 lg:py-16"
    >
      <h2
        id="titulo-paises"
        data-reveal
        className="font-display font-bold text-grafite text-[1.875rem] lg:text-[2.75rem] leading-[1.06] tracking-[-0.02em] max-w-[18ch]"
      >
        Os países que eu já vivi de perto.
      </h2>

      <div data-reveal className="flex items-end gap-5 mt-9">
        <span className="font-num font-bold text-rosa text-[4.5rem] lg:text-[6rem] leading-[0.8] tracking-[-0.03em]">
          {paisesVisitados.length}
        </span>
        <span className="font-jakarta text-grafite text-[1.0625rem] leading-snug pb-1">
          países visitados de perto,
          <br />
          testando cada canto
        </span>
      </div>

      <p data-reveal className="font-jakarta text-grafite text-[1.0625rem] leading-[1.6] mt-7 max-w-[46ch]">
        Eu conheço os {paisesVisitados.length} e posso te orientar na sua viagem, com dica de
        quem já esteve lá.
      </p>

      <div className="mt-12 space-y-10">
        {paisesPorContinente.map((grupo) => (
          <div key={grupo.continente} data-reveal>
            <div className="flex items-baseline justify-between gap-4 bg-creme rounded-lg px-4 py-2.5">
              <h3 className="font-display font-bold text-grafite text-[1.25rem]">
                {grupo.continente}
              </h3>
              <span className="font-num font-semibold text-rosaDeep text-[1.25rem] tabular-nums">
                {grupo.paises.length}
              </span>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 mt-5 px-1">
              {grupo.paises.map((pais) => {
                const destaque = pais === paisDestaque;
                return (
                  <li
                    key={pais}
                    className={`flex items-center gap-2 font-jakarta text-[1.0625rem] ${
                      destaque ? "font-semibold text-rosaDeep" : "text-grafite"
                    }`}
                  >
                    <Bandeira pais={pais} className="w-6 h-4 shrink-0" />
                    <span>
                      {pais}
                      {destaque && (
                        <>
                          {" "}
                          <Estrela />
                        </>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>

            {grupo.paises.includes(paisDestaque) && (
              <p className="font-jakarta text-cinza text-sm mt-4 px-1">
                <span className="text-rosaDeep">
                  <Estrela />
                </span>{" "}
                {legendaDestaque}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
