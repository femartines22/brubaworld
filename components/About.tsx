import { paisesVisitados } from "@/data/paisesVisitados";
import Bandeira from "@/components/Bandeira";

// Carta da Bruba, na coluna de leitura ao lado da foto.
export default function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="titulo-sobre"
      className="scroll-mt-6 px-1 lg:px-12 py-24 lg:py-40"
    >
      <div className="max-w-[34rem]">
        <h2
          id="titulo-sobre"
          data-reveal
          className="font-display font-bold text-grafite text-[1.875rem] lg:text-[2.75rem] leading-[1.06] tracking-[-0.02em]"
        >
          Oi, eu sou a Bruba.
        </h2>

        <p data-reveal className="font-jakarta text-grafite text-[1.0625rem] lg:text-[1.25rem] leading-[1.6] mt-7">
          Escrevo cada roteiro com a minha própria mão, só pra lugares onde eu já pisei de
          verdade. Hoje meu forte é Paris: já voltei várias vezes, testei tudo de novo, e
          conheço a cidade de um jeito que só dá pra conhecer assim.
        </p>

        <blockquote
          data-reveal
          className="font-display font-semibold text-rosaDeep text-[1.25rem] lg:text-[1.875rem] leading-[1.25] tracking-[-0.01em] mt-10"
        >
          <p>&ldquo;Eu já fui. Eu já testei. E recomendo só o que realmente vale a pena.&rdquo;</p>
        </blockquote>

        <p data-reveal className="font-script italic text-grafite text-[1.875rem] mt-8 leading-none">
          Bruba
        </p>

        <div data-reveal className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-8">
          <span className="font-jakarta text-grafite text-[1.0625rem]">
            <span className="font-num font-semibold">{paisesVisitados.length}</span> países
            visitados
          </span>
          <span
            className="inline-flex items-center gap-2"
            title="Português, francês e inglês"
          >
            <Bandeira pais="Brasil" className="w-6 h-4" />
            <Bandeira pais="França" className="w-6 h-4" />
            <Bandeira pais="Reino Unido" className="w-6 h-4" />
          </span>
        </div>
      </div>
    </section>
  );
}
