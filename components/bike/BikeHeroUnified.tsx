"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import { ReservationModal } from "./ReservationModal";
import { ShopifyCheckoutButton } from "./ShopifyCheckoutButton";
import type { BikePageData, BikeVariant } from "@/lib/bikeData";


type Props = {
  bike: BikePageData;
  variants?: BikeVariant[];
  activeVariantId?: string | null;
  onVariantChange?: (id: string) => void;
};

// ── CrossfadeImage — used in desktop panel ────────────────────────────────────
function CrossfadeImage({
  src,
  alt,
  priority = false,
  imgClassName = "object-cover object-center",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  imgClassName?: string;
}) {
  const [layers, setLayers] = useState<{ src: string; id: number; opacity: number }[]>([
    { src, id: 0, opacity: 1 },
  ]);
  const counterRef = useRef(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLayers((prev) => {
      const top = prev[prev.length - 1];
      if (top.src === src) return prev;
      const id = counterRef.current++;
      const next = [...prev, { src, id, opacity: 0 }];
      requestAnimationFrame(() => {
        setLayers((l) =>
          l.map((x) => (x.id === id ? { ...x, opacity: 1 } : { ...x, opacity: 0 }))
        );
      });
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setLayers([{ src, id, opacity: 1 }]);
      }, 650);
      return next;
    });
  }, [src]);

  return (
    <>
      {layers.map((layer) => (
        <div
          key={layer.id}
          className="absolute inset-0"
          style={{ opacity: layer.opacity, transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <Image
            src={layer.src}
            alt={alt}
            fill
            priority={priority && layer.id === 0}
            quality={90}
            sizes="58vw"
            className={imgClassName}
          />
        </div>
      ))}
    </>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function BikeHeroUnified({ bike, variants, activeVariantId, onVariantChange }: Props) {
  const words = bike.name.toUpperCase().split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  const [reservationOpen, setReservationOpen] = useState(false);

  // ── Active variant cart URL (variant-level overrides bike-level) ──────
  const activeVariantCartUrl =
    variants?.find((v) => v.id === activeVariantId)?.shopifyCartUrl ??
    bike.shopifyCartUrl;

  // ── Sticky CTA (mobile only) ─────────────────────────────────────────
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Gallery + lightbox (mobile only) ────────────────────────────────
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const lbTouchStartX = useRef<number | null>(null);
  const lbTouchCurrentX = useRef<number>(0);

  // ── Gallery carousel (mobile only) ──────────────────────────────────
  const [galleryActiveIdx, setGalleryActiveIdx] = useState(0);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const gallerySlideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollGalleryTo = (idx: number) => {
    const el = galleryScrollRef.current;
    const slide = gallerySlideRefs.current[idx];
    if (!el || !slide) return;
    const left = slide.offsetLeft + slide.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  const handleGalleryScroll = () => {
    const el = galleryScrollRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    gallerySlideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      const dist = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setGalleryActiveIdx(closest);
  };

  // Reset gallery + lightbox on bike/variant change
  useEffect(() => {
    setLightboxIdx(null);
    setGalleryActiveIdx(0);
    const el = galleryScrollRef.current;
    if (el) el.scrollLeft = 0;
  }, [bike.heroImage]);

  // Escape key closes lightbox
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxIdx(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // All images for lightbox: hero first, then deduped gallery
  const allImages = useMemo(() => {
    const seen = new Set<string>([bike.heroImage]);
    const imgs: string[] = [bike.heroImage];
    for (const src of bike.galleryImages ?? []) {
      if (!seen.has(src)) {
        seen.add(src);
        imgs.push(src);
      }
    }
    return imgs;
  }, [bike.heroImage, bike.galleryImages]);

  // Secondary images only — hero is shown prominently above
  const galleryImages = useMemo(() => allImages.slice(1), [allImages]);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const lightboxNext = () => setLightboxIdx((i) => (i !== null ? Math.min(i + 1, allImages.length - 1) : null));
  const lightboxPrev = () => setLightboxIdx((i) => (i !== null ? Math.max(i - 1, 0) : null));

  const onLbTouchStart = (e: React.TouchEvent) => {
    lbTouchStartX.current = e.touches[0].clientX;
    lbTouchCurrentX.current = e.touches[0].clientX;
  };
  const onLbTouchMove = (e: React.TouchEvent) => {
    lbTouchCurrentX.current = e.touches[0].clientX;
  };
  const onLbTouchEnd = () => {
    if (lbTouchStartX.current === null) return;
    const delta = lbTouchCurrentX.current - lbTouchStartX.current;
    if (Math.abs(delta) > 44) {
      if (delta < 0) lightboxNext();
      else lightboxPrev();
    }
    lbTouchStartX.current = null;
  };

  return (
    <>
      <ReservationModal bike={bike} isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />

      {/* ── Sticky mobile purchase bar ─────────────────────────────────────── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            key="sticky-cta"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div
              className="border-t bg-black/[0.97] backdrop-blur-2xl px-4 py-2.5 flex items-center gap-3"
              style={{ borderColor: `${bike.accentHex}20` }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="text-[7.5px] uppercase tracking-[0.4em] leading-none font-semibold"
                  style={{ color: `${bike.accentHex}65` }}
                >
                  {bike.isPreOrder ? "Pre-Order from" : "Starting from"}
                </p>
                <p className="text-[18px] font-black text-white mt-[3px] leading-none">
                  ${bike.price.toLocaleString()}
                  {bike.currencyLabel && (
                    <span className="text-[10px] text-gray-500 font-normal ml-1.5">{bike.currencyLabel}</span>
                  )}
                </p>
                <p className="text-[8px] text-gray-700 mt-[3px] leading-none tracking-[0.2em] uppercase">
                  Free delivery · 2 yr warranty
                </p>
              </div>
              <ShopifyCheckoutButton
                shopifyHandle={bike.shopifyHandle}
                shopifyCartUrl={activeVariantCartUrl}
                className="shrink-0 px-5 py-[11px] rounded-sm text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200 active:scale-[0.97]"
                style={{
                  background: bike.accentHex,
                  color: "#fff",
                  boxShadow: `0 4px 20px ${bike.accentHex}50, inset 0 1px 0 rgba(255,255,255,0.1)`,
                }}
              >
                {bike.isPreOrder ? "Pre-Order Now" : "Buy Now"}
              </ShopifyCheckoutButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  MOBILE LAYOUT  ·  hero image + info panel + gallery grid      ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section className="md:hidden bg-black overflow-hidden">

        {/* ── Hero image — single, full-bike, object-contain ──────────────── */}
        <div
          className="relative w-full bg-black"
          style={{ height: "65vh", minHeight: "300px", maxHeight: "560px" }}
        >
          {/* Top scrim — navbar legibility only */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/65 to-transparent pointer-events-none z-10" />

          {/* Back link */}
          <Link
            href="/"
            className="absolute top-[72px] left-5 z-20 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] transition-opacity duration-200 hover:opacity-100 opacity-80"
            style={{ color: `${bike.accentHex}cc` }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            Back
          </Link>

          {/* Tag badge */}
          <div className="absolute top-[70px] right-5 z-20">
            <span className={`inline-block text-[9px] uppercase tracking-[0.38em] font-bold px-3 py-[5px] rounded-sm border ${bike.tagColor}`}>
              {bike.tag}
            </span>
          </div>

          {/* Bike image — object-contain so the full bike is always visible */}
          <Image
            src={bike.heroImage}
            alt={bike.name}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-contain"
            style={{ padding: "8px 16px 4px" }}
          />

          {/* Expand hint — bottom-right, very subtle */}
          <button
            onClick={() => openLightbox(0)}
            aria-label="Expand image"
            className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.28em] text-white/30 hover:text-white/55 transition-colors duration-200"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
            </svg>
            Expand
          </button>
        </div>

        {/* ── Content panel ─────────────────────────────────────────────── */}
        <div
          className="px-5 pt-4 pb-6"
          style={{ background: "linear-gradient(to bottom, #0d0d0d 0%, #080808 50%, #000 100%)" }}
        >

          {/* Accent divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformOrigin: "left",
              background: `linear-gradient(to right, ${bike.accentHex}cc, ${bike.accentHex}30, transparent)`,
            }}
            className="h-[2px] w-full mb-4"
          />

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="text-[9px] uppercase tracking-[0.48em] font-semibold mb-2"
            style={{ color: `${bike.accentHex}70` }}
          >
            Voltis Emoto
          </motion.p>

          {/* Product name */}
          <div className="flex flex-col leading-[0.84] tracking-[-0.025em]">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`block text-[clamp(2.6rem,11vw,4rem)] font-black uppercase ${
                  restWords
                    ? "text-white"
                    : `bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`
                }`}
              >
                {firstWord}
              </motion.span>
            </div>
            {restWords && (
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`block text-[clamp(2.6rem,11vw,4rem)] font-black uppercase bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}
                >
                  {restWords}
                </motion.span>
              </div>
            )}
          </div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.26 }}
            className="mt-3 flex items-baseline gap-2.5 flex-wrap"
          >
            <span className="text-[2rem] font-black text-white leading-none">
              ${bike.price.toLocaleString()}
            </span>
            {bike.currencyLabel && (
              <span className="text-[13px] font-bold text-gray-500 tracking-wider leading-none">
                {bike.currencyLabel}
              </span>
            )}
            {!bike.isPreOrder && (
              <span className="text-[10px] text-gray-600 uppercase tracking-widest leading-none">
                Starting
              </span>
            )}
            {bike.isPreOrder && (
              <span className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                  style={{ background: bike.accentHex }}
                />
                <span className="text-[9.5px] text-gray-500 font-medium uppercase tracking-wide leading-none">
                  Pre-Order from
                </span>
              </span>
            )}
          </motion.div>

          {/* ── Trust indicators ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
            className="mt-4 grid grid-cols-2 gap-x-4 gap-y-[11px] py-3.5 border-t border-b"
            style={{ borderColor: "rgba(255,255,255,0.055)" }}
          >
            {([
              { label: bike.isPreOrder ? "Limited Availability" : "In Stock",    d: "M5 13l4 4L19 7" },
              { label: "Ships Australia Wide",                                    d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "2 Year Warranty",                                         d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.333 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
              { label: "Secure Checkout",                                         d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
            ] as { label: string; d: string }[]).map(({ label, d }) => (
              <div key={label} className="flex items-center gap-2">
                <svg
                  className="w-[11px] h-[11px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: `${bike.accentHex}85` }}
                >
                  <path d={d} />
                </svg>
                <span className="text-[10.5px] text-gray-400 font-medium leading-tight">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── Colour selector — only when multiple variants exist ────────── */}
          {variants && variants.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.37 }}
              className="mt-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.42em] text-gray-500 font-semibold">
                  Colour
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeVariantId ?? "none"}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] font-semibold"
                    style={{ color: bike.accentHex }}
                  >
                    {variants.find((v) => v.id === activeVariantId)?.label ?? ""}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-2.5">
                {variants.map((variant) => {
                  const isActive = activeVariantId === variant.id;
                  const isAvail = variant.available !== false;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => isAvail && onVariantChange?.(variant.id)}
                      disabled={!isAvail}
                      title={isAvail ? variant.label : `${variant.label} — Coming Soon`}
                      className="relative flex items-center justify-center w-9 h-9 rounded-full focus:outline-none transition-all duration-300"
                      style={{
                        boxShadow: isActive
                          ? `0 0 0 1.5px #000, 0 0 0 3px ${bike.accentHex}`
                          : "none",
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-white/10"
                        style={{
                          background: variant.colorHex,
                          opacity: isAvail ? 1 : 0.25,
                          transform: isActive ? "scale(1.15)" : "scale(1)",
                          transition: "transform 200ms",
                        }}
                      />
                      {!isAvail && (
                        <svg className="absolute inset-0 w-9 h-9 pointer-events-none" viewBox="0 0 36 36" fill="none">
                          <line x1="11" y1="11" x2="25" y2="25" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : bike.edition ? (
            /* Single-version edition label — replaces colour selector */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.37 }}
              className="mt-4 flex items-center gap-2.5"
            >
              <div className="w-3 h-px" style={{ background: `${bike.accentHex}60` }} />
              <span
                className="text-[9.5px] uppercase tracking-[0.42em] font-semibold"
                style={{ color: `${bike.accentHex}70` }}
              >
                {bike.edition}
              </span>
            </motion.div>
          ) : null}

          {/* ── CTAs ──────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 flex flex-col gap-2.5"
          >
            {/* Primary */}
            <ShopifyCheckoutButton
              shopifyHandle={bike.shopifyHandle}
              shopifyCartUrl={activeVariantCartUrl}
              className="block w-full text-center py-[14px] rounded-sm text-[12px] font-bold uppercase tracking-[0.18em] transition-all duration-200 active:scale-[0.98]"
              style={{
                background: bike.accentHex,
                color: "#fff",
                boxShadow: `0 4px 28px ${bike.accentHex}50, inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              {bike.isPreOrder ? "Pre-Order Now" : "Buy Now"}
            </ShopifyCheckoutButton>

            {/* Secondary */}
            <button
              onClick={() => setReservationOpen(true)}
              className="block w-full text-center py-[12px] rounded-sm text-[11px] font-semibold uppercase tracking-[0.15em] border transition-all duration-200 active:scale-[0.98]"
              style={{
                color: `${bike.accentHex}90`,
                borderColor: `${bike.accentHex}25`,
                background: `${bike.accentHex}08`,
              }}
            >
              Reserve &amp; Pay on Pickup
            </button>
          </motion.div>

          {/* ── Trust indicators (CTA area) ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.56 }}
            className="mt-4 flex flex-wrap gap-x-4 gap-y-2"
          >
            {[
              { icon: "✓", label: "Inspect Before Payment" },
              { icon: "✓", label: "Australian Pickup Support" },
              { icon: "✓", label: "Secure Reservation Process" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[10px] text-gray-600">
                <span className="text-[9px]" style={{ color: `${bike.accentHex}70` }}>{icon}</span>
                {label}
              </span>
            ))}
          </motion.div>

          {/* ── Social proof ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-5 flex items-center gap-3"
          >
            <div className="flex-1 h-px bg-white/[0.05]" />
            <p className="text-[8.5px] uppercase tracking-[0.35em] text-gray-700 text-center shrink-0">
              Voltis Emoto · Australian Electric Performance
            </p>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </motion.div>
        </div>

        {/* Sentinel — triggers sticky purchase bar */}
        <div ref={sentinelRef} className="h-px pointer-events-none" aria-hidden="true" />

        {/* ── Gallery carousel ─────────────────────────────────────────── */}
        {galleryImages.length > 0 && (
          <div
            className="pb-[max(2.5rem,env(safe-area-inset-bottom,2.5rem))]"
            style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
          >

            {/* Section header */}
            <div className="px-5 pt-5 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-px" style={{ background: `linear-gradient(to right, ${bike.accentHex}, transparent)` }} />
                <p className="text-[10px] uppercase tracking-[0.44em] text-gray-500 font-semibold">Gallery</p>
              </div>
              <p className="text-[9px] tabular-nums tracking-[0.25em] text-gray-600 font-medium">
                {galleryActiveIdx + 1} / {galleryImages.length}
              </p>
            </div>

            {/* Peek carousel — 84vw slides, 8vw padding each side */}
            <div
              ref={galleryScrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                paddingLeft: "8vw",
                paddingRight: "8vw",
                gap: "10px",
                scrollPaddingLeft: "8vw",
                scrollPaddingRight: "8vw",
              } as React.CSSProperties}
              onScroll={handleGalleryScroll}
            >
              {galleryImages.map((src, i) => {
                const isActive = i === galleryActiveIdx;
                return (
                  <div
                    ref={(el) => { gallerySlideRefs.current[i] = el; }}
                    key={src}
                    className="snap-center shrink-0"
                    style={{ width: "84vw" }}
                  >
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.96 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        onClick={() => openLightbox(i + 1)}
                        aria-label={`${bike.name} — image ${i + 2}`}
                        className="relative w-full overflow-hidden rounded-[3px] bg-[#0c0c0c] active:scale-[0.98] transition-transform duration-150"
                        style={{
                          aspectRatio: "3/2",
                          border: `1px solid ${isActive ? bike.accentHex + "35" : "rgba(255,255,255,0.04)"}`,
                          boxShadow: isActive ? `0 8px 32px ${bike.accentHex}18, 0 2px 8px rgba(0,0,0,0.6)` : "0 2px 8px rgba(0,0,0,0.4)",
                        }}
                      >
                        <Image
                          src={src}
                          alt={`${bike.name} — view ${i + 2}`}
                          fill
                          quality={90}
                          sizes="(max-width: 768px) 85vw, 40vw"
                          className="object-contain brightness-[1.05]"
                          style={{ padding: "8px 10px" }}
                        />
                        {/* Expand hint on active slide */}
                        {isActive && (
                          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 text-[8px] uppercase tracking-[0.28em] text-white/25">
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                            </svg>
                            Expand
                          </div>
                        )}
                      </button>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Navigation — arrows + dots */}
            <div className="flex items-center justify-between px-5 mt-4">

              {/* Prev arrow */}
              <button
                onClick={() => scrollGalleryTo(Math.max(0, galleryActiveIdx - 1))}
                aria-label="Previous image"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-gray-600 hover:text-white hover:border-white/20 transition-all duration-200 active:scale-90"
                style={{ opacity: galleryActiveIdx === 0 ? 0.3 : 1, transition: "opacity 0.2s, transform 0.15s, border-color 0.2s, color 0.2s" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Pill dots */}
              <div className="flex items-center gap-[5px]">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollGalleryTo(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className="flex items-center justify-center py-1.5"
                  >
                    <span
                      className="block rounded-full"
                      style={{
                        width: i === galleryActiveIdx ? 18 : 4,
                        height: 4,
                        background: i === galleryActiveIdx ? bike.accentHex : "rgba(255,255,255,0.16)",
                        transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s",
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Next arrow */}
              <button
                onClick={() => scrollGalleryTo(Math.min(galleryImages.length - 1, galleryActiveIdx + 1))}
                aria-label="Next image"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-gray-600 hover:text-white hover:border-white/20 transition-all duration-200 active:scale-90"
                style={{ opacity: galleryActiveIdx === galleryImages.length - 1 ? 0.3 : 1, transition: "opacity 0.2s, transform 0.15s, border-color 0.2s, color 0.2s" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── Lightbox (mobile only) ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[80] md:hidden bg-black flex flex-col"
            onTouchStart={onLbTouchStart}
            onTouchMove={onLbTouchMove}
            onTouchEnd={onLbTouchEnd}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 shrink-0" style={{ paddingTop: "max(60px, env(safe-area-inset-top, 60px))" }}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-gray-600 pb-3">
                {lightboxIdx + 1} / {allImages.length}
              </span>
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="w-9 h-9 mb-3 flex items-center justify-center rounded-full bg-white/[0.07] border border-white/10 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIdx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={allImages[lightboxIdx]}
                    alt={`${bike.name} — image ${lightboxIdx + 1}`}
                    fill
                    quality={95}
                    sizes="100vw"
                    className="object-contain"
                    style={{ padding: "12px 20px" }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={lightboxPrev}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/60 hover:text-white transition-all duration-200"
                    style={{ opacity: lightboxIdx === 0 ? 0 : 1, pointerEvents: lightboxIdx === 0 ? "none" : "auto" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={lightboxNext}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/60 hover:text-white transition-all duration-200"
                    style={{ opacity: lightboxIdx === allImages.length - 1 ? 0 : 1, pointerEvents: lightboxIdx === allImages.length - 1 ? "none" : "auto" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Dot strip */}
            {allImages.length > 1 && (
              <div
                className="flex items-center justify-center gap-[6px] shrink-0 py-6"
                style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
              >
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    aria-label={`View image ${i + 1}`}
                    className="p-1"
                  >
                    <span
                      className="block rounded-full"
                      style={{
                        width: i === lightboxIdx ? 16 : 4,
                        height: 4,
                        background: i === lightboxIdx ? bike.accentHex : "rgba(255,255,255,0.20)",
                        transition: "width 0.28s cubic-bezier(0.16,1,0.3,1), background 0.28s",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  DESKTOP LAYOUT  ·  unchanged side-by-side composition          ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section className="hidden md:flex relative min-h-screen overflow-hidden bg-black">

        {/* Left content panel */}
        <div className="relative z-20 w-[48%] flex flex-col justify-center px-14 pt-28 pb-44">

          {/* Accent edge bar */}
          <div
            className="absolute left-0 top-1/4 bottom-1/4 w-[3px]"
            style={{ background: `linear-gradient(to bottom, transparent, ${bike.accentHex}, transparent)` }}
          />

          {/* Back link */}
          <div className="absolute top-24 left-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] transition-colors duration-200"
              style={{ color: `${bike.accentHex}70` }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
              </svg>
              Back
            </Link>
          </div>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 self-start mb-8"
          >
            <span className={`inline-block text-[10px] uppercase tracking-[0.4em] font-bold px-3.5 py-1.5 rounded-sm border ${bike.tagColor}`}>
              {bike.tag}
            </span>
            {bike.isPreOrder && (
              <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] font-semibold text-gray-500">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: bike.accentHex }}
                />
                Limited Availability
              </span>
            )}
          </motion.div>

          {/* Name — stacked massive type */}
          <div className="flex flex-col leading-[0.82] tracking-[-0.03em]">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`block text-[clamp(3rem,8vw,7.5rem)] font-black uppercase ${
                  restWords
                    ? "text-white"
                    : `bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`
                }`}
              >
                {firstWord}
              </motion.span>
            </div>
            {restWords && (
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className={`block text-[clamp(3rem,8vw,7.5rem)] font-black uppercase bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent`}
                >
                  {restWords}
                </motion.span>
              </div>
            )}
          </div>

          {/* Slash divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformOrigin: "left",
              background: `linear-gradient(to right, ${bike.accentHex}cc, ${bike.accentHex}40, transparent)`,
            }}
            className="my-7 h-[2px] w-full"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-gray-200 font-semibold uppercase tracking-wide leading-snug"
          >
            {bike.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="mt-3 text-[13px] text-gray-500 max-w-sm leading-relaxed"
          >
            {bike.description}
          </motion.p>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-6 flex items-baseline gap-3 flex-wrap"
          >
            <span className="text-5xl font-black text-white">
              ${bike.price.toLocaleString()}
            </span>
            {bike.currencyLabel && (
              <span className="text-sm font-bold text-gray-500 tracking-wider">
                {bike.currencyLabel}
              </span>
            )}
            <span className="text-xs text-gray-600 uppercase tracking-widest">
              {bike.isPreOrder ? "Pre-Order from" : "Starting"}
            </span>
          </motion.div>

          {/* Colour variant selector — only when multiple variants exist */}
          {variants && variants.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] uppercase tracking-[0.4em] text-gray-600">Colour —</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeVariantId ?? "none"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] font-semibold"
                    style={{ color: bike.accentHex }}
                  >
                    {variants.find((v) => v.id === activeVariantId)?.label ?? ""}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-2.5">
                {variants.map((variant) => {
                  const isActive = activeVariantId === variant.id;
                  const isAvail = variant.available !== false;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => isAvail && onVariantChange?.(variant.id)}
                      disabled={!isAvail}
                      title={isAvail ? variant.label : `${variant.label} — Coming Soon`}
                      className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 focus:outline-none"
                      style={{
                        boxShadow: isActive
                          ? `0 0 0 1.5px #000, 0 0 0 3px ${bike.accentHex}`
                          : "none",
                      }}
                    >
                      <div
                        className="w-[22px] h-[22px] rounded-full border border-white/10 transition-transform duration-200"
                        style={{
                          background: variant.colorHex,
                          opacity: isAvail ? 1 : 0.25,
                          transform: isActive ? "scale(1.1)" : "scale(1)",
                        }}
                      />
                      {!isAvail && (
                        <svg className="absolute inset-0 w-9 h-9 pointer-events-none" viewBox="0 0 36 36" fill="none">
                          <line x1="11" y1="11" x2="25" y2="25" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </button>
                  );
                })}
                <span className="text-[9px] uppercase tracking-widest text-gray-700 ml-1">
                  {variants.some((v) => v.available === false) ? "· More Coming" : ""}
                </span>
              </div>
            </motion.div>
          ) : bike.edition ? (
            /* Single-version edition label — desktop */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-6 flex items-center gap-3"
            >
              <div className="w-4 h-px" style={{ background: `${bike.accentHex}50` }} />
              <span
                className="text-[9px] uppercase tracking-[0.45em] font-semibold"
                style={{ color: `${bike.accentHex}65` }}
              >
                {bike.edition}
              </span>
            </motion.div>
          ) : null}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <ShopifyCheckoutButton
              shopifyHandle={bike.shopifyHandle}
              shopifyCartUrl={bike.shopifyCartUrl}
              className="bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all duration-200 font-semibold tracking-wide shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] px-7 py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider"
            >
              {bike.isPreOrder ? "Pre-Order Now" : "Buy Now"}
            </ShopifyCheckoutButton>
            <GhostButton onClick={() => setReservationOpen(true)} className="px-7 py-3.5 rounded-sm text-sm uppercase tracking-wider">
              Reserve &amp; Pay on Pickup
            </GhostButton>
          </motion.div>

          {/* Trust labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2"
          >
            {[
              "Inspect Before Payment",
              "Australian Pickup Support",
              "Secure Reservation Process",
            ].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                <svg className="w-2.5 h-2.5 shrink-0" style={{ color: `${bike.accentHex}80` }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {label}
              </span>
            ))}
          </motion.div>

          {/* Performance callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 flex items-center gap-4 pl-5 border-l-2"
            style={{ borderColor: `${bike.accentHex}99` }}
          >
            <div>
              <span className="text-3xl font-black" style={{ color: bike.accentHex }}>
                {bike.performanceCallout.value}
              </span>
              <span className="text-sm ml-1" style={{ color: `${bike.accentHex}b3` }}>
                {bike.performanceCallout.unit}
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 leading-tight">
                {bike.performanceCallout.label.split(" · ")[0]}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-gray-700">
                {bike.performanceCallout.label.split(" · ")[1] ?? ""}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: bike image with diagonal clip */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[58%] z-10"
          style={{ clipPath: "polygon(7% 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          <CrossfadeImage src={bike.heroImage} alt={bike.name} priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Radial glow */}
        <div
          className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[40vw] h-[60vh] blur-[160px] rounded-full pointer-events-none"
          style={{ background: bike.glowColor, zIndex: 5 }}
        />

        {/* Badge — top right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute top-24 right-10 z-30"
        >
          <div className="flex flex-col items-end gap-1">
            {bike.badge.split(" · ").map((line, i) => (
              <span
                key={i}
                className="text-[9px] uppercase tracking-[0.4em] font-bold"
                style={{ color: i === 0 ? `${bike.accentHex}80` : "#374151" }}
              >
                {line}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 z-30 border-t-2 bg-black/90 backdrop-blur-xl"
          style={{ borderColor: `${bike.accentHex}4D` }}
        >
          <div className="max-w-7xl mx-auto px-10">
            <div
              className="grid grid-cols-3 divide-x"
              style={{ borderColor: `${bike.accentHex}1A` }}
            >
              {bike.heroStats.map((stat) => (
                <div key={stat.label} className="py-6 px-4 text-center">
                  <p className={`text-2xl font-black uppercase bg-gradient-to-r ${bike.titleGradient} bg-clip-text text-transparent leading-tight`}>
                    {stat.value}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
