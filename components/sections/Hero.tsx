"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { headlineWords } from "@/lib/data";
import { fadeUp, wordVariants, ease } from "@/lib/animations";
import { scrollTo } from "@/lib/utils";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden bg-black">

      {/* ── Background images ────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Mobile: front-angle cinematic — hidden on md+ */}
        <Image
          src="/hero-mobile.png"
          alt="Voltis Emoto Electric Motorcycle"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[50%_32%] brightness-[1.18] contrast-[1.05] will-change-transform md:hidden"
          style={{ opacity: 0.92 }}
        />
        {/* Desktop: side-angle — hidden below md */}
        <Image
          src="/hero-bike-v2.png"
          alt="Voltis Emoto Electric Motorcycle"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-[1.03] brightness-100 will-change-transform hidden md:block"
          style={{ opacity: 0.82 }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE OVERLAYS — bike-first, minimal fog
      ══════════════════════════════════════════════════════ */}
      {/* Top fade — navbar legibility only */}
      <div className="absolute top-0 inset-x-0 h-[22%] bg-gradient-to-b from-black/55 to-transparent z-10 pointer-events-none md:hidden" />
      {/* Bottom ramp — text scrim */}
      <div className="absolute bottom-0 inset-x-0 h-[52%] bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none md:hidden" />
      {/* Edge vignette — subtle framing */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.25)] md:hidden" />
      {/* Purple accent — bottom-left, very subtle */}
      <div className="absolute bottom-0 left-0 w-[55vw] h-[30vh] bg-purple-700/[0.07] blur-[100px] rounded-full z-10 pointer-events-none md:hidden" />
      {/* Top hairline accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/25 to-transparent z-20 pointer-events-none md:hidden" />

      {/* ══════════════════════════════════════════════════════
          DESKTOP OVERLAYS — unchanged
      ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/52 to-transparent z-10 hidden md:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15 z-10 hidden md:block" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-purple-600/[0.12] blur-[140px] rounded-full z-10 pointer-events-none hidden md:block" />
      <div className="absolute top-1/4 left-1/3 w-[25vw] h-[25vh] bg-violet-800/[0.09] blur-[100px] rounded-full z-10 pointer-events-none hidden md:block" />
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[38vw] h-[75vh] bg-white/[0.025] blur-[90px] rounded-full z-10 pointer-events-none hidden md:block" />
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_140px_rgba(0,0,0,0.45)] hidden md:block" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent z-20 pointer-events-none hidden md:block" />

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  MOBILE CONTENT — bottom-anchored, bike-first        ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-10 md:hidden"
        style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom, 2.5rem))" }}
      >
        {/* Headline — compact, low on screen */}
        <h1
          className="font-black leading-[0.82] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.55rem, 12vw, 3.6rem)" }}
        >
          {headlineWords.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {i === 1 ? (
                  <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Single CTA */}
        <motion.div
          variants={fadeUp(0.58)}
          initial="hidden"
          animate="visible"
          className="mt-5"
        >
          <button
            onClick={() => scrollTo("#bikes")}
            className="w-full bg-white text-black text-[11.5px] font-bold uppercase tracking-[0.2em] py-[14px] rounded-full transition-all duration-200 hover:bg-gray-100 active:scale-[0.98] shadow-[0_0_32px_rgba(255,255,255,0.08)]"
          >
            Explore Bikes
          </button>
        </motion.div>
      </div>

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  DESKTOP CONTENT — unchanged                         ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-28 md:pt-24 pb-16 w-full hidden md:block">

        {/* Eyebrow */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-5 h-px bg-gradient-to-r from-purple-400/70 to-transparent" />
          <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-gray-400">
            Electric Dirt Bikes
          </p>
        </motion.div>

        {/* Headline */}
        <h1 className="text-[clamp(3.5rem,9vw,8.5rem)] font-black leading-[0.88] tracking-[-0.025em]">
          {headlineWords.map((word, i) => (
            <span key={word} className="block">
              <motion.span
                className="block"
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {i === 1 ? (
                  <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Body copy + CTAs */}
        <div className="max-w-xs mt-6">
          <motion.div
            variants={fadeUp(0.64)}
            initial="hidden"
            animate="visible"
            className="mt-7 w-12 h-px bg-gradient-to-r from-purple-500/60 to-transparent"
          />
          <motion.p
            variants={fadeUp(0.76)}
            initial="hidden"
            animate="visible"
            className="mt-4 text-[15px] text-gray-300/90 leading-relaxed"
          >
            Premium electric dirt bikes engineered for the next generation of riders.
          </motion.p>
          <motion.div
            variants={fadeUp(0.88)}
            initial="hidden"
            animate="visible"
            className="mt-7 flex items-center gap-3 flex-wrap"
          >
            <button
              onClick={() => scrollTo("#bikes")}
              className="group relative overflow-hidden bg-white text-black text-[12px] font-bold uppercase tracking-[0.18em] px-8 py-4 rounded-full transition-all duration-250 hover:bg-gray-100 active:scale-95 shadow-[0_0_32px_rgba(255,255,255,0.12)] hover:shadow-[0_0_48px_rgba(255,255,255,0.2)] w-full sm:w-auto"
            >
              Explore Bikes
            </button>
            <button
              onClick={() => scrollTo("#specs")}
              className="hidden sm:flex group items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-colors duration-200"
            >
              Compare Specs
              <motion.svg
                className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator — desktop only ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.2, ease }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.45em] text-gray-700">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-gray-600 to-transparent"
        />
      </motion.div>

      {/* ── Bottom-right badge — desktop only ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1, ease }}
        className="absolute bottom-10 right-12 z-20 hidden md:flex flex-col items-end gap-1"
      >
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-700">Voltis Emoto</p>
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-800">Est. 2024</p>
      </motion.div>
    </section>
  );
}
