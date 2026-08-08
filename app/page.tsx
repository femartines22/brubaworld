import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import PaisesVisitados from "@/components/PaisesVisitados";
import Reviews from "@/components/Reviews";
import Carrossel from "@/components/Carrossel";
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
        <Carrossel />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
