"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";

const reviews = [
  {
    quote: "Honestly didn't expect it to go this hard. The torque is actually insane and it feels way lighter than I thought. Been taking it through trails every weekend and it absolutely rips. Had a few people stop me already asking what bike it is.",
    name: "Jayden M.",
    location: "Gold Coast, QLD",
    initials: "JM",
  },
  {
    quote: "This thing is clean. Photos don't even do it justice. Suspension feels mint and it pulls way harder than my old setup. You can cruise streets or hit dirt without it feeling sketchy.",
    name: "Cooper L.",
    location: "Newcastle, NSW",
    initials: "CL",
  },
  {
    quote: "Was lowkey nervous ordering online but everything turned out sweet. Bike came looking unreal and setup was easy. Definitely feels like a proper premium build compared to cheaper e-bikes.",
    name: "Noah S.",
    location: "Perth, WA",
    initials: "NS",
  },
  {
    quote: "Everyone says these are fun but you don't really get it till you ride one. It's stupidly quick and dead quiet which makes it even cooler somehow.",
    name: "Blake W.",
    location: "Central Coast, NSW",
    initials: "BW",
  },
];

const stats = [
  { value: "4.9", suffix: "★", label: "Average Rating" },
  { value: "100%", suffix: "", label: "Australian Owned" },
  { value: "< 24hr", suffix: "", label: "Support Response" },
];

function StarRow() {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-[13px] h-[13px] fill-purple-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div className="flex items-center gap-1 text-[9.5px] font-semibold text-emerald-500/60 uppercase tracking-wider">
      <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Verified Rider
    </div>
  );
}

export function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-black py-16 md:py-24 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[55vw] h-[65vh] bg-purple-900/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[45vh] bg-violet-900/[0.07] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-5"
        >
          <div>
            <SectionEyebrow>Rider Stories</SectionEyebrow>
            <SectionHeading>
              Real Riders.{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                Real Rides.
              </span>
            </SectionHeading>
          </div>
          <p className="text-[13px] text-gray-500 max-w-[260px] leading-relaxed md:text-right">
            From the Gold Coast to the Central Coast — here&apos;s what riders are actually saying.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              variants={stagger(i)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl overflow-hidden
                hover:-translate-y-1.5 hover:border-white/[0.13] hover:bg-white/[0.04]
                hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)]
                transition-all duration-400 flex flex-col p-6 md:p-7 lg:p-8"
            >
              {/* Accent top border */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06) 0%, transparent 70%)" }} />

              {/* Decorative large quote mark */}
              <div className="absolute top-4 right-5 text-[96px] font-black text-white/[0.035] leading-none select-none pointer-events-none font-serif">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="mb-5 flex items-center justify-between">
                <StarRow />
                <VerifiedBadge />
              </div>

              {/* Quote */}
              <blockquote className="text-[14.5px] md:text-[15px] text-white/70 leading-[1.82] flex-1 mb-6">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600/35 to-violet-700/25 border border-purple-500/20 flex items-center justify-center text-[10px] font-black text-white/90 shrink-0 tracking-wider">
                  {review.initials}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white leading-none">{review.name}</p>
                  <p className="text-[11px] text-gray-500 mt-[5px] leading-none">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp(0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-8 grid grid-cols-3 rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-5 md:py-6 px-2 md:px-4 text-center ${
                i < stats.length - 1 ? "border-r border-white/[0.06]" : ""
              }`}
            >
              <span className="text-lg md:text-2xl font-black bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent leading-none">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="text-[8.5px] md:text-[9.5px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-600 mt-2 leading-none">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
