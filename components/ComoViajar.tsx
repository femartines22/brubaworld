"use client";

import { useEffect, useRef, useState } from "react";
import FormularioLead from "@/components/FormularioLead";

type Aba = "prontos" | "sobMedida";

export default function ComoViajar() {
  const ref = useRef<HTMLElement>(null);
  const [aba, setAba] = useState<Aba>("prontos");

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

  const abaBtn = (ativa: boolean) =>
    `font-jakarta font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-200 ${
      ativa ? "bg-grafite text-white" : "text-cinza hover:text-grafite"
    }`;

  return (
    <section
      id="como-viajar"
      ref={ref}
      className="scroll-mt-24 bg-creme py-20 md:py-28 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-10">
          <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
            como viajar com a bruba
          </span>
          <h2 className="font-display font-bold text-grafite text-4xl md:text-5xl leading-tight mt-3">
            Dois jeitos de viajar com a Bruba.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Coluna esquerda: abas */}
          <div className="reveal">
            <div
              role="tablist"
              aria-label="Formas de viajar"
              className="inline-flex items-center gap-1 bg-creme2 p-1 rounded-full mb-6"
            >
              <button
                role="tab"
                aria-selected={aba === "prontos"}
                aria-controls="painel-prontos"
                onClick={() => setAba("prontos")}
                className={abaBtn(aba === "prontos")}
              >
                Guias Prontos
              </button>
              <button
                role="tab"
                aria-selected={aba === "sobMedida"}
                aria-controls="painel-sob-medida"
                onClick={() => setAba("sobMedida")}
                className={abaBtn(aba === "sobMedida")}
              >
                Sob Medida
              </button>
            </div>

            {/* Painel: Guias Prontos */}
            {aba === "prontos" && (
              <div
                id="painel-prontos"
                role="tabpanel"
                className="bg-manteigaClara rounded-3xl p-7 md:p-9"
              >
                <span className="font-jakarta font-medium text-[11px] uppercase tracking-[0.16em] text-grafite/50">
                  já escritos, testados por mim
                </span>
                <h3 className="font-display font-bold text-grafite text-2xl md:text-3xl leading-snug mt-3">
                  Guia fechado, pro destino que eu já domino.
                </h3>
                <p className="font-jakarta text-grafite/70 text-base leading-relaxed mt-4">
                  Você recebe na hora e segue o passo a passo já testado. Ideal pra quem
                  quer partir logo, sem depender de troca de mensagem.
                </p>
                <a
                  href="#roteiros"
                  className="mt-7 inline-flex items-center justify-center gap-2 bg-grafite text-white font-jakarta font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-grafite/85 transition-colors duration-200"
                >
                  ver guias →
                </a>
              </div>
            )}

            {/* Painel: Sob Medida */}
            {aba === "sobMedida" && (
              <div
                id="painel-sob-medida"
                role="tabpanel"
                className="bg-rosaTint rounded-3xl p-7 md:p-9"
              >
                <span className="font-jakarta font-medium text-[11px] uppercase tracking-[0.16em] text-rosaDeep/60">
                  construído do zero, só pra você
                </span>
                <h3 className="font-display font-bold text-grafite text-2xl md:text-3xl leading-snug mt-3">
                  Roteiro pras suas datas, do seu jeito.
                </h3>
                <p className="font-jakarta text-grafite/70 text-base leading-relaxed mt-4">
                  Você me conta os seus planos e eu monto o roteiro com você, com
                  acompanhamento direto pelo WhatsApp até fechar tudo certinho.
                </p>
                {/* O formulário está ao lado no desktop e abaixo no celular */}
                <p className="font-jakarta text-rosaDeep text-sm font-medium mt-6 lg:hidden">
                  ↓ é só preencher aqui embaixo
                </p>
                <p className="font-jakarta text-rosaDeep text-sm font-medium mt-6 hidden lg:block">
                  → é só preencher o formulário ao lado
                </p>
              </div>
            )}
          </div>

          {/* Coluna direita: formulário */}
          <div id="form-personalizado" className="reveal scroll-mt-24">
            <FormularioLead />
          </div>
        </div>
      </div>
    </section>
  );
}
