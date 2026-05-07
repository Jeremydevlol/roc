const testimonials = [
  {
    quote: "I inherited my grandmother's jewelry collection and had no idea what it was worth. ROC gave me a fair, same-day offer and I walked out with a check. The whole process took under two hours.",
    name: "Margaret L.",
    role: "Inherited Estate — Connecticut",
    initials: "ML",
  },
  {
    quote: "After my divorce I needed to sell my engagement ring discreetly. ROC was professional, confidential, and paid far more than any other buyer I consulted. I'm incredibly grateful.",
    name: "Sarah K.",
    role: "Private Sale — New York",
    initials: "SK",
  },
  {
    quote: "As an estate attorney I regularly refer clients to ROC Diamonds. Their GIA expertise, fair pricing, and professional discretion make them the only jewelry buyer I trust with my clients' estates.",
    name: "James R., Esq.",
    role: "Estate Attorney — New York",
    initials: "JR",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0D0D0D] py-28 px-8 md:px-16 border-y border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span
            className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C] block mb-4"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Client Stories
          </span>
          <h2
            className="text-[clamp(34px,4vw,58px)] font-light leading-[1.1]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Trusted by <em className="italic text-[#E8C97A]">Thousands</em>
          </h2>
          <div className="w-14 h-px bg-[#C9A84C] mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="reveal border border-[#C9A84C]/12 bg-[#111111] p-10 relative group hover:border-[#C9A84C]/30 transition-colors duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Quote mark */}
              <div
                className="absolute top-6 left-8 text-[72px] leading-none font-light italic text-[#C9A84C]/8 group-hover:text-[#C9A84C]/15 transition-colors duration-300 select-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                "
              </div>

              <p
                className="text-[17px] font-light italic leading-[1.75] text-white/70 relative z-10 mb-8"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {t.quote}
              </p>

              <div className="flex items-center gap-4 border-t border-[#C9A84C]/10 pt-6">
                <div className="w-10 h-10 bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-[13px] text-[#C9A84C] font-light"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p
                    className="text-[13px] font-medium text-white"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[10px] font-light text-white/35 tracking-wide"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    {t.role}
                  </p>
                </div>
                <div className="ml-auto text-[#C9A84C] text-sm tracking-widest">★★★★★</div>
              </div>
            </div>
          ))}
        </div>

        {/* Press strip */}
        <div className="mt-16 py-10 border-y border-[#C9A84C]/10 flex flex-wrap items-center justify-center gap-12 reveal">
          <p
            className="text-[10px] tracking-[3px] uppercase text-white/20 font-light w-full text-center mb-2"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            As seen in
          </p>
          {["New York Times", "Robb Report", "Town & Country", "The Knot", "Brides Magazine"].map((p) => (
            <span
              key={p}
              className="text-[13px] font-light tracking-[2px] text-white/20 hover:text-white/40 transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
