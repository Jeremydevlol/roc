"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { label: "What We Buy", href: "#what-we-buy" },
  { label: "How It Works", href: "#process" },
  { label: "Locations", href: "#locations" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md shadow-2xl" : "bg-[#0A0A0A]"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-[70px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group flex-shrink-0">
            <Image src="/output-onlinepngtools.png" alt="ROC Diamonds" width={44} height={44} className="object-contain" />
            <div className="hidden sm:block">
              <span className="block text-[13px] font-semibold tracking-[3px] uppercase text-white leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>ROC Diamonds</span>
              <span className="block text-[9px] tracking-[2px] uppercase text-[#C9A84C]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Buyers of Fine Jewelry</span>
            </div>
          </a>
          <ul className="hidden lg:flex items-center gap-1 list-none">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-[10px] font-semibold tracking-[2px] uppercase text-white/50 hover:text-[#C9A84C] px-4 h-[70px] flex items-center border-b-2 border-transparent hover:border-[#C9A84C] transition-all duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#sell" className="hidden md:block text-[10px] font-bold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-6 py-3 hover:bg-[#D4AF5A] transition-all duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get Free Offer</a>
            <button className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
              <span className={`block w-[22px] h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block w-[22px] h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-[22px] h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>
      <div className={`fixed top-[70px] left-0 right-0 bg-[#0A0A0A] border-b border-[#C9A84C]/20 z-40 transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"}`}>
        <div className="px-6 py-6">
          <ul className="list-none mb-5">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setMenuOpen(false)} className="block py-4 text-[12px] font-semibold tracking-[2px] uppercase text-white/60 hover:text-white border-b border-white/5 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#sell" onClick={() => setMenuOpen(false)} className="block text-center text-[11px] font-bold tracking-[2.5px] uppercase bg-[#C9A84C] text-black py-4 hover:bg-[#D4AF5A] transition-all" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a Free Offer →</a>
        </div>
      </div>
    </>
  );
}
