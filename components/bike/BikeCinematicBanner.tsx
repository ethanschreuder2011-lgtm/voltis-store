"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BikePageData } from "@/lib/bikeData";

export function BikeCinematicBanner({ bike }: { bike: BikePageData }) {
  if (!bike.cinematic?.actionBanner) return null;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const enter = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
    },
  });

  return (
    <section
      ref={ref}
      className="relative min-h-[72vh] flex items-end overflow-hidden bg-black"
    >
      {/* Full-bleed image */}
      <Image
        src={bike.cinematic.actionBanner}
        alt={`${bike.name} — in action`}
        fill
        quality={90}
        className="object-cover object-center"
        style={{ opacity: 0.72 }}
        sizes="100vw"
      />

      {/* Gradient overlays — bottom-heavy so text reads clean */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Accent top hairline */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}30, transparent)` }}
      />

      {/* Content — positioned at bottom of banner */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 pb-10 md:pb-16">
        <motion.p
          variants={enter(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[10px] font-bold uppercase tracking-[0.45em] mb-4"
          style={{ color: bike.accentHex }}
        >
          {bike.tag} · Race Proven
        </motion.p>

        <motion.h2
          variants={enter(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-3xl md:text-[3.5rem] font-black tracking-tight leading-[0.92] max-w-xl"
        >
          Built for the{" "}
          <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
            Impossible.
          </span>
        </motion.h2>

        {/* Stats strip */}
        <motion.div
          variants={enter(0.22)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-6 pt-5 border-t border-white/[0.07] flex items-center gap-5 md:gap-7 flex-wrap"
        >
          {bike.heroStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-5 md:gap-7">
              <div>
                <p className="text-xl md:text-2xl font-black text-white leading-none tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[9px] uppercase tracking-[0.35em] text-gray-600 mt-1">
                  {stat.label}
                </p>
              </div>
              {i < bike.heroStats.length - 1 && (
                <div className="w-px h-7 bg-white/[0.08]" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
