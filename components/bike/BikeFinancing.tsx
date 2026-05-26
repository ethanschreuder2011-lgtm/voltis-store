"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import type { BikePageData } from "@/lib/bikeData";

export function BikeFinancing({ bike }: { bike: BikePageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { months, apr, monthly, down } = bike.financing;
  const total = (monthly * months + down).toLocaleString();

  const breakdownItems = [
    { label: "Down Payment", value: `$${down.toLocaleString()}` },
    { label: "Loan Term", value: `${months} months` },
    { label: "APR", value: apr },
    { label: "Est. Total Cost", value: `$${total}` },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-black py-24 md:py-32 px-6 md:px-10 overflow-hidden border-t border-white/[0.04]"
    >
      <div
        className="absolute bottom-0 left-0 w-[50vw] h-[50vh] blur-[160px] rounded-full pointer-events-none"
        style={{ background: bike.glowColor, opacity: 0.45 }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <SectionEyebrow>Financing</SectionEyebrow>
          <SectionHeading>
            Ride Now,{" "}
            <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
              Pay Over Time
            </span>
          </SectionHeading>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-5 lg:gap-8 items-start">
          <motion.div
            variants={stagger(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 md:p-10"
          >
            <div className={`absolute inset-x-0 top-0 h-48 bg-gradient-to-b ${bike.accentFrom} to-transparent pointer-events-none`} />

            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500 mb-6">
                Estimated Monthly Payment
              </p>

              <div className="flex items-baseline gap-2">
                <span className={`text-6xl md:text-7xl font-black bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                  ${monthly}
                </span>
                <span className="text-gray-500 text-sm">/mo</span>
              </div>

              <p className="mt-3 text-[12px] text-gray-600">
                {months}-month term · {apr} APR · ${down.toLocaleString()} down
              </p>

              <div className="mt-10 flex flex-col gap-3">
                <PrimaryButton className="w-full py-4 rounded-2xl text-sm">
                  Apply for Financing
                </PrimaryButton>
                <GhostButton className="w-full py-4 rounded-2xl text-sm">
                  Check Your Rate →
                </GhostButton>
              </div>

              <p className="mt-6 text-[10px] text-gray-600 leading-relaxed text-center">
                Rates based on approved credit. Financing provided by Voltis Emoto Finance Partners.
                Not all applicants will qualify.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-5">
            <motion.div
              variants={stagger(1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl"
            >
              <div className="px-7 py-5 border-b border-white/[0.07]">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-semibold">
                  Payment Breakdown
                </p>
              </div>
              <div className="px-7 py-2">
                {breakdownItems.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between py-4 ${
                      i < breakdownItems.length - 1 ? "border-b border-white/[0.05]" : ""
                    }`}
                  >
                    <span className="text-[12px] text-gray-500 uppercase tracking-wider">{item.label}</span>
                    <span className="text-sm text-white font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={stagger(2)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-7 flex gap-5 items-start"
            >
              <div className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${bike.tagColor}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Got a bike to trade?</p>
                <p className="mt-1 text-[13px] text-gray-400 leading-relaxed">
                  We accept trade-ins on most electric and gas-powered bikes. Get an instant
                  quote and apply the value toward your new Voltis.
                </p>
                <button className="mt-3 text-[12px] font-semibold underline underline-offset-4 text-gray-300 hover:text-white transition-colors duration-200">
                  Get Trade-In Value →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
