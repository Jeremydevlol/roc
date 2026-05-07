import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TrustBar from "@/components/TrustBar";
import WhatWeBuy from "@/components/WhatWeBuy";
import Process from "@/components/Process";
import WhyROC from "@/components/WhyROC";
import SellWizard from "@/components/SellWizard";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <ScrollReveal>
      <Navbar />
      <Hero />
      <Marquee />
      <TrustBar />
      <WhatWeBuy />
      <Process />
      <WhyROC />
      <SellWizard />
      <Testimonials />
      <Footer />
    </ScrollReveal>
  );
}
