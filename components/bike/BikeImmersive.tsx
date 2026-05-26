"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BikePageData } from "@/lib/bikeData";

export function BikeImmersive({ bike }: { bike: BikePageData }) {
  if (!bike.cinematic?.actionImmersive) return null;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Edge-to-edge image — no container */}
      <Image
        src={bike.cinematic.actionImmersive}
        alt={`${bike.name} — riding`}
        fill
        quality={90}
        className="object-cover object-center"
        style={{ opacity: 0.65 }}
        sizes="100vw"
      />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)] pointer-events-none" />

      {/* Accent line — top */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}30, transparent)` }}
      />
      {/* Accent line — bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}20, transparent)` }}
      />

      {/* Centered minimal text */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={inView ? { opacity: 1, letterSpacing: "0.45em" } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9px] font-bold uppercase mb-5 text-gray-500"
          style={{ letterSpacing: "0.45em" }}
        >
          {bike.name} · Voltis Emoto
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-5xl font-black tracking-tight leading-tight text-white max-w-sm mx-auto"
        >
          {bike.tagline}
        </motion.h2>

        {/* Accent rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 h-px w-16"
          style={{
            background: `linear-gradient(to right, transparent, ${bike.accentHex}, transparent)`,
            transformOrigin: "center",
          }}
        />
      </div>
    </section>
  );
}
