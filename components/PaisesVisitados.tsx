"use client";

import { useEffect, useRef } from "react";
import { paisesVisitados } from "@/data/paisesVisitados";

export default function PaisesVisitados() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
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
      id="paises"
      className="py-24 md:py-32 px-5 md:px-10"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="reveal">
          <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
            mundo afora
          </span>
          <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight mt-3">
            Os países que eu já vivi de perto
          </h2>
          <p className="font-jakarta font-light text-preto/50 text-base md:text-lg mt-3 max-w-2xl">
            Cada lugar dessa lista eu visitei de verdade, com mala, roteiro e
            curiosidade.
          </p>
        </div>

        {/* Contador */}
        <div className="reveal flex items-baseline gap-3 mt-10 mb-8">
          <span className="font-syne font-extrabold text-rosa text-6xl md:text-8xl leading-none">
            {paisesVisitados.length}
          </span>
          <span className="font-jakarta font-medium text-preto/60 text-base md:text-lg leading-tight">
            países
            <br />
            visitados de perto
          </span>
        </div>

        {/* Grade de badges */}
        <div className="reveal flex flex-wrap gap-2 md:gap-3">
          {paisesVisitados.map((pais) => (
            <span
              key={pais}
              className="font-jakarta font-medium text-sm md:text-base px-4 py-2 rounded-full border border-transparent hover:border-rosa hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              style={{ backgroundColor: "#F5E6A3", color: "#2B2B2B" }}
            >
              {pais}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
