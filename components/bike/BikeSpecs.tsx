"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import type { BikePageData } from "@/lib/bikeData";

function BigCounter({
  value,
  unit,
  isDecimal,
  inView,
  titleGradient,
}: {
  value: string;
  unit: string;
  isDecimal?: boolean;
  inView: boolean;
  titleGradient: string;
}) {
  const count = useMotionValue(0);
  const target = parseFloat(value);
  const display = useTransform(count, (v) =>
    isDecimal ? v.toFixed(1) : Math.round(v).toString()
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, target, count]);

  return (
    <div className="flex items-baseline gap-2 mt-2">
      <motion.span
        className={`text-[2.75rem] md:text-5xl font-black tabular-nums leading-none bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}
      >
        {display}
      </motion.span>
      {unit && (
        <span className="text-sm md:text-base font-semibold text-gray-500 leading-none">
          {unit}
        </span>
      )}
    </div>
  );
}

const metricVariant = (i: number) => ({
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  },
});

export function BikeSpecs({ bike }: { bike: BikePageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Premium scroll-to highlight — triggered by custom event fired from "View Specs" CTA
  const [highlighted, setHighlighted] = useState(false);
  useEffect(() => {
    const handler = () => {
      setHighlighted(true);
      setTimeout(() => setHighlighted(false), 1600);
    };
    window.addEventListener("lbx-specs-highlight", handler);
    return () => window.removeEventListener("lbx-specs-highlight", handler);
  }, []);

  return (
    <section ref={ref} id="specs" className="relative bg-black overflow-hidden">
      {/* Top accent divider */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none z-10"
        style={{
          background: `linear-gradient(to right, transparent, ${bike.accentHex}30, transparent)`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[60vh] blur-[160px] rounded-full pointer-events-none"
        style={{ background: bike.glowColor, opacity: 0.3 }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${bike.accentHex}0A 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Scroll-to highlight — brief accent pulse when navigated from "View Specs" */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[3px] pointer-events-none z-20"
        initial={false}
        animate={{
          opacity: highlighted ? 1 : 0,
          scaleX: highlighted ? 1 : 0.6,
        }}
        transition={{ duration: highlighted ? 0.38 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: `linear-gradient(to right, transparent, ${bike.accentHex}cc, ${bike.accentHex}, ${bike.accentHex}cc, transparent)`,
          transformOrigin: "center",
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        initial={false}
        animate={{ opacity: highlighted ? 1 : 0 }}
        transition={{ duration: highlighted ? 0.3 : 1.1, ease: "easeOut" }}
        style={{ background: `radial-gradient(ellipse 70% 35% at 50% 0%, ${bike.accentHex}12, transparent)` }}
      />

      <div className="relative py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            variants={fadeUp()}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-12 md:mb-16"
          >
            <SectionEyebrow color={bike.accentHex}>Full Specifications</SectionEyebrow>
            <SectionHeading>
              Built to{" "}
              <span
                className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}
              >
                Spec
              </span>
            </SectionHeading>
          </motion.div>

          {/* ── Hero metric strip ─────────────────────────────────── */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-white/[0.05]">
              {bike.performanceStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={metricVariant(i)}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="group relative bg-white/[0.02] hover:bg-white/[0.045] transition-colors duration-300 px-4 py-6 md:px-6 md:py-8 flex flex-col"
                >
                  {/* Hover top shimmer */}
                  <div
                    className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: `linear-gradient(to right, transparent, ${bike.accentHex}70, transparent)`,
                    }}
                  />

                  <p className="text-[9px] uppercase tracking-[0.4em] text-gray-600 font-semibold">
                    {stat.label}
                  </p>

                  <BigCounter
                    value={stat.value}
                    unit={stat.unit}
                    isDecimal={stat.isDecimal}
                    inView={inView}
                    titleGradient={bike.titleGradient}
                  />

                  {/* Bottom accent line */}
                  <div
                    className="mt-5 h-px rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${bike.accentHex}50, ${bike.accentHex}10, transparent)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Spec group panels ─────────────────────────────────── */}
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {bike.specGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                variants={stagger(gi)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl"
              >
                {/* Accent top border */}
                <div
                  className="absolute top-0 inset-x-0 h-[1.5px]"
                  style={{
                    background: `linear-gradient(to right, ${bike.accentHex}70, ${bike.accentHex}25, transparent)`,
                  }}
                />

                {/* Group header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.05]">
                  <div
                    className="w-[3px] h-4 rounded-full shrink-0"
                    style={{
                      background: `linear-gradient(to bottom, ${bike.accentHex}, ${bike.accentHex}30)`,
                    }}
                  />
                  <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-semibold">
                    {group.title}
                  </p>
                </div>

                {/* Spec rows */}
                <div className="px-6 divide-y divide-white/[0.04]">
                  {group.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="group/row flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 py-3.5 sm:py-4 -mx-6 px-6 hover:bg-white/[0.025] transition-colors duration-200"
                    >
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 sm:shrink-0 sm:mr-6">
                        {spec.label}
                      </span>
                      <span className="text-[13px] text-white/75 font-medium sm:text-right leading-snug group-hover/row:text-white transition-colors duration-200">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            variants={fadeUp(0.35)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-8 text-[11px] text-gray-700 text-center"
          >
            Specifications subject to change without notice. Contact us for region-specific variants.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
