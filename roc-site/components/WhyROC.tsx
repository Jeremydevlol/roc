const reasons = [
  {
    num: "01",
    title: "GIA-Certified Experts",
    body: "Our in-house gemologists hold GIA credentials and decades of experience evaluating diamonds, colored stones, and fine jewelry at the highest professional standard.",
  },
  {
    num: "02",
    title: "Highest Prices Paid",
    body: "We offer more than pawnshops, consignment stores, and most auction houses because we buy direct — no middlemen, no commissions, no hidden fees.",
  },
  {
    num: "03",
    title: "Family-Owned & Trusted",
    body: "ROC Diamonds is a family business built on integrity. Thousands of satisfied clients have trusted us with their most personal and valuable possessions.",
  },
  {
    num: "04",
    title: "Complete Discretion",
    body: "We understand the sensitive nature of estate sales. Every transaction is private, secure, and handled with the utmost respect for your privacy and situation.",
  },
];

export default function WhyROC() {
  return (
    <section id="about" className="bg-[#0A0A0A] py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Left: visual */}
        <div className="reveal relative flex items-center justify-center h-[500px]">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-36 h-36 border-l border-t border-[#C9A84C]/20" />
          <div className="absolute bottom-0 right-0 w-36 h-36 border-r border-b border-[#C9A84C]/20" />

          {/* Central diamond SVG */}
          <svg width="380" height="380" viewBox="0 0 380 380" fill="none" className="opacity-80">
            <polygon points="190,16 364,190 190,364 16,190" stroke="#C9A84C" strokeWidth="1" fill="none" />
            <polygon points="190,50 330,190 190,330 50,190" stroke="#C9A84C" strokeWidth="0.6" fill="none" />
            <polygon points="190,90 290,190 190,290 90,190" stroke="#C9A84C" strokeWidth="0.4" fill="rgba(201,168,76,0.02)" />
            <line x1="16" y1="190" x2="364" y2="190" stroke="#C9A84C" strokeWidth="0.4" />
            <line x1="190" y1="16" x2="190" y2="364" stroke="#C9A84C" strokeWidth="0.4" />
            <line x1="16" y1="190" x2="190" y2="16" stroke="#C9A84C" strokeWidth="0.4" />
            <line x1="190" y1="16" x2="364" y2="190" stroke="#C9A84C" strokeWidth="0.4" />
            <line x1="16" y1="190" x2="190" y2="364" stroke="#C9A84C" strokeWidth="0.4" />
            <line x1="190" y1="364" x2="364" y2="190" stroke="#C9A84C" strokeWidth="0.4" />
            <circle cx="190" cy="190" r="22" stroke="#C9A84C" strokeWidth="1" fill="rgba(201,168,76,0.05)" />
            <circle cx="190" cy="190" r="5" fill="#C9A84C" opacity="0.7" />
          </svg>

          {/* Floating quote */}
          <div className="absolute bottom-12 left-0 right-0 mx-auto max-w-xs bg-[#111111] border border-[#C9A84C]/20 px-6 py-5 text-center">
            <p
              className="text-[18px] font-light italic text-[#E8C97A] leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              "Turn unused jewelry into immediate cash"
            </p>
            <div className="w-8 h-px bg-[#C9A84C] mx-auto mt-3" />
          </div>
        </div>

        {/* Right: reasons */}
        <div className="reveal">
          <span
            className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C] block mb-5"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Why Sell To ROC
          </span>
          <h2
            className="text-[clamp(32px,3.5vw,56px)] font-light leading-[1.1] mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Excellence in <em className="italic text-[#E8C97A]">Every Detail</em>
          </h2>
          <div className="w-12 h-px bg-[#C9A84C] mb-10" />

          <ul className="space-y-0">
            {reasons.map((r) => (
              <li
                key={r.num}
                className="flex gap-6 py-7 border-b border-[#C9A84C]/10 last:border-b-0 group"
              >
                <span
                  className="text-[44px] font-light text-[#C9A84C]/12 leading-none pt-1 min-w-[52px] group-hover:text-[#C9A84C]/25 transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {r.num}
                </span>
                <div>
                  <h3
                    className="text-[20px] font-light text-white mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="text-[12px] font-light text-white/45 leading-relaxed"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    {r.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#sell"
            className="inline-block mt-10 text-[11px] font-semibold tracking-[3px] uppercase bg-[#C9A84C] text-black px-10 py-4 hover:bg-[#E8C97A] transition-all duration-300"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Get My Free Offer →
          </a>
        </div>
      </div>
    </section>
  );
}
