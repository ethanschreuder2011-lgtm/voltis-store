"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import type { BikePageData } from "@/lib/bikeData";

export function BikeHeroAggressive({ bike }: { bike: BikePageData }) {
  return (
    <section className="relative min-h-screen flex overflow-hidden bg-black">
      {/* Left content panel */}
      <div className="relative z-20 w-full md:w-[48%] flex flex-col justify-center px-8 md:px-14 pt-32 pb-44">

        {/* Orange left-edge accent bar */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-gradient-to-b from-transparent via-orange-500 to-transparent" />

        {/* Back link */}
        <div className="absolute top-24 left-8 md:left-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-orange-500/50 hover:text-orange-400 transition-colors duration-200"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            Back
          </Link>
        </div>

        {/* Tag */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block self-start text-[10px] uppercase tracking-[0.4em] font-bold px-3.5 py-1.5 rounded-sm border mb-8 ${bike.tagColor}`}
        >
          {bike.tag}
        </motion.span>

        {/* Name — stacked, compressed, massive */}
        <div className="flex flex-col leading-[0.82] tracking-[-0.03em]">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(4rem,8vw,7.5rem)] font-black text-white uppercase"
            >
              ULTRA
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`block text-[clamp(4rem,8vw,7.5rem)] font-black uppercase bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}
            >
              BEE
            </motion.span>
          </div>
        </div>

        {/* Orange slash divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className="my-7 h-[2px] w-full bg-gradient-to-r from-orange-500 via-red-500/60 to-transparent"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-gray-200 font-semibold uppercase tracking-wide leading-snug"
        >
          {bike.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="mt-3 text-[13px] text-gray-500 max-w-sm leading-relaxed"
        >
          {bike.description}
        </motion.p>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 flex items-baseline gap-3"
        >
          <span className="text-4xl md:text-5xl font-black text-white">
            ${bike.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-600 uppercase tracking-widest">Starting</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <PrimaryButton className="px-9 py-4 rounded-sm text-sm font-bold uppercase tracking-wider">
            Shop Now
          </PrimaryButton>
          <GhostButton className="px-9 py-4 rounded-sm text-sm uppercase tracking-wider">
            Store Pickup
          </GhostButton>
        </motion.div>

        {/* Performance callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-12 flex items-center gap-4 border-l-2 border-orange-500/60 pl-5"
        >
          <div>
            <span className="text-3xl font-black text-orange-400">3.2</span>
            <span className="text-sm text-orange-500/70 ml-1">sec</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 leading-tight">0 – 60 mph</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-700">Race Mode</p>
          </div>
        </motion.div>
      </div>

      {/* Right: bike image with diagonal clip */}
      <div
        className="hidden md:block absolute right-0 top-0 bottom-0 w-[58%] z-10"
        style={{ clipPath: "polygon(7% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <Image
          src={bike.heroImage}
          alt={bike.name}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient fade toward left edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent" />
        {/* Top/bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Mobile background image */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image src={bike.heroImage} alt={bike.name} fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      </div>

      {/* Orange radial glow — behind bike */}
      <div
        className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[40vw] h-[60vh] blur-[160px] rounded-full z-5 pointer-events-none"
        style={{ background: "rgba(249, 115, 22, 0.22)" }}
      />

      {/* Badge — top right corner overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden md:block absolute top-24 right-10 z-30"
      >
        <div className="flex flex-col items-end gap-1">
          <span className="text-[9px] uppercase tracking-[0.4em] text-orange-500/50 font-bold">
            Race Homologated
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] text-gray-700">
            Voltis Pro Series
          </span>
        </div>
      </motion.div>

      {/* Stats strip — orange/aggressive */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 z-30 border-t-2 border-orange-500/30 bg-black/90 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-3 divide-x divide-orange-500/15">
            {bike.heroStats.map((stat) => (
              <div key={stat.label} className="py-5 md:py-6 px-4 text-center">
                <p className={`text-lg md:text-2xl font-black uppercase bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
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
