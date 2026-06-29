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
    <section className="relative min-h-screen bg-preto flex items-center overflow-hidden pt-20">
      {/* Blob */}
      <div
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-manteiga opacity-80 animate-blob pointer-events-none"
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-24 w-full">
        <div ref={revealRef} className="reveal max-w-3xl">
          {/* Pill tag */}
          <div className="inline-flex items-center gap-2 bg-rosa/15 border border-rosa/30 text-rosa font-jakarta font-medium text-xs px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-rosa inline-block" />
            Concierge de viagens.
          </div>

          {/* Headline */}
          <h1 className="font-abril text-offwhite text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8">
            <span className="block">Roteiros feitos</span>
            <span className="block text-manteiga">por quem</span>
            <span className="block">já viveu.</span>
          </h1>

          {/* Description */}
          <p className="font-jakarta font-light text-offwhite/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Viagens vividas de verdade, direto pra você.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-rosa/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-rosa/30"
            >
              quero ser avisada →
            </a>
          </div>

          {/* Social proof pill */}
          <div className="mt-12 inline-flex items-center gap-3 text-offwhite/40 font-jakarta font-light text-sm">
            <span>@brubaworld</span>
            <span className="w-px h-3 bg-offwhite/20" />
            <span>TikTok · Instagram</span>
          </div>
        </div>
      </div>
    </section>
  );
}
