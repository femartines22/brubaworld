"use client";

import { useState } from "react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const KIWIFY_URL = "https://pay.kiwify.com.br/Pd1fsEO";

const paraQuem = [
  "Vai a Paris e não quer perder tempo pesquisando onde comer",
  "Quer fugir das armadilhas de turista e comer onde os locais comem de verdade",
  "Busca desde o pão de todo dia até o jantar especial de uma data comemorativa",
  "Gosta de ter um plano na mão, sem depender de review genérico do Google",
];

const categorias = [
  {
    num: "01",
    titulo: "Nunca mais pesquise onde comer",
    desc: "Tudo organizado por bairro, ocasião, preço e estilo.",
  },
  {
    num: "02",
    titulo: "Os lugares que fazem Paris valer a viagem",
    desc: "Dos rooftops aos cafés escondidos.",
  },
  {
    num: "03",
    titulo: "O que realmente vale a fama",
    desc: "Para você não perder tempo nem dinheiro.",
  },
];

const faqs = [
  {
    q: "Como vou receber o guia?",
    a: "Assim que o pagamento for confirmado, você recebe uma notificação por e-mail e WhatsApp com o link de acesso à área de membros da Kiwify. É só entrar e acessar o guia no celular.",
  },
  {
    q: "Funciona offline?",
    a: "Sim. O guia é um PDF que você salva no celular. Só os links do Google Maps precisam de conexão.",
  },
  {
    q: "Esse guia serve pra outras cidades?",
    a: "Não, ele é exclusivo de Paris. Cada endereço foi escolhido e testado pessoalmente na cidade.",
  },
  {
    q: "Serve pra quantas viagens?",
    a: "Sem limite. Uma vez comprado, é seu. Pode usar na primeira vez, na segunda, e emprestar pra amiga.",
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

export default function ParisATablePage() {
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
                  guia de restaurantes
                </span>

                <h1 className="font-display font-bold text-grafite text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
                  Paris <span className="font-script italic text-rosa">à Table</span>.
                </h1>
                <p className="font-jakarta text-cinza text-lg md:text-xl mt-4 leading-relaxed max-w-xl">
                  Comer bem em Paris sem cair em armadilha de turista.
                </p>
                <p className="font-jakarta text-cinza text-base mt-4 leading-relaxed max-w-xl">
                  Bistrôs, boulangeries e mesas que eu testei pessoalmente, organizados por
                  bairro e por ocasião. Do café da manhã ao jantar de comemorar.
                </p>

                <div className="flex items-baseline gap-3 mt-8">
                  <span className="font-num font-bold text-grafite text-3xl">R$ 49,90</span>
                </div>

                <a
                  href={KIWIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-rosaDeep transition-colors duration-200"
                >
                  quero esse guia →
                </a>
              </div>

              {/* Capa do guia */}
              <div className="flex justify-center">
                <div
                  className="w-56 md:w-64 aspect-[3/4] rounded-2xl flex flex-col items-center justify-center text-center p-8 shadow-[0_26px_60px_-28px_rgba(43,43,43,0.6)]"
                  style={{
                    background:
                      "linear-gradient(165deg, #E8B98A 0%, #D69A6A 55%, #A9744C 100%)",
                  }}
                >
                  <span className="font-jakarta font-medium text-white/70 uppercase tracking-[0.22em] text-[10px]">
                    Guia de restaurantes
                  </span>
                  <span className="font-display font-bold text-white text-2xl leading-tight mt-3">
                    Paris à Table
                  </span>
                  <span className="font-script italic text-white/85 text-base mt-2">
                    by bruba
                  </span>
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

        {/* Dentro do guia */}
        <section className="bg-creme py-16 md:py-24 px-5 md:px-10">
          <div className="max-w-5xl mx-auto">
            <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
              dentro do guia
            </span>
            <h2 className="font-display font-bold text-grafite text-3xl md:text-4xl leading-tight mt-3 mb-4">
              Onde comer, resolvido.
            </h2>
            <p className="font-jakarta text-cinza text-base md:text-lg leading-relaxed max-w-2xl mb-12">
              Cada endereço aqui eu comi. Nada de lista copiada de review, nada de lugar
              que só é famoso por estar no caminho do turista.
            </p>

            <div className="grid sm:grid-cols-3 gap-5">
              {categorias.map((cat) => (
                <div
                  key={cat.num}
                  className="bg-white border border-grafite/5 rounded-2xl p-7 flex flex-col gap-4"
                >
                  <span className="font-num font-bold text-5xl leading-none text-rosa/25">
                    {cat.num}
                  </span>
                  <h3 className="font-display font-bold text-grafite text-lg leading-snug">
                    {cat.titulo}
                  </h3>
                  <p className="font-jakarta text-cinza text-sm leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              ))}
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
              Bon appétit?
            </h2>
            <p className="font-jakarta text-cinza text-lg mb-2">
              É só comprar, baixar e levar no celular.
            </p>

            <div className="flex items-baseline justify-center gap-3 mt-7 mb-6">
              <span className="font-num font-bold text-grafite text-4xl">R$ 49,90</span>
            </div>

            <a
              href={KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-rosa text-white font-jakarta font-semibold text-lg px-10 py-5 rounded-full hover:bg-rosaDeep transition-colors duration-200"
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
