"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BikePageData } from "@/lib/bikeData";

type Props = {
  bike: BikePageData;
  isOpen: boolean;
  onClose: () => void;
  /** Label of the currently selected colour variant, e.g. "Sage" */
  variantLabel?: string;
};

const TIMEFRAME_OPTIONS = [
  { value: "within-1-week",  label: "Within 1 week" },
  { value: "1-2-weeks",      label: "1–2 weeks" },
  { value: "2-4-weeks",      label: "2–4 weeks" },
  { value: "flexible",       label: "Flexible — no rush" },
];

export function ReservationModal({ bike, isOpen, onClose, variantLabel }: Props) {
  const [step, setStep]         = useState<"form" | "success">("form");
  const [name, setName]         = useState("");
  const [mobile, setMobile]     = useState("");
  const [email, setEmail]       = useState("");
  const [location, setLocation] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [notes, setNotes]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [focused, setFocused]   = useState<string | null>(null);

  // Close handler — resets form after exit animation plays
  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setName(""); setMobile(""); setEmail("");
      setLocation(""); setTimeframe(""); setNotes("");
      setLoading(false); setError(null);
    }, 380);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  const canSubmit = name.trim() && mobile.trim() && email.trim() && timeframe;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      name.trim(),
          email:     email.trim(),
          mobile:    mobile.trim(),
          bike:      bike.name,
          variant:   variantLabel ?? "",
          location:  location.trim(),
          timeframe,
          notes:     notes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStep("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Accent-tinted focus border for inputs
  const fieldStyle = (field: string) => ({
    borderColor:   focused === field ? `${bike.accentHex}55` : "rgba(255,255,255,0.08)",
    background:    focused === field ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.025)",
    color:         "#fff",
    outline:       "none",
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-xl"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* ── Panel ───────────────────────────────────────────────────── */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-title"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-[100] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Outer glow */}
            <div
              className="absolute -inset-px rounded-2xl pointer-events-none"
              style={{ boxShadow: `0 0 80px ${bike.accentHex}10` }}
            />

            <div
              className="relative rounded-2xl border overflow-hidden"
              style={{ borderColor: `${bike.accentHex}28`, background: "#070707", maxHeight: "92svh", overflowY: "auto" }}
            >
              {/* Accent hairline */}
              <div
                className="sticky top-0 inset-x-0 h-[1.5px] pointer-events-none z-20"
                style={{ background: `linear-gradient(to right, transparent, ${bike.accentHex}90, transparent)` }}
              />
              {/* Radial glow bg */}
              <div
                className="absolute top-0 right-0 w-2/3 h-48 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 90% 0%, ${bike.accentHex}07, transparent 65%)` }}
              />

              <AnimatePresence mode="wait">
                {/* ══ FORM STATE ══════════════════════════════════════════════ */}
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 pt-6 pb-0">
                      <div>
                        <p
                          className="text-[9px] uppercase tracking-[0.48em] font-bold mb-1.5"
                          style={{ color: bike.accentHex }}
                        >
                          Reserve &amp; Pay on Pickup
                        </p>
                        <h2
                          id="reservation-title"
                          className="text-[1.3rem] font-black tracking-tight text-white leading-snug"
                        >
                          Reserve Your {bike.name}
                        </h2>
                      </div>
                      <button
                        onClick={handleClose}
                        aria-label="Close"
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200 shrink-0 ml-4 mt-0.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Trust banner */}
                    <div className="mx-6 mt-4">
                      <div
                        className="rounded-xl px-4 py-3.5 border"
                        style={{ borderColor: `${bike.accentHex}22`, background: `${bike.accentHex}09` }}
                      >
                        <p className="text-[12px] text-gray-300 leading-relaxed">
                          Reserve your bike online and{" "}
                          <span className="text-white font-semibold">inspect it in person</span>{" "}
                          before completing payment.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5">
                          {[
                            "No upfront payment required",
                            "Pickup available by appointment",
                            "Secure reservation process",
                          ].map((item) => (
                            <span
                              key={item}
                              className="flex items-center gap-1.5 text-[8.5px] uppercase tracking-[0.32em] text-gray-500"
                            >
                              <span
                                className="w-[5px] h-[5px] rounded-full shrink-0"
                                style={{ background: bike.accentHex }}
                              />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 pt-5 pb-6">
                      <div className="space-y-3.5">

                        {/* Selected Bike + Variant — read-only */}
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.42em] text-gray-600 font-semibold mb-1.5">
                            Selected Bike
                          </p>
                          <div
                            className="w-full px-3.5 py-[10px] rounded-sm text-[12.5px] font-semibold border flex items-center justify-between"
                            style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                          >
                            <span style={{ color: bike.accentHex }}>
                              {bike.name}
                              {variantLabel && (
                                <span className="text-gray-500 font-normal ml-1.5">· {variantLabel}</span>
                              )}
                            </span>
                            <svg
                              className="w-3 h-3 opacity-50 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              style={{ color: bike.accentHex }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Full Name */}
                        <div>
                          <label htmlFor="res-name" className="block text-[9px] uppercase tracking-[0.42em] text-gray-600 font-semibold mb-1.5">
                            Full Name <span className="normal-case lowercase tracking-normal text-red-500/60">*</span>
                          </label>
                          <input
                            id="res-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            placeholder="Your full name"
                            autoComplete="name"
                            required
                            className="w-full px-3.5 py-[10px] rounded-sm text-[13px] placeholder-gray-700 border transition-all duration-200"
                            style={fieldStyle("name")}
                          />
                        </div>

                        {/* Mobile */}
                        <div>
                          <label htmlFor="res-mobile" className="block text-[9px] uppercase tracking-[0.42em] text-gray-600 font-semibold mb-1.5">
                            Mobile Number <span className="normal-case lowercase tracking-normal text-red-500/60">*</span>
                          </label>
                          <input
                            id="res-mobile"
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            onFocus={() => setFocused("mobile")}
                            onBlur={() => setFocused(null)}
                            placeholder="+61 4XX XXX XXX"
                            autoComplete="tel"
                            required
                            className="w-full px-3.5 py-[10px] rounded-sm text-[13px] placeholder-gray-700 border transition-all duration-200"
                            style={fieldStyle("mobile")}
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="res-email" className="block text-[9px] uppercase tracking-[0.42em] text-gray-600 font-semibold mb-1.5">
                            Email Address <span className="normal-case lowercase tracking-normal text-red-500/60">*</span>
                          </label>
                          <input
                            id="res-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            placeholder="you@email.com"
                            autoComplete="email"
                            required
                            className="w-full px-3.5 py-[10px] rounded-sm text-[13px] placeholder-gray-700 border transition-all duration-200"
                            style={fieldStyle("email")}
                          />
                        </div>

                        {/* Preferred Pickup Location */}
                        <div>
                          <label htmlFor="res-location" className="flex items-center gap-2 text-[9px] uppercase tracking-[0.42em] text-gray-600 font-semibold mb-1.5">
                            Preferred Pickup Location
                            <span className="normal-case lowercase tracking-normal text-gray-700 font-normal text-[9px]">optional</span>
                          </label>
                          <input
                            id="res-location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onFocus={() => setFocused("location")}
                            onBlur={() => setFocused(null)}
                            placeholder="e.g. Sydney, Melbourne, Brisbane…"
                            autoComplete="address-level2"
                            className="w-full px-3.5 py-[10px] rounded-sm text-[13px] placeholder-gray-700 border transition-all duration-200"
                            style={fieldStyle("location")}
                          />
                        </div>

                        {/* Preferred Pickup Timeframe */}
                        <div>
                          <label htmlFor="res-timeframe" className="block text-[9px] uppercase tracking-[0.42em] text-gray-600 font-semibold mb-1.5">
                            Preferred Pickup Timeframe <span className="normal-case lowercase tracking-normal text-red-500/60">*</span>
                          </label>
                          <div className="relative">
                            <select
                              id="res-timeframe"
                              value={timeframe}
                              onChange={(e) => setTimeframe(e.target.value)}
                              onFocus={() => setFocused("timeframe")}
                              onBlur={() => setFocused(null)}
                              required
                              className="w-full px-3.5 py-[10px] rounded-sm text-[13px] border appearance-none cursor-pointer transition-all duration-200"
                              style={{
                                ...fieldStyle("timeframe"),
                                color: timeframe ? "#fff" : "rgba(255,255,255,0.3)",
                              }}
                            >
                              <option value="" disabled style={{ background: "#111", color: "#555" }}>
                                Select a timeframe…
                              </option>
                              {TIMEFRAME_OPTIONS.map((opt) => (
                                <option
                                  key={opt.value}
                                  value={opt.value}
                                  style={{ background: "#111", color: "#fff" }}
                                >
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
                              <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Notes — optional */}
                        <div>
                          <label htmlFor="res-notes" className="flex items-center gap-2 text-[9px] uppercase tracking-[0.42em] text-gray-600 font-semibold mb-1.5">
                            Notes
                            <span className="normal-case lowercase tracking-normal text-gray-700 font-normal text-[9px]">optional</span>
                          </label>
                          <textarea
                            id="res-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            onFocus={() => setFocused("notes")}
                            onBlur={() => setFocused(null)}
                            placeholder="Any questions or special requests…"
                            rows={2}
                            className="w-full px-3.5 py-[10px] rounded-sm text-[13px] placeholder-gray-700 border resize-none transition-all duration-200"
                            style={fieldStyle("notes")}
                          />
                        </div>
                      </div>

                      {/* Error message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 flex items-start gap-2.5 rounded-lg px-3.5 py-3 border border-red-500/20 bg-red-500/[0.07]"
                          >
                            <svg className="w-3.5 h-3.5 mt-[1px] shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                            <p className="text-[12px] text-red-400 leading-snug">{error}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={!canSubmit || loading}
                        className="mt-5 w-full py-[13px] rounded-sm text-[12px] font-bold uppercase tracking-[0.18em] transition-all duration-200 active:scale-[0.98]"
                        style={{
                          background:  canSubmit && !loading ? bike.accentHex : "rgba(255,255,255,0.05)",
                          color:       canSubmit && !loading ? "#fff" : "rgba(255,255,255,0.28)",
                          boxShadow:   canSubmit && !loading ? `0 4px 28px ${bike.accentHex}45, inset 0 1px 0 rgba(255,255,255,0.1)` : "none",
                          cursor:      canSubmit && !loading ? "pointer" : "not-allowed",
                        }}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Submitting…
                          </span>
                        ) : (
                          "Submit Reservation Request"
                        )}
                      </button>

                      <p className="mt-3 text-center text-[8.5px] uppercase tracking-[0.28em] text-gray-700">
                        No payment required to reserve · Secure &amp; confidential
                      </p>
                    </form>
                  </motion.div>
                )}

                {/* ══ SUCCESS STATE ════════════════════════════════════════════ */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="px-6 py-8 text-center"
                  >
                    {/* Animated checkmark */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: `${bike.accentHex}18`,
                        border: `1.5px solid ${bike.accentHex}45`,
                        boxShadow: `0 0 32px ${bike.accentHex}15`,
                      }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        style={{ color: bike.accentHex }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 }}
                    >
                      <p
                        className="text-[9px] uppercase tracking-[0.48em] font-bold mb-2"
                        style={{ color: bike.accentHex }}
                      >
                        Request Received
                      </p>
                      <h3 className="text-[1.5rem] font-black text-white tracking-tight leading-tight mb-3">
                        Reservation<br />Submitted
                      </h3>
                      <p className="text-[12.5px] text-gray-400 leading-relaxed max-w-[280px] mx-auto">
                        Reservation submitted successfully. We&rsquo;ll contact you shortly.
                      </p>

                      {/* What happens next */}
                      <div
                        className="mt-5 px-4 py-4 rounded-xl border text-left"
                        style={{ borderColor: `${bike.accentHex}20`, background: `${bike.accentHex}07` }}
                      >
                        <p className="text-[8.5px] uppercase tracking-[0.4em] text-gray-600 mb-3">
                          What happens next
                        </p>
                        <div className="space-y-2.5">
                          {[
                            "You'll receive a confirmation email shortly",
                            "Our team reviews your request within 24 hours",
                            "We'll book your appointment at our showroom",
                          ].map((text, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span
                                className="text-[10px] font-black tabular-nums shrink-0 mt-px"
                                style={{ color: `${bike.accentHex}55` }}
                              >
                                0{i + 1}
                              </span>
                              <span className="text-[11.5px] text-gray-400 leading-snug">{text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.38 }}
                      onClick={handleClose}
                      className="mt-6 w-full py-[13px] rounded-sm text-[12px] font-bold uppercase tracking-[0.18em] transition-all duration-200 active:scale-[0.98]"
                      style={{
                        background: bike.accentHex,
                        color: "#fff",
                        boxShadow: `0 4px 24px ${bike.accentHex}45, inset 0 1px 0 rgba(255,255,255,0.1)`,
                      }}
                    >
                      Done
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
