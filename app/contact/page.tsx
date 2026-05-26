import { ContactPageContent } from "@/components/contact/ContactPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Voltis Emoto — Get In Touch",
  description:
    "Questions about bikes, pickup, delivery, or reservations? Contact the Voltis Emoto team. Australian-based support, fast response times.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
