"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Bandeira from "@/components/Bandeira";
import {
  perguntas,
  sugerirDestinos,
  resumoRespostas,
  type Respostas,
} from "@/data/quizDestino";
import { pedirRoteiro } from "@/lib/queroRoteiro";

const CUSTO = ["", "base", "econômico", "sem economizar"];

export default function QuizDestino() {
  const ref = useRef<HTMLElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Partial<Respostas>>({});
  // Guarda o toque por um instante antes de avançar, pra pessoa ver o que escolheu.
  const [escolhida, setEscolhida] = useState<string | null>(null);

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

  // A cada pergunta nova, o foco vai pro título — quem navega por teclado
  // ou leitor de tela não fica perdido num botão que sumiu.
  const primeiraRenderizacao = useRef(true);
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    tituloRef.current?.focus({ preventScroll: true });
  }, [passo]);

  const terminou = passo >= perguntas.length;
  const pergunta = perguntas[passo];

  const responder = (valor: Respostas[keyof Respostas]) => {
    if (escolhida) return;
    setEscolhida(String(valor));
    setTimeout(() => {
      setRespostas((prev) => ({ ...prev, [pergunta.chave]: valor }));
      setPasso((p) => p + 1);
      setEscolhida(null);
    }, 260);
  };

  const recomecar = () => {
    setRespostas({});
    setPasso(0);
  };

  return (
    <section
      id="quiz"
      ref={ref}
      className="scroll-mt-24 bg-rosaTint py-20 md:py-28 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        <div className="reveal lg:sticky lg:top-28">
          <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
            quiz · 1 minutinho
          </span>
          <h2 className="font-display font-bold text-grafite text-4xl md:text-5xl leading-tight mt-3">
            Descubra seu{" "}
            <span className="font-script italic text-rosa">próximo</span> destino.
          </h2>
          <p className="font-jakarta text-cinza text-base leading-relaxed mt-5 max-w-md">
            Cinco perguntas sobre o seu jeito de viajar, e eu te digo pra onde ir.
          </p>
        </div>

        <div className="reveal bg-white rounded-3xl border border-grafite/5 p-6 md:p-9 min-h-[420px]">
          {!terminou ? (
            <div>
              {/* Progresso */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-num font-bold text-rosa text-sm">
                  {String(passo + 1).padStart(2, "0")}
                  <span className="text-cinzaClaro"> / {String(perguntas.length).padStart(2, "0")}</span>
                </span>
                {passo > 0 && (
                  <button
                    onClick={() => setPasso((p) => p - 1)}
                    className="font-jakarta font-medium text-sm text-cinza hover:text-grafite transition-colors"
                  >
                    ← voltar
                  </button>
                )}
              </div>
              <div className="h-1 bg-creme2 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-rosa rounded-full transition-all duration-500"
                  style={{ width: `${((passo + 1) / perguntas.length) * 100}%` }}
                />
              </div>

              <h3
                ref={tituloRef}
                tabIndex={-1}
                className="font-display font-bold text-grafite text-2xl md:text-3xl leading-snug mb-6 focus:outline-none"
              >
                {pergunta.titulo}
              </h3>

              <div className="grid gap-3" role="group" aria-label={pergunta.titulo}>
                {pergunta.opcoes.map((opcao) => {
                  const marcada =
                    escolhida === String(opcao.valor) ||
                    (!escolhida && respostas[pergunta.chave] === opcao.valor);
                  return (
                    <button
                      key={String(opcao.valor)}
                      onClick={() => responder(opcao.valor)}
                      aria-pressed={marcada}
                      className={`text-left flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border transition-all duration-200 ${
                        marcada
                          ? "border-rosa bg-rosaTint"
                          : "border-grafite/10 bg-creme hover:border-rosa/50 hover:bg-white"
                      }`}
                    >
                      <span>
                        <span className="block font-jakarta font-medium text-grafite text-[15px]">
                          {opcao.rotulo}
                        </span>
                        {opcao.detalhe && (
                          <span className="block font-jakarta text-cinza text-[13px] mt-0.5">
                            {opcao.detalhe}
                          </span>
                        )}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 w-5 h-5 rounded-full border-2 transition-colors ${
                          marcada ? "border-rosa bg-rosa" : "border-grafite/20"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <Resultado respostas={respostas as Respostas} onRecomecar={recomecar} tituloRef={tituloRef} />
          )}
        </div>
      </div>
    </section>
  );
}

function Resultado({
  respostas,
  onRecomecar,
  tituloRef,
}: {
  respostas: Respostas;
  onRecomecar: () => void;
  tituloRef: React.RefObject<HTMLHeadingElement>;
}) {
  const [destino, segunda] = sugerirDestinos(respostas);

  const quero = () =>
    pedirRoteiro({
      destino: destino.cidade,
      observacoes: `Veio do quiz: ${resumoRespostas(respostas)}`,
    });

  return (
    <div>
      {/* Capa do destino, no estilo das polaroids da home */}
      <div
        className="relative rounded-2xl overflow-hidden px-6 py-8 md:py-10"
        style={{ background: destino.gradiente }}
      >
        <span className="font-jakarta font-semibold text-[11px] text-white/90 uppercase tracking-[0.18em]">
          seu próximo destino é
        </span>
        <h3
          ref={tituloRef}
          tabIndex={-1}
          className="font-display font-bold text-white text-4xl md:text-5xl leading-tight mt-2 drop-shadow-sm focus:outline-none"
        >
          {destino.cidade}
        </h3>
        <span className="inline-flex items-center gap-1.5 mt-3 bg-white/90 text-grafite font-jakarta text-sm px-2.5 py-1 rounded-full">
          <Bandeira pais={destino.pais} />
          {destino.pais}
        </span>
      </div>

      <p className="font-jakarta text-grafite/80 text-base leading-relaxed mt-6">
        {destino.porque}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-creme rounded-2xl p-5">
          <span className="font-jakarta font-medium text-[11px] uppercase tracking-[0.16em] text-cinza">
            não pode faltar
          </span>
          <ul className="mt-3 space-y-1.5">
            {destino.naoPerca.map((item) => (
              <li key={item} className="font-jakarta text-grafite text-sm flex gap-2">
                <span className="text-rosa" aria-hidden="true">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-creme rounded-2xl p-5 space-y-3">
          <div>
            <span className="font-jakarta font-medium text-[11px] uppercase tracking-[0.16em] text-cinza">
              melhor época
            </span>
            <p className="font-jakarta text-grafite text-sm mt-1">{destino.melhorEpoca}</p>
          </div>
          <div>
            <span className="font-jakarta font-medium text-[11px] uppercase tracking-[0.16em] text-cinza">
              no bolso
            </span>
            <p className="font-jakarta text-grafite text-sm mt-1">
              <span className="font-num font-bold text-rosa mr-1.5">
                {"$".repeat(destino.custo)}
                <span className="text-cinzaClaro">{"$".repeat(3 - destino.custo)}</span>
              </span>
              {CUSTO[destino.custo]}
            </p>
          </div>
        </div>
      </div>

      {/* Chamada principal: o roteiro completo, sob medida */}
      <div className="mt-8 pt-6 border-t border-creme2">
        <p className="font-display font-bold text-grafite text-xl leading-snug">
          Quer o roteiro completo, dia a dia, pras suas datas?
        </p>
        <p className="font-jakarta text-cinza text-sm mt-1">
          Eu monto com você e acompanho pelo WhatsApp.
        </p>
        <button
          onClick={quero}
          className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-rosaDeep transition-colors duration-200"
        >
          quero meu roteiro de {destino.cidade} →
        </button>

        {destino.guia && (
          <p className="font-jakarta text-cinza text-sm mt-4">
            Prefere partir logo?{" "}
            <Link
              href={destino.guia.href}
              className="font-medium text-rosaDeep underline underline-offset-4 hover:text-rosa"
            >
              Leve o guia pronto {destino.guia.titulo}, por {destino.guia.preco}
            </Link>
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-jakarta text-sm">
        <span className="text-cinza">
          Também combina com você:{" "}
          <span className="inline-flex items-center gap-1.5 font-medium text-grafite">
            <Bandeira pais={segunda.pais} />
            {segunda.cidade}
          </span>
        </span>
        <button
          onClick={onRecomecar}
          className="font-medium text-cinza hover:text-grafite transition-colors"
        >
          ↺ refazer o quiz
        </button>
      </div>
    </div>
  );
}
