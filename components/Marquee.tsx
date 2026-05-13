export default function Marquee() {
  const cities = [
    "Lisboa",
    "Paris",
    "Roma",
    "Amsterdam",
    "Praga",
    "Barcelona",
    "Ibiza",
    "Santorini",
    "Bruges",
    "Londres",
    "Dublin",
    "Edimburgo",
    "Madrid",
    "Budapeste",
    "Porto",
    "Florença",
    "Zurique",
    "Sevilha",
    "Valeta",
    "Nova York",
    "Orlando",
  ];

  const items = [...cities, ...cities];

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
