import { ReturnsPageContent } from "@/components/returns/ReturnsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds — Voltis Emoto",
  description: "30-day returns and fair damage protection. Transparent returns policy from Voltis Emoto.",
};

export default function ReturnsPage() {
  return <ReturnsPageContent />;
}
