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
    icon: "📜",
    title: "Agreement to Terms",
    body: [
      "By accessing our website (voltisemoto.com.au) or placing an order, you agree to be bound by these Terms of Service and our Privacy Policy.",
      "These terms apply to all visitors, customers, and users of the Voltis Emoto website and services.",
      "If you disagree with any part of these terms, you may not use our website or purchase our products.",
      "Voltis Emoto reserves the right to update these terms at any time. Continued use of the website after changes are posted constitutes acceptance.",
    ],
  },
  {
    icon: "🏍️",
    title: "Products & Descriptions",
    body: [
      "We make every effort to accurately represent our products, including specifications, images, and pricing. Minor variations in colour or specification may occur.",
      "Product availability is subject to change. If a product becomes unavailable after your order is placed, we will contact you promptly.",
      "Specifications listed are manufacturer-provided and may be updated without notice. Contact us if you require the most current technical specifications.",
      "Images shown are for representative purposes. Minor cosmetic differences between images and actual products may exist.",
    ],
  },
  {
    icon: "🛒",
    title: "Orders & Acceptance",
    body: [
      "Placing an order constitutes an offer to purchase. Your order is accepted when you receive an order confirmation email from us.",
      "We reserve the right to cancel or refuse any order at our discretion, including due to pricing errors or product unavailability.",
      "If we cancel your order, a full refund will be processed to your original payment method within 5–10 business days.",
      "Order quantities may be limited at our discretion, particularly for pre-order or limited-allocation products.",
    ],
  },
  {
    icon: "💳",
    title: "Pricing & Payment",
    body: [
      "All prices are listed in Australian Dollars (AUD) and include GST where applicable.",
      "Prices are subject to change without notice. The price charged is the price at the time your order is confirmed.",
      "Payment is required in full at the time of purchase. For Reserve & Pay on Pickup orders, payment is completed at the time of in-person inspection.",
      "Voltis Emoto uses secure, third-party payment processors. We do not store your full payment card details.",
      "If a payment fails or is reversed after delivery, we reserve the right to recover the outstanding amount.",
    ],
  },
  {
    icon: "🚚",
    title: "Delivery",
    body: [
      "We ship Australia-wide. Delivery timeframes are estimates and are not guaranteed. We are not liable for delays caused by freight carriers, weather, or circumstances outside our control.",
      "Risk of loss or damage passes to you upon delivery. We strongly recommend inspecting your order upon receipt and reporting any damage within 48 hours.",
      "Delivery addresses cannot be changed after dispatch. Ensure your address is correct before completing your order.",
      "If a delivery fails due to incorrect address information provided by you, re-delivery costs are at your expense.",
    ],
  },
  {
    icon: "↩️",
    title: "Returns & Refunds",
    body: [
      "Our Returns & Refunds policy forms part of these terms. See our dedicated Returns page for full details.",
      "In summary: in-stock bike purchases may be returned within 30 days if unridden and in original condition.",
      "Pre-orders may be cancelled before dispatch. Contact us to arrange a refund.",
      "We comply with Australian Consumer Law. Nothing in these terms limits any rights you have under ACL that cannot be excluded.",
    ],
  },
  {
    icon: "🛡️",
    title: "Warranties",
    body: [
      "All bikes include manufacturer and Voltis Emoto warranty coverage as detailed on our Warranty page.",
      "Our warranties are in addition to, and do not limit, the consumer guarantees provided under Australian Consumer Law.",
      "Warranty claims are handled by our Australian team. See the Warranty page for the full process.",
      "Warranty does not cover damage from accidents, misuse, modifications, or normal wear.",
    ],
  },
  {
    icon: "⚠️",
    title: "Limitation of Liability",
    body: [
      "To the maximum extent permitted by Australian law, Voltis Emoto's liability for any claim arising from a purchase is limited to the purchase price paid for the relevant product.",
      "We are not liable for indirect, incidental, special, or consequential damages arising from the use of our products, except as required by Australian Consumer Law.",
      "Nothing in these terms excludes the consumer guarantees under the Australian Consumer Law that cannot be excluded, restricted, or modified.",
    ],
  },
  {
    icon: "⚖️",
    title: "Bike Use & Rider Responsibility",
    body: [
      "You are solely responsible for ensuring your use of any bike purchased from Voltis Emoto complies with applicable laws in your state or territory.",
      "This includes understanding and complying with road registration, licensing, and trail access regulations in your area.",
      "Voltis Emoto provides general information on legality but is not responsible for any fines, penalties, or legal consequences arising from how you use your bike.",
      "Always ride safely and within your skill level. Protective gear is strongly recommended.",
    ],
  },
  {
    icon: "©️",
    title: "Intellectual Property",
    body: [
      "All content on this website — including text, images, graphics, logos, and product descriptions — is the property of Voltis Emoto or its content suppliers.",
      "You may not reproduce, distribute, or use any content from this website without written permission.",
      "Product and brand names of third-party manufacturers (e.g., Sur-Ron) are the property of their respective owners.",
    ],
  },
  {
    icon: "🌏",
    title: "Governing Law",
    body: [
      "These Terms of Service are governed by the laws of New South Wales, Australia.",
      "Any disputes arising from these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts of New South Wales.",
      "We will always attempt to resolve disputes informally before pursuing formal legal proceedings.",
    ],
  },
  {
    icon: "📧",
    title: "Contact",
    body: [
      "For questions about these Terms of Service, contact us at voltisemoto@gmail.com.",
      "Voltis Emoto is based in Sydney, New South Wales, Australia.",
    ],
  },
];

export function TermsPageContent() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      <PageHero
        eyebrow="Voltis Emoto · Legal"
        headline="Terms of"
        headlineAccent="Service"
        sub="Our terms are designed to be clear and fair. We've written them in plain language so you know exactly where you stand."
        badges={[
          { icon: "🇦🇺", text: "NSW Law Governed" },
          { icon: "⚖️", text: "Australian Consumer Law" },
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
              <span className="text-2xl shrink-0 mt-0.5">📌</span>
              <div>
                <p className="text-white font-bold text-sm mb-1.5">The Short Version</p>
                <p className="text-gray-400 text-[13.5px] leading-relaxed">
                  Buy confidently, ride responsibly. We stand by our products, handle issues fairly, and
                  operate in full compliance with Australian Consumer Law. If something goes wrong,
                  contact us first — we&rsquo;d rather fix it than fight about it.
                </p>
              </div>
            </div>
          </div>
        </InViewWrapper>

        {/* Terms sections */}
        <div className="max-w-3xl flex flex-col gap-8">
          {SECTIONS.map((section, i) => (
            <InViewWrapper key={section.title} delay={i * 0.04}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{section.icon}</span>
                  <h2 className="text-base font-black text-white tracking-tight">{section.title}</h2>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-purple-500/25 via-white/[0.06] to-transparent" />
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

        <InViewWrapper delay={0} className="mt-12">
          <p className="text-[11px] text-gray-700 text-center">
            Voltis Emoto · Sydney, Australia ·{" "}
            <a href="mailto:voltisemoto@gmail.com" className="text-gray-600 hover:text-gray-400 transition-colors duration-200">
              voltisemoto@gmail.com
            </a>{" "}
            · Last Updated: {LAST_UPDATED}
          </p>
        </InViewWrapper>
      </PageSection>

      <Divider />

      <PageBottomCTA
        headline="Questions About These Terms?"
        sub="We're happy to clarify anything. Reach out and we'll respond directly."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Privacy Policy"
        secondaryHref="/privacy"
      />

      <Footer />
    </div>
  );
}
