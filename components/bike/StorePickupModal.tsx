"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { BikePageData } from "@/lib/bikeData";

type Props = {
  bike: BikePageData;
  isOpen: boolean;
  onClose: () => void;
};

const STEPS = [
  { num: "01", text: "Select your bike & colour online" },
  { num: "02", text: "Complete your purchase at checkout" },
  { num: "03", text: "We prep, charge & inspect your bike" },
  { num: "04", text: "Collect from our showroom by appointment" },
];

export function StorePickupModal({ bike, isOpen, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pickup-modal-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[100] w-auto md:w-full md:max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-2xl border overflow-hidden"
              style={{ borderColor: `${bike.accentHex}28` }}
            >
              {/* Accent hairline */}
              <div
                className="absolute top-0 inset-x-0 h-[1.5px] pointer-events-none"
                style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}80, transparent)` }}
              />

              {/* Background */}
              <div className="absolute inset-0 bg-[#080808]" />
              <div
                className="absolute top-0 right-0 w-3/4 h-2/3 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 90% 10%, ${bike.accentHex}08, transparent 60%)` }}
              />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-5">
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-[0.45em] font-bold mb-1"
                      style={{ color: bike.accentHex }}
                    >
                      Store Pickup
                    </p>
                    <h2
                      id="pickup-modal-title"
                      className="text-lg font-black tracking-tight text-white leading-snug"
                    >
                      Collect Your {bike.name}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 shrink-0 ml-4 mt-0.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Availability badge */}
                <div className="px-6 mb-5">
                  <div
                    className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl border"
                    style={{ borderColor: `${bike.accentHex}25`, background: `${bike.accentHex}0A` }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                      style={{ background: bike.accentHex, boxShadow: `0 0 6px ${bike.accentHex}` }}
                    />
                    <span className="text-[11px] font-semibold text-white">
                      {bike.isPreOrder ? "Available for Pre-Order" : "In Stock · Ready for Collection"}
                    </span>
                    <span className="ml-auto text-[10px] text-gray-500 shrink-0">1–2 day prep</span>
                  </div>
                </div>

                <div className="h-px bg-white/[0.05] mx-6" />

                {/* How it works */}
                <div className="px-6 py-5">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-4">How It Works</p>
                  <div className="flex flex-col gap-3.5">
                    {STEPS.map(({ num, text }, i) => (
                      <motion.div
                        key={num}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-3.5"
                      >
                        <span
                          className="text-[11px] font-black tabular-nums shrink-0 mt-0.5"
                          style={{ color: `${bike.accentHex}70` }}
                        >
                          {num}
                        </span>
                        <span className="text-[13px] text-gray-300 leading-snug">{text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/[0.05] mx-6" />

                {/* Info grid */}
                <div className="px-6 py-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-gray-600 mb-1.5">Location</p>
                    <p className="text-[12px] font-semibold text-white leading-snug">Voltis Emoto Showroom</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">By appointment · Australia</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-gray-600 mb-1.5">Prep Time</p>
                    <p className="text-[12px] font-semibold text-white leading-snug">1–2 Business Days</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Full inspection included</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="px-6 pb-6 flex flex-col gap-2.5">
                  <Link
                    href="/#contact"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-250 active:scale-[0.97]"
                    style={{
                      background: bike.accentHex,
                      boxShadow: `0 0 28px ${bike.accentHex}35`,
                    }}
                  >
                    Continue to Checkout
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={onClose}
                    className="flex items-center justify-center w-full py-3 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-200 border"
                    style={{
                      color: `${bike.accentHex}90`,
                      borderColor: `${bike.accentHex}20`,
                      background: `${bike.accentHex}08`,
                    }}
                  >
                    Contact Us About Pickup
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
