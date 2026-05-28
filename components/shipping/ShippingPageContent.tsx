"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  InViewWrapper,
  InViewCard,
  Divider,
  PageSection,
  PageHero,
  SectionHeader,
  PageBottomCTA,
  glassCard,
  hoverCard,
} from "@/components/ui/PageShell";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Order Confirmed",
    body: "You receive an instant confirmation email with your order details and reference number.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Prepared & Inspected",
    body: "Your bike undergoes a full pre-shipment inspection and is professionally packaged for transit.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Dispatched & Tracked",
    body: "Your bike is handed to our freight partner. A tracking link is emailed to you immediately.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Delivered to You",
    body: "Your bike arrives in premium packaging. Inspect it on arrival and contact us if anything is amiss.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

const DELIVERY_OPTIONS = [
  {
    label: "Standard Delivery",
    time: "3 – 7 business days",
    cost: "Free",
    costColor: "text-emerald-400",
    detail: "Nationwide Australia. Door-to-door freight via trusted carriers.",
    available: true,
  },
  {
    label: "Express Delivery",
    time: "1 – 2 business days",
    cost: "Coming Soon",
    costColor: "text-gray-500",
    detail: "Premium express freight for metro areas. Available soon.",
    available: false,
  },
  {
    label: "Store Pickup",
    time: "By appointment",
    cost: "Free",
    costColor: "text-emerald-400",
    detail: "Reserve online, inspect in person at our Sydney location, pay at pickup.",
    available: true,
  },
];

const COVERAGE = [
  { state: "New South Wales", time: "2 – 4 days" },
  { state: "Victoria",        time: "2 – 4 days" },
  { state: "Queensland",      time: "3 – 5 days" },
  { state: "South Australia", time: "3 – 5 days" },
  { state: "Western Australia", time: "5 – 7 days" },
  { state: "Tasmania",        time: "4 – 6 days" },
  { state: "ACT",             time: "2 – 4 days" },
  { state: "Northern Territory", time: "5 – 7 days" },
];

export function ShippingPageContent() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      <PageHero
        eyebrow="Voltis Emoto · Delivery"
        headline="Premium"
        headlineAccent="Delivery"
        sub="Every bike is professionally packaged, fully insured in transit, and delivered to your door across Australia — free."
        badges={[
          { icon: "🚚", text: "Free Nationwide Shipping" },
          { icon: "📦", text: "Fully Insured in Transit" },
          { icon: "📍", text: "Pickup Available" },
        ]}
      />

      <Divider />

      {/* Delivery process */}
      <PageSection>
        <SectionHeader eyebrow="How It Works" heading="The Delivery" accent="Process" />
        <div className="grid md:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <InViewCard key={step.number} index={i}>
              <div className={`${glassCard} p-6 h-full flex flex-col gap-4`}>
                {/* Number + connector */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400/50">
                    {step.number}
                  </span>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
                  )}
                </div>
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{step.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{step.body}</p>
                </div>
              </div>
            </InViewCard>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* Delivery options */}
      <PageSection>
        <SectionHeader eyebrow="Options" heading="Pickup &" accent="Delivery Options" />
        <div className="grid md:grid-cols-3 gap-4">
          {DELIVERY_OPTIONS.map((opt, i) => (
            <InViewCard key={opt.label} index={i}>
              <div className={`${glassCard} ${opt.available ? hoverCard : "opacity-70"} p-6 h-full flex flex-col gap-4 overflow-hidden`}>
                {/* Top accent */}
                {opt.available && (
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500/60 to-transparent rounded-t-2xl" />
                )}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.38em] text-gray-500 font-semibold mb-1">
                      {opt.label}
                    </p>
                    <p className="text-white font-bold text-sm">{opt.time}</p>
                  </div>
                  <span className={`text-sm font-black ${opt.costColor}`}>{opt.cost}</span>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed flex-1">{opt.detail}</p>
                {opt.available && (
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold uppercase tracking-[0.25em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Available Now
                  </div>
                )}
              </div>
            </InViewCard>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* Coverage & timeframes */}
      <PageSection>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <SectionHeader eyebrow="Coverage" heading="Australia-Wide" accent="Shipping" />
            <InViewWrapper delay={0.1}>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We ship to every state and territory across Australia. Delivery timeframes are
                estimates based on business days from dispatch. Remote and rural addresses
                may require additional time — contact us if you need an exact quote.
              </p>
            </InViewWrapper>
            <InViewWrapper delay={0.18}>
              <div className={`${glassCard} overflow-hidden`}>
                <div className="px-5 py-4 border-b border-white/[0.06]">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-semibold">
                    Estimated Timeframes
                  </p>
                </div>
                <div className="divide-y divide-white/[0.05]">
                  {COVERAGE.map((row) => (
                    <div key={row.state} className="px-5 py-3.5 flex items-center justify-between">
                      <span className="text-[13px] text-gray-300">{row.state}</span>
                      <span className="text-[12px] font-semibold text-purple-400">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </InViewWrapper>
          </div>

          <div className="flex flex-col gap-4">
            <SectionHeader eyebrow="Packaging" heading="Secure" accent="in Transit" />
            {[
              {
                title: "Professional Packaging",
                body: "Every bike is packed in reinforced custom crating designed specifically for secure transit. No generic cardboard here.",
                icon: "📦",
              },
              {
                title: "Fully Insured",
                body: "Your bike is fully insured from the moment it leaves our facility until it arrives at your door. You're covered.",
                icon: "🛡️",
              },
              {
                title: "Real-Time Tracking",
                body: "A tracking link is emailed to you the moment your order is dispatched. Monitor your delivery every step of the way.",
                icon: "📍",
              },
              {
                title: "Delivery Signature Required",
                body: "Bikes require a signature on delivery to ensure they reach you and only you. No safe-drop on high-value freight.",
                icon: "✍️",
              },
            ].map((item, i) => (
              <InViewCard key={item.title} index={i}>
                <div className={`${glassCard} ${hoverCard} p-5 flex items-start gap-4`}>
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                    <p className="text-gray-500 text-[13px] leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </InViewCard>
            ))}
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Pre-order shipping */}
      <PageSection>
        <InViewWrapper>
          <div className={`${glassCard} overflow-hidden`}>
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500/60 via-violet-400/40 to-transparent" />
            <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[10px] uppercase tracking-[0.42em] text-purple-400/70 font-bold mb-3">Pre-Order Fulfillment</p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                  26 Sur-Ron Light Bee<br />
                  <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                    Shipping Info
                  </span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Pre-order customers are fulfilled in strict allocation order. Your deposit
                  secures your place in the queue. When your bike is ready, you&rsquo;ll
                  receive a dispatch notice with full tracking. Delivery is free nationwide —
                  identical to in-stock orders.
                </p>
              </div>
              <div className="flex flex-col gap-3.5">
                {[
                  ["Estimated Dispatch", "Q3 2026"],
                  ["Shipping Cost", "Free — Nationwide"],
                  ["Deposit", "$499 — Fully Refundable"],
                  ["Allocation", "Queue Order — First Paid, First Shipped"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-semibold">{label}</span>
                    <span className="text-[13px] font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InViewWrapper>
      </PageSection>

      <Divider />

      <PageBottomCTA
        headline="Ready to Ride?"
        sub="Browse the full range and place your order — free nationwide delivery included."
        primaryLabel="Browse Bikes"
        primaryHref="/"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />

      <Footer />
    </div>
  );
}
