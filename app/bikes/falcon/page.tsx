import { BikePageTemplate } from "@/components/bike/BikePageTemplate";
import { falcon } from "@/lib/bikeData";

export const metadata = {
  title: "Falcon Pro — Voltis Emoto",
  description: "Engineered in silence. Felt in every turn. The Falcon Pro — starting at $4,999.",
};

export default function FalconPage() {
  return <BikePageTemplate bike={falcon} />;
}
