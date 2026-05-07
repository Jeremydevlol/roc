const categories = [
  {
    title: "Diamond Jewelry",
    sub: "Loose diamonds, diamond rings, engagement rings, bracelets & earrings",
    detail: "All shapes, sizes & certifications — GIA, AGS, IGI welcome",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <polygon points="40,6 74,40 40,74 6,40" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.04)" />
        <polygon points="40,16 64,40 40,64 16,40" stroke="#C9A84C" strokeWidth="0.7" fill="none" />
        <line x1="6" y1="40" x2="74" y2="40" stroke="#C9A84C" strokeWidth="0.5" />
        <line x1="40" y1="6" x2="40" y2="74" stroke="#C9A84C" strokeWidth="0.5" />
        <line x1="6" y1="40" x2="40" y2="6" stroke="#C9A84C" strokeWidth="0.5" />
        <line x1="40" y1="6" x2="74" y2="40" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="40" cy="40" r="4" fill="#C9A84C" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Gold & Platinum",
    sub: "14k, 18k, 22k gold jewelry, platinum pieces, coins & bullion",
    detail: "All conditions accepted — broken, worn or complete sets",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="48" r="26" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.04)" />
        <circle cx="40" cy="48" r="19" stroke="#C9A84C" strokeWidth="0.7" fill="none" />
        <ellipse cx="40" cy="26" rx="16" ry="10" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.06)" />
        <line x1="24" y1="26" x2="24" y2="48" stroke="#C9A84C" strokeWidth="0.8" />
        <line x1="56" y1="26" x2="56" y2="48" stroke="#C9A84C" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    title: "Rolex & Luxury Watches",
    sub: "Rolex, Patek Philippe, Cartier, Audemars Piguet, IWC & more",
    detail: "All conditions — working, non-working, vintage & modern",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="28" y="18" width="24" height="44" rx="12" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.04)" />
        <circle cx="40" cy="40" r="12" stroke="#C9A84C" strokeWidth="1" fill="none" />
        <line x1="40" y1="32" x2="40" y2="40" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="40" y1="40" x2="46" y2="44" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="20" y="30" width="8" height="4" rx="1" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
        <rect x="52" y="30" width="8" height="4" rx="1" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
      </svg>
    ),
  },
  {
    title: "Designer Jewelry",
    sub: "Cartier, Tiffany & Co., Van Cleef, Bulgari, Harry Winston",
    detail: "Signed pieces command top market prices — bring the original box",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M 20,20 Q 40,10 60,20 Q 68,42 60,58 Q 40,68 20,58 Q 12,42 20,20" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.04)" />
        <polygon points="40,46 50,58 40,70 30,58" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.06)" />
        <circle cx="40" cy="20" r="5" stroke="#C9A84C" strokeWidth="1" fill="rgba(201,168,76,0.1)" />
      </svg>
    ),
  },
  {
    title: "Antique & Vintage",
    sub: "Art Deco, Edwardian, Victorian, Georgian & Mid-Century pieces",
    detail: "Estate pieces from all eras — provenance adds value",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <polygon points="40,8 72,26 72,54 40,72 8,54 8,26" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.04)" />
        <polygon points="40,18 62,30 62,50 40,62 18,50 18,30" stroke="#C9A84C" strokeWidth="0.7" fill="none" />
        <circle cx="40" cy="40" r="8" stroke="#C9A84C" strokeWidth="1" fill="rgba(201,168,76,0.08)" />
      </svg>
    ),
  },
  {
    title: "Complete Estates",
    sub: "Entire jewelry collections, probate assets & estate liquidations",
    detail: "We come to you — discreet house calls for large collections",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="12" y="28" width="56" height="38" rx="2" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.04)" />
        <path d="M 22,28 L 22,20 Q 22,14 40,14 Q 58,14 58,20 L 58,28" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="47" r="6" stroke="#C9A84C" strokeWidth="1" fill="rgba(201,168,76,0.1)" />
        <line x1="40" y1="47" x2="40" y2="53" stroke="#C9A84C" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function WhatWeBuy() {
  return (
    <section id="what-we-buy" className="bg-[#0D0D0D] py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span
            className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C] block mb-4"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            What We Purchase
          </span>
          <h2
            className="text-[clamp(36px,4.5vw,64px)] font-light leading-[1.1]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            We Buy the <em className="italic text-[#E8C97A]">Finest Pieces</em>
          </h2>
          <div className="w-14 h-px bg-[#C9A84C] mx-auto mt-5" />
          <p
            className="text-[13px] font-light text-white/45 mt-5 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            From a single inherited ring to an entire estate collection — we evaluate everything and make immediate offers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9A84C]/10">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="reveal bg-[#0D0D0D] p-10 group hover:bg-[#141414] transition-colors duration-300 cursor-pointer border-b border-r border-transparent"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {cat.svg}
              </div>
              <h3
                className="text-[22px] font-light text-white mb-3 group-hover:text-[#E8C97A] transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {cat.title}
              </h3>
              <p
                className="text-[12px] font-light text-white/50 leading-relaxed mb-3"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {cat.sub}
              </p>
              <p
                className="text-[11px] text-[#C9A84C]/60 font-light italic border-t border-[#C9A84C]/10 pt-3"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {cat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 reveal">
          <a
            href="#sell"
            className="inline-block text-[11px] font-semibold tracking-[3px] uppercase bg-[#C9A84C] text-black px-12 py-5 hover:bg-[#E8C97A] hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-[#C9A84C]/20"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Schedule Your Free Evaluation →
          </a>
        </div>
      </div>
    </section>
  );
}
