import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BrandMarquee from "@/components/BrandMarquee";
import WhatWeBuy from "@/components/WhatWeBuy";
import Process from "@/components/Process";
import WhyROC from "@/components/WhyROC";
import PhotoStrip from "@/components/PhotoStrip";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <ScrollReveal>
      <Navbar />
      <Hero />
      <Marquee />
      <BrandMarquee />
      <WhatWeBuy />
      <Process />
      <WhyROC />
      <PhotoStrip />
      <Testimonials />
      <Footer />
    </ScrollReveal>
  );
}
