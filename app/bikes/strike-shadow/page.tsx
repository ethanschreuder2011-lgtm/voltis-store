import { BikePageTemplate } from "@/components/bike/BikePageTemplate";
import { strikeShadow } from "@/lib/bikeData";

export const metadata = {
  title: "Strike Shadow — Voltis Emoto",
  description: "Stealth mode. Maximum impact. The Strike Shadow — starting at $9,999.",
};

export default function StrikeShadowPage() {
  return <BikePageTemplate bike={strikeShadow} />;
}
