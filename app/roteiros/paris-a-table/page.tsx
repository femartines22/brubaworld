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
    titulo: "Os favoritos da Bruba",
    desc: "Os bistrôs e a padaria que ela testou e aprovou pessoalmente — do jantar de primeira noite ao pão de todo dia. São os endereços que ela voltaria pra qualquer viagem.",
    pilulas: ["Bistrô para o primeiro jantar", "A padaria certa", "Volta sempre"],
  },
  {
    num: "02",
    titulo: "Cool spots & vistas",
    desc: "Os endereços do momento e os rooftops com a Torre Eiffel de cenário. Com a dica de quando ir pra aproveitar sem espera.",
    pilulas: ["Vista da torre", "Atmosfera", "Dica de horário"],
  },
  {
    num: "03",
    titulo: "TikTok Famous & resolve rápido",
    desc: "Os lugares que viralizaram e valem a fila — e as opções certeiras pra quando o tempo é curto. Com o aviso do que é hype de verdade.",
    pilulas: ["Vale a fila?", "Quando o tempo é curto", "O que é hype"],
  },
  {
    num: "04",
    titulo: "Cozinhas do mundo",
    desc: "Bistrôs franceses clássicos, italianos, asiáticos e bares escondidos, organizados por estilo e ocasião pra facilitar a escolha na hora certa.",
    pilulas: ["Bistrô clássico", "Bar escondido", "Por ocasião"],
  },
  {
    num: "05",
    titulo: "Jantar especial",
    desc: "As mesas de alta gastronomia e os clássicos de ocasião. Pra quando o momento pede investir — com orientação de quando reservar e o que pedir.",
    pilulas: ["Alta gastronomia", "Clássicos de ocasião", "Quando reservar"],
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
    a: "Não — ele é exclusivo de Paris. Cada endereço foi escolhido e testado pessoalmente na cidade.",
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

export default function ParisATablePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>

        {/* 1. Hero */}
        <section className="relative bg-preto min-h-[80vh] flex items-center pt-20 pb-24 px-5 md:px-10 overflow-hidden">
          <div
            className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20 animate-blob pointer-events-none"
            style={{ backgroundColor: "#8B5E1A" }}
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
              Guia de Restaurantes
            </span>
            <h1 className="font-abril text-offwhite text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Paris à Table:
            </h1>
            <p className="font-jakarta font-semibold text-rosa text-xl md:text-3xl lg:text-4xl leading-tight mt-2 mb-8">
              Bistrôs, Padarias e Mesas Favoritas
            </p>
            <div className="space-y-4 max-w-2xl">
              <p className="font-jakarta font-medium text-offwhite/90 text-lg md:text-xl leading-relaxed italic">
                O roteiro de bons endereços que eu monto depois de comer por Paris de ponta a ponta.
              </p>
              <p className="font-jakarta font-light text-offwhite/60 text-base md:text-lg leading-relaxed">
                Reuni neste guia os bistrôs, padarias, bares e mesas que valem a pena — dos clássicos parisienses aos queridinhos do TikTok. É só abrir no celular, tocar no nome e seguir direto pro endereço no Google Maps.
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

        {/* 2. Para quem é */}
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

        {/* 3. Dentro do guia */}
        <section className="bg-preto py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-offwhite/40 uppercase tracking-widest">
              dentro do guia
            </span>
            <h2 className="font-abril text-offwhite text-3xl md:text-5xl leading-tight mt-3 mb-4">
              Tudo organizado por categoria.
            </h2>
            <p className="font-jakarta font-light text-offwhite/50 text-base md:text-lg leading-relaxed max-w-2xl mb-14">
              Não é uma lista genérica de restaurantes. É uma curadoria pessoal, testada e aprovada, com contexto pra cada ocasião.
            </p>

            <div className="space-y-6">
              {categorias.map((cat) => (
                <div
                  key={cat.num}
                  className="border border-offwhite/10 rounded-3xl p-8 md:p-10 hover:border-offwhite/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <span
                      className="font-syne font-extrabold text-6xl md:text-7xl leading-none flex-shrink-0"
                      style={{ color: "#F5E6A3" }}
                    >
                      {cat.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-abril text-offwhite text-2xl md:text-3xl leading-tight mb-4">
                        {cat.titulo}
                      </h3>
                      <p className="font-jakarta font-light text-offwhite/60 text-base leading-relaxed mb-6">
                        {cat.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cat.pilulas.map((p) => (
                          <span
                            key={p}
                            className="font-jakarta font-medium text-xs text-offwhite/50 bg-offwhite/5 border border-offwhite/10 px-3 py-1.5 rounded-full"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bloco bônus */}
              <div className="border border-dashed border-offwhite/20 rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <span className="font-syne font-extrabold text-5xl md:text-6xl leading-none flex-shrink-0 text-offwhite/20">
                    +1
                  </span>
                  <div className="flex-1">
                    <span className="font-jakarta font-medium text-xs text-offwhite/30 uppercase tracking-widest mb-2 block">
                      bônus
                    </span>
                    <h3 className="font-abril text-offwhite/60 text-2xl md:text-3xl leading-tight mb-4">
                      Doces, café da manhã e o croissant certo
                    </h3>
                    <p className="font-jakarta font-light text-offwhite/40 text-base leading-relaxed">
                      Pâtisseries, os melhores croissants de Paris e as dicas de ouro pra não pagar mico à mesa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA */}
        <section
          className="py-20 md:py-28 px-5 md:px-10 text-center"
          style={{ backgroundColor: "#F5E6A3" }}
        >
          <div className="max-w-2xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
              garanta o seu
            </span>
            <h2 className="font-abril text-preto text-3xl md:text-5xl leading-tight mt-3 mb-4">
              Pronta pra comer bem em Paris?
            </h2>
            <p className="font-jakarta font-light text-preto/70 text-lg mb-2">
              É só comprar, abrir no celular e seguir direto pro endereço certo.
            </p>
            <p className="font-jakarta font-medium text-preto/50 text-sm mb-10">
              Notificação de acesso por e-mail e WhatsApp.
            </p>

            <a
              href={KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-rosa text-white font-jakarta font-semibold text-xl px-12 py-6 rounded-2xl hover:bg-rosa/90 hover:scale-[1.03] transition-all duration-200 shadow-xl shadow-rosa/30 mb-3"
            >
              Garantir agora →
            </a>

            <p className="font-jakarta font-light text-preto/40 text-xs mb-12">
              Checkout seguro via Kiwify.
            </p>

            <a
              href={KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block group"
              aria-label="Comprar guia Paris à Table"
            >
              <div
                className="w-64 md:w-80 mx-auto aspect-[3/4] rounded-3xl flex items-end p-8 relative overflow-hidden group-hover:scale-[1.03] group-hover:shadow-2xl transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #100d04 0%, #8B5E1A 100%)" }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #F7E455 0%, transparent 60%)" }}
                />
                <div className="absolute top-8 right-8 opacity-20 text-5xl select-none">
                  🍽
                </div>
                <div className="relative z-10 text-left w-full">
                  <p className="font-jakarta font-medium text-white/60 text-xs uppercase tracking-widest mb-2">
                    brubaworld
                  </p>
                  <h3 className="font-abril text-white text-xl leading-snug">
                    Paris à Table: Bistrôs, Padarias e Mesas Favoritas
                  </h3>
                </div>
              </div>
              <p className="font-jakarta font-light text-preto/40 text-xs mt-3">
                Clique para ir ao checkout seguro
              </p>
            </a>
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

      </main>
      <Footer />
    </>
  );
}
