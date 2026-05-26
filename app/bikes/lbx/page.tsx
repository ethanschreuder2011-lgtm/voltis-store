import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BikePageConfigurator } from "@/components/bike/BikePageConfigurator";
import { BikePreOrderBanner } from "@/components/bike/BikePreOrderBanner";
import { BikeStats } from "@/components/bike/BikeStats";
import { BikeCinematicBanner } from "@/components/bike/BikeCinematicBanner";
import { BikeFeatures } from "@/components/bike/BikeFeatures";
import { BikeDetailSplit } from "@/components/bike/BikeDetailSplit";
import { BikeSpecs } from "@/components/bike/BikeSpecs";
import { BikeImmersive } from "@/components/bike/BikeImmersive";
import { BikeFAQ } from "@/components/bike/BikeFAQ";
import { BikeBottomCTA } from "@/components/bike/BikeBottomCTA";
import { lbxBike } from "@/lib/bikeData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sur-Ron Light Bee — Pre-Order Now | Voltis Emoto",
  description:
    "The Sur-Ron Light Bee. 6kW, 57 kg, 75 km/h. Arriving Q3 2026 — secure your pre-order allocation today.",
};

export default function LBXPage() {
  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      {/* Dynamic top accent bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${lbxBike.accentHex}99, transparent)`,
        }}
      />

      <Navbar />

      {/* 1 — Hero + Gallery (variant-aware configurator) */}
      <BikePageConfigurator bike={lbxBike} />

      {/* 3 — Pre-order: timeline, deposit, perks */}
      <BikePreOrderBanner bike={lbxBike} />

      {/* 4 — Performance stats */}
      <BikeStats bike={lbxBike} />

      {/* 5 — Cinematic banner: action-1.jpg */}
      <BikeCinematicBanner bike={lbxBike} />

      {/* 6 — Technology features */}
      <BikeFeatures bike={lbxBike} />

      {/* 7 — Detail split: frame.jpg + wheels.jpg */}
      <BikeDetailSplit bike={lbxBike} />

      {/* 8 — Full spec sheets */}
      <BikeSpecs bike={lbxBike} />

      {/* 9 — Immersive: action-2.jpg */}
      <BikeImmersive bike={lbxBike} />

      {/* 10 — FAQ */}
      <BikeFAQ bike={lbxBike} />

      {/* 11 — Bottom CTA */}
      <BikeBottomCTA bike={lbxBike} />

      <Footer />
    </main>
  );
}
