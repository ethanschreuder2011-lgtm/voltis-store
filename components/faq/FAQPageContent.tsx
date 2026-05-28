"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  InViewWrapper,
  InViewCard,
  Divider,
  PageSection,
  PageHero,
  PageBottomCTA,
  glassCard,
} from "@/components/ui/PageShell";
import { SectionEyebrow } from "@/components/ui/SectionHeader";

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES: { id: string; label: string; icon: string; items: { q: string; a: string }[] }[] = [
  {
    id: "shipping",
    label: "Shipping",
    icon: "🚚",
    items: [
      { q: "Do you ship Australia-wide?", a: "Yes — we ship to every state and territory across Australia at no extra cost. Standard delivery is free on all orders. Remote and rural addresses may have slightly longer timeframes; contact us before ordering if you'd like a specific estimate." },
      { q: "How long does delivery take?", a: "Standard delivery takes 3–7 business days from dispatch, depending on your location. Metro areas in NSW and VIC are typically 2–4 days. WA, NT, and Tasmania may take up to 7 business days." },
      { q: "How will I track my order?", a: "You'll receive a tracking link via email as soon as your order is dispatched. You can monitor your bike's journey from our facility to your door in real time." },
      { q: "Do you offer express shipping?", a: "We're currently investigating express freight partnerships for metro areas. In the meantime, standard delivery is free and typically arrives within 3–5 business days for most major cities." },
      { q: "Is my bike insured during transit?", a: "Yes. Every bike is fully insured from the moment it leaves our facility. If your bike arrives damaged, contact us within 48 hours with photos and we'll resolve it immediately at no cost to you." },
    ],
  },
  {
    id: "pickup",
    label: "Pickup Process",
    icon: "🏪",
    items: [
      { q: "Where can I pick up my bike?", a: "Pickup is available at our Sydney location, by appointment. Reserve your bike online and we'll contact you to arrange a suitable time." },
      { q: "How does Reserve & Pay on Pickup work?", a: "You reserve your bike online with no payment required upfront. When your appointment is confirmed, you visit our facility to inspect the bike in person before completing payment. No surprises, no pressure." },
      { q: "How much notice do I need for a pickup?", a: "We ask for at least 48 hours notice to ensure your bike is prepared, inspected, and ready for your visit. Contact us at voltisemoto@gmail.com to arrange an appointment." },
      { q: "Can I test ride before buying?", a: "We can arrange test rides in specific circumstances. Contact us to discuss your situation — we want you to feel 100% confident before committing." },
      { q: "Is there a fee for store pickup?", a: "No — pickup is completely free. You save the freight cost and get to inspect your bike in person before paying." },
    ],
  },
  {
    id: "payment",
    label: "Payment",
    icon: "💳",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, Amex) and direct bank transfer. Buy Now Pay Later options are being explored and will be announced when available." },
      { q: "Is my payment information secure?", a: "Yes. All payments are processed through industry-standard encrypted payment gateways. Voltis Emoto never stores your full card details on our servers." },
      { q: "Do you offer financing or payment plans?", a: "We're actively working on finance partnerships to offer flexible payment plans. In the meantime, contact us to discuss options — we'll do our best to help." },
      { q: "When am I charged for a pre-order?", a: "Full payment is completed at the time of pre-order. For the Reserve & Pay on Pickup option, no payment is required until you inspect the bike in person at our Australian pickup location." },
      { q: "Can I reserve a bike without paying upfront?", a: "Yes — use the Reserve & Pay on Pickup option. You inspect and pay in full on the day of pickup. No charges until you're ready." },
    ],
  },
  {
    id: "charging",
    label: "Charging",
    icon: "⚡",
    items: [
      { q: "Can I charge at home with standard power?", a: "Yes. All Voltis Emoto bikes charge from a standard 240V Australian power outlet using the included charger. No special infrastructure or electrical modifications required." },
      { q: "How long does a full charge take?", a: "Charging times vary by model. The 26 Sur-Ron Light Bee charges to full in approximately 3–4 hours from flat. Higher-spec models with larger batteries may take 4–6 hours. Fast charging is available on select models." },
      { q: "Can I charge at public charging stations?", a: "Our bikes use standard residential chargers rather than DC fast charge infrastructure. They are designed for home charging. Some models support faster charging with compatible equipment — check individual model specs." },
      { q: "Does cold weather affect charging?", a: "Lithium batteries charge most efficiently at moderate temperatures. In very cold conditions, charging may take slightly longer. Avoid charging a completely discharged battery in temperatures below 5°C." },
      { q: "Should I always charge to 100%?", a: "For daily use, charging to 80–90% and not letting the battery drop below 20% extends long-term battery life. Full charges are fine for days when you need maximum range." },
    ],
  },
  {
    id: "warranty",
    label: "Warranty",
    icon: "🛡️",
    items: [
      { q: "What does the warranty cover?", a: "Every bike includes a 2-year powertrain warranty (motor + controller) and a 1-year battery and component warranty. This covers manufacturing defects and electrical faults under normal use." },
      { q: "How do I make a warranty claim?", a: "Email voltisemoto@gmail.com with your order number, a description of the issue, and any photos or video. We'll assess your claim and respond within 24 hours on business days." },
      { q: "Are wear items covered?", a: "Wear items like tyres, brake pads, chains, and grips are not covered under warranty — these are consumables expected to be replaced with use. All structural and electrical components are covered." },
      { q: "Does warranty cover crash damage?", a: "Warranty does not cover damage caused by accidents, crashes, or misuse. It covers manufacturing defects and component failures under normal riding conditions." },
      { q: "Is the warranty transferable?", a: "Warranty is currently tied to the original purchaser. Contact us if you've purchased a second-hand Voltis Emoto bike — we'll do our best to support you regardless." },
    ],
  },
  {
    id: "servicing",
    label: "Servicing",
    icon: "🔧",
    items: [
      { q: "Where can I get my bike serviced?", a: "Electric bikes require significantly less servicing than petrol bikes. Most maintenance is user-serviceable. For specialist electrical work, we can recommend certified technicians in your area — contact us." },
      { q: "Can I service my bike myself?", a: "Yes — basic maintenance like tyre changes, brake adjustments, chain lubrication, and bolt checks are straightforward with standard tools. We can provide guidance. Electrical system work should be handled by a qualified technician." },
      { q: "Are service manuals available?", a: "Service documentation is available for most models in our range. Contact us and we'll provide the relevant documentation for your bike." },
      { q: "How often does the bike need servicing?", a: "Electric bikes are dramatically lower maintenance than petrol. A general check every 6–12 months or every 1,500–2,000km is recommended — focusing on brakes, tyres, bearings, and chain condition." },
    ],
  },
  {
    id: "legality",
    label: "Bike Legality",
    icon: "⚖️",
    items: [
      { q: "Are these bikes road legal in Australia?", a: "Legality depends on the specific model, your state or territory, and how the bike is used. Some models fall within power-assisted bicycle classifications; others are classed as motorcycles or off-road vehicles. We recommend checking with your local transport authority before purchasing." },
      { q: "Do I need a licence to ride?", a: "This varies by state, model, and power output. We strongly recommend checking with your state's road transport authority. Contact us and we can point you toward the right resources for your location." },
      { q: "Do the bikes need to be registered?", a: "Registration requirements differ by state and model class. For off-road use on private property, registration is typically not required. For road or trail use, check your local regulations." },
      { q: "Can I ride on trails and fire roads?", a: "Trail access for electric bikes is evolving in Australia. Many trails now permit e-bikes within certain power limits. Check with your local trail authority or land manager for current rules in your area." },
    ],
  },
  {
    id: "range",
    label: "Range & Performance",
    icon: "📊",
    items: [
      { q: "What range do the bikes get?", a: "Range varies significantly by model and riding style. Our bikes range from approximately 60km to over 120km on a single charge under typical mixed conditions. Check each product page for model-specific range data." },
      { q: "What affects battery range?", a: "Rider weight, terrain, speed, temperature, and riding mode all affect range. Aggressive riding at full throttle reduces range; cruising at moderate speeds maximises it." },
      { q: "How fast do the bikes go?", a: "Top speeds vary by model — from 45km/h for entry-level models up to 80+ km/h for performance models. Check individual product pages for specific performance data." },
      { q: "How is the performance compared to petrol bikes?", a: "Electric bikes deliver instant torque from zero rpm — which means off-the-line acceleration that often surpasses equivalent petrol bikes. The riding experience is smoother, quieter, and requires no clutch or gear changes." },
    ],
  },
  {
    id: "stock",
    label: "Stock & Preorders",
    icon: "📦",
    items: [
      { q: "Which bikes are in stock?", a: "The Strike Shadow, 26 Sur-Ron Ultra Bee, Arctic Leopard, and Falcon Pro are currently in stock and available for purchase or pickup. The 26 Sur-Ron Light Bee is available as a pre-order with estimated delivery Q3 2026." },
      { q: "How does the pre-order queue work?", a: "Pre-orders are fulfilled in strict order of deposit payment. The earlier your deposit, the earlier in the queue you are. When your allocation is confirmed, we'll contact you with a dispatch timeline." },
      { q: "Can I change my pre-order details?", a: "Yes — contact us before your bike is dispatched and we can update delivery address, colour selection (if applicable), or other details." },
      { q: "What happens if the delivery estimate changes?", a: "We keep all pre-order customers informed of any changes to estimated delivery dates. If timelines shift, you'll receive an email update. Your deposit remains fully refundable throughout." },
      { q: "Will more allocation become available?", a: "We aim to maintain ongoing stock of in-range models. For the 26 Sur-Ron Light Bee, initial allocations are limited — we'll communicate if additional rounds of pre-orders open." },
    ],
  },
  {
    id: "support",
    label: "Support",
    icon: "💬",
    items: [
      { q: "How do I contact the Voltis Emoto team?", a: "Email us at voltisemoto@gmail.com — include your order number or bike model in the subject line for the fastest response. You can also use the contact form at voltisemoto.com.au/contact." },
      { q: "How fast do you respond to inquiries?", a: "We aim to respond to all inquiries within 24 hours on Australian business days. Complex warranty or technical queries may take slightly longer, but we'll always acknowledge receipt within 24 hours." },
      { q: "Do you have a phone number?", a: "We're a digital-first business and currently handle all support via email to provide a traceable, accurate paper trail for every customer. Phone support is being developed and will be announced when available." },
      { q: "Where is your team based?", a: "Our team is based in Sydney, Australia. When you contact us, you're reaching a local Australian team — not an offshore support centre." },
    ],
  },
];

