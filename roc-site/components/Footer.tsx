import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#C9A84C]/10">
      {/* CTA Banner */}
      <div className="bg-[#C9A84C]/5 border-b border-[#C9A84C]/10 py-14 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-[clamp(26px,3vw,42px)] font-light text-white mb-2 leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Still thinking about selling?
            </h3>
            <p
              className="text-[12px] font-light text-white/40"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Get a second jewelry offer — trusted estate buyers ready to help.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#sell"
              className="text-[11px] font-semibold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-8 py-4 hover:bg-[#E8C97A] transition-all duration-300 whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Get My Free Offer →
            </a>
            <a
              href="tel:+1-800-ROC-GEMS"
              className="text-[11px] font-medium tracking-[2.5px] uppercase border border-[#C9A84C]/40 text-[#C9A84C] px-8 py-4 hover:border-[#C9A84C] transition-all duration-300 whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <Image src="/roc-logo.png" alt="ROC Diamonds" width={44} height={44} className="rounded-sm" />
            <span
              className="text-[15px] font-semibold tracking-[4px] uppercase text-white"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              ROC DIAMONDS
            </span>
          </div>
          <p
            className="text-[12px] font-light text-white/35 leading-relaxed mb-6"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            New York's most trusted estate jewelry buyers. GIA-certified experts. Immediate offers. Complete discretion.
          </p>
          <div className="flex gap-3">
            {["ig", "fb", "pt"].map((s) => (
              <a
                key={s}
                href="https://rocdiamond.com"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-[11px] text-white/30 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 uppercase tracking-wider"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* What We Buy */}
        <div>
          <h4
            className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9A84C] mb-6"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            What We Buy
          </h4>
          <ul className="space-y-3">
            {["Diamond Jewelry", "Gold & Platinum", "Rolex & Luxury Watches", "Cartier & Designer", "Antique & Vintage", "Complete Estates"].map((item) => (
              <li key={item}>
                <a
                  href="#what-we-buy"
                  className="text-[12px] font-light text-white/35 hover:text-[#C9A84C] transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4
            className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9A84C] mb-6"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Our Services
          </h4>
          <ul className="space-y-3">
            {["Free Jewelry Evaluation", "Same-Day Offers", "Estate Consultations", "House Calls", "GIA Appraisals", "Probate Assistance"].map((item) => (
              <li key={item}>
                <a
                  href="#sell"
                  className="text-[12px] font-light text-white/35 hover:text-[#C9A84C] transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9A84C] mb-6"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Contact
          </h4>
          <ul className="space-y-4">
            {[
              { icon: "◎", label: "New York, NY" },
              { icon: "◷", label: "Mon–Sat: 10am – 6pm" },
              { icon: "◆", label: "rocdiamond.com" },
              { icon: "✦", label: "Private appointments available" },
            ].map((c) => (
              <li key={c.label} className="flex items-start gap-3">
                <span className="text-[#C9A84C] text-[11px] mt-0.5">{c.icon}</span>
                <span
                  className="text-[12px] font-light text-white/35"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="text-[11px] font-light text-white/15"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          © 2025 ROC Diamonds and Fine Jewelry. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Sitemap"].map((l) => (
            <a
              key={l}
              href="https://rocdiamond.com"
              className="text-[11px] font-light text-white/15 hover:text-white/40 transition-colors duration-300"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
