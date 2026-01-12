import LoadingPage from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";

const SLIDES = [
  { image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop", title: "Retro Tech" },
  { image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", title: "Neon City" },
  { image: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=800&auto=format&fit=crop", title: "Cyber Punk" },
  { image: "https://images.unsplash.com/photo-1518544806308-c8f481c5f39e?q=80&w=800&auto=format&fit=crop", title: "Synthwave" },
  { image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop", title: "Abstract" },
  { image: "https://images.unsplash.com/photo-1620641788427-b9f4dbf278d1?q=80&w=800&auto=format&fit=crop", title: "Future" },
];
export default function Home() {
  return (
    <>
      <LoadingPage />
      <Hero />
      <section id="about">
        <AboutSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <section>
        <Carousel slides={SLIDES} />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}