"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import type { BikePageData } from "@/lib/bikeData";

export function BikeHeroFuturistic({ bike }: { bike: BikePageData }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]">
      {/* Bike image — centered, cold-tinted, low opacity */}
      <div className="absolute inset-0">
        <Image
          src={bike.heroImage}
          alt={bike.name}
          fill
          priority
          className="object-cover opacity-20 scale-110"
          style={{ filter: "saturate(0.6) hue-rotate(180deg)" }}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-[#050508]/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] z-10" />

      {/* Very subtle ice glow — precision, minimal */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40vw] h-[30vh] blur-[180px] rounded-full z-10 pointer-events-none"
        style={{ background: "rgba(56, 189, 248, 0.07)" }}
      />

      {/* Horizontal scan lines — technical HUD aesthetic */}
      {[15, 27, 40, 52, 65, 77, 89].map((pct) => (
        <div
          key={pct}
          className="absolute left-0 right-0 h-px z-10 pointer-events-none"
          style={{ top: `${pct}%`, background: "rgba(255,255,255,0.022)" }}
        />
      ))}

      {/* Corner HUD brackets */}
      {/* Top-left */}
      <div className="absolute top-20 left-8 z-20 flex flex-col gap-0">
        <div className="flex items-start">
          <div className="w-5 h-px bg-sky-400/40" />
          <div className="w-px h-5 bg-sky-400/40" />
        </div>
      </div>
      {/* Top-right */}
      <div className="absolute top-20 right-8 z-20 flex flex-col items-end gap-0">
        <div className="flex items-start">
          <div className="w-px h-5 bg-sky-400/40" />
          <div className="w-5 h-px bg-sky-400/40" />
        </div>
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-28 left-8 z-20">
        <div className="flex items-end">
          <div className="w-5 h-px bg-sky-400/40" />
          <div className="w-px h-5 bg-sky-400/40" />
        </div>
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-28 right-8 z-20 flex justify-end">
        <div className="flex items-end">
          <div className="w-px h-5 bg-sky-400/40" />
          <div className="w-5 h-px bg-sky-400/40" />
        </div>
      </div>

      {/* System ID — top-right technical readout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-24 right-10 z-30 text-right hidden md:block"
      >
        <p className="text-[9px] font-mono tracking-[0.3em] text-sky-400/40 uppercase">
          SYS.ID · VE-EX7
        </p>
        <p className="text-[9px] font-mono tracking-[0.2em] text-gray-700 uppercase mt-0.5">
          Status · Active
        </p>
      </motion.div>

      {/* Back link */}
      <div className="absolute top-24 left-8 md:left-14 z-30">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-sky-400/40 hover:text-sky-300 transition-colors duration-300"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Index
        </Link>
      </div>

      {/* Center content — structured, technical */}
      <div className="relative z-20 text-center px-6 pt-20 pb-48 max-w-4xl mx-auto w-full">

        {/* Technical badge strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="w-10 h-px bg-sky-400/35" />
          <span className="text-[9px] uppercase tracking-[0.55em] text-sky-400/60 font-medium">
            {bike.badge}
          </span>
          <div className="w-10 h-px bg-sky-400/35" />
        </motion.div>

        {/* Name — large, centered, stacked */}
        <div className="overflow-hidden mb-1">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,9vw,8.5rem)] font-black leading-[0.88] tracking-[-0.02em] text-white uppercase"
          >
            Arctic
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className={`text-[clamp(3rem,9vw,8.5rem)] font-black leading-[0.88] tracking-[-0.02em] bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent uppercase`}
          >
            Leopard
          </motion.div>
        </div>

        {/* Precision divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "center" }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <div className="h-px w-20 bg-sky-400/25" />
          <div className="w-1 h-1 rounded-full bg-sky-400/60" />
          <div className="h-px w-20 bg-sky-400/25" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.66, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base md:text-lg text-gray-400 tracking-wide font-light max-w-sm mx-auto"
        >
          {bike.tagline}
        </motion.p>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.76 }}
          className="mt-8 flex items-baseline justify-center gap-3"
        >
          <span className="text-4xl md:text-5xl font-black text-white">
            ${bike.price.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-sky-400/40">
            Base config
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap gap-4 justify-center"
        >
          <PrimaryButton className="px-9 py-4 rounded-full text-sm">
            Configure Unit
          </PrimaryButton>
          <GhostButton className="px-9 py-4 rounded-full text-sm">
            Technical Brief →
          </GhostButton>
        </motion.div>

        {/* Technical spec tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.3em] text-gray-700 font-medium"
        >
          {["6,000W FOC Motor", "IP68 Sealed", "260mm Travel", "72V NMC"].map((spec, i) => (
            <span key={spec} className="flex items-center gap-4">
              {spec}
              {i < 3 && <span className="text-gray-800">·</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Stats strip — clinical precision */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 z-30 border-t border-sky-400/10 bg-[#050508]/80 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-3 divide-x divide-sky-400/10">
            {bike.heroStats.map((stat) => (
              <div key={stat.label} className="py-5 md:py-6 px-4 text-center">
                <p className={`text-lg md:text-2xl font-black font-mono bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="text-[9px] uppercase tracking-[0.4em] text-sky-400/40 mt-1.5 font-mono">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
