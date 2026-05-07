const items = [
  { icon: "◆", title: "GIA Certified", sub: "All diamonds verified & graded" },
  { icon: "⬡", title: "Same-Day Offers", sub: "Walk in, get an offer today" },
  { icon: "✦", title: "Immediate Payment", sub: "Cash or wire transfer accepted" },
  { icon: "◇", title: "100% Confidential", sub: "Secure & discreet process" },
  { icon: "❖", title: "No-Pressure", sub: "Expert advice, zero obligation" },
  { icon: "⬢", title: "House Calls", sub: "For large collections & estates" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#111111] border-y border-[#C9A84C]/15">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center gap-3 group">
            <div className="w-12 h-12 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-xl group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/5 transition-all duration-300">
              {item.icon}
            </div>
            <div>
              <p
                className="text-[12px] font-semibold text-white tracking-wide mb-1"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {item.title}
              </p>
              <p
                className="text-[10px] text-white/40 font-light leading-relaxed"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
