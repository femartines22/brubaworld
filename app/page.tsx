import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import CoreFeatures from "@/components/CoreFeatures";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import Reviews from "@/components/Reviews";
import ContactForm from "@/components/ContactForm";
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
        <CoreFeatures />
        <HowItWorks />
        <Packages />
        <Reviews />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
