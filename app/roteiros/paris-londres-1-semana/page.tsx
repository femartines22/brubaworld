"use client";

import { useState } from "react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const KIWIFY_URL = "https://pay.kiwify.com.br/mJrcKZN";

const paraQuem = [
  "Quer conhecer duas capitais europeias numa única viagem, sem perder tempo se planejando",
  "Vai pra Europa pela primeira vez e não sabe por onde começar — visto, documentos, dinheiro",
  "Tem só uma semana e quer aproveitar cada dia sem deixar nada de fora",
  "Prefere ter tudo organizado num só lugar — passeios, transporte, onde comer e onde ficar",
];

const dias = [
  {
    num: "01",
    texto: "A chegada perfeita em Paris, com um final de tarde que vira a primeira grande lembrança da viagem.",
  },
  {
    num: "02",
    texto: "Como aproveitar o maior museu do mundo sem perder a viagem inteira numa fila.",
  },
  {
    num: "03",
    texto: "O bairro mais charmoso de Paris — e um alerta que evita o golpe mais comum da cidade.",
  },
  {
    num: "04",
    texto: "A travessia mais única da Europa: de um país pro outro, debaixo do mar.",
  },
  {
    num: "05",
    texto: "A fortaleza mais guardada de Londres e a ponte que todo mundo já viu em foto.",
  },
  {
    num: "06",
    texto: "Os símbolos que você só via na TV, agora ao vivo.",
  },
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
    a: "Ele foi pensado para Paris + Londres, mas muitas dicas de transporte, passeios e alimentação funcionam para quem faz o trajeto no sentido inverso também.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div key={i} className="border border-offwhite/10 rounded-2xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-offwhite/5 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-jakarta font-medium text-offwhite text-base pr-4">{item.q}</span>
            <span className="text-rosa font-syne font-bold text-lg flex-shrink-0">
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="font-jakarta font-light text-offwhite/60 text-base leading-relaxed">{item.a}</p>
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
        <section className="relative bg-preto min-h-[80vh] flex items-center pt-20 pb-24 px-5 md:px-10 overflow-hidden">
          <div
            className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rosa opacity-20 animate-blob pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-4xl mx-auto w-full">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-jakarta font-medium text-sm text-offwhite/40 hover:text-offwhite mb-10 transition-colors"
            >
              ← Voltar
            </Link>
            <span className="inline-flex items-center gap-2 bg-rosa/15 border border-rosa/30 text-rosa font-jakarta font-medium text-xs px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-rosa" />
              Guia de Viagem
            </span>
            <h1 className="font-display font-black text-offwhite text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight">
              Paris e Londres:
            </h1>
            <p className="font-jakarta font-semibold text-rosa text-xl md:text-3xl lg:text-4xl leading-tight mt-2 mb-8">
              Uma Semana, Duas Capitais
            </p>
            <div className="space-y-4 max-w-2xl">
              <p className="font-jakarta font-medium text-offwhite/90 text-lg md:text-xl leading-relaxed italic">
                &ldquo;O roteiro completo pra viver duas capitais europeias numa só viagem, sem perder um dia se planejando.&rdquo;
              </p>
              <p className="font-jakarta font-light text-offwhite/60 text-base md:text-lg leading-relaxed">
                Reuni aqui os 7 dias entre Paris e Londres — passeios, transporte, onde comer, documentação e o Eurostar explicado de ponta a ponta. É só abrir no celular e seguir o roteiro.
              </p>
            </div>
            <div className="mt-10">
              <a
                href={KIWIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-rosa/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-rosa/30"
              >
                quero esse guia →
              </a>
            </div>
          </div>
        </section>

        <section className="bg-offwhite py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-preto/55 uppercase tracking-widest">
              é pra você?
            </span>
            <h2 className="font-display font-bold text-preto text-3xl md:text-5xl leading-tight mt-3 mb-10">
              Esse guia é pra quem...
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {paraQuem.map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white border border-preto/8 rounded-2xl p-6">
                  <span className="w-6 h-6 rounded-full bg-rosa flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <p className="font-jakarta font-light text-preto/70 text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-preto py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-offwhite/40 uppercase tracking-widest">
              dentro do guia
            </span>
            <h2 className="font-display font-bold text-offwhite text-3xl md:text-5xl leading-tight mt-3 mb-4">
              O seu roteiro em uma fileira.
            </h2>
            <p className="font-jakarta font-light text-offwhite/50 text-base md:text-lg leading-relaxed max-w-2xl mb-14">
              Cada dia é um passo da viagem com contexto, transporte e o alerta que só quem já fez sabe onde evitar.
            </p>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 md:-mx-10 md:px-10 snap-x snap-mandatory">
              {dias.map((dia) => (
                <div
                  key={dia.num}
                  className="flex-shrink-0 w-[280px] snap-start border border-offwhite/10 rounded-3xl p-8 flex flex-col gap-6 hover:border-offwhite/20 transition-colors"
                >
                  <span className="font-syne font-extrabold text-7xl leading-none text-manteigaClara">
                    {dia.num}
                  </span>
                  <p className="font-jakarta font-medium text-offwhite text-base leading-snug">
                    {dia.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-offwhite py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-jakarta font-medium text-sm text-preto/55 uppercase tracking-widest">
              dica especial
            </span>
            <h2 className="font-display font-bold text-preto text-3xl md:text-5xl leading-tight mt-3 mb-4">
              Tem um detalhe que faz toda diferença.
            </h2>
            <p className="font-jakarta font-light text-preto/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              O guia traz um alerta chave para não perder tempo entre Paris e Londres. Ele existe para você saber exatamente quando acelerar e quando guardar energia.
            </p>
          </div>
        </section>

        <section className="bg-preto py-20 md:py-28 px-5 md:px-10 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-offwhite/40 uppercase tracking-widest">
              pronto pra viajar
            </span>
            <h2 className="font-display font-bold text-offwhite text-3xl md:text-5xl leading-tight mt-3 mb-4">
              Pronto pra viajar?
            </h2>
            <p className="font-jakarta font-light text-offwhite/60 text-lg mb-2">
              É só comprar, baixar e levar no celular. Paris e Londres te esperam.
            </p>
            <p className="font-jakarta font-medium text-offwhite/50 text-sm mb-10">
              Notificação de acesso por e-mail e WhatsApp.
            </p>

            <a
              href={KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-rosa text-white font-jakarta font-semibold text-xl px-12 py-6 rounded-2xl hover:bg-rosa/90 hover:scale-[1.03] transition-all duration-200 shadow-xl shadow-rosa/30 mb-3"
            >
              quero esse guia →
            </a>
          </div>
        </section>

        <section className="bg-preto py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-offwhite/40 uppercase tracking-widest">
              dúvidas
            </span>
            <h2 className="font-display font-bold text-offwhite text-3xl md:text-5xl leading-tight mt-3 mb-10">
              Perguntas frequentes
            </h2>
            <FAQ />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
