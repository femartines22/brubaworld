"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { paisesVisitados } from "@/data/paisesVisitados";
import Bandeira from "@/components/Bandeira";

// FOTO: retrato da Bruba, vertical (proporção 3/4).
// Trocar aqui quando a foto final for escolhida.
const FOTO_RETRATO = "/bruba.jpeg";

export default function About() {
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
    <section id="sobre" ref={ref} className="bg-creme py-20 md:py-28 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Foto com moldura em arco */}
          <div className="reveal order-1">
            <div className="relative w-full max-w-sm mx-auto md:mx-0">
              <div className="w-full aspect-[3/4] overflow-hidden rounded-t-[9999px] rounded-b-2xl bg-gradient-to-b from-[#F6C9A8] via-[#EFA9A0] to-[#B98BA8]">
                <Image
                  src={FOTO_RETRATO}
                  alt="Retrato da Bruba"
                  width={480}
                  height={640}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="order-2 flex flex-col gap-5">
            <div className="reveal">
              <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
                quem faz
              </span>
              <h2 className="font-display font-bold text-grafite text-4xl md:text-5xl leading-tight mt-3">
                Oi, eu sou a{" "}
                <span className="font-script italic text-rosa">Bruba</span>.
              </h2>
            </div>

            <p className="reveal font-jakarta text-cinza text-base md:text-lg leading-relaxed">
              Escrevo cada roteiro com a minha própria mão, só pra lugares onde eu já
              pisei de verdade. Hoje meu forte é Paris: já voltei várias vezes, testei
              tudo de novo, e conheço a cidade de um jeito que só dá pra conhecer assim.
            </p>

            {/* Citação */}
            <blockquote className="reveal border-l-2 border-rosa pl-5">
              <p className="font-script italic text-grafite text-lg md:text-xl leading-snug">
                &ldquo;Eu já fui. Eu já testei. E recomendo só o que realmente vale a
                pena.&rdquo;
              </p>
            </blockquote>

            {/* Badge + idiomas */}
            <div className="reveal flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center font-jakarta font-medium text-sm bg-rosaTint text-rosaDeep px-4 py-2 rounded-full">
                <span className="font-num font-semibold mr-1.5">
                  {paisesVisitados.length}
                </span>
                países visitados
              </span>
              <span className="inline-flex items-center gap-2 px-2" title="Português, francês e inglês">
                <Bandeira pais="Brasil" className="w-5 h-3.5" />
                <Bandeira pais="França" className="w-5 h-3.5" />
                <Bandeira pais="Reino Unido" className="w-5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
