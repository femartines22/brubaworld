import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CoreFeatures from "@/components/CoreFeatures";
import Packages from "@/components/Packages";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
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
        <CoreFeatures />
        <Packages />
        <HowItWorks />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
