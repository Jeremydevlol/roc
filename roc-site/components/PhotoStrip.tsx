import Image from "next/image";

const photos = [
  { src: "/image.png", alt: "Gold diamond jewelry collection" },
  { src: "/adsasdasd.png", alt: "Gold chain bracelet" },
  { src: "/adsasdw.png", alt: "Fine jewelry collection" },
];

export default function PhotoStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[3px] bg-[#0A0A0A]">
      {photos.map((p) => (
        <div key={p.src} className="relative overflow-hidden h-[220px] sm:h-[260px] group">
          <Image src={p.src} alt={p.alt} fill className="object-cover brightness-85 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500" />
        </div>
      ))}
    </div>
  );
}
