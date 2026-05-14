"use client";

import { useEffect, useRef } from "react";

export default function Packages() {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pacotes" ref={ref} className="bg-manteiga py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal mb-16">
          <span className="font-jakarta font-medium text-sm text-preto/50 uppercase tracking-widest">
            o que você leva
          </span>
          <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight mt-3">
            Escolha o seu
            <br />
            pacote.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 — Só PDF */}
          <div className="reveal bg-offwhite border border-preto/10 rounded-3xl p-8 md:p-10 flex flex-col gap-6">
            <div>
              <span className="inline-block font-jakarta font-medium text-xs text-preto/50 uppercase tracking-widest border border-preto/10 px-3 py-1 rounded-full mb-4">
                Básico
              </span>
              <h3 className="font-abril text-preto text-3xl md:text-4xl">
                Só PDF
              </h3>
              <p className="font-jakarta font-light text-preto/60 mt-3 leading-relaxed">
                Roteiro completo em PDF pronto pra salvar, imprimir e levar no
                bolso. Dia a dia, dicas de hospedagem, transporte, restaurantes
                e atrações, tudo personalizado pra você.
              </p>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
              {[
                "Roteiro dia a dia personalizado",
                "Sugestões de hospedagem por perfil",
                "Dicas de transporte local",
                "Restaurantes e experiências selecionados",
                "Entregue em PDF editável",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-jakarta font-light text-preto/70 text-sm">
                  <span className="text-rosa mt-0.5 text-lg leading-none">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-preto/10">
              <p className="font-syne font-bold text-preto text-lg mb-4">
                Preço sob consulta
              </p>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 border-2 border-preto text-preto font-jakarta font-semibold text-sm px-6 py-3 rounded-full hover:bg-preto hover:text-offwhite transition-all duration-200"
              >
                quero esse →
              </a>
            </div>
          </div>

          {/* Card 2 — PDF + Google Maps (destaque) */}
          <div className="reveal bg-preto rounded-3xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden">
            {/* Highlight badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-block font-jakarta font-semibold text-xs text-preto bg-manteiga px-3 py-1 rounded-full">
                mais popular ⭐
              </span>
            </div>

            {/* Blob decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rosa/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="inline-block font-jakarta font-medium text-xs text-offwhite/40 uppercase tracking-widest border border-offwhite/10 px-3 py-1 rounded-full mb-4">
                Completo
              </span>
              <h3 className="font-abril text-offwhite text-3xl md:text-4xl">
                PDF +<br />Google Maps
              </h3>
              <p className="font-jakarta font-light text-offwhite/60 mt-3 leading-relaxed">
                Tudo do PDF, mais um mapa do Google interativo com todos os
                pontos do roteiro marcados e salvos. Abre no celular, sem
                internet, sem stress.
              </p>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
              {[
                "Tudo do pacote Só PDF",
                "Mapa Google My Maps personalizado",
                "Todos os pontos marcados e organizados",
                "Funciona offline no celular",
                "Fácil de compartilhar com acompanhantes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-jakarta font-light text-offwhite/70 text-sm">
                  <span className="text-manteiga mt-0.5 text-lg leading-none">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-offwhite/10">
              <p className="font-syne font-bold text-manteiga text-lg mb-4">
                Preço sob consulta
              </p>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 bg-manteiga text-preto font-jakarta font-semibold text-sm px-6 py-3 rounded-full hover:bg-manteiga/90 hover:scale-105 transition-all duration-200"
              >
                quero esse →
              </a>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="reveal font-jakarta font-light text-preto/50 text-sm text-center mt-10">
          Cada roteiro é construído do zero. Nada de template. Nada de
          copia-e-cola.
        </p>

        {/* Partnership note */}
        <p className="reveal font-jakarta font-light text-preto/35 text-xs text-center mt-4">
          Também conto com parcerias para reserva de hotéis e benefícios em
          cartões internacionais.
        </p>
      </div>
    </section>
  );
}
