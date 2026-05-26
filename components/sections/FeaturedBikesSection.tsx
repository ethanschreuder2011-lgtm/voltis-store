"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { allBikes } from "@/lib/bikeData";
import { fadeUp } from "@/lib/animations";
import { scrollTo } from "@/lib/utils";

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

export function FeaturedBikesSection() {
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
    <section id="bikes" ref={ref} className="relative bg-black py-16 md:py-24 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-purple-900/[0.08] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10 flex items-end justify-between px-6 md:px-10"
        >
          <div>
            <SectionEyebrow>Explore Bikes</SectionEyebrow>
            <SectionHeading>Built For The Future</SectionHeading>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#specs")}
              className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              Compare Specs →
            </button>
            <div className="flex gap-2 ml-1">
              <Arrow dir="prev" onClick={() => scroll(-1)} enabled={canPrev} />
              <Arrow dir="next" onClick={() => scroll(1)} enabled={canNext} />
            </div>
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
            {allBikes.map((bike) => (
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
                    className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${bike.accentFrom} to-transparent`}
                  />
                  <div className="flex flex-col">
                    {/* Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <Image
                        src={bike.heroImage}
                        alt={bike.name}
                        fill
                        className="object-cover group-hover:scale-[1.06] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span
                        className={`absolute top-3 right-3 text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border backdrop-blur-md ${bike.tagColor}`}
                      >
                        {bike.tag}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col gap-4">
                      <div>
                        <h3 className="text-lg font-black tracking-tight">{bike.name}</h3>
                        <p className="text-[13px] text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                          {bike.description}
                        </p>
                      </div>
                      {bike.featured ? (
                        <PrimaryButton href={`/bikes/${bike.slug}`} className="w-full py-3 rounded-xl text-sm text-center">
                          View {bike.name}
                        </PrimaryButton>
                      ) : (
                        <GhostButton href={`/bikes/${bike.slug}`} className="w-full py-3 rounded-xl text-sm text-center">
                          View {bike.name}
                        </GhostButton>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
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
