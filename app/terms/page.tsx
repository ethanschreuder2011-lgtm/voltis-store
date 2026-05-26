import { TermsPageContent } from "@/components/terms/TermsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Voltis Emoto",
  description: "Voltis Emoto Terms of Service. Governed by New South Wales law and compliant with Australian Consumer Law.",
};

export default function TermsPage() {
  return <TermsPageContent />;
}
