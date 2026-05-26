import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BikeHeroFuturistic } from "@/components/bike/BikeHeroFuturistic";
import { BikeStats } from "@/components/bike/BikeStats";
import { BikeGallery } from "@/components/bike/BikeGallery";
import { BikeFeatures } from "@/components/bike/BikeFeatures";
import { BikeSpecs } from "@/components/bike/BikeSpecs";
import { BikeFinancing } from "@/components/bike/BikeFinancing";
import { BikeFAQ } from "@/components/bike/BikeFAQ";
import { BikeBottomCTA } from "@/components/bike/BikeBottomCTA";
import type { BikePageData } from "@/lib/bikeData";

// Arctic Leopard identity: futuristic, clean, technical, ice blue
export function BikeTemplateArcticLeopard({ bike }: { bike: BikePageData }) {
  return (
    <main className="bg-[#050508] text-white min-h-screen overflow-hidden">
      {/* Thin ice-blue top line */}
      <div className="fixed top-0 left-0 right-0 h-px z-50 bg-gradient-to-r from-transparent via-sky-400/20 to-transparent pointer-events-none" />

      <Navbar />
      <BikeHeroFuturistic bike={bike} />
      <BikeStats bike={bike} />
      <BikeSpecs bike={bike} />
      <BikeFeatures bike={bike} />
      <BikeGallery bike={bike} />
      <BikeFinancing bike={bike} />
      <BikeFAQ bike={bike} />
      <BikeBottomCTA bike={bike} />
      <Footer />
    </main>
  );
}
