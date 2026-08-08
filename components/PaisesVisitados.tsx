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
      className="py-20 md:py-24 px-5 md:px-10"
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
          <p className="font-jakarta font-light text-preto/60 text-base md:text-lg mt-3 max-w-2xl">
            Eu conheço os 24 países e posso te orientar na sua viagem.
          </p>
        </div>

        {/* Contador */}
        <div className="reveal flex items-baseline gap-3 mt-8 mb-6">
          <span className="font-syne font-extrabold text-rosa text-6xl md:text-8xl leading-none">
            {paisesVisitados.length}
          </span>
          <span className="font-jakarta font-medium text-preto/60 text-base md:text-lg leading-tight">
            países
            <br />
            visitados de perto
          </span>
        </div>

        <div className="reveal grid gap-5 md:grid-cols-2 mb-10">
          <div className="rounded-[2rem] border border-preto/10 bg-white p-6 shadow-sm">
            <span className="font-jakarta font-semibold text-preto text-sm uppercase tracking-[0.18em]">
              Roteiros prontos
            </span>
            <p className="mt-4 font-jakarta font-light text-preto/70 text-base leading-relaxed">
              Guias limitados para alguns destinos selecionados, feitos por quem já foi. Ideal para quem quer seguir um roteiro pronto e viajar com segurança.
            </p>
          </div>
          <div className="rounded-[2rem] border border-preto/10 bg-white p-6 shadow-sm">
            <span className="font-jakarta font-semibold text-preto text-sm uppercase tracking-[0.18em]">
              Roteiro personalizado
            </span>
            <p className="mt-4 font-jakarta font-light text-preto/70 text-base leading-relaxed">
              Preencha o formulário personalizado e a gente entra em contato pelo WhatsApp o mais breve possível para montar o roteiro do seu jeito.
            </p>
          </div>
        </div>

        {/* Grade de badges */}
        <div className="reveal flex flex-wrap gap-2 md:gap-3 mb-8">
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

        <div className="reveal rounded-[2rem] bg-preto p-6">
          <p className="font-jakarta font-medium text-white text-sm uppercase tracking-[0.18em] mb-4">
            Destinos em destaque
          </p>
          <div className="flex flex-wrap gap-2">
            {paisesVisitados.map((pais) => (
              <span
                key={`${pais}-dark`}
                className="font-jakarta font-medium text-sm text-white bg-white/5 px-4 py-2 rounded-full"
              >
                {pais}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
