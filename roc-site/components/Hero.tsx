export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 600 }}>
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.75) 100%)" }}
      />

      {/* CONTENT — centered over video */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: 70 }}
      >
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-8 h-px" style={{ background: "#C9A84C" }} />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#C9A84C",
              textShadow: "0 1px 6px rgba(0,0,0,0.9)",
            }}
          >
            Trusted Jewelry Buyers · Miami, FL
          </span>
          <div className="w-8 h-px" style={{ background: "#C9A84C" }} />
        </div>

        {/* headline */}
        <h1
          className="font-black uppercase leading-[1.0] tracking-[-1px] mb-5"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(54px, 11vw, 120px)",
          }}
        >
          <span
            className="block text-white"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7), 2px 2px 0px rgba(0,0,0,0.5)" }}
          >
            We Buy
          </span>
          <span
            style={{
              color: "#C9A84C",
              textShadow: "0 2px 4px rgba(0,0,0,0.95), 0 4px 24px rgba(0,0,0,0.75), 2px 2px 0px rgba(0,0,0,0.6)",
            }}
          >
            Fine Jewelry
          </span>
        </h1>

        {/* sub-headline */}
        <p
          className="font-light leading-[1.9] mb-10"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(13px, 1.4vw, 16px)",
            color: "rgba(255,255,255,0.75)",
            maxWidth: 460,
            textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 2px 16px rgba(0,0,0,0.7)",
          }}
        >
          We buy diamonds, gold, designer jewelry &amp; estate collections.<br />
          <strong style={{ color: "#fff", fontWeight: 600 }}>Instant payment. 100% confidential.</strong>
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          <a
            href="/offer"
            className="hover:-translate-y-px transition-all duration-300"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              background: "#C9A84C",
              color: "#000",
              padding: "18px 40px",
              boxShadow: "0 14px 44px rgba(201,168,76,0.30)",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            Get My Free Offer →
          </a>
          <a
            href="#process"
            className="transition-all duration-300"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              border: "1px solid rgba(201,168,76,0.45)",
              color: "#C9A84C",
              padding: "18px 40px",
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            How It Works
          </a>
        </div>

        {/* stats bar */}
        <div
          className="grid grid-cols-3 gap-8 pt-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.10)",
            maxWidth: 480,
            width: "100%",
          }}
        >
          {[
            { num: "GIA", label: "Certified Experts" },
            { num: "Same Day", label: "Offers" },
            { num: "100%", label: "Confidential" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <span
                className="block font-light leading-none mb-1"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(17px, 2.4vw, 26px)",
                  color: "#C9A84C",
                  textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom fade into page bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28"
        style={{ background: "linear-gradient(to bottom, transparent, #0A0A0A)" }}
      />
    </section>
  );
}
