"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import type { BikePageData } from "@/lib/bikeData";
import { ShopifyCheckoutButton } from "./ShopifyCheckoutButton";

const PERKS = [
  {
    num: "01",
    title: "Locked-In Pricing",
    body: "Your pre-order price is guaranteed. No increases at delivery — what you see today is what you pay.",
  },
  {
    num: "02",
    title: "Priority Allocation",
    body: "Initial production is limited. Pre-order customers receive first allocation in order of purchase.",
  },
  {
    num: "03",
    title: "Reserve & Inspect Option",
    body: "Not ready to purchase online? Reserve your bike and inspect it in person before completing payment at pickup.",
  },
  {
    num: "04",
    title: "Exclusive Updates",
    body: "Behind-the-scenes build progress and launch event invitations — for pre-order holders only.",
  },
];

const TIMELINE = [
  { label: "Pre-Order Open", detail: "Now",      active: true },
  { label: "Production Begins", detail: "Q1 2026", active: false },
  { label: "Quality Sign-Off",  detail: "Q2 2026", active: false },
  { label: "Shipping Starts",   detail: "Q3 2026", active: false },
];

export function BikePreOrderBanner({ bike }: { bike: BikePageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative bg-black py-16 md:py-24 px-6 md:px-10 overflow-hidden"
    >
      {/* Top accent */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}45, transparent)` }}
      />

      {/* Left edge bar */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-[1px] pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${bike.accentHex}55, transparent)` }}
      />

      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <p
            className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4"
            style={{ color: bike.accentHex }}
          >
            Pre-Order · {bike.deliveryEta ?? "Q3 2026"}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-lg">
              Limited Allocation.{" "}
              <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                Reserve Yours.
              </span>
            </h2>
            <p className="text-[13px] text-gray-500 max-w-[260px] leading-relaxed md:text-right">
              The {bike.name} arrives {bike.deliveryEta ?? "Q3 2026"}. Initial production is limited — secure your position now.
            </p>
          </div>
        </motion.div>

        {/* Main card: timeline + pre-order action */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative rounded-2xl overflow-hidden border mb-5"
          style={{ borderColor: `${bike.accentHex}20` }}
        >
          {/* Accent top edge */}
          <div
            className="absolute top-0 inset-x-0 h-[1.5px] pointer-events-none"
            style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}65, transparent)` }}
          />

          {/* Card background */}
          <div className="absolute inset-0 bg-white/[0.02]" />
          <div
            className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 80% 30%, ${bike.accentHex}07, transparent 65%)` }}
          />

          <div className="relative p-6 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 md:gap-14 items-start">

            {/* Left: Delivery timeline */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-600 mb-7">
                Delivery Timeline
              </p>
              <div className="flex flex-col">
                {TIMELINE.map((step, i) => (
                  <div key={step.label} className="flex items-start gap-4">
                    {/* Dot + connector */}
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5"
                        style={{
                          borderColor: step.active ? bike.accentHex : "rgba(255,255,255,0.12)",
                          background: step.active ? `${bike.accentHex}18` : "transparent",
                        }}
                      >
                        {step.active ? (
                          <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ background: bike.accentHex }}
                          />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                        )}
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div
                          className="w-px mt-1 mb-0"
                          style={{
                            height: "36px",
                            background: step.active
                              ? `linear-gradient(to bottom, ${bike.accentHex}55, rgba(255,255,255,0.06))`
                              : "rgba(255,255,255,0.05)",
                          }}
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div className="pb-9">
                      <p
                        className="text-[12.5px] font-semibold leading-none"
                        style={{ color: step.active ? bike.accentHex : "rgba(255,255,255,0.55)" }}
                      >
                        {step.label}
                      </p>
                      <p className="text-[11px] text-gray-600 mt-1">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pre-order action card */}
            <div
              className="rounded-xl p-6 md:p-8 border shrink-0 w-full md:w-[240px]"
              style={{
                borderColor: `${bike.accentHex}25`,
                background: `linear-gradient(145deg, ${bike.accentHex}09, transparent 70%)`,
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">Secure Your Allocation</p>
              <p className="text-[13px] font-bold text-white/80 mt-2 leading-snug">
                Limited production run — positions are allocated in order of purchase.
              </p>

              <div className="mt-7 flex flex-col gap-2.5">
                {[
                  "Locked-in pre-order price",
                  "Priority delivery position",
                  "Exclusive build updates",
                  "Reserve & inspect option",
                ].map((perk) => (
                  <div key={perk} className="flex items-start gap-2.5">
                    <svg
                      className="w-3.5 h-3.5 mt-[1px] shrink-0"
                      style={{ color: bike.accentHex }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[12px] text-gray-400 leading-snug">{perk}</span>
                  </div>
                ))}
              </div>

              <ShopifyCheckoutButton
                shopifyHandle={bike.shopifyHandle}
                shopifyCartUrl={bike.shopifyCartUrl}
                className="mt-8 w-full py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-250 active:scale-[0.97] hover:brightness-110"
                style={{
                  background: bike.accentHex,
                  color: "white",
                  boxShadow: `0 0 30px ${bike.accentHex}30`,
                }}
              >
                Pre-Order Now
              </ShopifyCheckoutButton>

              <p className="text-[10px] text-gray-700 text-center mt-3 leading-relaxed">
                Or reserve online · inspect &amp; pay at pickup
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4-perk grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {PERKS.map((perk, i) => (
            <motion.div
              key={perk.title}
              variants={stagger(i)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 group hover:-translate-y-0.5 transition-transform duration-300 overflow-hidden"
            >
              {/* Top shimmer on hover */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}40, transparent)` }}
              />

              <span
                className="text-[10px] font-black tracking-widest mb-5 block"
                style={{ color: `${bike.accentHex}55` }}
              >
                {perk.num}
              </span>
              <h3 className="text-[13px] font-bold text-white/90 mb-2 leading-snug">
                {perk.title}
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed">{perk.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
