import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BikeHero } from "@/components/bike/BikeHero";
import { BikeStats } from "@/components/bike/BikeStats";
import { BikeGallery } from "@/components/bike/BikeGallery";
import { BikeFeatures } from "@/components/bike/BikeFeatures";
import { BikeSpecs } from "@/components/bike/BikeSpecs";
import { BikeFinancing } from "@/components/bike/BikeFinancing";
import { BikeFAQ } from "@/components/bike/BikeFAQ";
import { BikeBottomCTA } from "@/components/bike/BikeBottomCTA";
import type { BikePageData } from "@/lib/bikeData";

export function BikeTemplate({ bike }: { bike: BikePageData }) {
  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      <Navbar />
      <BikeHero bike={bike} />
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
