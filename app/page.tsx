import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import PaisesVisitados from "@/components/PaisesVisitados";
import ComoViajar from "@/components/ComoViajar";
import Carrossel from "@/components/Carrossel";
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
        {/* ComoViajar traz as abas e o formulário lado a lado */}
        <ComoViajar />
        <Carrossel />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
