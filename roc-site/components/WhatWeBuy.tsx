import Image from "next/image";

const categories = [
  { title: "Gold Jewelry", sub: "All karats accepted", detail: "14k, 18k, 22k — any condition", img: "/jjhjn.png" },
  { title: "Diamonds", sub: "GIA certified welcome", detail: "Loose diamonds & diamond jewelry", img: "/adsasd.png" },
  { title: "Diamond Earrings", sub: "Any condition", detail: "Studs, drops, chandelier & more", img: "/asdasdw.png" },
  { title: "Designer Jewelry", sub: "Cartier, Tiffany, Van Cleef", detail: "Signed pieces command top prices", img: "/adxxxx.png" },
  { title: "Antique & Estate", sub: "Art Deco, Victorian…", detail: "All eras — provenance adds value", img: "/jjii.png" },
  { title: "Full Collections", sub: "Entire estate collections", detail: "House calls for large estates", img: "/imagehgh.png" },
];

export default function WhatWeBuy() {
  return (
    <section id="what-we-buy" className="bg-[#0A0A0A] py-28">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="text-center mb-16">
          <span className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C] block mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>What We Purchase</span>
          <h2 className="text-[clamp(32px,4.5vw,58px)] font-black uppercase leading-[1.05] tracking-[-0.5px]" style={{ fontFamily: "'Playfair Display', serif" }}>
            We Buy All Types<br />of <em className="not-italic text-[#C9A84C]">Fine Jewelry</em>
          </h2>
          <div className="w-14 h-px bg-[#C9A84C] mx-auto mt-5" />
          <p className="text-[13px] font-light text-white/45 mt-5 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            From one piece to entire collections — we pay the highest prices in the market.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[2px]">
          {categories.map((cat) => (
            <div key={cat.title} className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "3/4" }}>
              <Image src={cat.img} alt={cat.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <div className="h-[2px] bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-300 mb-2" />
                <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-white leading-snug" style={{ fontFamily: "'Montserrat', sans-serif" }}>{cat.title}</div>
                <div className="text-[10px] text-[#C9A84C] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>{cat.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#sell" className="inline-block text-[11px] font-bold tracking-[3px] uppercase bg-[#C9A84C] text-black px-12 py-5 hover:bg-[#D4AF5A] hover:-translate-y-px transition-all duration-300 shadow-xl shadow-[#C9A84C]/20" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Schedule Your Free Evaluation →
          </a>
        </div>
      </div>
    </section>
  );
}
