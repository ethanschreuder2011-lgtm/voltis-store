import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BikeHeroLuxury } from "@/components/bike/BikeHeroLuxury";
import { BikeStats } from "@/components/bike/BikeStats";
import { BikeGallery } from "@/components/bike/BikeGallery";
import { BikeFeatures } from "@/components/bike/BikeFeatures";
import { BikeSpecs } from "@/components/bike/BikeSpecs";
import { BikeFinancing } from "@/components/bike/BikeFinancing";
import { BikeFAQ } from "@/components/bike/BikeFAQ";
import { BikeBottomCTA } from "@/components/bike/BikeBottomCTA";
import type { BikePageData } from "@/lib/bikeData";

// Falcon identity: stealth luxury, gold, wide editorial spacing
export function BikeTemplateFalcon({ bike }: { bike: BikePageData }) {
  return (
    <main className="bg-[#080808] text-white min-h-screen overflow-hidden">
      {/* Thin gold top accent */}
      <div className="fixed top-0 left-0 right-0 h-px z-50 bg-gradient-to-r from-transparent via-amber-500/25 to-transparent pointer-events-none" />

      <Navbar />
      <BikeHeroLuxury bike={bike} />
      <BikeStats bike={bike} />
      <BikeFeatures bike={bike} />
      <BikeGallery bike={bike} />
      <BikeSpecs bike={bike} />
      <BikeFinancing bike={bike} />
      <BikeFAQ bike={bike} />
      <BikeBottomCTA bike={bike} />
      <Footer />
    </main>
  );
}
