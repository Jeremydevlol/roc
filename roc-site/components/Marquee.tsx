const items = [
  "Diamond Jewelry", "Gold & Platinum", "Rolex Watches",
  "Cartier", "Tiffany & Co.", "Estate Collections",
  "Art Deco Pieces", "Inherited Jewelry", "GIA Certified",
  "Same-Day Offers", "Immediate Payment", "House Calls Available",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-[#C9A84C] overflow-hidden py-[14px] select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[10px] font-semibold tracking-[4px] uppercase text-black px-10 flex items-center gap-10"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {item}
            <span className="text-[7px] opacity-50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
