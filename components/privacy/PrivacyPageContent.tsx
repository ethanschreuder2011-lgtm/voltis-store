"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  InViewWrapper,
  Divider,
  PageSection,
  PageHero,
  PageBottomCTA,
  glassCard,
} from "@/components/ui/PageShell";

const LAST_UPDATED = "May 2025";

const SECTIONS = [
  {
    icon: "📋",
    title: "Information We Collect",
    body: [
      "When you make a purchase or pre-order, we collect your name, email address, shipping address, and payment information (processed securely by our payment provider — we never store full card details).",
      "When you use our contact form or email us, we retain the contents of that correspondence.",
      "We may collect standard website analytics data (pages visited, referral source, device type) using privacy-respecting analytics tools. This data is anonymised and aggregated.",
      "If you subscribe to our newsletter, we collect your email address for that purpose only.",
    ],
  },
  {
    icon: "🎯",
    title: "How We Use Your Information",
    body: [
      "To process and fulfil your order, including delivery coordination and warranty support.",
      "To communicate with you about your order, pre-order status, or support requests.",
      "To send marketing communications if you have opted in. You can unsubscribe at any time.",
      "To improve our website and customer experience using aggregate analytics data.",
      "We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
    ],
  },
  {
    icon: "🤝",
    title: "Information Sharing",
    body: [
      "We share necessary information with freight and delivery partners (name, address, contact number) solely for the purpose of delivering your order.",
      "We use payment processors who handle your card details under their own PCI-compliant security frameworks.",
      "We may share data if required by Australian law or a valid legal process.",
      "We do not share your data with advertisers, data brokers, or unrelated third parties.",
    ],
  },
  {
    icon: "🔒",
    title: "Data Security",
    body: [
      "All data transmission between your browser and our website is encrypted using industry-standard TLS (HTTPS).",
      "Payment information is handled exclusively by our certified payment processor and is never stored on our servers.",
      "We limit internal access to personal data to only those team members who need it to serve you.",
      "While no system is 100% immune to breach, we take data security seriously and update our practices regularly.",
    ],
  },
  {
    icon: "🍪",
    title: "Cookies & Analytics",
    body: [
      "Our website uses cookies to improve your browsing experience, remember your preferences, and understand how visitors use our site.",
      "We use functional cookies necessary for the website to operate. We may use analytics cookies to understand traffic patterns.",
      "We do not use advertising tracking cookies or sell your browsing behaviour.",
      "You can disable cookies in your browser settings. Some website functionality may be affected if you do.",
    ],
  },
  {
    icon: "✅",
    title: "Your Rights",
    body: [
      "You have the right to access the personal information we hold about you.",
      "You can request correction of inaccurate data at any time.",
      "You can request deletion of your personal information, subject to legal obligations (e.g., financial records we're required to retain).",
      "You can opt out of marketing emails at any time via the unsubscribe link in any email we send.",
      "To exercise any of these rights, contact us at voltisemoto@gmail.com.",
    ],
  },
  {
    icon: "👶",
    title: "Children's Privacy",
    body: [
      "Our website and products are intended for adults. We do not knowingly collect personal information from anyone under the age of 18.",
      "If you believe a minor has submitted information to us, please contact us and we will delete it promptly.",
    ],
  },
  {
    icon: "🔄",
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. When we do, the 'Last Updated' date at the top of this page will change.",
      "For significant changes, we will notify existing customers via email.",
      "Continued use of our website after changes are posted constitutes acceptance of the updated policy.",
    ],
  },
  {
    icon: "📧",
    title: "Contact Us About Privacy",
    body: [
      "If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at voltisemoto@gmail.com.",
      "We are based in Sydney, Australia and are subject to the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).",
    ],
  },
];

export function PrivacyPageContent() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      <PageHero
        eyebrow="Voltis Emoto · Privacy"
        headline="Privacy"
        headlineAccent="Policy"
        sub="We respect your privacy. This policy explains what data we collect, why we collect it, and how we handle it — in plain English."
        badges={[
          { icon: "🔒", text: "Data Secure" },
          { icon: "🇦🇺", text: "Australian Privacy Act" },
          { icon: "📅", text: `Last Updated: ${LAST_UPDATED}` },
        ]}
      />

      <Divider />

      <PageSection>
        {/* Intro notice */}
        <InViewWrapper delay={0} className="mb-10">
          <div className={`${glassCard} overflow-hidden`}>
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500/60 via-violet-400/30 to-transparent" />
            <div className="px-7 py-6 flex items-start gap-4">
              <span className="text-2xl shrink-0 mt-0.5">ℹ️</span>
              <div>
                <p className="text-white font-bold text-sm mb-1.5">A Note From Voltis Emoto</p>
                <p className="text-gray-400 text-[13.5px] leading-relaxed">
                  We&rsquo;re a small, honest Australian business. We collect only what we need to serve you,
                  we don&rsquo;t sell your data, and we don&rsquo;t use it for anything you wouldn&rsquo;t expect.
                  This policy is written to be readable — not to intimidate you with legal jargon.
                </p>
              </div>
            </div>
          </div>
        </InViewWrapper>

        {/* Policy sections */}
        <div className="max-w-3xl flex flex-col gap-8">
          {SECTIONS.map((section, i) => (
            <InViewWrapper key={section.title} delay={i * 0.04}>
              <div className="flex flex-col gap-4">
                {/* Section header */}
                <div className="flex items-center gap-3">
                  <span className="text-xl">{section.icon}</span>
                  <h2 className="text-base font-black text-white tracking-tight">{section.title}</h2>
                </div>
                {/* Accent line */}
                <div className="h-px w-full bg-gradient-to-r from-purple-500/25 via-white/[0.06] to-transparent" />
                {/* Content */}
                <ul className="flex flex-col gap-3">
                  {section.body.map((para, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 shrink-0 mt-2" />
                      <p className="text-gray-400 text-[13.5px] leading-relaxed">{para}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </InViewWrapper>
          ))}
        </div>

        {/* Last updated footer note */}
        <InViewWrapper delay={0} className="mt-12">
          <p className="text-[11px] text-gray-700 text-center">
            Voltis Emoto · ABN: [Pending] · Sydney, Australia ·{" "}
            <a href="mailto:voltisemoto@gmail.com" className="text-gray-600 hover:text-gray-400 transition-colors duration-200">
              voltisemoto@gmail.com
            </a>{" "}
            · Last Updated: {LAST_UPDATED}
          </p>
        </InViewWrapper>
      </PageSection>

      <Divider />

      <PageBottomCTA
        headline="Any Privacy Questions?"
        sub="Reach out directly — we're a real Australian team and we'll respond personally."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Back to Home"
        secondaryHref="/"
      />

      <Footer />
    </div>
  );
}
