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

const COVERAGE_TIERS = [
  {
    title: "Powertrain",
    duration: "2 Years",
    durationColor: "from-purple-400 to-violet-300",
    items: ["Electric motor", "Motor controller", "Wiring harness", "Powertrain connectors"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Battery",
    duration: "1 Year",
    durationColor: "from-emerald-400 to-teal-300",
    items: ["Battery cells", "Battery management system (BMS)", "Charging port", "Battery enclosure"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="18" height="10" rx="2" /><path d="M22 11v2" />
      </svg>
    ),
  },
  {
    title: "Components",
    duration: "1 Year",
    durationColor: "from-sky-400 to-blue-300",
    items: ["Frame (structural defects)", "Suspension components", "Braking system", "Display & electronics"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const COVERED = [
  "Manufacturing defects in materials or workmanship",
  "Motor or controller failures under normal use",
  "Battery capacity degradation below 70% within warranty period",
  "Electrical faults arising from the factory",
  "Frame cracks or structural failures not caused by impact",
  "BMS failure under normal charging conditions",
];

const NOT_COVERED = [
  "Damage from accidents, crashes, or misuse",
  "Wear items: tyres, brake pads, chains, grips",
  "Water damage beyond IP rating from submersion",
  "Modifications or third-party component fitting",
  "Cosmetic damage: scratches, paint chips, decals",
  "Damage from incorrect charging equipment",
];

const CLAIM_STEPS = [
  {
    step: "01",
    title: "Contact Our Team",
    body: "Email voltisemoto@gmail.com with your order number, a description of the issue, and photos or video if possible.",
    icon: "📧",
  },
  {
    step: "02",
    title: "Assessment",
    body: "Our team assesses your claim and determines whether it falls within warranty coverage. We aim to respond within 24 hours.",
    icon: "🔍",
  },
  {
    step: "03",
    title: "Resolution",
    body: "Approved claims are resolved via repair, replacement part, or full unit replacement — whichever is most appropriate.",
    icon: "✅",
  },
];

export function WarrantyPageContent() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      <PageHero
        eyebrow="Voltis Emoto · Warranty"
        headline="Built to Last."
        headlineAccent="Backed to Match."
        sub="Every Voltis Emoto bike includes comprehensive warranty coverage. Because a premium product deserves premium protection."
        badges={[
          { icon: "🛡️", text: "2-Year Powertrain" },
          { icon: "🔋", text: "1-Year Battery" },
          { icon: "🔧", text: "1-Year Components" },
        ]}
      />

      <Divider />

      {/* Coverage tiers */}
      <PageSection>
        <SectionHeader eyebrow="What's Covered" heading="Warranty" accent="Coverage" />
        <div className="grid md:grid-cols-3 gap-4">
          {COVERAGE_TIERS.map((tier, i) => (
            <InViewCard key={tier.title} index={i}>
              <div className={`${glassCard} ${hoverCard} p-6 h-full flex flex-col gap-4 overflow-hidden`}>
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500/50 to-transparent rounded-t-2xl" />

                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    {tier.icon}
                  </div>
                  <span className={`text-2xl font-black bg-gradient-to-r ${tier.durationColor} bg-clip-text text-transparent`}>
                    {tier.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-3">{tier.title} Coverage</h3>
                  <ul className="flex flex-col gap-2">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-400 text-[13px] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </InViewCard>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* Covered / Not covered */}
      <PageSection>
        <SectionHeader eyebrow="Coverage Details" heading="Included &" accent="Excluded" />
        <div className="grid md:grid-cols-2 gap-4">
          {/* Covered */}
          <InViewCard index={0}>
            <div className={`${glassCard} overflow-hidden h-full`}>
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-gray-400 font-bold">Covered by Warranty</p>
              </div>
              <ul className="px-6 py-2 divide-y divide-white/[0.04]">
                {COVERED.map((item) => (
                  <li key={item} className="py-3.5 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span className="text-gray-300 text-[13px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </InViewCard>

          {/* Not covered */}
          <InViewCard index={1}>
            <div className={`${glassCard} overflow-hidden h-full`}>
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-gray-400 font-bold">Not Covered</p>
              </div>
              <ul className="px-6 py-2 divide-y divide-white/[0.04]">
                {NOT_COVERED.map((item) => (
                  <li key={item} className="py-3.5 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 shrink-0 mt-1.5" />
                    <span className="text-gray-500 text-[13px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </InViewCard>
        </div>
      </PageSection>

      <Divider />

      {/* Claim process */}
      <PageSection>
        <SectionHeader eyebrow="Warranty Claims" heading="How to" accent="Make a Claim" />
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {CLAIM_STEPS.map((step, i) => (
            <InViewCard key={step.step} index={i}>
              <div className={`${glassCard} p-6 h-full flex flex-col gap-4`}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400/50">{step.step}</span>
                  {i < CLAIM_STEPS.length - 1 && (
                    <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
                  )}
                </div>
                <span className="text-3xl">{step.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{step.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{step.body}</p>
                </div>
              </div>
            </InViewCard>
          ))}
        </div>

        {/* Direct email CTA */}
        <InViewWrapper delay={0.2}>
          <a
            href="mailto:voltisemoto@gmail.com"
            className={`${glassCard} ${hoverCard} flex flex-col md:flex-row md:items-center gap-4 p-6 md:p-8 overflow-hidden group`}
          >
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500/60 via-violet-400/30 to-transparent" />
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.38em] text-gray-500 font-semibold mb-1">Start a Warranty Claim</p>
              <p className="text-lg font-black text-white group-hover:text-purple-300 transition-colors duration-200">voltisemoto@gmail.com</p>
              <p className="text-gray-500 text-[13px] mt-1">Include your order number and a description of the issue. We respond within 24 hours on business days.</p>
            </div>
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-gray-500 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all duration-300 shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </InViewWrapper>
      </PageSection>

      <Divider />

      {/* Trust reinforcement */}
      <PageSection>
        <InViewWrapper>
          <div className={`${glassCard} overflow-hidden`}>
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <div className="px-8 md:px-12 py-10 text-center max-w-2xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.44em] text-purple-400/60 font-bold mb-4">Our Commitment</p>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                We back what we sell — completely.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Voltis Emoto warranties are backed by our Australian team directly. There&rsquo;s no
                offshore claims process, no months-long delays, and no unnecessary runaround.
                If something isn&rsquo;t right with your bike, we fix it — quickly, personally, and fairly.
              </p>
            </div>
          </div>
        </InViewWrapper>
      </PageSection>

      <Divider />

      <PageBottomCTA
        headline="Any Warranty Questions?"
        sub="Our team is available to answer warranty queries before and after purchase."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Browse Bikes"
        secondaryHref="/"
      />

      <Footer />
    </div>
  );
}
