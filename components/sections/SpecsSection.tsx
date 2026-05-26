"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { SpecBar } from "@/components/ui/SpecBar";
import { allBikes, getComparisonRows } from "@/lib/bikeData";
import { fadeUp } from "@/lib/animations";

function Arrow({
  dir,
  onClick,
  enabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  enabled: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={!enabled}
      whileHover={enabled ? { scale: 1.08 } : {}}
      whileTap={enabled ? { scale: 0.92 } : {}}
      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
        enabled
          ? "border-white/15 bg-white/[0.06] text-white hover:border-white/30 hover:bg-white/[0.1] cursor-pointer"
          : "border-white/[0.05] bg-transparent text-white/20 cursor-not-allowed"
      }`}
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.2}
      >
        {dir === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </motion.button>
  );
}

export function SpecsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const getStep = useCallback(() => {
    const t = trackRef.current;
    if (!t) return 340;
    const card = t.querySelector("[data-card]") as HTMLElement | null;
    return card ? card.offsetWidth + 20 : 340;
  }, []);

  const updateState = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const step = getStep();
    setActiveIdx(Math.round(t.scrollLeft / step));
    setCanPrev(t.scrollLeft > 8);
    setCanNext(t.scrollLeft < t.scrollWidth - t.clientWidth - 8);
  }, [getStep]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener("scroll", updateState, { passive: true });
    updateState();
    const ro = new ResizeObserver(updateState);
    ro.observe(t);
    return () => {
      t.removeEventListener("scroll", updateState);
      ro.disconnect();
    };
  }, [updateState]);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * getStep(), behavior: "smooth" });
  };

  const scrollToIdx = (i: number) => {
    trackRef.current?.scrollTo({ left: i * getStep(), behavior: "smooth" });
  };

  return (
    <section
      id="specs"
      ref={ref}
      className="relative bg-black py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-purple-900/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10 flex items-end justify-between px-6 md:px-10"
        >
          <div>
            <SectionEyebrow>Bike Comparison</SectionEyebrow>
            <SectionHeading>
              Find Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                Perfect Ride
              </span>
            </SectionHeading>
          </div>
          <div className="flex gap-2">
            <Arrow dir="prev" onClick={() => scroll(-1)} enabled={canPrev} />
            <Arrow dir="next" onClick={() => scroll(1)} enabled={canNext} />
          </div>
        </motion.div>

        {/* Carousel track */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pl-6 md:pl-10 pr-6 md:pr-10 pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {allBikes.map((bike) => {
              const rows = getComparisonRows(bike);
              return (
                <div
                  key={bike.name}
                  data-card
                  className="snap-start shrink-0 w-[88vw] xs:w-[82vw] sm:w-[360px] md:w-[320px] lg:w-[300px]"
                >
                  <GlassCard
                    featured={bike.featured}
                    className="h-full hover:-translate-y-1.5"
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-48 bg-gradient-to-b ${bike.accentFrom} to-transparent`}
                    />

                    <div className="p-6 flex flex-col gap-5">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black tracking-tight">{bike.name}</h3>
                        <span
                          className={`text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border ${bike.tagColor}`}
                        >
                          {bike.tag}
                        </span>
                      </div>

                      {/* Image */}
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/[0.04]">
                        <Image
                          src={bike.heroImage}
                          alt={bike.name}
                          fill
                          className="object-contain p-3 drop-shadow-[0_8px_32px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Spec rows — derived from performanceStats */}
                      <div className="flex flex-col gap-3">
                        {rows.map((row) => (
                          <div key={row.label}>
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[11px] uppercase tracking-widest text-gray-500">
                                {row.label}
                              </span>
                              <span className="text-[13px] font-semibold text-white tabular-nums">
                                {row.value}
                              </span>
                            </div>
                            <SpecBar pct={row.pct} color={bike.barGradient} />
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      {bike.featured ? (
                        <PrimaryButton href={`/bikes/${bike.slug}`} className="mt-1 w-full py-3 rounded-xl text-sm text-center">
                          View {bike.name}
                        </PrimaryButton>
                      ) : (
                        <GhostButton href={`/bikes/${bike.slug}`} className="mt-1 w-full py-3 rounded-xl text-sm text-center">
                          View {bike.name}
                        </GhostButton>
                      )}
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Dot indicators */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center gap-1.5 mt-6 px-6 md:px-10"
        >
          {allBikes.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIdx(i)}
              className="h-[3px] rounded-full transition-all duration-400"
              style={{
                width: i === activeIdx ? "28px" : "8px",
                background:
                  i === activeIdx
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(255,255,255,0.12)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
