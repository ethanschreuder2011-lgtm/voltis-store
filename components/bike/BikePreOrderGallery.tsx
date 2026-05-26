"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BikePageData } from "@/lib/bikeData";

export function BikePreOrderGallery({ bike }: { bike: BikePageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const enter = (delay = 0) => ({
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
    },
  });

  return (
    <section
      ref={ref}
      className="relative bg-black py-14 md:py-20 px-6 md:px-10 overflow-hidden"
    >
      {/* Top accent */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}30, transparent)` }}
      />

      {/* Atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[60vh] blur-[180px] rounded-full pointer-events-none"
        style={{ background: bike.glowColor, opacity: 0.5 }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={enter(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3"
              style={{ color: bike.accentHex }}
            >
              First Look
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              The{" "}
              <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                {bike.name}
              </span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-600 uppercase tracking-[0.25em]">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: bike.accentHex }}
            />
            Pre-Launch Preview
          </div>
        </motion.div>

        {/* Main cinematic image */}
        <motion.div
          variants={enter(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden"
        >
          <Image
            src={bike.heroImage}
            alt={bike.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}50, transparent)` }}
          />

          {/* Corner labels */}
          <div className="absolute bottom-5 left-5">
            <span
              className="text-[9px] uppercase tracking-[0.4em] font-bold px-3.5 py-1.5 rounded-full border backdrop-blur-md"
              style={{
                color: bike.accentHex,
                borderColor: `${bike.accentHex}30`,
                background: `${bike.accentHex}12`,
              }}
            >
              Official Press Image
            </span>
          </div>
          <div className="absolute bottom-5 right-5">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.06]">
              Full gallery at launch
            </span>
          </div>
        </motion.div>

        {/* Three teaser thumbnails — blurred/locked as coming soon */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4">
          {["Studio Shoot", "Action", "Detail"].map((label, i) => (
            <motion.div
              key={label}
              variants={enter(0.22 + i * 0.07)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.05] bg-white/[0.02] flex items-center justify-center"
            >
              {/* Blurred background */}
              <Image
                src={bike.heroImage}
                alt=""
                fill
                className="object-cover blur-xl scale-110 opacity-15"
              />
              <div className="absolute inset-0 bg-black/75" />

              {/* Lock icon + label */}
              <div className="relative text-center">
                <div
                  className="w-7 h-7 rounded-full border mx-auto mb-2.5 flex items-center justify-center"
                  style={{ borderColor: `${bike.accentHex}35` }}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    style={{ color: `${bike.accentHex}70` }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-[9px] uppercase tracking-widest text-gray-600">{label}</p>
                <p className="text-[8px] uppercase tracking-widest text-gray-700 mt-1">At Launch</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
