import LoadingPage from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";

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
     <section>
        {/* Additional sections like Events, Highlights, Sponsors can be added here */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">Welcome to Takshashila 2026</h2>
          <p className="text-lg mb-4">
            Join us for an unforgettable experience at Takshashila 2026, the 10th edition of Chennai Institute of Technology's premier cultural festival. Enjoy a variety of events, performances, and activities that celebrate creativity, talent, and culture.
          </p>
          <p className="text-lg">
            Stay tuned for more updates on our exciting lineup of events and special guests!
          </p>
        </div>
      </section>
      <section>
        <div className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
            <p className="text-lg mb-4">
              Whether you're a participant, volunteer, or sponsor, there's a place for you at Takshashila 2026. Reach out to us to learn how you can be part of this grand celebration.
            </p>
            <a href="/contact" className="text-blue-500 underline">Contact Us</a>
          </div>
        </div>
      </section>
      <section>
          <Carousel slides={SLIDES}/>
      </section>
      <section>
        <Footer/>
      </section>
    </>
  );
}