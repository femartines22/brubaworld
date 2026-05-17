"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Você preenche o formulário",
    description:
      "Me conta tudo: destinos que quer, quanto tempo tem, com quem vai, estilo de viagem, orçamento, medos, expectativas. Quanto mais detalhe, melhor o roteiro.",
    dark: false,
    pink: false,
  },
  {
    number: "02",
    title: "Eu monto o seu roteiro",
    description:
      "Vou pesquisar, organizar e montar um roteiro 100% baseado no que você me contou. Do zero. Dia a dia, cada detalhe pensado para você.",
    dark: true,
    pink: false,
  },
  {
    number: "03",
    title: "Você recebe e viaja",
    description:
      "PDF entregue na sua caixa de entrada, com Google Maps interativo caso opte pelo pacote completo. Pronto para ser utilizado do primeiro ao último dia.",
    dark: false,
    pink: true,
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

  const cardClass = (step: typeof steps[0]) => {
    if (step.pink) return "bg-rosa text-white";
    if (step.dark) return "bg-preto text-offwhite";
    return "bg-white border border-preto/8";
  };

  const numberClass = (step: typeof steps[0]) => {
    if (step.pink) return "text-white/30";
    if (step.dark) return "text-manteiga";
    return "text-rosa/20";
  };

  const titleClass = (step: typeof steps[0]) => {
    if (step.pink) return "text-white";
    if (step.dark) return "text-offwhite";
    return "text-preto";
  };

  const descClass = (step: typeof steps[0]) => {
    if (step.pink) return "text-white/80";
    if (step.dark) return "text-offwhite/60";
    return "text-preto/60";
  };

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
              className={`reveal rounded-3xl p-8 md:p-10 flex flex-col gap-6 ${cardClass(step)}`}
            >
              <span className={`font-syne font-extrabold text-6xl leading-none ${numberClass(step)}`}>
                {step.number}
              </span>
              <div>
                <h3 className={`font-abril text-2xl md:text-3xl leading-tight mb-4 ${titleClass(step)}`}>
                  {step.title}
                </h3>
                <p className={`font-jakarta font-light leading-relaxed ${descClass(step)}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informational note */}
        <div className="reveal mt-10 max-w-3xl mx-auto">
          <div className="flex items-start gap-4 bg-white border border-preto/8 rounded-2xl p-6">
            <div className="flex-shrink-0 w-7 h-7 rounded-full border border-preto/20 flex items-center justify-center mt-0.5">
              <span className="font-jakarta font-semibold text-preto/50 text-sm leading-none">!</span>
            </div>
            <p className="font-jakarta font-light text-preto/50 text-sm leading-relaxed">
              Importante saber: a Brubaworld é uma consultoria e planejamento de
              viagens personalizada. As reservas de passagens, hotéis, passeios e
              restaurantes são feitas por você, mas todas as indicações, dicas e
              o roteiro completo são criados exclusivamente para a sua viagem,
              como uma amiga que já foi e sabe exatamente o que vale a pena. Após
              a entrega, está incluída uma rodada de ajustes para garantir que o
              roteiro fique exatamente como você imaginou.
            </p>
          </div>
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
