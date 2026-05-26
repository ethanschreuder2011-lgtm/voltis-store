import { ShippingPageContent } from "@/components/shipping/ShippingPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery — Voltis Emoto",
  description: "Free nationwide delivery across Australia. Professional packaging, full transit insurance, and real-time tracking on every order.",
};

export default function ShippingPage() {
  return <ShippingPageContent />;
}
