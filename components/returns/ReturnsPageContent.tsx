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

const POLICY_CARDS = [
  {
    title: "Return Window",
    value: "30 Days",
    detail: "You have 30 days from the delivery date to initiate a return for in-stock bike purchases.",
    icon: "📅",
    color: "from-purple-400 to-violet-300",
  },
  {
    title: "Condition Requirement",
    value: "Unridden",
    detail: "Bikes must be returned in original, unridden condition with all original packaging and accessories.",
    icon: "🏍️",
    color: "from-sky-400 to-blue-300",
  },
  {
    title: "Refund Timeline",
    value: "5 – 10 Days",
    detail: "Approved refunds are processed within 5–10 business days of us receiving and inspecting the returned bike.",
    icon: "💳",
    color: "from-emerald-400 to-teal-300",
  },
  {
    title: "Pre-Order Deposit",
    value: "Fully Refundable",
    detail: "Pre-order deposits are 100% refundable at any time before the bike ships. No questions asked.",
    icon: "🔒",
    color: "from-purple-400 to-violet-300",
  },
];

const RETURN_STEPS = [
  {
    step: "01",
    title: "Contact Us First",
    body: "Email voltisemoto@gmail.com with your order number and the reason for your return. We&rsquo;ll respond within 24 hours with next steps.",
  },
  {
    step: "02",
    title: "Return Approval",
    body: "Our team reviews your request and issues a Return Authorisation (RA) number if eligible. Do not ship without an RA number.",
  },
  {
    step: "03",
    title: "Arrange Return Freight",
    body: "We&rsquo;ll advise on the best return method. Return shipping costs are at the buyer&rsquo;s expense except in cases of damaged or faulty delivery.",
  },
  {
    step: "04",
    title: "Inspection & Refund",
    body: "Once received, we inspect the bike within 2 business days. Approved refunds are processed to the original payment method within 5–10 business days.",
  },
];

export function ReturnsPageContent() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      <PageHero
        eyebrow="Voltis Emoto · Returns"
        headline="Fair."
        headlineAccent="Transparent. Simple."
        sub="We want you to love your bike. If something isn't right, we'll work with you to make it right — no intimidating fine print."
        badges={[
          { icon: "📅", text: "30-Day Returns" },
          { icon: "🔒", text: "Refundable Deposits" },
          { icon: "🛡️", text: "Damage Protection" },
        ]}
      />

      <Divider />

      {/* Policy overview */}
      <PageSection>
        <SectionHeader eyebrow="At a Glance" heading="Return" accent="Policy Overview" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POLICY_CARDS.map((card, i) => (
            <InViewCard key={card.title} index={i}>
              <div className={`${glassCard} ${hoverCard} p-6 h-full flex flex-col gap-3 overflow-hidden`}>
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500/50 to-transparent rounded-t-2xl" />
                <span className="text-2xl">{card.icon}</span>
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.38em] text-gray-500 font-semibold mb-1.5">{card.title}</p>
                  <p className={`text-2xl font-black bg-gradient-to-r ${card.color} bg-clip-text text-transparent mb-3`}>{card.value}</p>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{card.detail}</p>
                </div>
              </div>
            </InViewCard>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* Return process */}
      <PageSection>
        <SectionHeader eyebrow="How It Works" heading="The Return" accent="Process" />
        <div className="grid md:grid-cols-4 gap-4">
          {RETURN_STEPS.map((step, i) => (
            <InViewCard key={step.step} index={i}>
              <div className={`${glassCard} p-6 h-full flex flex-col gap-4`}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400/50">{step.step}</span>
                  {i < RETURN_STEPS.length - 1 && (
                    <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: step.body }} />
                </div>
              </div>
            </InViewCard>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* Eligibility + Conditions */}
      <PageSection>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Eligible */}
          <InViewCard index={0}>
            <div className={`${glassCard} overflow-hidden h-full`}>
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-gray-400 font-bold">Return Eligible</p>
              </div>
              <ul className="px-6 py-2 divide-y divide-white/[0.04]">
                {[
                  "Bike returned within 30 days of delivery",
                  "Unridden and in original condition",
                  "All original packaging, accessories, and manuals included",
                  "Bike has not been registered or modified",
                  "Damage notified within 48 hours of delivery",
                  "Pre-order deposit refund (any time before shipment)",
                ].map((item) => (
                  <li key={item} className="py-3 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span className="text-gray-300 text-[13px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </InViewCard>

          {/* Not eligible */}
          <InViewCard index={1}>
            <div className={`${glassCard} overflow-hidden h-full`}>
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-gray-400 font-bold">Not Return Eligible</p>
              </div>
              <ul className="px-6 py-2 divide-y divide-white/[0.04]">
                {[
                  "Bike has been ridden or shows evidence of use",
                  "Return requested after the 30-day window",
                  "Bike has been modified or altered in any way",
                  "Missing original packaging, accessories, or parts",
                  "Damage caused by the buyer after delivery",
                  "Change of mind after pickup at our facility",
                ].map((item) => (
                  <li key={item} className="py-3 flex items-start gap-3">
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

      {/* Damaged delivery + Pre-order */}
      <PageSection>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Damaged delivery */}
          <InViewWrapper delay={0}>
            <div className={`${glassCard} overflow-hidden`}>
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500/60 to-transparent" />
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-base">Damaged Delivery</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  If your bike arrives visibly damaged, follow these steps immediately:
                </p>
                <ol className="flex flex-col gap-3">
                  {[
                    "Document all damage with photos before accepting or signing",
                    "Note the damage on the delivery docket if possible",
                    "Email voltisemoto@gmail.com within 48 hours with your order number and photos",
                    "Do not attempt to ride or use the bike — preserve as received",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-400 text-[13px] leading-snug">{item}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-gray-500 text-[12px] mt-5 leading-relaxed">
                  Transit damage claims are handled at no cost to you. All bikes are fully insured during freight.
                </p>
              </div>
            </div>
          </InViewWrapper>

          {/* Pre-order refunds */}
          <InViewWrapper delay={0.1}>
            <div className={`${glassCard} overflow-hidden`}>
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500/60 to-transparent" />
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-base">Pre-Order Refunds</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  We believe in trust. That&rsquo;s why pre-order deposits are 100% refundable, for any reason, at any time before your bike ships.
                </p>
                {[
                  ["Deposit Amount", "$499 AUD"],
                  ["Refund Eligibility", "Any time before dispatch"],
                  ["Refund Method", "Original payment method"],
                  ["Processing Time", "5 – 10 business days"],
                  ["Required", "Email with order number"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                    <span className="text-[11px] uppercase tracking-[0.28em] text-gray-500 font-semibold">{label}</span>
                    <span className="text-[13px] font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </InViewWrapper>
        </div>
      </PageSection>

      <Divider />

      <PageBottomCTA
        headline="Questions About Returns?"
        sub="Our team is here to help — reach out before you commit if you have any concerns."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Browse Bikes"
        secondaryHref="/"
      />

      <Footer />
    </div>
  );
}
