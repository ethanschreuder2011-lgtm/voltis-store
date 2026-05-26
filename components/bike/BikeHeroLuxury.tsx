"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animations";
import type { BikePageData } from "@/lib/bikeData";

export function BikeHeroLuxury({ bike }: { bike: BikePageData }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">
      {/* Bike image — right-weighted, low opacity for atmosphere */}
      <div className="absolute inset-0">
        <Image
          src={bike.heroImage}
          alt={bike.name}
          fill
          priority
          className="object-cover opacity-35 scale-105 object-center"
        />
      </div>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/50 z-10" />

      {/* Warm gold atmospheric glow — very subtle */}
      <div
        className="absolute bottom-0 left-0 w-[55vw] h-[55vh] blur-[160px] rounded-full z-10 pointer-events-none"
        style={{ background: "rgba(180, 100, 10, 0.11)" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[30vw] h-[30vh] blur-[120px] rounded-full z-10 pointer-events-none"
        style={{ background: "rgba(140, 80, 10, 0.07)" }}
      />

      {/* Thin gold vertical accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px z-20 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />

      {/* Back link */}
      <div className="absolute top-24 left-8 md:left-12 z-30">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.35em] text-amber-500/50 hover:text-amber-400 transition-colors duration-300"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          All Bikes
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-20 px-8 md:px-24 max-w-5xl w-full pt-40 md:pt-44 pb-48">

        {/* Badge — refined horizontal treatment */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-amber-500/50" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500/70 font-medium">
            {bike.badge}
          </span>
        </motion.div>

        {/* Name — editorial gold, very large */}
        <div className="overflow-hidden">
          <motion.h1
            className={`text-[clamp(5.5rem,15vw,13rem)] font-black leading-[0.82] tracking-[-0.02em] bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}
            initial={{ opacity: 0, y: 100, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {bike.name}
          </motion.h1>
        </div>

        {/* Gold horizontal rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className="mt-8 w-24 h-px bg-gradient-to-r from-amber-500/70 to-transparent"
        />

        {/* Tagline — italic, refined */}
        <motion.p
          variants={fadeUp(0.52)}
          initial="hidden"
          animate="visible"
          className="mt-6 text-xl md:text-2xl text-gray-300 font-light italic tracking-wide max-w-md leading-snug"
        >
          {bike.tagline}
        </motion.p>

        <motion.p
          variants={fadeUp(0.62)}
          initial="hidden"
          animate="visible"
          className="mt-4 text-[13px] text-gray-600 max-w-sm leading-relaxed"
        >
          {bike.description}
        </motion.p>

        {/* Price */}
        <motion.div
          variants={fadeUp(0.72)}
          initial="hidden"
          animate="visible"
          className="mt-9 flex items-baseline gap-3"
        >
          <span className="text-4xl md:text-5xl font-black text-white">
            ${bike.price.toLocaleString()}
          </span>
          <span className="text-[11px] uppercase tracking-[0.3em] text-amber-500/50">
            Starting
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(0.82)}
          initial="hidden"
          animate="visible"
          className="mt-9 flex flex-wrap gap-4"
        >
          <PrimaryButton className="px-9 py-4 rounded-full text-sm">
            Order Now
          </PrimaryButton>
          <GhostButton className="px-9 py-4 rounded-full text-sm">
            Private Viewing →
          </GhostButton>
        </motion.div>

        {/* Luxury trust line */}
        <motion.div
          variants={fadeUp(0.92)}
          initial="hidden"
          animate="visible"
          className="mt-10 flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-gray-700"
        >
          <span>Free Delivery</span>
          <span className="text-gray-800">·</span>
          <span>2-Year Warranty</span>
          <span className="text-gray-800">·</span>
          <span>30-Day Returns</span>
        </motion.div>
      </div>

      {/* Stats strip — understated gold */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 z-30 border-t border-amber-500/10 bg-black/60 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-3 divide-x divide-amber-500/10">
            {bike.heroStats.map((stat) => (
              <div key={stat.label} className="py-5 md:py-6 px-4 text-center">
                <p className={`text-lg md:text-2xl font-black bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="text-[9px] uppercase tracking-[0.35em] text-gray-600 mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
