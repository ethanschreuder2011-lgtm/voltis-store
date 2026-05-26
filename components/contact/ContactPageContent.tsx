"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type Field = "name" | "email" | "phone" | "inquiryType" | "message";

type FormState = Record<Field, string>;

type SubmitStatus = "idle" | "loading" | "success";

const INQUIRY_OPTIONS = [
  { value: "",         label: "Select inquiry type"  },
  { value: "product",  label: "Product Questions"    },
  { value: "delivery", label: "Delivery Questions"   },
  { value: "warranty", label: "Warranty Support"     },
  { value: "order",    label: "Order Support"        },
  { value: "general",  label: "General Inquiry"      },
];

const EMPTY_FORM: FormState = {
  name: "", email: "", phone: "", inquiryType: "", message: "",
};

// ─── Form component ───────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm]       = useState<FormState>(EMPTY_FORM);
  const [focused, setFocused] = useState<Field | "">("");
  const [status, setStatus]   = useState<SubmitStatus>("idle");

  const set = (k: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const fieldStyle = useCallback(
    (field: Field): React.CSSProperties => ({
      borderColor: focused === field ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.08)",
      background:  focused === field ? "rgba(168,85,247,0.05)" : "rgba(255,255,255,0.03)",
    }),
    [focused]
  );

  const base =
    "w-full rounded-xl px-4 py-3.5 text-[13.5px] text-white placeholder:text-gray-600 outline-none border transition-all duration-200 focus:ring-0";

  const canSubmit =
    form.name.trim() && form.email.trim() && form.inquiryType && form.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || status === "loading") return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
  };

  const handleReset = () => {
    setStatus("idle");
    setForm(EMPTY_FORM);
    setFocused("");
  };

  return (
    <AnimatePresence mode="wait">

      {/* ── Success state ──────────────────────────────────────────────── */}
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center py-16 px-8 gap-7"
        >
          {/* Checkmark */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/40 flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-purple-500/25"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <h3 className="text-[22px] font-black text-white tracking-tight mb-2">
              Message Sent
            </h3>
            <p className="text-gray-400 text-[13.5px] leading-relaxed max-w-[280px]">
              We&rsquo;ll reply to{" "}
              <span className="text-white font-medium">{form.email}</span>{" "}
              within 24 hours on business days.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.ol
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.4 }}
            className="flex flex-col gap-3 text-left w-full max-w-[260px]"
          >
            {[
              "Our team reviews your inquiry",
              "We match it to the right person",
              "You receive a direct, personal reply",
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-[10px] font-black flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-gray-500 text-[12.5px]">{step}</span>
              </li>
            ))}
          </motion.ol>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            onClick={handleReset}
            className="text-[10.5px] uppercase tracking-[0.32em] text-gray-700 hover:text-gray-400 transition-colors duration-200"
          >
            Send another message
          </motion.button>
        </motion.div>

      ) : (

        /* ── Form ──────────────────────────────────────────────────────── */
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="p-7 md:p-10 flex flex-col gap-5"
        >
          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[9.5px] uppercase tracking-[0.38em] text-gray-500 font-semibold">
                Full Name <span className="text-purple-500/60">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={set("name")}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
                placeholder="Your full name"
                className={base}
                style={fieldStyle("name")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9.5px] uppercase tracking-[0.38em] text-gray-500 font-semibold">
                Email <span className="text-purple-500/60">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={set("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                placeholder="your@email.com"
                className={base}
                style={fieldStyle("email")}
              />
            </div>
          </div>

          {/* Inquiry Type + Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[9.5px] uppercase tracking-[0.38em] text-gray-500 font-semibold">
                Inquiry Type <span className="text-purple-500/60">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={form.inquiryType}
                  onChange={set("inquiryType")}
                  onFocus={() => setFocused("inquiryType")}
                  onBlur={() => setFocused("")}
                  className={`${base} appearance-none cursor-pointer pr-9`}
                  style={{
                    ...fieldStyle("inquiryType"),
                    color: form.inquiryType ? "#fff" : "#4b5563",
                  }}
                >
                  {INQUIRY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-[#0c0c0c] text-white">
                      {o.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9.5px] uppercase tracking-[0.38em] text-gray-500 font-semibold flex items-center gap-2">
                Phone
                <span className="text-[9px] text-gray-700 normal-case tracking-normal font-normal">optional</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused("")}
                placeholder="+61 4xx xxx xxx"
                className={base}
                style={fieldStyle("phone")}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-[9.5px] uppercase tracking-[0.38em] text-gray-500 font-semibold">
              Message <span className="text-purple-500/60">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={set("message")}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused("")}
              placeholder="How can we help?"
              className={`${base} resize-none leading-relaxed`}
              style={fieldStyle("message")}
            />
          </div>

          {/* Submit row */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <p className="text-[10px] text-gray-700 leading-snug">
              Response within 24 hrs
              <br className="hidden sm:block" /> on business days.
            </p>
            <button
              type="submit"
              disabled={!canSubmit || status === "loading"}
              className="shrink-0 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed"
              style={
                canSubmit && status !== "loading"
                  ? {
                      background: "#a855f7",
                      opacity: 1,
                      boxShadow: "0 4px 28px rgba(168,85,247,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                    }
                  : { background: "rgba(168,85,247,0.22)", opacity: 1 }
              }
            >
              {status === "loading" ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending
                </>
              ) : (
                "Send Inquiry"
              )}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ContactPageContent() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-18 text-center overflow-hidden">

        {/* Atmospheric glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[560px] bg-purple-900/[0.18] blur-[150px] rounded-full" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 flex flex-col items-center gap-5">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/[0.08] text-purple-300/80 text-[10.5px] font-bold uppercase tracking-[0.32em]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Voltis Emoto
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,10vw,5.5rem)] font-black tracking-tight leading-[0.9]"
          >
            <span className="block text-white">Contact</span>
            <span className="block bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
              Voltis
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="text-gray-500 text-[15px] md:text-base leading-relaxed max-w-sm"
          >
            Questions about bikes, delivery, orders, or support?
            Send us a message.
          </motion.p>
        </div>
      </section>

      {/* ── Form section ─────────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto px-6 md:px-10">

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 inset-x-0 h-[1.5px] pointer-events-none"
              style={{
                background: "linear-gradient(to right, transparent, rgba(168,85,247,0.7) 30%, rgba(167,139,250,0.5) 60%, transparent)",
              }}
            />

            {/* Corner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/[0.08] blur-[80px] rounded-full pointer-events-none" />

            <ContactForm />
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          >
            {[
              { dot: true,  text: "Australian-Based Support"   },
              { dot: false, text: "Response Within 24 Hours"   },
              { dot: true,  text: "Premium Customer Experience" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.dot && i > 0 && (
                  <span className="w-1 h-1 rounded-full bg-white/[0.12] hidden sm:block" />
                )}
                <span className="text-[11px] text-gray-600 font-medium tracking-wide">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
