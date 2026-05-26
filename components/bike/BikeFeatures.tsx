"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { stagger, fadeUp } from "@/lib/animations";
import type { BikePageData } from "@/lib/bikeData";

export function BikeFeatures({ bike }: { bike: BikePageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative bg-black py-14 md:py-20 px-6 md:px-10 overflow-hidden"
    >
      {/* Accent divider */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}25, transparent)` }}
      />

      {/* Glow — top right */}
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vh] blur-[140px] rounded-full pointer-events-none"
        style={{ background: bike.glowColor, opacity: 0.4 }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10"
        >
          <SectionEyebrow color={bike.accentHex}>Technology</SectionEyebrow>
          <SectionHeading>
            What Sets It{" "}
            <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
              Apart
            </span>
          </SectionHeading>
        </motion.div>

        {/* 4-col on desktop — breaks visual rhythm from 2×2 Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bike.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={stagger(i)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl p-5 group hover:-translate-y-0.5 transition-transform duration-300"
            >
              <div
                className="absolute inset-x-0 top-0 h-20 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, ${bike.accentHex}14, transparent)` }}
              />

              <div className="relative flex flex-col gap-4">
                <div
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center ${bike.tagColor}`}
                >
                  {feature.icon}
                </div>

                <div>
                  <h3 className="text-[13px] font-bold text-white tracking-tight leading-snug">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] text-gray-500 leading-relaxed">
                    {feature.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
