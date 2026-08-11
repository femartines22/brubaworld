"use client";

import { useState } from "react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const KIWIFY_URL = "https://pay.kiwify.com.br/mJrcKZN";

const paraQuem = [
  "Quer conhecer duas capitais europeias numa única viagem, sem perder tempo se planejando",
  "Vai pra Europa pela primeira vez e não sabe por onde começar: visto, documentos, dinheiro",
  "Tem só uma semana e quer aproveitar cada dia sem deixar nada de fora",
  "Prefere ter tudo organizado num só lugar: passeios, transporte, onde comer e onde ficar",
];

const dias = [
  {
    num: "01",
    texto:
      "A chegada perfeita em Paris, com um final de tarde que vira a primeira grande lembrança da viagem.",
  },
  {
    num: "02",
    texto: "Como aproveitar o maior museu do mundo sem perder a viagem inteira numa fila.",
  },
  {
    num: "03",
    texto:
      "O bairro mais charmoso de Paris e um alerta que evita o golpe mais comum da cidade.",
  },
  {
    num: "04",
    texto: "A travessia mais única da Europa: de um país pro outro, debaixo do mar.",
  },
  {
    num: "05",
    texto: "A fortaleza mais guardada de Londres e a ponte que todo mundo já viu em foto.",
  },
  { num: "06", texto: "Os símbolos que você só via na TV, agora ao vivo." },
  {
    num: "07",
    texto: "A despedida perfeita das duas capitais, sem perder tempo com o que não vale.",
  },
];

