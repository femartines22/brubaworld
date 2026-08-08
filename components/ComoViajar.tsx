"use client";

import { useEffect, useRef } from "react";

const opcoes = [
  {
    titulo: "Roteiros prontos",
    texto:
      "Guias completos, prontos pra usar, com tudo que você precisa pra já sair viajando.",
    cta: "Ver roteiros disponíveis →",
    href: "#roteiros",
  },
  {
    titulo: "Quero montar meu roteiro personalizado",
    texto: "Um roteiro pensado só pra sua viagem, do seu jeito.",
    cta: "Quero meu roteiro personalizado →",
    href: "#form-personalizado",
  },
];

export default function ComoViajar() {
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
    <section
      id="como-viajar"
      ref={ref}
      className="scroll-mt-24 bg-offwhite py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center">
          <h2 className="font-display font-bold text-preto text-4xl md:text-6xl leading-tight">
            Como você quer viajar?
          </h2>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
          {opcoes.map((opcao) => (
            <div
              key={opcao.titulo}
              className="reveal rounded-[2rem] border border-preto/10 bg-white p-8 md:p-10 shadow-sm flex flex-col"
            >
              <h3 className="font-display font-bold text-preto text-2xl md:text-3xl leading-snug">
                {opcao.titulo}
              </h3>
              <p className="mt-4 font-jakarta font-light text-preto/60 text-base md:text-lg leading-relaxed flex-1">
                {opcao.texto}
              </p>
              <a
                href={opcao.href}
                className="mt-8 inline-flex items-center justify-center gap-2 bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-rosa/90 hover:scale-[1.02] transition-all duration-200"
              >
                {opcao.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
