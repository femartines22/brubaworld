import FormularioLead from "@/components/FormularioLead";
import { guias } from "@/data/guias";

// Os dois jeitos de viajar, lado a lado em dois campos de cor que se encostam.
// O sob medida ocupa o campo maior e traz o formulário sempre à vista (é a única
// entrada de leads; esconder atrás de um clique já derrubou conversão).
export default function ComoViajar() {
  return (
    <section
      id="como-viajar"
      aria-labelledby="titulo-como-viajar"
      className="scroll-mt-6 py-24 lg:py-40"
    >
      <h2
        id="titulo-como-viajar"
        data-reveal
        className="font-display font-bold text-grafite text-[1.875rem] lg:text-[2.75rem] leading-[1.06] tracking-[-0.02em] px-1 lg:px-12 mb-10 lg:mb-14"
      >
        Dois jeitos de viajar com a Bruba.
      </h2>

      <div className="grid lg:grid-cols-12 rounded-2xl overflow-hidden">
        {/* Sob medida: campo maior, primeiro no celular */}
        <div
          id="painel-sob-medida"
          className="lg:order-2 lg:col-span-7 bg-rosaTint px-5 py-12 lg:p-16"
        >
          <h3
            data-reveal
            className="font-display font-bold text-grafite text-[1.25rem] lg:text-[1.875rem] leading-[1.1] tracking-[-0.015em]"
          >
            Roteiro pras suas datas, do seu jeito.
          </h3>
          <p
            data-reveal
            className="font-jakarta font-semibold text-rosaDeep text-[1.0625rem] mt-3"
          >
            construído do zero, só pra você
          </p>
          <p
            data-reveal
            className="font-jakarta text-grafite text-[1.0625rem] leading-[1.6] mt-3 max-w-[46ch]"
          >
            Você me conta os seus planos e eu monto o roteiro com você, com
            acompanhamento direto pelo WhatsApp até fechar tudo certinho.
          </p>

          <div
            id="form-personalizado"
            data-reveal
            className="scroll-mt-6 mt-10"
          >
            <FormularioLead />
          </div>

          {/* WHATSAPP: quando o número da Bruna chegar, o botão com mensagem pronta (wa.me) entra aqui, logo abaixo do formulário. */}
        </div>

        {/* Guias prontos: campo menor, com a lista e o preço de cada guia */}
        <div className="lg:order-1 lg:col-span-5 bg-manteigaClara px-5 py-12 lg:p-16">
          {/* No computador o conteúdo acompanha a rolagem, ao lado do formulário (que é mais alto) */}
          <div className="lg:sticky lg:top-16">
            <h3
              data-reveal
              className="font-display font-bold text-grafite text-[1.25rem] lg:text-[1.875rem] leading-[1.1] tracking-[-0.015em]"
            >
              Guia fechado, pro destino que eu já domino.
            </h3>
            <p
              data-reveal
              className="font-jakarta font-semibold text-grafite text-[1.0625rem] mt-3"
            >
              já escritos, testados por mim
            </p>
            <p
              data-reveal
              className="font-jakarta text-grafite text-[1.0625rem] leading-[1.6] mt-3 max-w-[40ch]"
            >
              Você recebe na hora e segue o passo a passo já testado. Ideal pra
              quem quer partir logo, sem depender de troca de mensagem.
            </p>

            <ul data-reveal className="mt-10 space-y-2">
              {guias.map((g) => (
                <li key={g.id}>
                  <a
                    href={g.href}
                    className="group flex items-baseline justify-between gap-4 rounded-lg px-4 py-3.5 -mx-4 hover:bg-manteiga/60 transition-colors duration-200"
                  >
                    <span className="font-display font-bold text-grafite text-[1.25rem] leading-tight group-hover:translate-x-1 transition-transform duration-200">
                      {g.titulo}
                    </span>
                    <span className="font-num font-semibold text-grafite text-[1.0625rem] tabular-nums whitespace-nowrap">
                      {g.preco}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a data-reveal href="#roteiros" className="botao botao-tinta mt-8">
              ver guias →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
