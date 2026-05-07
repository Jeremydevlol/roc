import Image from "next/image";

const brands = [
  { src: "/logo-rolex.png",    alt: "Rolex",               ap: false },
  { src: "/logo-cartier.png",  alt: "Cartier",             ap: false },
  { src: "/logo-vacheron.png", alt: "Vacheron Constantin", ap: false },
  { src: "/logo-ap.jpg",       alt: "Audemars Piguet",     ap: true  },
  { src: "/logo-vca.webp",     alt: "Van Cleef & Arpels",  ap: false },
];

// duplicate for seamless loop
const track = [...brands, ...brands];

export default function BrandMarquee() {
  return (
    <div className="bg-[#0D0D0D] border-t border-[#C9A84C]/12 border-b border-[#C9A84C]/12 py-7 overflow-hidden">
      <p className="text-center text-[9px] font-bold tracking-[4px] uppercase text-white/20 mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        We Pay Top Dollar For These Luxury Brands
      </p>
      <div className="relative overflow-hidden">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-16 animate-[brandScroll_28s_linear_infinite] hover:[animation-play-state:paused] w-max">
          {track.map((b, i) => (
            <div
              key={i}
              className={`flex-shrink-0 h-10 flex items-center justify-center opacity-40 hover:opacity-90 transition-opacity duration-300 ${
                b.ap ? "grayscale brightness-[1.8]" : "brightness-0 invert"
              }`}
              style={{ filter: b.ap ? "grayscale(1) brightness(1.8)" : "brightness(0) invert(1)" }}
            >
              <Image src={b.src} alt={b.alt} width={120} height={40} className="object-contain h-10 w-auto max-w-[120px]" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes brandScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
