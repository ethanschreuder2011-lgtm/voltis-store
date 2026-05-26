import { AboutPageContent } from "@/components/about/AboutPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Voltis Emoto — Australian Electric Motorcycle Store",
  description: "Voltis Emoto is an Australian-owned electric motorcycle company. Rider-tested bikes, local support, 2-year warranty.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
