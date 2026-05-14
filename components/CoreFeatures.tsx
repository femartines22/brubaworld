"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    id: 1,
    title: "Personalização total",
    description:
      "Seu roteiro começa do zero, sempre. Destinos, ritmo, estilo de viagem, com quem vai. Cada detalhe que você me conta vira escolha no roteiro.",
    gradient: "radial-gradient(circle at 50% 0%, #F2277E 0%, #f7b3ce 32%, #FAFAF8 62%, #FAFAF8 100%)",
    visual: (
      <div className="absolute top-6 left-5 right-5">
        <div className="bg-white rounded-2xl p-4 shadow-[0_8px_20px_rgba(242,39,126,0.1)]">
          <p className="text-[11px] text-preto/40 font-jakarta font-medium uppercase tracking-wider mb-3">
            seu briefing
          </p>
          <div className="space-y-2">
            {[
              { label: "Destino", value: "Portugal + Espanha" },
              { label: "Duração", value: "12 dias" },
              { label: "Estilo", value: "cultura + gastronomia" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-[11px] text-preto/40 font-jakarta">{item.label}</span>
                <span className="text-[11px] text-preto font-jakarta font-medium bg-offwhite px-2 py-0.5 rounded-full">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rosa" />
          <span className="text-[10px] text-preto/40 font-jakarta">
            feito 100% pra você, nenhum campo genérico
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Curadoria com propósito",
    description:
      "Não é lista de atrações do Google. São escolhas feitas pra combinar com o seu jeito: o restaurante certo, o bairro certo, o ritmo certo pra você.",
    gradient: "radial-gradient(circle at 50% 0%, #F7E455 0%, #faf5a8 35%, #FAFAF8 65%, #FAFAF8 100%)",
    visual: (
      <div className="absolute top-6 left-5 right-5 flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          {[
            { city: "Lisboa", emoji: "🇵🇹" },
            { city: "Sevilha", emoji: "🇪🇸" },
            { city: "Porto", emoji: "🇵🇹" },
          ].map((c) => (
            <span
              key={c.city}
              className="inline-flex items-center gap-1.5 bg-white font-jakarta font-medium text-[11px] text-preto px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-preto/5"
            >
              {c.emoji} {c.city}
            </span>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-3.5 shadow-[0_8px_20px_rgba(247,228,85,0.2)] border border-preto/5">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-manteiga flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#111111"/>
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-jakarta font-semibold text-preto">Mercado da Ribeira</p>
              <p className="text-[10px] font-jakarta text-preto/50 mt-0.5">
                Selecionado pelo seu perfil gastronômico ✦
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Tudo pronto pra usar",
    description:
      "PDF organizado dia a dia, mais mapa interativo no Google Maps com todos os pontos marcados. Abre no celular, funciona offline, sem stress na hora H.",
    gradient: "radial-gradient(circle at 50% 0%, #111111 0%, #444444 25%, #FAFAF8 62%, #FAFAF8 100%)",
    visual: (
      <div className="absolute top-6 left-5 right-5 flex gap-3">
        {/* PDF card */}
        <div className="flex-1 bg-white rounded-2xl p-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-rosa/10 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#F2277E" fillOpacity="0.3" stroke="#F2277E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M8 13h8M8 17h5" stroke="#F2277E" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[10px] font-jakarta font-semibold text-preto">Roteiro PDF</span>
          <span className="text-[9px] font-jakarta text-preto/40 text-center leading-tight">dia a dia completo</span>
        </div>
        {/* Maps card */}
        <div className="flex-1 bg-white rounded-2xl p-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-manteiga/40 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 11a3 3 0 106 0 3 3 0 00-6 0z" fill="#111111" fillOpacity="0.2"/>
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[10px] font-jakarta font-semibold text-preto">Google Maps</span>
          <span className="text-[9px] font-jakarta text-preto/40 text-center leading-tight">todos os pontos</span>
        </div>
      </div>
    ),
  },
];

export default function CoreFeatures() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 130);
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
      className="bg-offwhite py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span
            className="inline-block font-jakarta font-semibold text-xs uppercase tracking-widest mb-4"
            style={{
              background: "linear-gradient(90deg, #F2277E, #F7E455, #F2277E)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            por quê brubaworld?
          </span>
          <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight">
            Feito pra você.
            <br />
            Não pra todo mundo.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="reveal relative rounded-3xl h-[340px] flex flex-col justify-end overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
              style={{ background: feature.gradient }}
            >
              {/* Decorative visual */}
              {feature.visual}

              {/* Text block */}
              <div className="relative z-10 p-6">
                <h3 className="font-abril text-preto text-xl md:text-2xl leading-tight mb-2">
                  {feature.title}
                </h3>
                <p className="font-jakarta font-light text-preto/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
