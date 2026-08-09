import { cidadesVisitadas } from "@/data/cidades";

export default function Marquee() {
  const items = [...cidadesVisitadas, ...cidadesVisitadas];

  return (
    <div className="bg-creme2 py-4 overflow-hidden border-y border-grafite/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((city, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-6">
            <span className="font-script italic text-2xl md:text-3xl text-grafite/80">
              {city}
            </span>
            <span className="text-rosa text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
