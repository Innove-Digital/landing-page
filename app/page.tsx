import Nav from "@/components/Nav";
import SkipLink from "@/components/SkipLink";
import WhatsAppButton from "@/components/WhatsAppButton";
import PreviewWatermark from "@/components/PreviewWatermark";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Results from "@/components/Results";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* <PreviewWatermark /> */}
      <SkipLink />
      <Nav />

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-8">
        <Hero />
        <Stats />
        <Services />
        <HowItWorks />
        <Results />
        <FAQ />
        <ContactForm />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
