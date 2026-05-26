import { FAQPageContent } from "@/components/faq/FAQPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Voltis Emoto",
  description: "Answers to common questions about bikes, shipping, warranty, pickup, payment, and support. Voltis Emoto Australia.",
};

export default function FAQPage() {
  return <FAQPageContent />;
}
