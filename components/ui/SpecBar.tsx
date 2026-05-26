"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease } from "@/lib/animations";

type SpecBarProps = {
  pct: number;
  color: string;
};

export function SpecBar({ pct, color }: SpecBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="h-[3px] w-full rounded-full bg-white/[0.08] overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1, ease }}
      />
    </div>
  );
}
