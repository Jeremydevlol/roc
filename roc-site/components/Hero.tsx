import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gold radial glow */}
      <div className="absolute right-0 top-0 w-[60%] h-full bg-gradient-to-l from-[#C9A84C]/5 to-transparent pointer-events-none" />

      {/* Large decorative diamond */}
      <svg
        className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.06] hidden xl:block"
        width="560" height="560" viewBox="0 0 560 560" fill="none"
      >
        <polygon points="280,20 540,280 280,540 20,280" stroke="#C9A84C" strokeWidth="1" />
        <polygon points="280,70 490,280 280,490 70,280" stroke="#C9A84C" strokeWidth="0.6" />
        <polygon points="280,120 440,280 280,440 120,280" stroke="#C9A84C" strokeWidth="0.4" />
        <line x1="20" y1="280" x2="540" y2="280" stroke="#C9A84C" strokeWidth="0.4" />
        <line x1="280" y1="20" x2="280" y2="540" stroke="#C9A84C" strokeWidth="0.4" />
        <line x1="20" y1="280" x2="280" y2="20" stroke="#C9A84C" strokeWidth="0.4" />
        <line x1="280" y1="20" x2="540" y2="280" stroke="#C9A84C" strokeWidth="0.4" />
        <circle cx="280" cy="280" r="6" fill="#C9A84C" opacity="0.5" />
      </svg>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pt-28 pb-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-[#C9A84C]" />
            <span
              className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C]"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Trusted Estate Jewelry Buyers · New York
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(50px,7vw,96px)] font-light leading-[1.04] tracking-[-1px] mb-8"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Sell Your Estate
            <br />
            Jewelry With{" "}
            <em className="italic text-[#E8C97A]">Confidence</em>
          </h1>

          {/* Sub */}
          <p
            className="text-[13px] font-light leading-[1.9] tracking-wide text-white/55 max-w-[480px] mb-12"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Expert evaluations, same-day offers, and complete discretion.
            We buy diamonds, gold, designer jewelry, luxury watches, and entire
            estate collections — with immediate payment and zero pressure.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 items-center mb-16">
            <a
              href="#sell"
              className="text-[11px] font-semibold tracking-[3px] uppercase bg-[#C9A84C] text-black px-10 py-5 hover:bg-[#E8C97A] hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-[#C9A84C]/20"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Get My Free Offer →
            </a>
            <a
              href="#process"
              className="text-[11px] font-medium tracking-[3px] uppercase border border-[#C9A84C]/40 text-[#C9A84C] px-10 py-5 hover:border-[#C9A84C] hover:bg-[#C9A84C]/8 transition-all duration-300"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 border-t border-white/8 pt-8">
            {[
              { num: "GIA", label: "Certified Experts" },
              { num: "Same Day", label: "Offers Guaranteed" },
              { num: "100%", label: "Confidential Process" },
              { num: "Immediate", label: "Payment on Acceptance" },
            ].map((s) => (
              <div key={s.label}>
                <span
                  className="block text-[28px] font-light text-[#E8C97A] leading-none mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {s.num}
                </span>
                <span
                  className="text-[10px] tracking-[2px] uppercase text-white/40"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent" />
        <span className="text-[9px] tracking-[3px] uppercase text-white" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
