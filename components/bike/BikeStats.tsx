"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { SpecBar } from "@/components/ui/SpecBar";
import { fadeUp, stagger } from "@/lib/animations";
import type { BikePageData } from "@/lib/bikeData";

function AnimatedCounter({
  value,
  unit,
  isDecimal,
  inView,
  gradient,
}: {
  value: string;
  unit: string;
  isDecimal?: boolean;
  inView: boolean;
  gradient: string;
}) {
  const count = useMotionValue(0);
  const target = parseFloat(value);
  const display = useTransform(count, (v) =>
    isDecimal ? v.toFixed(1) : Math.round(v).toString()
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, target, count]);

  return (
    <div className="flex items-baseline gap-1.5">
      <motion.span className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {display}
      </motion.span>
      <span className="text-xs text-gray-500 font-medium">{unit}</span>
    </div>
  );
}

export function BikeStats({ bike }: { bike: BikePageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative bg-black py-14 md:py-20 px-6 md:px-10 overflow-hidden"
    >
      {/* Accent divider */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}25, transparent)` }}
      />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[35vh] blur-[120px] rounded-full pointer-events-none"
        style={{ background: bike.glowColor, opacity: 0.5 }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10"
        >
          <SectionEyebrow color={bike.accentHex}>Performance</SectionEyebrow>
          <SectionHeading>
            By The{" "}
            <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
              Numbers
            </span>
          </SectionHeading>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {bike.performanceStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={stagger(i)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl p-5 md:p-6"
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}30, transparent)` }}
              />

              <p className="text-[9px] uppercase tracking-[0.35em] text-gray-600 mb-4">
                {stat.label}
              </p>

              <AnimatedCounter
                value={stat.value}
                unit={stat.unit}
                isDecimal={stat.isDecimal}
                inView={inView}
                gradient={bike.titleGradient}
              />

              <div className="mt-4">
                <SpecBar pct={stat.pct} color={bike.barColor} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
