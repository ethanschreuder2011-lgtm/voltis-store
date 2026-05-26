"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { BikePageData } from "@/lib/bikeData";

const DEFAULT_LABELS = ["Studio", "Profile", "Detail", "Cockpit", "Motion", "Lifestyle"];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  labels,
  index,
  bike,
  onClose,
  onNav,
}: {
  images: string[];
  labels: string[];
  index: number;
  bike: BikePageData;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Accent glow behind image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${bike.glowColor}, transparent)`,
        }}
      />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
        aria-label="Previous"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
        aria-label="Next"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[90vw] max-w-5xl aspect-[16/10]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[index]}
            alt={`${bike.name} — ${labels[index]}`}
            fill
            quality={95}
            className="object-cover rounded-lg"
            sizes="90vw"
            priority
          />
          {/* Bottom label bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 py-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.4em] font-bold mb-1"
                style={{ color: bike.accentHex }}
              >
                {labels[index]}
              </p>
              <p className="text-sm font-semibold text-white">{bike.name}</p>
            </div>
            <p className="text-[11px] text-gray-600 tabular-nums">
              {index + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-3 items-center">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onNav(i - index as 1 | -1); }}
            className="w-5 h-5 flex items-center justify-center"
            aria-label={`Go to image ${i + 1}`}
          >
            <span
              className="rounded-full transition-all duration-300 block"
              style={{
                width: i === index ? "8px" : "6px",
                height: i === index ? "8px" : "6px",
                background: i === index ? bike.accentHex : "rgba(255,255,255,0.2)",
              }}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function BikeGallery({ bike, hideMobile }: { bike: BikePageData; hideMobile?: boolean }) {
  const LABELS = bike.galleryLabels ?? DEFAULT_LABELS;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const navLightbox = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIndex === null) return;
      setLightboxIndex((lightboxIndex + dir + bike.galleryImages.length) % bike.galleryImages.length);
    },
    [lightboxIndex, bike.galleryImages.length]
  );

  // Entrance animation helpers
  const tile = (delay: number) => ({
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
    },
  });

  return (
    <>
      <section
        ref={ref}
        className={`relative bg-black py-10 md:py-20 px-4 md:px-10 overflow-hidden${hideMobile ? " hidden md:block" : ""}`}
      >
        {/* Subtle section glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px] pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${bike.accentHex}30, transparent)`,
          }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            variants={tile(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-8 flex items-end justify-between"
          >
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3"
                style={{ color: bike.accentHex }}
              >
                Gallery
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Every{" "}
                <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                  Angle
                </span>
              </h2>
            </div>
            <p className="hidden md:block text-[11px] uppercase tracking-widest text-gray-600">
              Click to expand
            </p>
          </motion.div>

          {/* Grid — cinematic asymmetric layout */}
          <div className="grid grid-cols-2 md:grid-cols-12 grid-rows-[auto] gap-3 md:gap-4">

            {/* [0] Large hero tile — 8 cols, tall */}
            <motion.div
              variants={tile(0.08)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              onClick={() => openLightbox(0)}
              className="col-span-2 md:col-span-8 relative aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden group cursor-zoom-in"
            >
              <Image
                src={bike.galleryImages[0]}
                alt={`${bike.name} — Studio`}
                fill
                quality={90}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 67vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              {/* Expand icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08]">
                  {LABELS[0]}
                </span>
              </div>
            </motion.div>

            {/* [1] + [2] Stacked right column — 4 cols */}
            <div className="hidden md:flex md:col-span-4 flex-col gap-4">
              {[1, 2].map((idx) => bike.galleryImages[idx] ? (
                <motion.div
                  key={idx}
                  variants={tile(0.14 + (idx - 1) * 0.08)}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  onClick={() => openLightbox(idx)}
                  className="relative flex-1 rounded-2xl overflow-hidden group cursor-zoom-in min-h-[160px]"
                >
                  <Image
                    src={bike.galleryImages[idx]}
                    alt={`${bike.name} — ${LABELS[idx]}`}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[9px] uppercase tracking-widest text-white/50 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/[0.08]">
                      {LABELS[idx]}
                    </span>
                  </div>
                </motion.div>
              ) : null)}
            </div>

            {/* Mobile tiles [1] + [2] */}
            {[1, 2].map((idx) => bike.galleryImages[idx] ? (
              <motion.div
                key={`mob-${idx}`}
                variants={tile(0.14 + (idx - 1) * 0.08)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                onClick={() => openLightbox(idx)}
                className="md:hidden relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-zoom-in"
              >
                <Image
                  src={bike.galleryImages[idx]}
                  alt={`${bike.name} — ${LABELS[idx]}`}
                  fill
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </motion.div>
            ) : null)}

            {/* Bottom row — three equal tiles */}
            {[3, 4, 5].map((idx) => bike.galleryImages[idx] ? (
              <motion.div
                key={idx}
                variants={tile(0.22 + (idx - 3) * 0.07)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                onClick={() => openLightbox(idx)}
                className="col-span-1 md:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-zoom-in"
              >
                <Image
                  src={bike.galleryImages[idx]}
                  alt={`${bike.name} — ${LABELS[idx]}`}
                  fill
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] uppercase tracking-widest text-white/50 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/[0.08]">
                    {LABELS[idx]}
                  </span>
                </div>
              </motion.div>
            ) : null)}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={bike.galleryImages}
            labels={LABELS}
            index={lightboxIndex}
            bike={bike}
            onClose={closeLightbox}
            onNav={navLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
