import { cidadesVisitadas } from "@/data/cidades";

export default function Marquee() {
  const items = [...cidadesVisitadas, ...cidadesVisitadas];

  return (
    <div className="bg-preto py-5 overflow-hidden border-y border-offwhite/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((city, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-6">
            <span className="font-syne font-extrabold text-3xl md:text-4xl text-rosa tracking-tight">
              {city}
            </span>
            <span className="text-rosa/40 text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
