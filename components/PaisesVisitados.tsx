"use client";

import { useEffect, useRef } from "react";
import { paisesVisitados, paisesPorContinente } from "@/data/paisesVisitados";
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
              <span className="font-display font-black text-rosa text-7xl md:text-9xl leading-none">
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

        {/* Países agrupados por continente */}
        <div className="mt-12 space-y-7">
          {paisesPorContinente.map((grupo) => (
            <div key={grupo.continente} className="reveal">
              {/* Cabeçalho do continente */}
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="font-display font-bold text-preto text-lg md:text-xl">
                  {grupo.continente}
                </h3>
                <span className="font-jakarta font-semibold text-xs tracking-[0.1em] text-rosa">
                  {grupo.paises.length}
                </span>
                <span className="flex-1 h-px bg-preto/10" />
              </div>

              {/* Países do continente */}
              <div className="flex flex-wrap gap-2">
                {grupo.paises.map((pais) => (
                  <span
                    key={pais}
                    className="font-jakarta font-normal text-sm md:text-base bg-manteigaClara text-grafite px-3 py-1.5 rounded-lg border border-transparent hover:border-rosa hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  >
                    {pais}
                  </span>
                ))}
              </div>
            </div>
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
