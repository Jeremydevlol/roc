const steps = [
  {
    num: "01",
    title: "Schedule Your Appointment",
    body: "Book a free, private consultation online, by phone, or request a house call for large collections. No commitment required.",
    cta: "Book Now",
  },
  {
    num: "02",
    title: "Receive Expert Evaluation",
    body: "Our GIA-certified experts assess each piece — diamonds, metals, signatures, and market value — with complete transparency.",
    cta: null,
  },
  {
    num: "03",
    title: "Get Your Immediate Offer",
    body: "Receive a written, no-pressure offer based on current market prices. We pay the highest prices in the market — guaranteed.",
    cta: null,
  },
  {
    num: "04",
    title: "Leave With Payment",
    body: "Accept and receive immediate payment by cash, check, or wire transfer. The entire process takes as little as one hour.",
    cta: null,
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-[#111111] py-28 px-8 md:px-16 border-y border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <span
            className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C] block mb-4"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Simple & Secure
          </span>
          <h2
            className="text-[clamp(36px,4.5vw,64px)] font-light leading-[1.1]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Four Steps to <em className="italic text-[#E8C97A]">Immediate Cash</em>
          </h2>
          <div className="w-14 h-px bg-[#C9A84C] mx-auto mt-5" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="reveal relative group p-10 border-l border-[#C9A84C]/15 first:border-l-0 md:[&:nth-child(3)]:border-l md:[&:nth-child(3)]:border-t-0 hover:bg-[#C9A84C]/3 transition-colors duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Number */}
              <div
                className="text-[80px] font-light leading-none text-[#C9A84C]/8 mb-6 group-hover:text-[#C9A84C]/15 transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {step.num}
              </div>
              {/* Icon line */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <div className="w-2 h-2 rotate-45 border border-[#C9A84C] bg-[#C9A84C]" />
              </div>
              <h3
                className="text-[22px] font-light text-white mb-4 leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-[12px] font-light text-white/45 leading-relaxed"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {step.body}
              </p>
              {step.cta && (
                <a
                  href="#sell"
                  className="inline-block mt-6 text-[10px] font-semibold tracking-[2.5px] uppercase text-[#C9A84C] border-b border-[#C9A84C]/30 pb-px hover:border-[#C9A84C] transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {step.cta} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-20 p-8 bg-[#C9A84C]/5 border border-[#C9A84C]/20 flex flex-col md:flex-row items-center justify-between gap-6 reveal">
          <div>
            <p
              className="text-[22px] font-light text-white mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Have a large collection? We'll come to you.
            </p>
            <p
              className="text-[12px] font-light text-white/40"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Complimentary house calls available for estates and collections valued at $5,000+
            </p>
          </div>
          <a
            href="#sell"
            className="flex-shrink-0 text-[11px] font-semibold tracking-[2.5px] uppercase border border-[#C9A84C] text-[#C9A84C] px-8 py-4 hover:bg-[#C9A84C] hover:text-black transition-all duration-300 whitespace-nowrap"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Request House Call
          </a>
        </div>
      </div>
    </section>
  );
}