const faqs = [
  {
    q: "Como vou receber o guia?",
    a: "Assim que o pagamento for confirmado, você recebe uma notificação por e-mail e WhatsApp com o link de acesso à área de membros da Kiwify. É só entrar e acessar o guia no celular.",
  },
  {
    q: "Preciso de visto?",
    a: "O guia traz as informações básicas de documentação e o que você precisa preparar antes de embarcar, sem precisar perder tempo em busca de fontes diferentes.",
  },
  {
    q: "O roteiro funciona para qualquer período do ano?",
    a: "Sim. O guia indica o que muda por época e como aproveitar Paris e Londres nos principais meses, com as melhores escolhas para cada temporada.",
  },
  {
    q: "Posso usar esse guia se quiser fazer a viagem em outro sentido?",
    a: "Ele foi pensado para Paris e depois Londres, mas muitas dicas de transporte, passeios e alimentação funcionam para quem faz o trajeto no sentido inverso também.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div
          key={i}
          className="bg-white border border-grafite/8 rounded-2xl overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-creme2/50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-jakarta font-medium text-grafite text-base pr-4">
              {item.q}
            </span>
            <span className="font-num font-bold text-rosa text-lg flex-shrink-0">
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="font-jakarta text-cinza text-base leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ParisLondresPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-creme pt-32 pb-16 md:pt-40 md:pb-24 px-5 md:px-10">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-jakarta font-medium text-sm text-cinzaClaro hover:text-grafite mb-10 transition-colors"
            >
              ← Voltar
            </Link>

            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 border border-dashed border-rosa/40 text-rosaDeep font-jakarta font-medium text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-rosa" />
                  guia de viagem
                </span>

                <h1 className="font-display font-bold text-grafite text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
                  Paris e Londres em{" "}
                  <span className="font-script italic text-rosa">1 semana</span>.
                </h1>
                <p className="font-jakarta text-cinza text-lg md:text-xl mt-4 leading-relaxed max-w-xl">
                  Duas capitais, um roteiro completo, sete dias sem desperdiçar nenhum.
                </p>
                <p className="font-jakarta text-cinza text-base mt-4 leading-relaxed max-w-xl">
                  Da chegada em Paris à travessia por baixo do Canal da Mancha, com
                  transporte, passeios e refeições já resolvidos dia a dia.
                </p>

                <div className="flex items-baseline gap-3 mt-8">
                  <span className="font-num text-cinzaClaro text-lg line-through">
                    R$ 129,90
                  </span>
                  <span className="font-num font-bold text-grafite text-3xl">R$ 89,90</span>
                </div>

                <a
                  href={KIWIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 hover:brightness-95 bg-[linear-gradient(90deg,#F2277E_0%,#F2277E_50%,#5B7C99_50%,#5B7C99_100%)]"
                >
                  quero esse guia →
                </a>
              </div>

              {/* Capa: metade Paris, metade Londres */}
              <div className="flex justify-center">
                <div className="w-56 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_26px_60px_-28px_rgba(43,43,43,0.6)] flex flex-col">
                  <div
                    className="flex-1 flex items-end justify-center pb-4"
                    style={{
                      background: "linear-gradient(160deg, #F3B896 0%, #EE8FA0 100%)",
                    }}
                  >
                    <span className="font-script italic text-white text-2xl">Paris</span>
                  </div>
                  <div
                    className="flex-1 flex items-start justify-center pt-4"
                    style={{
                      background: "linear-gradient(160deg, #9FB6BE 0%, #6F87A0 100%)",
                    }}
                  >
                    <span className="font-script italic text-white text-2xl">Londres</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Para quem é */}
        <section className="bg-manteigaSoft py-16 md:py-24 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
              é pra você?
            </span>
            <h2 className="font-display font-bold text-grafite text-3xl md:text-4xl leading-tight mt-3 mb-9">
              Esse guia é pra quem…
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {paraQuem.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white border border-grafite/5 rounded-2xl p-6"
                >
                  <span className="w-6 h-6 rounded-full bg-rosa flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <p className="font-jakarta text-cinza text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dia a dia */}
        <section className="bg-creme py-16 md:py-24 px-5 md:px-10">
          <div className="max-w-5xl mx-auto">
            <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
              dentro do guia
            </span>
            <h2 className="font-display font-bold text-grafite text-3xl md:text-4xl leading-tight mt-3 mb-4">
              Sete dias. Duas capitais.
            </h2>
            <p className="font-jakarta text-cinza text-base md:text-lg leading-relaxed max-w-2xl mb-12">
              A ordem certa importa mais do que parece. Cada dia foi montado pensando em
              deslocamento, fila e horário de funcionamento.
            </p>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 md:-mx-10 md:px-10 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {dias.map((dia) => {
                // Os três primeiros dias são em Paris, o resto em Londres.
                const emParis = Number(dia.num) <= 3;
                return (
                  <div
                    key={dia.num}
                    className="flex-shrink-0 w-[240px] snap-start bg-white border border-grafite/5 rounded-2xl p-7 flex flex-col gap-4"
                  >
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`font-num font-bold text-5xl leading-none ${
                          emParis ? "text-rosa/25" : "text-londres/30"
                        }`}
                      >
                        {dia.num}
                      </span>
                      <span className="font-jakarta font-medium text-[10px] uppercase tracking-[0.14em] text-cinzaClaro">
                        {emParis ? "Paris" : "Londres"}
                      </span>
                    </div>
                    <p className="font-jakarta font-medium text-grafite text-base leading-snug">
                      {dia.texto}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-creme py-16 md:py-24 px-5 md:px-10 text-center border-t border-grafite/5">
          <div className="max-w-2xl mx-auto">
            <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
              garanta o seu
            </span>
            <h2 className="font-display font-bold text-grafite text-3xl md:text-5xl leading-tight mt-3 mb-4">
              Duas capitais te esperam.
            </h2>
            <p className="font-jakarta text-cinza text-lg mb-2">
              É só comprar, baixar e levar no celular.
            </p>

            <div className="flex items-baseline justify-center gap-3 mt-7 mb-6">
              <span className="font-num text-cinzaClaro text-lg line-through">
                R$ 129,90
              </span>
              <span className="font-num font-bold text-grafite text-4xl">R$ 89,90</span>
            </div>

            <a
              href={KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 text-white font-jakarta font-semibold text-lg px-10 py-5 rounded-full transition-all duration-200 hover:brightness-95 bg-[linear-gradient(90deg,#F2277E_0%,#F2277E_50%,#5B7C99_50%,#5B7C99_100%)]"
            >
              Garantir agora →
            </a>

            <p className="font-jakarta text-cinzaClaro text-xs mt-4">
              Checkout seguro via Kiwify. Acesso por e-mail e WhatsApp.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-manteigaSoft py-16 md:py-24 px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
              dúvidas
            </span>
            <h2 className="font-display font-bold text-grafite text-3xl md:text-4xl leading-tight mt-3 mb-9">
              Perguntas frequentes.
            </h2>
            <FAQ />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
