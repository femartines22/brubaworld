"use client";

import { useState } from "react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreviaGuia from "@/components/PreviaGuia";

const KIWIFY_URL = "https://pay.kiwify.com.br/yMypo41";

const paraQuem = [
  "Vai a Paris pela primeira vez e não quer desperdiçar um dia",
  "Tem pouco tempo e quer aproveitar ao máximo",
  "Não quer ficar horas no Google tentando montar um roteiro",
  "Viaja sozinha, com amigas, em casal ou em família",
];

const dias = [
  { num: "01", texto: "O detalhe que transforma a experiência da Torre Eiffel." },
  { num: "02", texto: "Como visitar o Louvre do jeito certo." },
  { num: "03", texto: "O segredo para viver Montmartre além do óbvio." },
  { num: "04", texto: "As ruelas mais encantadoras de Paris." },
  { num: "05", texto: "O final de viagem que quase ninguém planeja." },
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
    q: "Posso usar em qualquer época do ano?",
    a: "Sim. O roteiro inclui observações sobre sazonalidade e o que muda por período.",
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

export default function ParisPage() {
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
                  Paris em <span className="font-script italic text-rosa">5 dias</span>.
                </h1>
                <p className="font-jakarta text-cinza text-lg md:text-xl mt-4 leading-relaxed max-w-xl">
                  O roteiro que eu gostaria de ter recebido antes da minha primeira viagem
                  para Paris.
                </p>
                <p className="font-jakarta text-cinza text-base mt-4 leading-relaxed max-w-xl">
                  Depois de morar na França e voltar várias vezes, reuni aqui o que
                  realmente faz diferença para aproveitar a cidade sem estresse.
                </p>

                <div className="flex items-baseline gap-3 mt-8">
                  <span className="font-num text-cinzaClaro text-lg line-through">
                    R$ 109,90
                  </span>
                  <span className="font-num font-bold text-grafite text-3xl">R$ 69,90</span>
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

              <div className="flex flex-col items-center gap-5">
                <PreviaGuia />
                <span className="inline-flex items-center font-jakarta font-medium text-[10px] uppercase tracking-[0.16em] bg-grafite text-white px-4 py-2 rounded-full">
                  prévia real do que você recebe
                </span>
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
              Cinco dias. Tudo pensado.
            </h2>
            <p className="font-jakarta text-cinza text-base md:text-lg leading-relaxed max-w-2xl mb-12">
              Não é uma lista de atrações do Google. É um roteiro com contexto, ordem
              certa, dicas de quem já foi e os alertas que ninguém te conta antes.
            </p>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 md:-mx-10 md:px-10 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {dias.map((dia) => (
                <div
                  key={dia.num}
                  className="flex-shrink-0 w-[240px] snap-start bg-white border border-grafite/5 rounded-2xl p-7 flex flex-col gap-5"
                >
                  <span className="font-num font-bold text-5xl leading-none text-rosa/25">
                    {dia.num}
                  </span>
                  <p className="font-jakarta font-medium text-grafite text-base leading-snug">
                    {dia.texto}
                  </p>
                </div>
              ))}

              <div className="flex-shrink-0 w-[240px] snap-start border border-dashed border-grafite/15 rounded-2xl p-7 flex flex-col gap-5">
                <span className="font-num font-bold text-5xl leading-none text-cinzaClaro/50">
                  +1
                </span>
                <p className="font-jakarta font-medium text-cinzaClaro text-base leading-snug">
                  O bate-volta ideal para completar a viagem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quanto economiza */}
        <section className="bg-manteigaSoft py-16 md:py-24 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
              vale a pena?
            </span>
            <h2 className="font-display font-bold text-grafite text-3xl md:text-4xl leading-tight mt-3 mb-9">
              Quanto você economiza.
            </h2>
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              {[
                { label: "Horas de pesquisa", sem: "30h+", com: "0h" },
                { label: "Risco de erro", sem: "Alto", com: "Zero" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white border border-grafite/5 rounded-2xl p-6"
                >
                  <p className="font-jakarta font-medium text-cinza text-sm mb-4">
                    {item.label}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-center bg-creme2 rounded-xl p-3">
                      <p className="font-jakarta text-cinzaClaro text-xs mb-1">Sem guia</p>
                      <p className="font-num font-bold text-cinzaClaro text-lg">{item.sem}</p>
                    </div>
                    <span className="text-cinzaClaro font-jakarta">→</span>
                    <div className="flex-1 text-center bg-rosaTint rounded-xl p-3">
                      <p className="font-jakarta text-rosaDeep/60 text-xs mb-1">Com guia</p>
                      <p className="font-num font-bold text-rosaDeep text-lg">{item.com}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-creme py-16 md:py-24 px-5 md:px-10 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="font-jakarta font-semibold text-[11px] text-rosaDeep uppercase tracking-[0.18em]">
              garanta o seu
            </span>
            <h2 className="font-display font-bold text-grafite text-3xl md:text-5xl leading-tight mt-3 mb-4">
              Pronto pra viajar?
            </h2>
            <p className="font-jakarta text-cinza text-lg mb-2">
              É só comprar, baixar e levar no celular. Paris te espera.
            </p>

            <div className="flex items-baseline justify-center gap-3 mt-7 mb-6">
              <span className="font-num text-cinzaClaro text-lg line-through">
                R$ 109,90
              </span>
              <span className="font-num font-bold text-grafite text-4xl">R$ 69,90</span>
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
