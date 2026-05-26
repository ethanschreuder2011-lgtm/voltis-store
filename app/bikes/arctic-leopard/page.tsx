import { BikePageTemplate } from "@/components/bike/BikePageTemplate";
import { arcticLeopard } from "@/lib/bikeData";

export const metadata = {
  title: "Arctic Leopard — Voltis Emoto",
  description: "Precision engineered for every condition. The Arctic Leopard — starting at $7,499.",
};

export default function ArcticLeopardPage() {
  return <BikePageTemplate bike={arcticLeopard} />;
}
