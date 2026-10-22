import Palco from "@/components/Palco";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PaisesVisitados from "@/components/PaisesVisitados";
import ComoViajar from "@/components/ComoViajar";
import Carrossel from "@/components/Carrossel";
import Reviews from "@/components/Reviews";
import RodapeHome from "@/components/RodapeHome";
import MotionLayer from "@/components/MotionLayer";

// Esconde as partes que vão entrar com animação só quando há script rodando.
// Se o script da página falhar, tudo aparece sozinho depois de 4 segundos.
const SCRIPT_MOVIMENTO = `document.documentElement.classList.add('js-motion');window.__revealFallback=setTimeout(function(){document.documentElement.classList.add('reveal-all')},4000);`;

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_MOVIMENTO }} />
      <MotionLayer />

      <div className="px-4 lg:px-6">
        <main>
          {/* Palco dividido: a foto da Bruba fica parada de um lado enquanto a
              apresentação, a carta e os países rolam do outro. No celular a foto vem primeiro. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 pt-4 lg:pt-6">
            <Palco className="min-w-0 h-[34svh] lg:order-2 lg:sticky lg:top-6 lg:self-start lg:h-[calc(100svh-48px)]" />

            <div className="min-w-0 lg:order-1">
              <Hero />
              <About />
              <PaisesVisitados />
            </div>
          </div>

          <ComoViajar />
          <Carrossel />
          <Reviews />
        </main>

        <RodapeHome />
      </div>
    </>
  );
}
