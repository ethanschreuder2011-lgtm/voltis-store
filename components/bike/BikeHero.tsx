"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animations";
import type { BikePageData } from "@/lib/bikeData";

export function BikeHero({ bike }: { bike: BikePageData }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={bike.heroImage}
          alt={bike.name}
          fill
          priority
          className="object-cover opacity-50 scale-105"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />

      {/* Colored atmospheric glow */}
      <div
        className="absolute bottom-0 left-0 w-[60vw] h-[60vh] blur-[140px] rounded-full z-10 pointer-events-none"
        style={{ background: bike.glowColor }}
      />

      {/* Back link */}
      <div className="absolute top-24 left-6 md:left-10 z-30">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          All Bikes
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 md:px-24 max-w-5xl w-full pt-36 md:pt-40 pb-44">
        <motion.span
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className={`inline-block text-[10px] uppercase tracking-[0.35em] font-semibold px-3.5 py-1.5 rounded-full border mb-7 ${bike.tagColor}`}
        >
          {bike.tag}
        </motion.span>

        <h1 className="text-[clamp(4.5rem,13vw,10.5rem)] font-black leading-[0.85] tracking-tight">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 90, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                {bike.name}
              </span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fadeUp(0.42)}
          initial="hidden"
          animate="visible"
          className="mt-6 text-xl md:text-2xl text-gray-300 font-light leading-snug max-w-lg"
        >
          {bike.tagline}
        </motion.p>

        <motion.p
          variants={fadeUp(0.54)}
          initial="hidden"
          animate="visible"
          className="mt-3 text-[14px] text-gray-500 max-w-md leading-relaxed"
        >
          {bike.description}
        </motion.p>

        <motion.div
          variants={fadeUp(0.66)}
          initial="hidden"
          animate="visible"
          className="mt-9 flex items-baseline gap-3"
        >
          <span className="text-4xl md:text-5xl font-black text-white">
            ${bike.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">Starting price</span>
        </motion.div>

        <motion.div
          variants={fadeUp(0.78)}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap gap-4"
        >
          <PrimaryButton className="px-8 py-4 rounded-full text-sm">
            Shop Now
          </PrimaryButton>
          <GhostButton className="px-8 py-4 rounded-full text-sm">
            Store Pickup
          </GhostButton>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 z-30 bg-black/70 backdrop-blur-2xl border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-3 divide-x divide-white/[0.07]">
            {bike.heroStats.map((stat) => (
              <div key={stat.label} className="py-5 md:py-6 px-4 text-center">
                <p className="text-lg md:text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
