"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GhostButton } from "@/components/ui/Button";
import { ReservationModal } from "./ReservationModal";
import { ShopifyCheckoutButton } from "./ShopifyCheckoutButton";
import { fadeUp } from "@/lib/animations";
import type { BikePageData } from "@/lib/bikeData";

export function BikeBottomCTA({ bike }: { bike: BikePageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <>
      <ReservationModal bike={bike} isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />

      <section
        ref={ref}
        className="relative bg-black py-20 md:py-28 px-6 md:px-10 overflow-hidden"
      >
        {/* Accent top line */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}35, transparent)` }}
        />

        {/* Central glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[50vh] blur-[150px] rounded-full pointer-events-none"
          style={{ background: bike.glowColor, opacity: 0.45 }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[10px] uppercase tracking-[0.4em] font-bold mb-5"
            style={{ color: `${bike.accentHex}80` }}
          >
            {bike.tag} · Voltis Emoto
          </motion.p>

          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl md:text-5xl font-black tracking-tight leading-tight"
          >
            {bike.isPreOrder ? (
              <>
                Reserve the{" "}
                <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                  {bike.name}
                </span>
              </>
            ) : (
              <>
                Ready to Ride the{" "}
                <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                  {bike.name}?
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-4 text-[13px] text-gray-600 leading-relaxed max-w-sm mx-auto"
          >
            {bike.isPreOrder
              ? `Estimated delivery ${bike.deliveryEta}. Secure your allocation online today — limited production run.`
              : `Starting at $${bike.price.toLocaleString()} AUD. Free shipping. 30-day returns.`}
          </motion.p>

          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-stretch sm:items-center"
          >
            {bike.isPreOrder ? (
              <>
                <ShopifyCheckoutButton
                  shopifyHandle={bike.shopifyHandle}
                  shopifyCartUrl={bike.shopifyCartUrl}
                  className="bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all duration-200 font-semibold tracking-wide shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] px-7 sm:px-10 py-4 rounded-full text-sm w-full sm:w-auto"
                >
                  Pre-Order Now
                </ShopifyCheckoutButton>
                <GhostButton onClick={() => setReservationOpen(true)} className="px-7 sm:px-10 py-4 rounded-full text-sm w-full sm:w-auto">
                  Reserve &amp; Pay on Pickup
                </GhostButton>
              </>
            ) : (
              <>
                <ShopifyCheckoutButton
                  shopifyHandle={bike.shopifyHandle}
                  shopifyCartUrl={bike.shopifyCartUrl}
                  className="bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all duration-200 font-semibold tracking-wide shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] px-7 sm:px-10 py-4 rounded-full text-sm w-full sm:w-auto"
                >
                  Buy Now
                </ShopifyCheckoutButton>
                <GhostButton onClick={() => setReservationOpen(true)} className="px-7 sm:px-10 py-4 rounded-full text-sm w-full sm:w-auto">
                  Reserve &amp; Pay on Pickup
                </GhostButton>
              </>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp(0.4)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            {bike.isPreOrder ? (
              [
                { icon: "🔒", label: "Price Guaranteed" },
                { icon: "✅", label: "Inspect Before Payment" },
                { icon: "🛡️", label: "2-Year Warranty" },
                { icon: "📦", label: "Priority Shipping" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                  <span className="text-sm">{badge.icon}</span>
                  {badge.label}
                </div>
              ))
            ) : (
              [
                { icon: "🚚", label: "Free Shipping" },
                { icon: "🔄", label: "30-Day Returns" },
                { icon: "🛡️", label: "2-Year Warranty" },
                { icon: "💬", label: "24/7 Support" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                  <span className="text-sm">{badge.icon}</span>
                  {badge.label}
                </div>
              ))
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
