import Link from "next/link";
import PreviaGuia from "@/components/PreviaGuia";
import { guias, guiaEmBreve, type Guia } from "@/data/guias";

// Campo de cor da capa de cada guia. FOTO: quando a Bruna mandar a foto da capa
// (horizontal, 4:3), ela entra no lugar deste campo, mantendo a legenda.
const CAPA: Record<Guia["cor"], string> = {
  rosa: "bg-rosa text-white",
  manteiga: "bg-manteiga text-grafite",
  parisLondres: "bg-rosa text-white",
};

function Capa({ guia }: { guia: Guia }) {
  return (
    <div className={`relative aspect-[2/1] lg:aspect-[4/3] rounded-2xl overflow-hidden ${CAPA[guia.cor]}`}>
      {/* Paris e Londres: metade de cada cor, como no botão */}
      {guia.cor === "parisLondres" && (
        <span aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-londres" />
      )}
      <span className="absolute left-5 bottom-4 lg:left-7 lg:bottom-6 font-display font-bold text-[1.875rem] lg:text-[2.75rem] leading-[1.06] tracking-[-0.02em] max-w-[12ch]">
        {guia.etiquetaFoto}
      </span>
    </div>
  );
}

function BotaoGuia({ guia }: { guia: Guia }) {
  if (guia.cor === "parisLondres") {
    return (
      <Link href={guia.href} className="botao botao-rosa relative overflow-hidden">
        <span aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-londres" />
        <span className="relative">quero esse guia →</span>
      </Link>
    );
  }
  return (
    <Link href={guia.href} className="botao botao-rosa">
      quero esse guia →
    </Link>
  );
}

export default function Carrossel() {
  return (
    <section
      id="roteiros"
      aria-labelledby="titulo-roteiros"
      className="scroll-mt-6 py-24 lg:py-40 lg:px-12"
    >
      {/* Cabeçalho + prévia do guia */}
      <div className="grid lg:grid-cols-12 gap-10 items-center px-1 lg:px-0">
        <h2
          id="titulo-roteiros"
          data-reveal
          className="lg:col-span-6 font-display font-bold text-grafite text-[1.875rem] lg:text-[2.75rem] leading-[1.06] tracking-[-0.02em]"
        >
          Escrevi cada página.
          <br />
          Você recebe assim.
        </h2>

        <figure data-reveal className="lg:col-span-6 flex flex-col items-center gap-5">
          <PreviaGuia plano />
          <figcaption className="font-jakarta text-cinza text-sm">
            prévia real do que você recebe
          </figcaption>
        </figure>
      </div>

      {/* Um guia por linha, capa alternando de lado */}
      <ul className="mt-20 lg:mt-28 space-y-16 lg:space-y-24">
        {guias.map((guia, i) => (
          <li key={guia.id} className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div data-reveal className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2 lg:col-start-7" : ""}`}>
              <Capa guia={guia} />
            </div>

            <div
              data-reveal
              className={`lg:col-span-5 px-1 lg:px-0 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}
            >
              <h3 className="font-display font-bold text-grafite text-[1.875rem] lg:text-[2.75rem] leading-[1.06] tracking-[-0.02em]">
                <Link href={guia.href} className="hover:text-rosaDeep transition-colors duration-200">
                  {guia.titulo}
                </Link>
              </h3>
              <p className="font-jakarta text-[1.0625rem] mt-2">
                <span className="font-semibold text-rosaDeep">{guia.badge}</span>
                <span className="text-cinza"> · {guia.subtitulo}</span>
              </p>
              <p className="font-jakarta text-grafite text-[1.0625rem] leading-[1.6] mt-4 max-w-[40ch]">
                {guia.transformacao}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-7">
                <p className="flex items-baseline gap-3">
                  {guia.precoRiscado && (
                    <span className="font-num text-cinza text-[1.0625rem] line-through tabular-nums">
                      {guia.precoRiscado}
                    </span>
                  )}
                  <span className="font-num font-bold text-grafite text-[1.875rem] tabular-nums">
                    {guia.preco}
                  </span>
                </p>
                <BotaoGuia guia={guia} />
              </div>
            </div>
          </li>
        ))}

        {/* Próximo guia, ainda sem página */}
        <li data-reveal className="bg-creme2 rounded-2xl px-5 py-8 lg:px-10 lg:py-10 flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-6">
          <h3 className="font-display font-bold text-grafite text-[1.25rem]">
            {guiaEmBreve.titulo}
          </h3>
          <p className="font-jakarta text-cinza text-[1.0625rem]">
            {guiaEmBreve.badge} · {guiaEmBreve.subtitulo}. {guiaEmBreve.transformacao}
          </p>
        </li>
      </ul>
    </section>
  );
}
