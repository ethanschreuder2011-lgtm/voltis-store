"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import { ease } from "@/lib/animations";
import { scrollTo } from "@/lib/utils";

function NavLink({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const isActive = href.startsWith("/") && pathname === href;

  const baseCls = `relative group flex items-center leading-none text-[10.5px] font-semibold uppercase tracking-[0.22em] transition-all duration-200 ${
    isActive ? "text-white" : "text-white/45 hover:text-white/90"
  }`;

  // Dot is absolutely positioned below the text — kept out of the layout flow
  // so it doesn't affect the height/alignment of the nav row.
  const indicator = (
    <motion.span
      className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-purple-400 pointer-events-none"
      initial={false}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.18 }}
    />
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={baseCls}>
        {label}
        {indicator}
      </Link>
    );
  }

  return (
    <button onClick={() => scrollTo(href)} className={baseCls}>
      {label}
      <motion.span
        className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-purple-400/70 pointer-events-none"
        initial={false}
        animate={{ opacity: 0, scale: 0.4 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
      />
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-3xl border-b border-white/[0.055]"
            : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px]"
        }`}
      >
        {/* Top accent line — only when not scrolled */}
        <motion.div
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/35 to-transparent pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 h-[66px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0 z-10">
            <div className="flex flex-col justify-center leading-none gap-[3px]">
              <span className="text-[14px] font-black tracking-[0.26em] text-white group-hover:text-white/85 transition-colors duration-200 uppercase leading-none">
                Voltis
              </span>
              <span className="text-[7px] uppercase tracking-[0.44em] text-white/30 group-hover:text-white/45 font-semibold transition-colors duration-200 leading-none">
                Emoto
              </span>
            </div>
            <div className="hidden sm:block w-px h-[22px] bg-white/[0.08] ml-0.5" />
          </Link>

          {/* Desktop nav — true center via absolute */}
          <nav
            className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation"
          >
            {navLinks.map((l) => (
              <NavLink key={l.label} label={l.label} href={l.href} />
            ))}
          </nav>

          {/* Right side — CTA + hamburger */}
          <div className="flex items-center gap-4 shrink-0 z-10">
            {/* Shop Now */}
            <button
              onClick={() => scrollTo("#bikes")}
              className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white bg-purple-600/90 hover:bg-purple-500 border border-purple-500/40 hover:border-purple-400/60 px-5 py-2.5 rounded-full transition-all duration-250 active:scale-95 shadow-[0_0_18px_rgba(168,85,247,0.2)] hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]"
            >
              Shop Now
              <svg
                className="w-3 h-3 opacity-75 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden relative w-11 h-11 flex flex-col justify-center items-center gap-[5.5px] -mr-1.5"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="block h-[1.5px] w-[22px] bg-white rounded-full origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-[1.5px] w-[22px] bg-white rounded-full"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="block h-[1.5px] w-[22px] bg-white rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu — full-panel overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/97 backdrop-blur-2xl md:hidden flex flex-col"
          >
            {/* Top bar — mirrors navbar height, shows text logo */}
            <div className="h-[66px] shrink-0 border-b border-white/[0.05] flex items-center px-6">
              <Link href="/" onClick={() => setOpen(false)} className="flex flex-col leading-none">
                <span className="text-[15px] font-black tracking-[0.26em] text-white uppercase">
                  Voltis
                </span>
                <span className="text-[7px] uppercase tracking-[0.44em] text-white/30 font-semibold mt-[2.5px]">
                  Emoto
                </span>
              </Link>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-8 pt-10 gap-1 flex-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.055, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.href.startsWith("/") ? (
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between py-4 border-b border-white/[0.05] group ${
                        pathname === l.href ? "text-white" : "text-white/40 hover:text-white"
                      } transition-colors duration-200`}
                    >
                      <span className="text-[28px] font-black uppercase tracking-[-0.01em]">{l.label}</span>
                      <svg className="w-4 h-4 opacity-30 group-hover:opacity-70 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollTo(l.href, () => setOpen(false))}
                      className="w-full flex items-center justify-between py-4 border-b border-white/[0.05] text-white/40 hover:text-white transition-colors duration-200 group"
                    >
                      <span className="text-[28px] font-black uppercase tracking-[-0.01em]">{l.label}</span>
                      <svg className="w-4 h-4 opacity-30 group-hover:opacity-70 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  )}
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.055 + 0.05, duration: 0.3 }}
                className="mt-8"
              >
                <button
                  onClick={() => scrollTo("#bikes", () => setOpen(false))}
                  className="w-full flex items-center justify-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-white bg-purple-600 hover:bg-purple-500 px-7 py-4 rounded-full transition-all duration-200 shadow-[0_0_24px_rgba(168,85,247,0.35)] active:scale-[0.98]"
                >
                  Shop Now
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="px-8 py-8 border-t border-white/[0.05]"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                Voltis Emoto · Australian Owned
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
