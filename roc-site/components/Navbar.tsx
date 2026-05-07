"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-500 ${
        scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md shadow-2xl" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-3 group">
        <Image
          src="/roc-logo.png"
          alt="ROC Diamonds"
          width={52}
          height={52}
          className="rounded-sm"
        />
        <span
          className="hidden md:block text-sm font-semibold tracking-[4px] uppercase text-white/80 group-hover:text-white transition-colors"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          ROC DIAMONDS
        </span>
      </a>

      {/* Nav Links */}
      <ul className="hidden lg:flex items-center gap-10 list-none">
        {["Collections", "What We Buy", "Our Process", "About"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="text-[11px] font-medium tracking-[2.5px] uppercase text-white/50 hover:text-[#C9A84C] transition-colors duration-300"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#sell"
        className="text-[11px] font-semibold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-6 py-3 hover:bg-[#E8C97A] hover:-translate-y-px transition-all duration-300 shadow-lg"
        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
      >
        Get Free Offer
      </a>
    </nav>
  );
}
