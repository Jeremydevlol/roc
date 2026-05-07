import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#C9A84C]/10">
      <div className="bg-[#C9A84C]/5 border-b border-[#C9A84C]/10 py-14 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[clamp(24px,3vw,40px)] font-black uppercase text-white mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>Still thinking about selling?</h3>
            <p className="text-[12px] font-light text-white/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get a free offer — trusted estate buyers ready to help.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#sell" className="text-[11px] font-bold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-8 py-4 hover:bg-[#D4AF5A] transition-all whitespace-nowrap" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get My Free Offer →</a>
            <a href="tel:3053505059" className="text-[11px] font-semibold tracking-[2.5px] uppercase border border-[#C9A84C]/40 text-[#C9A84C] px-8 py-4 hover:border-[#C9A84C] transition-all whitespace-nowrap" style={{ fontFamily: "'Montserrat', sans-serif" }}>305-350-5059</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <Image src="/output-onlinepngtools.png" alt="ROC Diamonds" width={44} height={44} className="object-contain" />
            <div>
              <span className="block text-[13px] font-semibold tracking-[3px] uppercase text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>ROC Diamonds</span>
              <span className="block text-[9px] tracking-[2px] uppercase text-[#C9A84C]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Fine Jewelry, LLC</span>
            </div>
          </div>
          <p className="text-[12px] font-light text-white/35 leading-relaxed mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Miami's most trusted estate jewelry buyers. GIA-certified experts. Immediate offers. Complete discretion.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9A84C] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>What We Buy</h4>
          <ul className="space-y-3">
            {["Diamond Jewelry", "Gold & Platinum", "Rolex & Luxury Watches", "Cartier & Designer", "Antique & Vintage", "Complete Estates"].map((item) => (
              <li key={item}><a href="#what-we-buy" className="text-[12px] font-light text-white/35 hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9A84C] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Services</h4>
          <ul className="space-y-3">
            {["Free Jewelry Evaluation", "Same-Day Offers", "Estate Consultations", "House Calls", "GIA Appraisals", "Probate Assistance"].map((item) => (
              <li key={item}><a href="#sell" className="text-[12px] font-light text-white/35 hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9A84C] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact</h4>
          <ul className="space-y-4">
            {[
              { icon: "📍", label: "36 NE 1st St. Suite 136\nMiami, FL 33132" },
              { icon: "📞", label: "305-350-5059" },
              { icon: "✉", label: "rocdiamonds136@gmail.com" },
              { icon: "◷", label: "Mon–Sat: 10am – 6pm" },
            ].map((c) => (
              <li key={c.label} className="flex items-start gap-3">
                <span className="text-[#C9A84C] text-[11px] mt-0.5 flex-shrink-0">{c.icon}</span>
                <span className="text-[12px] font-light text-white/35 whitespace-pre-line" style={{ fontFamily: "'Montserrat', sans-serif" }}>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] font-light text-white/15" style={{ fontFamily: "'Montserrat', sans-serif" }}>© 2025 ROC Diamonds and Fine Jewelry, LLC. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Sitemap"].map((l) => (
            <a key={l} href="https://rocdiamond.com" className="text-[11px] font-light text-white/15 hover:text-white/40 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
