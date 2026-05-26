import { WarrantyPageContent } from "@/components/warranty/WarrantyPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warranty Coverage — Voltis Emoto",
  description: "2-year powertrain warranty, 1-year battery and component coverage on every Voltis Emoto bike. Australian-backed support.",
};

export default function WarrantyPage() {
  return <WarrantyPageContent />;
}
