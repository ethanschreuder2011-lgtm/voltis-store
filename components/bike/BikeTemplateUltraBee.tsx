import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BikeHeroAggressive } from "@/components/bike/BikeHeroAggressive";
import { BikeStats } from "@/components/bike/BikeStats";
import { BikeGallery } from "@/components/bike/BikeGallery";
import { BikeFeatures } from "@/components/bike/BikeFeatures";
import { BikeSpecs } from "@/components/bike/BikeSpecs";
import { BikeFinancing } from "@/components/bike/BikeFinancing";
import { BikeFAQ } from "@/components/bike/BikeFAQ";
import { BikeBottomCTA } from "@/components/bike/BikeBottomCTA";
import type { BikePageData } from "@/lib/bikeData";

// Ultra Bee identity: aggressive performance, orange/red, high-energy
export function BikeTemplateUltraBee({ bike }: { bike: BikePageData }) {
  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      {/* Orange top accent bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent pointer-events-none" />

      <Navbar />
      <BikeHeroAggressive bike={bike} />
      {/* Performance stats first — lead with the numbers */}
      <BikeStats bike={bike} />
      <BikeFeatures bike={bike} />
      <BikeSpecs bike={bike} />
      <BikeGallery bike={bike} />
      <BikeFinancing bike={bike} />
      <BikeFAQ bike={bike} />
      <BikeBottomCTA bike={bike} />
      <Footer />
    </main>
  );
}
