import { BikePageTemplate } from "@/components/bike/BikePageTemplate";
import { ultraBee } from "@/lib/bikeData";

export const metadata = {
  title: "Sur-Ron Ultra Bee — Voltis Emoto",
  description: "Maximum force. Zero restraint. The Sur-Ron Ultra Bee pro electric motorcycle — starting at $12,999.",
};

export default function UltraBeePage() {
  return <BikePageTemplate bike={ultraBee} />;
}