// ─── Accordion item ───────────────────────────────────────────────────────────

function AccordionItem({ item, isOpen, onToggle, accentColor = "#a855f7" }: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  accentColor?: string;
}) {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-white" : "text-white/75 group-hover:text-white"}`}>
          {item.q}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? `${accentColor}50` : "rgba(255,255,255,0.12)",
            background: isOpen ? `${accentColor}15` : "transparent",
            color: isOpen ? accentColor : "#6b7280",
          }}
        >
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </motion.svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[13.5px] text-gray-400 leading-relaxed pr-8">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Category section ─────────────────────────────────────────────────────────

function FAQCategory({ category, defaultOpen = false }: {
  category: typeof FAQ_CATEGORIES[0];
  defaultOpen?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ? category.items[0].q : null);
  const [sectionOpen, setSectionOpen] = useState(true);

  return (
    <InViewWrapper delay={0} className="scroll-mt-28">
      <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
        {/* Category header */}
        <button
          onClick={() => setSectionOpen((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-5 border-b border-white/[0.06] group"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{category.icon}</span>
            <span className="text-[11px] uppercase tracking-[0.42em] font-bold text-white/80 group-hover:text-white transition-colors duration-200">
              {category.label}
            </span>
            <span className="text-[10px] text-gray-600 ml-1">({category.items.length})</span>
          </div>
          <motion.div
            animate={{ rotate: sectionOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-600 group-hover:text-gray-400 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>

        {/* Questions */}
        <AnimatePresence initial={false}>
          {sectionOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6">
                {category.items.map((item) => (
                  <AccordionItem
                    key={item.q}
                    item={item}
                    isOpen={openId === item.q}
                    onToggle={() => setOpenId(openId === item.q ? null : item.q)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </InViewWrapper>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function FAQPageContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayed = activeCategory
    ? FAQ_CATEGORIES.filter((c) => c.id === activeCategory)
    : FAQ_CATEGORIES;

  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      <PageHero
        eyebrow="Voltis Emoto · FAQ"
        headline="Frequently"
        headlineAccent="Asked Questions"
        sub="Everything you need to know about our bikes, delivery, warranty, and support — answered clearly and honestly."
        badges={[
          { icon: "⚡", text: "10 Categories" },
          { icon: "💬", text: `${FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0)}+ Questions` },
          { icon: "📍", text: "Australian Support" },
        ]}
      />

      <Divider />

      <PageSection>
        {/* Category filter pills */}
        <InViewWrapper delay={0} className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] border transition-all duration-200 ${
                activeCategory === null
                  ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.4)]"
                  : "border-white/10 bg-white/[0.04] text-gray-500 hover:text-white hover:border-white/20"
              }`}
            >
              All
            </button>
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] border transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.4)]"
                    : "border-white/10 bg-white/[0.04] text-gray-500 hover:text-white hover:border-white/20"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </InViewWrapper>

        {/* FAQ accordion sections */}
        <div className="flex flex-col gap-3">
          {displayed.map((cat, i) => (
            <FAQCategory
              key={cat.id}
              category={cat}
              defaultOpen={i === 0}
            />
          ))}
        </div>

        {/* Still have questions */}
        <InViewWrapper delay={0} className="mt-10">
          <div className={`${glassCard} overflow-hidden`}>
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <div className="p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.42em] text-purple-400/70 font-bold mb-2">Still have questions?</p>
                <h3 className="text-xl font-black text-white mb-1.5">We&rsquo;re here to help</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Can&rsquo;t find what you&rsquo;re looking for? Our team responds within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="mailto:voltisemoto@gmail.com"
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 transition-colors duration-200 text-white font-bold text-[11px] uppercase tracking-[0.2em] px-6 py-3.5 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                >
                  Email Us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white font-bold text-[11px] uppercase tracking-[0.2em] px-6 py-3.5 rounded-xl"
                >
                  Contact Page
                </Link>
              </div>
            </div>
          </div>
        </InViewWrapper>
      </PageSection>

      <Divider />

      <PageBottomCTA
        headline="Ready to Ride?"
        sub="Browse our full range of premium electric bikes."
        primaryLabel="Browse Bikes"
        primaryHref="/"
        secondaryLabel="Contact Support"
        secondaryHref="/contact"
      />

      <Footer />
    </div>
  );
}
