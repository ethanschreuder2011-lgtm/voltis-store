import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BikePageConfigurator } from "@/components/bike/BikePageConfigurator";
import { BikeStats } from "@/components/bike/BikeStats";
import { BikeCinematicBanner } from "@/components/bike/BikeCinematicBanner";
import { BikeFeatures } from "@/components/bike/BikeFeatures";
import { BikeDetailSplit } from "@/components/bike/BikeDetailSplit";
import { BikeSpecs } from "@/components/bike/BikeSpecs";
import { BikeImmersive } from "@/components/bike/BikeImmersive";
import { BikeFAQ } from "@/components/bike/BikeFAQ";
import { BikeBottomCTA } from "@/components/bike/BikeBottomCTA";
import type { BikePageData } from "@/lib/bikeData";

export function BikePageTemplate({ bike }: { bike: BikePageData }) {
  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      {/* Dynamic top accent bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${bike.accentHex}99, transparent)`,
        }}
      />

      <Navbar />

      {/* 1 — Hero + Gallery (variant-aware configurator) */}
      <BikePageConfigurator bike={bike} />

      {/* 3 — Performance stats */}
      <BikeStats bike={bike} />

      {/* 4 — Cinematic action banner: action-1.jpg (Ultra Bee only) */}
      <BikeCinematicBanner bike={bike} />

      {/* 5 — Technology features */}
      <BikeFeatures bike={bike} />

      {/* 6 — Component detail split: suspension.jpg + wheels.jpg (Ultra Bee only) */}
      <BikeDetailSplit bike={bike} />

      {/* 7 — Technical specs with specsVisual header: specs.jpg (Ultra Bee only) */}
      <BikeSpecs bike={bike} />

      {/* 8 — Immersive riding section: action-2.jpg (Ultra Bee only) */}
      <BikeImmersive bike={bike} />

      {/* 9 — FAQ */}
      <BikeFAQ bike={bike} />

      {/* 10 — Bottom CTA */}
      <BikeBottomCTA bike={bike} />

      <Footer />
    </main>
  );
}
