"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("visible"), 100);
  }, []);

  return (
    <section className="relative bg-creme pt-32 pb-20 md:pt-40 md:pb-28 px-5 md:px-10 overflow-hidden">
      {/* Textura sutil de grão, para o creme não ficar chapado demais */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div ref={revealRef} className="reveal max-w-[720px]">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 border border-dashed border-rosa/40 text-rosaDeep font-jakarta font-medium text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-rosa inline-block" />
            concierge de viagens
          </div>

          {/* Título */}
          <h1 className="font-display font-bold text-grafite text-[2.75rem] sm:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.02em] mb-6">
            Roteiros feitos
            <br />
            por quem já <span className="font-script italic text-rosa">viveu</span>.
          </h1>

          {/* Subtítulo */}
          <p className="font-jakarta text-cinza text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Viagens vividas de verdade, direto pra você.
            <br className="hidden sm:block" /> Chega de roteiro que serve pra qualquer um.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#roteiros"
              className="inline-flex items-center justify-center gap-2 bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-rosaDeep transition-colors duration-200"
            >
              quero meu roteiro →
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 border border-grafite/25 text-grafite font-jakarta font-medium text-base px-8 py-4 rounded-full hover:border-grafite/60 hover:bg-grafite/5 transition-all duration-200"
            >
              conhecer a bruba
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
