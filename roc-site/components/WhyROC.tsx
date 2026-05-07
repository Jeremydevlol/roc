import Image from "next/image";

const reasons = [
  { num: "01", title: "GIA-Certified Experts", body: "Our in-house gemologists hold GIA credentials and decades of experience evaluating diamonds, colored stones, and fine jewelry at the highest professional standard." },
  { num: "02", title: "Highest Prices Paid", body: "We offer more than pawnshops, consignment stores, and most auction houses because we buy direct — no middlemen, no commissions, no hidden fees." },
  { num: "03", title: "Family-Owned & Trusted", body: "ROC Diamonds is a family business built on integrity. Thousands of satisfied clients have trusted us with their most personal and valuable possessions." },
  { num: "04", title: "Complete Discretion", body: "We understand the sensitive nature of estate sales. Every transaction is private, secure, and handled with the utmost respect for your privacy and situation." },
];

export default function WhyROC() {
  return (
    <section id="about" className="bg-[#0A0A0A] py-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left: real photo */}
        <div className="relative min-h-[480px] lg:min-h-full">
          <Image src="/asddas.png" alt="ROC Diamonds expert evaluating fine jewelry" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-10 border-t border-[#C9A84C]/20 bg-black/40 backdrop-blur-sm">
            <blockquote className="text-[clamp(18px,2vw,24px)] font-light italic text-[#C9A84C] leading-snug mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              "Selling jewelry should feel safe, fair, and dignified."
            </blockquote>
            <cite className="text-[11px] text-white/40 not-italic" style={{ fontFamily: "'Montserrat', sans-serif" }}>— ROC Diamonds &amp; Fine Jewelry, LLC</cite>
          </div>
        </div>

        {/* Right: reasons */}
        <div className="px-8 md:px-14 py-20 bg-[#0D0D0D]">
          <span className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C] block mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Why Sell To ROC</span>
          <h2 className="text-[clamp(28px,3.5vw,50px)] font-black uppercase leading-[1.1] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Excellence in <em className="not-italic text-[#C9A84C]">Every Detail</em>
          </h2>
          <div className="w-12 h-px bg-[#C9A84C] mb-10" />
          <ul className="space-y-0">
            {reasons.map((r) => (
              <li key={r.num} className="flex gap-6 py-7 border-b border-[#C9A84C]/10 last:border-b-0 group">
                <span className="text-[44px] font-light text-[#C9A84C]/12 leading-none pt-1 min-w-[52px] group-hover:text-[#C9A84C]/30 transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>{r.num}</span>
                <div>
                  <h3 className="text-[20px] font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{r.title}</h3>
                  <p className="text-[12px] font-light text-white/45 leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <a href="#sell" className="inline-block mt-10 text-[11px] font-bold tracking-[3px] uppercase bg-[#C9A84C] text-black px-10 py-4 hover:bg-[#D4AF5A] transition-all duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Get My Free Offer →
          </a>
        </div>
      </div>
    </section>
  );
}
