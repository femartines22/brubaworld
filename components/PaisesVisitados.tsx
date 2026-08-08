"use client";

import { useEffect, useRef } from "react";
import { paisesVisitados } from "@/data/paisesVisitados";
import { cidadesVisitadas } from "@/data/cidades";
import Globo from "@/components/Globo";

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

  // Lista duplicada para o loop contínuo da faixa de cidades
  const cidadesLoop = [...cidadesVisitadas, ...cidadesVisitadas];

  return (
    <section
      ref={ref}
      id="paises"
      className="bg-offwhite py-20 md:py-24 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header + globo lado a lado */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center">
          <div>
            <div className="reveal">
              <span className="font-jakarta font-medium text-sm text-preto/55 uppercase tracking-widest">
                mundo afora
              </span>
              <h2 className="font-display font-bold text-preto text-4xl md:text-6xl leading-tight mt-3">
                Os países que eu já vivi de perto
              </h2>
              <p className="font-jakarta font-light text-preto/60 text-base md:text-lg mt-3 max-w-xl">
                Eu conheço os 24 países e posso te orientar na sua viagem.
              </p>
            </div>

            {/* Contador */}
            <div className="reveal flex items-baseline gap-3 mt-8">
              <span className="font-syne font-extrabold text-rosa text-6xl md:text-8xl leading-none">
                {paisesVisitados.length}
              </span>
              <span className="font-jakarta font-medium text-preto/60 text-base md:text-lg leading-tight">
                países
                <br />
                visitados de perto
              </span>
            </div>
          </div>

          {/* Globo */}
          <div className="reveal flex justify-center md:justify-end">
            <Globo className="w-56 h-56 md:w-full md:max-w-sm md:h-auto animate-float" />
          </div>
        </div>

        {/* Grade de países */}
        <div className="reveal flex flex-wrap gap-2 md:gap-3 mt-12">
          {paisesVisitados.map((pais) => (
            <span
              key={pais}
              className="font-jakarta font-medium text-sm md:text-base bg-manteigaClara text-grafite px-4 py-2 rounded-full border border-transparent hover:border-rosa hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              {pais}
            </span>
          ))}
        </div>

        {/* Faixa de cidades — mesma lista do topo, agora em branco sobre fundo escuro */}
        <div className="reveal mt-8 rounded-[2rem] bg-preto py-8 overflow-hidden">
          <p className="font-jakarta font-medium text-white/50 text-sm uppercase tracking-[0.18em] px-8 mb-5">
            E as cidades onde eu já coloquei o pé
          </p>
          <div className="flex animate-marquee whitespace-nowrap">
            {cidadesLoop.map((cidade, i) => (
              <span key={i} className="inline-flex items-center gap-5 mx-5">
                <span className="font-syne font-extrabold text-2xl md:text-3xl text-white tracking-tight">
                  {cidade}
                </span>
                <span className="text-white/30 text-base">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
