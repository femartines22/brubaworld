"use client";

import { useEffect, useRef } from "react";
import {
  paisesVisitados,
  paisesPorContinente,
  paisDestaque,
  legendaDestaque,
} from "@/data/paisesVisitados";
import Globo from "@/components/Globo";
import Polaroid from "@/components/Polaroid";
import Bandeira from "@/components/Bandeira";

export default function PaisesVisitados() {
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
    <section ref={ref} id="paises" className="bg-manteigaSoft py-20 md:py-28 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Bloco superior: polaroids sobre o globo + texto */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Polaroids com o globo ao fundo */}
          <div className="reveal relative flex justify-center py-6 md:py-10">
            {/* O globo funciona como contexto, atrás das fotos */}
            <Globo
              className="absolute inset-0 m-auto w-[92%] max-w-[420px] h-auto opacity-30 pointer-events-none"
              decorativo
            />

            <div className="relative flex items-start">
              <Polaroid
                legenda="verão, 2024"
                etiqueta="Malta"
                rotacao={-7}
                gradiente="linear-gradient(160deg, #F6C9A8 0%, #E9A48C 55%, #C98BA0 100%)"
                className="w-[45%] max-w-[190px] translate-y-8"
              />
              <Polaroid
                legenda="inverno, 2023"
                etiqueta="Praga"
                rotacao={4}
                gradiente="linear-gradient(160deg, #BFD3D6 0%, #9FB6BE 60%, #7E93A4 100%)"
                className="w-[52%] max-w-[215px] -ml-6"
              />
            </div>
          </div>

          {/* Texto */}
          <div>
            <div className="reveal">
              <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
                mundo afora
              </span>
              <h2 className="font-display font-bold text-grafite text-4xl md:text-5xl leading-tight mt-3">
                Os países que eu já vivi de perto.
              </h2>
            </div>

            <div className="reveal flex items-center gap-4 mt-7">
              <span className="font-num font-bold text-rosa text-6xl md:text-7xl leading-none">
                {paisesVisitados.length}
              </span>
              <span className="font-jakarta text-cinza text-sm md:text-base leading-snug">
                países visitados de perto,
                <br />
                testando cada canto
              </span>
            </div>

            <p className="reveal font-jakarta text-cinza text-base leading-relaxed mt-6 max-w-md">
              Eu conheço os {paisesVisitados.length} e posso te orientar na sua viagem,
              com dica de quem já esteve lá.
            </p>
          </div>
        </div>

        {/* Cards por continente */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mt-14">
          {paisesPorContinente.map((grupo) => (
            <div
              key={grupo.continente}
              className="reveal bg-white rounded-2xl p-6 border border-grafite/5"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display font-bold text-grafite text-lg">
                  {grupo.continente}
                </h3>
                <span className="font-num font-bold text-rosa text-lg">
                  {String(grupo.paises.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {grupo.paises.map((pais) => {
                  const eDestaque = pais === paisDestaque;
                  return (
                    <span
                      key={pais}
                      className={`inline-flex items-center gap-1.5 font-jakarta text-sm px-2.5 py-1.5 rounded-full ${
                        eDestaque
                          ? "font-medium bg-rosaDeep text-white"
                          : "bg-creme2 text-grafite/80"
                      }`}
                    >
                      <Bandeira pais={pais} />
                      {pais}
                      {eDestaque && (
                        <span aria-hidden="true" className="text-manteiga">
                          ★
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>

              {/* Legenda da estrela, só no card que tem o país em destaque */}
              {grupo.paises.includes(paisDestaque) && (
                <p className="font-jakarta text-cinzaClaro text-xs mt-4 pt-3 border-t border-creme2">
                  <span className="text-rosaDeep" aria-hidden="true">
                    ★
                  </span>{" "}
                  {legendaDestaque}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
