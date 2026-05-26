"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import type { BikePageData } from "@/lib/bikeData";

function FAQItem({
  faq,
  isOpen,
  onToggle,
  accentHex,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  accentHex: string;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl transition-all duration-200 hover:border-white/[0.12]"
      style={isOpen ? { borderColor: `${accentHex}30` } : undefined}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 min-h-[52px]">
        <span
          className="text-[13.5px] font-semibold leading-snug transition-colors duration-200"
          style={{ color: isOpen ? accentHex : "white" }}
        >
          {faq.q}
        </span>
        <span
          className="shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? `${accentHex}40` : "rgba(255,255,255,0.1)",
            background: isOpen ? `${accentHex}15` : "transparent",
          }}
        >
          <svg
            className="w-2.5 h-2.5 text-gray-400 transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="px-5 pb-4 text-[13px] text-gray-500 leading-relaxed border-t pt-3"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export function BikeFAQ({ bike }: { bike: BikePageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.8fr] gap-10 md:gap-14 items-start">
          <motion.div
            variants={fadeUp()}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionEyebrow color={bike.accentHex}>FAQ</SectionEyebrow>
            <SectionHeading>
              Common{" "}
              <span className={`bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}>
                Questions
              </span>
            </SectionHeading>
            <p className="mt-4 text-[12px] text-gray-600 leading-relaxed max-w-xs">
              Can't find an answer?{" "}
              <a
                href="mailto:voltisemoto@gmail.com"
                className="text-gray-400 underline underline-offset-4 hover:text-white transition-colors duration-200"
              >
                voltisemoto@gmail.com
              </a>
            </p>
          </motion.div>

          <div className="flex flex-col gap-2.5">
            {bike.faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                variants={stagger(i)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  accentHex={bike.accentHex}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
