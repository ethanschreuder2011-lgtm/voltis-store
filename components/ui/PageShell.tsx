"use client";

/**
 * PageShell — shared primitives used across all trust/info pages.
 * Keeps InViewWrapper, InViewCard, Divider, and PageHero consistent.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";

// ── Animation wrappers ────────────────────────────────────────────────────────

export function InViewWrapper({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function InViewCard({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger(index)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Layout primitives ─────────────────────────────────────────────────────────

export function Divider() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </div>
  );
}

export function PageSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">{children}</div>
    </section>
  );
}

// ── Reusable card styles ──────────────────────────────────────────────────────

export const glassCard =
  "relative bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl rounded-2xl";

export const hoverCard =
  "hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(168,85,247,0.12)] hover:border-purple-500/20 transition-all duration-300";

// ── Page hero ─────────────────────────────────────────────────────────────────

export function PageHero({
  eyebrow,
  headline,
  headlineAccent,
  sub,
  badges,
}: {
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  sub: string;
  badges?: { icon: string; text: string }[];
}) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/20 blur-[140px] rounded-full" />
        <div className="absolute top-1/4 right-1/3 w-[280px] h-[280px] bg-violet-800/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 flex flex-col items-center gap-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[11px] font-bold uppercase tracking-[0.3em]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            {eyebrow}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-none"
        >
          <span className="block text-white">{headline}</span>
          {headlineAccent && (
            <span className="block bg-gradient-to-r from-purple-400 via-violet-300 to-purple-500 bg-clip-text text-transparent mt-1">
              {headlineAccent}
            </span>
          )}
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38 }}
          className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl"
        >
          {sub}
        </motion.p>

        {/* Badges */}
        {badges && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-5 pt-1"
          >
            {badges.map((b) => (
              <div
                key={b.text}
                className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium"
              >
                <span className="text-sm">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ── Section header helper ─────────────────────────────────────────────────────

export function SectionHeader({
  eyebrow,
  heading,
  accent,
  delay = 0,
}: {
  eyebrow: string;
  heading: string;
  accent?: string;
  delay?: number;
}) {
  return (
    <InViewWrapper delay={delay} className="mb-10 md:mb-14">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <SectionHeading>
        {heading}{" "}
        {accent && (
          <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
            {accent}
          </span>
        )}
      </SectionHeading>
    </InViewWrapper>
  );
}

// ── Bottom CTA ────────────────────────────────────────────────────────────────

import Link from "next/link";

export function PageBottomCTA({
  headline,
  sub,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  headline: string;
  sub: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/20 blur-[130px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
        <InViewWrapper delay={0}>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">{headline}</h2>
        </InViewWrapper>
        <InViewWrapper delay={0.1}>
          <p className="mt-4 text-gray-400 text-base leading-relaxed max-w-sm mx-auto">{sub}</p>
        </InViewWrapper>
        <InViewWrapper delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all duration-200 font-bold shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] text-white text-[12px] uppercase tracking-[0.18em] px-8 py-4 rounded-full"
            >
              {primaryLabel}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 active:scale-95 transition-all duration-200 font-bold text-white text-[12px] uppercase tracking-[0.18em] px-8 py-4 rounded-full"
            >
              {secondaryLabel}
            </Link>
          </div>
        </InViewWrapper>
      </div>
    </section>
  );
}
