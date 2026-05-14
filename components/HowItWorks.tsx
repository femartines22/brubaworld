"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Você preenche o formulário",
    description:
      "Me conta tudo: destinos que quer, quanto tempo tem, com quem vai, estilo de viagem, orçamento, medos, expectativas. Quanto mais detalhe, melhor o roteiro.",
    dark: false,
  },
  {
    number: "02",
    title: "Eu monto o seu roteiro",
    description:
      "Vou pesquisar, organizar e montar um roteiro 100% baseado no que você me contou. Do zero. Dia a dia, cada detalhe pensado para você.",
    dark: true,
  },
  {
    number: "03",
    title: "Você recebe e viaja",
    description:
      "PDF entregue na sua caixa de entrada — com Google Maps interativo caso opte pelo pacote completo. Pronto para ser utilizado do primeiro ao último dia.",
    dark: false,
  },
];

export default function HowItWorks() {
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
    <section
      id="como-funciona"
      ref={ref}
      className="bg-offwhite py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal mb-16">
          <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
            simples assim
          </span>
          <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight mt-3">
            Como funciona.
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`reveal rounded-3xl p-8 md:p-10 flex flex-col gap-6 ${
                step.dark
                  ? "bg-preto text-offwhite"
                  : "bg-white border border-preto/8"
              }`}
            >
              <span
                className={`font-syne font-extrabold text-6xl leading-none ${
                  step.dark ? "text-manteiga" : "text-rosa/20"
                }`}
              >
                {step.number}
              </span>
              <div>
                <h3
                  className={`font-abril text-2xl md:text-3xl leading-tight mb-4 ${
                    step.dark ? "text-offwhite" : "text-preto"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`font-jakarta font-light leading-relaxed ${
                    step.dark ? "text-offwhite/60" : "text-preto/60"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informational note */}
        <div className="reveal mt-10 max-w-3xl mx-auto">
          <p className="font-jakarta font-light text-preto/40 text-sm text-center leading-relaxed italic">
            Vale lembrar: o serviço brubaworld é de consultoria e planejamento.
            Não realizo compra de passagens, reservas de hotéis, passeios ou
            restaurantes — mas incluo todas as indicações e dicas no seu
            roteiro, como uma amiga que já foi e sabe exatamente o que vale.
          </p>
        </div>

        {/* CTA bottom */}
        <div className="reveal text-center mt-10">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 bg-preto text-offwhite font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-preto/80 hover:scale-105 transition-all duration-200"
          >
            começar agora →
          </a>
        </div>
      </div>
    </section>
  );
}
