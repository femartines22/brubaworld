"use client";

import { useState } from "react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const KIWIFY_URL = "#"; // substituir pelo link real da Kiwify
const PRECO = "R$ [confirmar]"; // confirmar antes de publicar

const checklist = [
  "Roteiro de 5 dias, dia a dia, com horários e dicas de ordem de visita",
  "Cada lugar linkado no Google Maps (é só clicar)",
  "Onde comer em cada região, com faixas de preço",
  "Como usar o metrô parisiense sem cair em pegadinha",
  "Checklist completo pra não pegar fila nem porta fechada",
  "Dicas de bairro: o que vale e o que é cilada",
  "Sugestões de hotéis por localização e perfil",
  "O que comprar (e o que não comprar) em Paris",
];

const paraQuem = [
  "Você vai a Paris pela primeira vez e não quer desperdiçar um dia",
  "Você tem pouco tempo e quer aproveitar ao máximo",
  "Você não quer ficar horas no Google tentando montar um roteiro",
  "Você viaja sozinha, com amigas, em casal ou em família",
];

const faqs = [
  {
    q: "Como vou receber o guia?",
    a: "Assim que o pagamento for confirmado, você recebe o link de acesso direto no e-mail. É só clicar e salvar no celular.",
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
    q: "E se eu não gostar?",
    a: "Entra em contato que a gente resolve. Ninguém fica preso a algo que não serviu.",
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
          className="border border-offwhite/10 rounded-2xl overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-offwhite/5 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-jakarta font-medium text-offwhite text-base pr-4">
              {item.q}
            </span>
            <span className="text-rosa font-syne font-bold text-lg flex-shrink-0">
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="font-jakarta font-light text-offwhite/60 text-base leading-relaxed">
                {item.a}
              </p>
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
            <h1 className="font-abril text-offwhite text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8">
              Paris em 5 Dias: Guia para a Primeira Viagem
            </h1>
            <div className="space-y-4 font-jakarta font-light text-offwhite/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              <p>
                Sua primeira vez em Paris merece ser inesquecível, não estressante ⭐️
              </p>
              <p>
                Eu já morei na França e voltei muitas vezes, e reuni nesse guia tudo o que uma primeira viagem precisa: roteiro de 5 dias, dia a dia, com cada lugar linkado no Google Maps, onde comer em cada região, como usar o metrô sem cair em pegadinha e um checklist pra você não pegar fila nem porta fechada.
              </p>
              <p>
                É só baixar, abrir no celular e viajar tranquilo ✈️
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

        {/* Para quem é */}
        <section className="bg-offwhite py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
              é pra você?
            </span>
            <h2 className="font-abril text-preto text-3xl md:text-5xl leading-tight mt-3 mb-10">
              Esse guia é pra quem...
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {paraQuem.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white border border-preto/8 rounded-2xl p-6"
                >
                  <span className="w-6 h-6 rounded-full bg-rosa flex-shrink-0 flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  <p className="font-jakarta font-light text-preto/70 text-base leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O que está incluso */}
        <section className="bg-preto py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-offwhite/40 uppercase tracking-widest">
              conteúdo
            </span>
            <h2 className="font-abril text-offwhite text-3xl md:text-5xl leading-tight mt-3 mb-10">
              O que está incluso.
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-1"
                    style={{ backgroundColor: "#F5E6A3" }}
                  >
                    <span className="text-preto text-xs font-bold">✓</span>
                  </span>
                  <p className="font-jakarta font-light text-offwhite/70 text-base leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prévia do roteiro */}
        <section className="bg-offwhite py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
              prévia
            </span>
            <h2 className="font-abril text-preto text-3xl md:text-5xl leading-tight mt-3 mb-10">
              Uma olhada por dentro.
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="aspect-[3/4] rounded-2xl flex items-center justify-center border border-preto/10"
                  style={{ backgroundColor: "#F5E6A3" }}
                >
                  <span className="font-jakarta font-light text-preto/30 text-sm">
                    Preview {n}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-jakarta font-light text-preto/40 text-sm mt-4 text-center">
              Imagens em breve. O guia está disponível para compra agora.
            </p>
          </div>
        </section>

        {/* Quanto você economiza */}
        <section
          className="py-20 md:py-28 px-5 md:px-10"
          style={{ backgroundColor: "#F2277E" }}
        >
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-white/60 uppercase tracking-widest">
              vale a pena?
            </span>
            <h2 className="font-abril text-white text-3xl md:text-5xl leading-tight mt-3 mb-10">
              Quanto você economiza.
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: "Horas de pesquisa", sem: "20h+", com: "0h" },
                { label: "Risco de erro", sem: "Alto", com: "Zero" },
                { label: "Custo", sem: "Seu tempo", com: PRECO },
              ].map((item) => (
                <div key={item.label} className="bg-white/15 border border-white/20 rounded-2xl p-6">
                  <p className="font-jakarta font-medium text-white/70 text-sm mb-4">
                    {item.label}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-center bg-white/10 rounded-xl p-3">
                      <p className="font-jakarta font-light text-white/50 text-xs mb-1">Sem guia</p>
                      <p className="font-syne font-extrabold text-white/50 text-lg">{item.sem}</p>
                    </div>
                    <span className="text-white/30 font-jakarta">→</span>
                    <div
                      className="flex-1 text-center rounded-xl p-3"
                      style={{ backgroundColor: "#F5E6A3" }}
                    >
                      <p className="font-jakarta font-light text-preto/50 text-xs mb-1">Com guia</p>
                      <p className="font-syne font-extrabold text-preto text-lg">{item.com}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quem criou */}
        <section className="bg-offwhite py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
              quem faz
            </span>
            <h2 className="font-abril text-preto text-3xl md:text-5xl leading-tight mt-3 mb-8">
              Eu sou a Bruba.
            </h2>
            <div className="bg-white border border-preto/8 rounded-3xl p-8 md:p-10">
              <div className="space-y-4 font-jakarta font-light text-preto/60 text-lg leading-relaxed">
                <p>
                  Já morei em <span className="font-semibold text-preto">Lille, na França</span>, trabalhei como Cast Member no{" "}
                  <span className="font-semibold text-preto">Walt Disney World, em Orlando</span>, e já visitei mais de{" "}
                  <span className="font-semibold text-preto">20 países</span>.
                </p>
                <p>
                  Via muito do mesmo por aí. Roteiros genéricos, óbvios, que pareciam ter sido feitos pra qualquer pessoa, em qualquer lugar. Resolvi ir além. Visitar de verdade, testar cada lugar com meus próprios olhos antes de recomendar pra alguém.
                </p>
                <p className="font-medium text-preto">
                  &ldquo;Eu já fui. Eu já testei. E recomendo só o que realmente vale a pena.&rdquo;
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {["🇧🇷 Português", "🇫🇷 Francês", "🇬🇧 Inglês"].map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center font-jakarta font-medium text-sm bg-preto/5 text-preto border border-preto/10 px-4 py-1.5 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-preto py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-offwhite/40 uppercase tracking-widest">
              dúvidas
            </span>
            <h2 className="font-abril text-offwhite text-3xl md:text-5xl leading-tight mt-3 mb-10">
              Perguntas frequentes.
            </h2>
            <FAQ />
          </div>
        </section>

        {/* Compra */}
        <section
          className="py-20 md:py-28 px-5 md:px-10 text-center"
          style={{ backgroundColor: "#F5E6A3" }}
        >
          <div className="max-w-2xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
              garanta o seu
            </span>
            <h2 className="font-abril text-preto text-3xl md:text-5xl leading-tight mt-3 mb-4">
              Pronto pra viajar?
            </h2>
            <p className="font-jakarta font-light text-preto/60 text-lg mb-10">
              É só comprar, baixar e levar no celular. Paris te espera.
            </p>

            {/* Preço */}
            <p className="font-syne font-extrabold text-preto text-4xl md:text-5xl mb-8">
              {PRECO}
            </p>

            {/* Imagem clicável pro checkout */}
            <a
              href={KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block group"
              aria-label="Comprar guia de Paris"
            >
              <div
                className="w-72 md:w-96 mx-auto aspect-[3/4] rounded-3xl flex items-end p-8 relative overflow-hidden group-hover:scale-[1.03] group-hover:shadow-2xl transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #111111 0%, #F2277E 100%)" }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 40%, #F7E455 0%, transparent 60%)",
                  }}
                />
                <div className="absolute top-8 right-8 opacity-20">
                  <svg width="48" height="64" viewBox="0 0 48 64" fill="white">
                    <path d="M24 2 L20 20 L16 20 L12 40 L8 40 L4 62 L44 62 L40 40 L36 40 L32 20 L28 20 Z M18 44 L30 44 L30 50 L18 50 Z" fillRule="evenodd"/>
                  </svg>
                </div>
                <div className="relative z-10 text-left w-full">
                  <p className="font-jakarta font-medium text-white/60 text-xs uppercase tracking-widest mb-2">
                    brubaworld
                  </p>
                  <h3 className="font-abril text-white text-2xl leading-snug mb-4">
                    Paris em 5 Dias: Guia para a Primeira Viagem
                  </h3>
                  <span className="inline-flex items-center gap-2 bg-white text-preto font-jakarta font-semibold text-sm px-5 py-2.5 rounded-full group-hover:bg-rosa group-hover:text-white transition-all duration-200">
                    Garantir agora →
                  </span>
                </div>
              </div>
              <p className="font-jakarta font-light text-preto/40 text-xs mt-4">
                Clique para ir ao checkout seguro
              </p>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
