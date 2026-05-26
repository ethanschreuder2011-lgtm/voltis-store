import { PrivacyPageContent } from "@/components/privacy/PrivacyPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Voltis Emoto",
  description: "Voltis Emoto Privacy Policy. We respect your privacy and handle your data transparently under Australian law.",
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
