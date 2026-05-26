import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturedBikesSection } from "@/components/sections/FeaturedBikesSection";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <FeaturedBikesSection />
      <SpecsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
