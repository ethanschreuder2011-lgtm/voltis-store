"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BikePageData } from "@/lib/bikeData";

function DetailPanel({
  image,
  title,
  subtitle,
  spec,
  accentHex,
  delay,
  inView,
}: {
  image: string;
  title: string;
  subtitle: string;
  spec: string;
  accentHex: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[4/3] md:aspect-auto md:flex-1 overflow-hidden group cursor-default"
    >
      <Image
        src={image}
        alt={title}
        fill
        quality={90}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient — bottom overlay for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Spec chip — top right */}
      <div className="absolute top-5 right-5">
        <span
          className="text-[9px] font-bold uppercase tracking-[0.35em] px-3 py-1.5 rounded-full border backdrop-blur-md"
          style={{
            color: accentHex,
            borderColor: `${accentHex}40`,
            background: `${accentHex}12`,
          }}
        >
          {spec}
        </span>
      </div>

      {/* Content — bottom */}
      <div className="absolute bottom-0 inset-x-0 px-5 pb-6 md:px-7 md:pb-8">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2"
          style={{ color: accentHex }}
        >
          {subtitle}
        </p>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

export function BikeDetailSplit({ bike }: { bike: BikePageData }) {
  if (!bike.cinematic?.detail) return null;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { primary, secondary } = bike.cinematic.detail;

  return (
    <section
      ref={ref}
      className="relative bg-black overflow-hidden"
    >
      {/* Accent divider */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}25, transparent)` }}
      />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="px-6 md:px-14 pt-12 pb-5 max-w-7xl mx-auto"
      >
        <p
          className="text-[10px] font-bold uppercase tracking-[0.45em]"
          style={{ color: bike.accentHex }}
        >
          Engineering
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight">
          Race-Grade{" "}
          <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
            Components
          </span>
        </h2>
      </motion.div>

      {/* Two-panel image split — full-width, no side padding */}
      <div className="flex flex-col md:flex-row md:min-h-[65vh]">
        <DetailPanel
          image={primary.image}
          title={primary.title}
          subtitle={primary.subtitle}
          spec={primary.spec}
          accentHex={bike.accentHex}
          delay={0.08}
          inView={inView}
        />
        {/* Thin divider between panels */}
        <div className="hidden md:block w-px bg-white/[0.04] shrink-0" />
        <DetailPanel
          image={secondary.image}
          title={secondary.title}
          subtitle={secondary.subtitle}
          spec={secondary.spec}
          accentHex={bike.accentHex}
          delay={0.18}
          inView={inView}
        />
      </div>
    </section>
  );
}
