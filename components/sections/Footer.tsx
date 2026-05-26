"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PrimaryButton } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionHeader";
import { footerLinks, socialLinks } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

export function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <footer ref={ref} className="relative bg-black overflow-hidden border-t border-white/[0.06]">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[220px] bg-purple-900/[0.08] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">

        {/* Newsletter */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 border-b border-white/[0.07]"
        >
          <div className="max-w-sm">
            <SectionEyebrow>Stay in the loop</SectionEyebrow>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Ride first.{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                Know first.
              </span>
            </h3>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              New models, exclusive drops, and rider events from Voltis Emoto — straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-auto shrink-0">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 text-emerald-400 text-sm font-semibold px-6 py-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  You're on the list. Ride on.
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col xs:flex-row gap-2.5 w-full md:w-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 md:w-60 bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-all duration-200"
                  />
                  <PrimaryButton type="submit" className="px-6 py-3.5 rounded-2xl text-sm whitespace-nowrap w-full xs:w-auto">
                    Subscribe
                  </PrimaryButton>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Links grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-8 border-b border-white/[0.07]">
          {/* Brand column */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="col-span-2 md:col-span-1 flex flex-col gap-5"
          >
            <Link href="/" className="w-fit group">
              <Image
                src="/voltis-logo.png"
                alt="Voltis Emoto"
                width={48}
                height={48}
                quality={90}
                sizes="48px"
                className="object-contain transition-opacity duration-200 group-hover:opacity-70"
              />
            </Link>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-[220px]">
              Engineering the future of electric performance. Built for those who push limits.
            </p>
            <div className="flex gap-2 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 hover:shadow-[0_0_14px_rgba(168,85,247,0.3)] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links], gi) => (
            <motion.div
              key={group}
              variants={fadeUp(0.15 + gi * 0.08)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col gap-4"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold">{group}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp(0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-gray-600"
        >
          <p>© {new Date().getFullYear()} Voltis Emoto. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              { label: "Privacy Policy",   href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Preferences", href: "#" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-gray-400 transition-colors duration-200 whitespace-nowrap">
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
