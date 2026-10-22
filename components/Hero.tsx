import Listras from "@/components/Listras";

// Cartão de abertura: metade esquerda da tela no computador, ao lado da foto da Bruba.
// No celular vem logo abaixo da foto, subindo 24px por cima dela.
const LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Países", href: "#paises" },
  { label: "Roteiros", href: "#roteiros" },
  { label: "Avaliações", href: "#avaliacoes" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-home"
      className="relative z-10 -mt-6 lg:mt-0 bg-manteigaClara rounded-2xl overflow-hidden flex flex-col lg:min-h-[calc(100svh-48px)]"
    >
      <Listras className="h-10 lg:h-14" />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-7 pb-7 lg:px-12 lg:py-16">
        <p
          className="entrada font-display font-bold text-grafite text-[1.25rem] lg:text-[2.75rem] tracking-[-0.02em] leading-none"
        >
          bruba<span className="font-script italic font-normal text-rosaDeep">world</span>
        </p>

        <h1
          id="titulo-home"
          className="entrada entrada-2 font-display font-bold text-grafite text-[2rem] sm:text-[2.6rem] lg:text-[clamp(2.75rem,4.2vw,4.25rem)] leading-[1.02] tracking-[-0.025em] mt-5 lg:mt-12"
        >
          Roteiros feitos
          <br />
          por quem já viveu.
        </h1>

        <p
          className="entrada entrada-3 font-jakarta text-grafite text-[1.0625rem] lg:text-[1.25rem] leading-[1.55] max-w-[36ch] mt-6"
        >
          Viagens vividas de verdade, direto pra você. Chega de roteiro que serve pra
          qualquer um.
        </p>

        <div
          className="entrada entrada-4 flex flex-col sm:flex-row gap-3 mt-7 lg:mt-9 w-full sm:w-auto"
        >
          <a href="#form-personalizado" className="botao botao-rosa">
            quero um roteiro sob medida
          </a>
          <a href="#roteiros" className="botao botao-tinta">
            ver guias prontos
          </a>
        </div>
      </div>

      <nav aria-label="Seções da página" className="pb-7 lg:pb-8 px-4">
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-sublinhado font-jakarta font-medium text-[1.0625rem] text-grafite">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
