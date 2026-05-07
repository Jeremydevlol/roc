import Navbar from "@/components/Navbar";
import SellWizard from "@/components/SellWizard";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Get Your Free Offer — ROC Diamonds & Fine Jewelry",
  description: "Tell us about your jewelry and receive a free, no-obligation offer. Same-day evaluations. Confidential. Miami, FL.",
};

export default function OfferPage() {
  return (
    <>
      <Navbar />
      <SellWizard />
      <Footer />
    </>
  );
}
