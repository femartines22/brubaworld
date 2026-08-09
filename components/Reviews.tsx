"use client";

import { useEffect, useRef } from "react";

const reviews = [
  {
    text: "O roteiro foi simplesmente perfeito. Cada detalhe fez sentido pra gente.",
    name: "Simone",
    destination: "Malta",
  },
  {
    text: "Nunca tinha viajado com tanta segurança. Sabia exatamente onde ir em cada momento.",
    name: "Rafaella",
    destination: "Paris",
  },
  {
    text: "Parecia que alguém que conhecia a cidade tinha montado pra mim. Muito além do que esperava.",
    name: "Fernando",
    destination: "Londres",
  },
  {
    text: "Cada restaurante, cada passeio, tudo encaixou. Foi a melhor viagem que já fiz.",
    name: "Maria",
    destination: "Barcelona",
  },
];

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="avaliacoes"
      className="scroll-mt-24 bg-manteigaSoft py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="reveal flex items-baseline justify-between gap-4 px-5 md:px-10 mb-5">
          <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
            quem já viajou
          </span>
          <span className="font-jakarta text-cinzaClaro text-xs whitespace-nowrap">
            arraste pra ver mais →
          </span>
        </div>

        {/* Faixa com scroll horizontal */}
        <div className="reveal flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 md:px-10 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="snap-start shrink-0 w-[260px] bg-white rounded-xl border border-grafite/5 p-5 flex flex-col"
            >
              <blockquote className="font-jakarta text-grafite text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="font-jakarta text-[13px] mt-4">
                <span className="font-semibold text-grafite">{review.name}</span>
                <span className="text-cinzaClaro"> · {review.destination}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
