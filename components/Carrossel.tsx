"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import PreviaGuia from "@/components/PreviaGuia";

// Cor do botão por cidade: os dois guias de Paris dividem o rosa da marca,
// e o guia que junta as duas capitais recebe metade de cada cor.
const BOTAO_PARIS = "bg-rosa hover:bg-rosaDeep";
const BOTAO_PARIS_LONDRES =
  "bg-[linear-gradient(90deg,#F2277E_0%,#F2277E_50%,#5B7C99_50%,#5B7C99_100%)] hover:brightness-95";

const guias = [
  {
    id: "paris-5-dias",
    badge: "Guia de Viagem",
    titulo: "Paris em 5 Dias",
    subtitulo: "o guia da sua primeira viagem",
    transformacao: "Sua primeira vez em Paris, sem estresse e sem perder nada.",
    precoRiscado: "R$ 109,90",
    preco: "R$ 69,90",
    href: "/roteiros/paris",
    // FOTO: capa do guia, horizontal
    etiquetaFoto: "Torre Eiffel",
    gradiente: "linear-gradient(160deg, #F3B896 0%, #EE8FA0 55%, #B87FA8 100%)",
    corBotao: BOTAO_PARIS,
    emBreve: false,
  },
  {
    id: "paris-a-table",
    badge: "Guia de Restaurantes",
    titulo: "Paris à Table",
    subtitulo: "bistrôs, padarias e mesas favoritas",
    transformacao: "Comer bem em Paris sem cair em armadilha de turista.",
    precoRiscado: "",
    preco: "R$ 49,90",
    href: "/roteiros/paris-a-table",
    // FOTO: capa do guia, horizontal
    etiquetaFoto: "Bistrô parisiense",
    gradiente: "linear-gradient(160deg, #E8B98A 0%, #D69A6A 55%, #A9744C 100%)",
    corBotao: BOTAO_PARIS,
    emBreve: false,
  },
  {
    id: "paris-londres-1-semana",
    badge: "Guia de Viagem",
    titulo: "Paris e Londres em 1 Semana",
    subtitulo: "duas capitais, um roteiro completo",
    transformacao: "Sua semana entre Paris e Londres organizada passo a passo.",
    precoRiscado: "R$ 129,90",
    preco: "R$ 89,90",
    href: "/roteiros/paris-londres-1-semana",
    // FOTO: capa do guia, horizontal
    etiquetaFoto: "Big Ben, Londres",
    gradiente: "linear-gradient(160deg, #C3D6D9 0%, #9FB6BE 55%, #7B93A6 100%)",
    corBotao: BOTAO_PARIS_LONDRES,
    emBreve: false,
  },
  {
    id: "em-breve-1",
    badge: "Novo guia",
    titulo: "Próximo destino",
    subtitulo: "em produção",
    transformacao: "Mais um roteiro testado de pertinho, chegando em breve.",
    precoRiscado: "",
    preco: "",
    href: "",
    etiquetaFoto: "",
    gradiente: "linear-gradient(160deg, #E8E4DC 0%, #DAD5CB 100%)",
    corBotao: "",
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
      ref={ref}
      id="roteiros"
      className="scroll-mt-24 bg-creme py-20 md:py-28 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho + prévia do guia */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <div className="reveal">
            <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
              guias prontos
            </span>
            <h2 className="font-display font-bold text-grafite text-4xl md:text-5xl leading-tight mt-3">
              Escrevi cada página.
              <br />
              Você recebe assim.
            </h2>
          </div>

          <div className="reveal flex flex-col items-center gap-5">
            <PreviaGuia />
            <span className="inline-flex items-center font-jakarta font-medium text-[10px] uppercase tracking-[0.16em] bg-grafite text-white px-4 py-2 rounded-full">
              prévia real do que você recebe
            </span>
          </div>
        </div>

        {/* Cards dos guias */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guias.map((guia) => {
            const conteudo = (
              <div
                className={`bg-white rounded-2xl overflow-hidden border border-grafite/5 flex flex-col h-full transition-all duration-300 ${
                  guia.emBreve ? "opacity-60" : "hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                {/* Capa */}
                <div
                  className="relative h-44 flex-shrink-0"
                  style={{ background: guia.gradiente }}
                >
                  {guia.emBreve ? (
                    <span className="absolute top-4 left-4 font-jakarta font-medium text-[10px] uppercase tracking-[0.14em] bg-white/70 text-grafite/60 px-3 py-1.5 rounded-full">
                      em breve
                    </span>
                  ) : (
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-grafite/45 text-white/90 font-jakarta font-medium text-[9px] uppercase tracking-[0.12em] px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                      {guia.etiquetaFoto}
                    </span>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col gap-2 flex-1">
                  <span className="font-jakarta font-semibold text-[10px] uppercase tracking-[0.16em] text-rosaDeep">
                    {guia.badge}
                  </span>

                  <h3 className="font-display font-bold text-grafite text-xl leading-snug">
                    {guia.titulo}
                  </h3>
                  <p className="font-jakarta text-cinzaClaro text-[13px]">
                    {guia.subtitulo}
                  </p>
                  <p className="font-jakarta text-cinza text-sm leading-relaxed mt-1">
                    {guia.transformacao}
                  </p>

                  {!guia.emBreve && (
                    <>
                      <div className="flex items-baseline gap-2 mt-4">
                        {guia.precoRiscado && (
                          <span className="font-num text-cinzaClaro text-sm line-through">
                            {guia.precoRiscado}
                          </span>
                        )}
                        <span className="font-num font-bold text-grafite text-xl">
                          {guia.preco}
                        </span>
                      </div>

                      <div className="mt-auto pt-4">
                        <span
                          className={`w-full flex items-center justify-center gap-2 text-white font-jakarta font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 ${guia.corBotao}`}
                        >
                          quero esse guia →
                        </span>
                      </div>
                    </>
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

            return (
              <Link key={guia.id} href={guia.href} className="reveal block">
                {conteudo}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
