export default function Hero() {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#0A0A0A] pt-[70px]">
      {/* LEFT */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-[#0A0A0A] relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-[#C9A84C]" />
          <span className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Trusted Jewelry Buyers · Miami, FL
          </span>
        </div>
        <h1 className="text-[clamp(44px,6vw,82px)] font-black leading-[1.0] tracking-[-1px] mb-6 uppercase" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          <span className="block text-white">We Buy</span>
          <span className="block text-[#C9A84C]">Fine Jewelry</span>
          <span className="block text-white/70 text-[clamp(18px,2.2vw,28px)] font-bold tracking-[3px] mt-2">At The Highest Price</span>
        </h1>
        <p className="text-[13px] font-light leading-[1.9] text-white/50 max-w-[440px] mb-10" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          We buy diamonds, gold, designer jewelry &amp; estate collections.<br />
          <strong className="text-white font-semibold">Instant payment. 100% confidential.</strong>
        </p>
        <div className="flex flex-wrap gap-4 mb-12">
          <a href="#sell" className="text-[11px] font-bold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-10 py-5 hover:bg-[#D4AF5A] hover:-translate-y-px transition-all duration-300 shadow-xl shadow-[#C9A84C]/20" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Get My Free Offer →
          </a>
          <a href="#process" className="text-[11px] font-semibold tracking-[2.5px] uppercase border border-[#C9A84C]/40 text-[#C9A84C] px-10 py-5 hover:border-[#C9A84C] hover:bg-[#C9A84C]/8 transition-all duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            How It Works
          </a>
        </div>
        <div className="hidden md:grid grid-cols-3 gap-4 border-t border-white/8 pt-8">
          {[
            { num: "GIA", label: "Certified Experts" },
            { num: "Same Day", label: "Offers Guaranteed" },
            { num: "100%", label: "Confidential" },
          ].map((s) => (
            <div key={s.label}>
              <span className="block text-[26px] font-light text-[#C9A84C] leading-none mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</span>
              <span className="text-[10px] tracking-[2px] uppercase text-white/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — video hero */}
      <div className="relative overflow-hidden min-h-[300px] lg:min-h-full order-first lg:order-last">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* gradient overlay left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent lg:block hidden" />
        {/* gradient overlay bottom for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent lg:hidden" />
      </div>
    </section>
  );
}
