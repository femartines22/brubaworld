import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import PaisesVisitados from "@/components/PaisesVisitados";
import ComoViajar from "@/components/ComoViajar";
import QuizDestino from "@/components/QuizDestino";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <PaisesVisitados />
        {/* ComoViajar traz as abas: Sob Medida (formulário) e Guias Prontos (cards dos guias) */}
        <ComoViajar />
        {/* O resultado do quiz leva de volta pro formulário logo acima */}
        <QuizDestino />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
