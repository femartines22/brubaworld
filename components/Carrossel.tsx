"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const guias = [
  {
    id: "paris-5-dias",
    badge: "Guia de Viagem",
    titulo: "Paris em 5 Dias",
    subtitulo: "o guia da sua primeira viagem",
    transformacao: "Sua primeira vez em Paris, sem estresse e sem perder nada.",
    precoRiscado: "R$ 59,90",
    preco: "R$ 39,90",
    cta: "quero esse guia →",
    href: "/roteiros/paris",
    externo: false,
    gradiente: "linear-gradient(135deg, #1a0a10 0%, #F2277E 100%)",
    emBreve: false,
  },
  {
    id: "paris-a-table",
    badge: "Guia de Restaurantes",
    titulo: "Paris à Table",
    subtitulo: "bistrôs, padarias e mesas favoritas",
    transformacao: "Comer bem em Paris sem cair em armadilha de turista.",
    precoRiscado: "R$ 29,90",
    preco: "R$ 19,90",
    cta: "quero esse guia →",
    href: "/roteiros/paris-a-table",
    externo: false,
    gradiente: "linear-gradient(135deg, #100d04 0%, #8B5E1A 100%)",
    emBreve: false,
  },
  {
    id: "em-breve-1",
    badge: "Em breve",
    titulo: "Novo guia",
    subtitulo: "próximo destino",
    transformacao: "Mais um destino chegando em breve.",
    gradiente: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
    emBreve: true,
  },
  {
    id: "em-breve-2",
    badge: "Em breve",
    titulo: "Novo guia",
    subtitulo: "próximo destino",
    transformacao: "Mais um destino chegando em breve.",
    gradiente: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
    emBreve: true,
  },
];

export default function Carrossel() {
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
    <section
      ref={ref}
      id="roteiros"
      className="py-24 md:py-32 px-5 md:px-10"
      style={{ backgroundColor: "#F5E6A3" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="reveal mb-12">
          <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
            guias
          </span>
          <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight mt-3">
            Escolha o Seu Roteiro.
          </h2>
          <p className="font-jakarta font-light text-preto/50 text-base md:text-lg mt-3">
            Feitos por quem já foi, testou e voltou pra contar.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {guias.map((guia) => {
            const conteudo = (
              <div
                className={`bg-preto rounded-3xl overflow-hidden border flex flex-col h-full transition-all duration-300 ${
                  guia.emBreve
                    ? "border-white/5 cursor-default grayscale opacity-50"
                    : "border-white/5 hover:border-white/10 hover:scale-[1.01] hover:shadow-2xl"
                }`}
              >
                {/* Área decorativa */}
                <div
                  className="h-32 md:h-44 relative overflow-hidden flex-shrink-0"
                  style={{ background: guia.gradiente }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 50%, #FFFFFF 0%, transparent 55%), radial-gradient(circle at 80% 20%, #F7E455 0%, transparent 45%)",
                    }}
                  />
                  {guia.id === "paris-5-dias" && (
                    <div className="absolute bottom-4 right-6 opacity-25">
                      <svg width="44" height="58" viewBox="0 0 48 64" fill="white">
                        <path d="M24 2 L20 20 L16 20 L12 40 L8 40 L4 62 L44 62 L40 40 L36 40 L32 20 L28 20 Z M18 44 L30 44 L30 50 L18 50 Z" fillRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {guia.id === "paris-a-table" && (
                    <div className="absolute bottom-4 right-6 opacity-25 text-4xl select-none">
                      🍽
                    </div>
                  )}
                  {guia.emBreve && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-jakarta font-medium text-xs text-offwhite/30 uppercase tracking-widest border border-offwhite/20 px-3 py-1 rounded-full">
                        em breve
                      </span>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-4 md:p-7 flex flex-col gap-3 md:gap-4 flex-1">
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 font-jakarta font-medium text-xs text-offwhite/40 border border-offwhite/10 px-3 py-1 rounded-full w-fit">
                    {guia.badge}
                  </span>

                  {/* Título + subtítulo */}
                  <div>
                    <h3 className="font-abril text-offwhite text-xl md:text-4xl leading-tight">
                      {guia.titulo}
                    </h3>
                    <p className="font-jakarta font-light text-offwhite/40 text-xs md:text-sm mt-1">
                      {guia.subtitulo}
                    </p>
                  </div>

                  {/* Linha de transformação */}
                  <p className="font-jakarta font-medium text-offwhite text-xs md:text-lg leading-snug hidden md:block">
                    {guia.transformacao}
                  </p>

                  {/* Preço */}
                  {!guia.emBreve && "preco" in guia && guia.preco && (
                    <div className="flex items-baseline gap-2">
                      {"precoRiscado" in guia && guia.precoRiscado && (
                        <span className="font-jakarta font-light text-offwhite/30 text-sm line-through">
                          {guia.precoRiscado}
                        </span>
                      )}
                      <span className="font-syne font-extrabold text-offwhite/80 text-lg md:text-xl">
                        {guia.preco}
                      </span>
                    </div>
                  )}

                  {/* CTA */}
                  {!guia.emBreve && "cta" in guia && guia.cta && (
                    <div className="mt-auto pt-2">
                      <span className="w-full flex items-center justify-center gap-2 bg-rosa text-white font-jakarta font-semibold text-xs md:text-base px-4 md:px-6 py-3 md:py-4 rounded-xl hover:bg-rosa/90 transition-colors">
                        {guia.cta}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );

            if (guia.emBreve) {
              return (
                <div key={guia.id} className="reveal block" aria-disabled="true">
                  {conteudo}
                </div>
              );
            }

            return "externo" in guia && guia.externo ? (
              <a
                key={guia.id}
                href={"href" in guia ? guia.href ?? "#" : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal block"
              >
                {conteudo}
              </a>
            ) : (
              <Link key={guia.id} href={"href" in guia ? guia.href ?? "/" : "/"} className="reveal block">
                {conteudo}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
