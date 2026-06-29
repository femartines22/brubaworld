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

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F5E6A3">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
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
    <section id="avaliacoes" ref={ref} className="bg-preto py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="font-jakarta font-medium text-sm text-offwhite/30 uppercase tracking-widest">
            quem já viajou
          </span>
          <h2 className="font-abril text-offwhite text-4xl md:text-6xl leading-tight mt-3">
            O que dizem.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="reveal bg-white/5 border border-white/8 rounded-3xl p-8 flex flex-col gap-5"
            >
              <Stars />
              <p className="font-jakarta font-light text-offwhite text-base md:text-lg leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <span className="font-jakarta font-medium text-rosa text-sm">
                  {review.name}
                </span>
                <span className="font-jakarta font-light text-offwhite/30 text-sm">
                  {" "}· {review.destination}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
