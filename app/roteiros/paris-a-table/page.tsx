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

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 md:-mx-10 md:px-10 snap-x snap-mandatory">
              {categorias.map((cat) => (
                <div
                  key={cat.num}
                  className="flex-shrink-0 w-[260px] snap-start border border-offwhite/10 rounded-3xl p-8 flex flex-col gap-5 hover:border-offwhite/20 transition-colors"
                >
                  <span
                    className="font-syne font-extrabold text-7xl leading-none"
                    style={{ color: "#F5E6A3" }}
                  >
                    {cat.num}
                  </span>
                  <div>
                    <p className="font-abril text-offwhite text-lg leading-snug mb-2">
                      {cat.titulo}
                    </p>
                    <p className="font-jakarta font-light text-offwhite/50 text-sm leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Bônus */}
              <div className="flex-shrink-0 w-[260px] snap-start border border-dashed border-offwhite/20 rounded-3xl p-8 flex flex-col gap-5">
                <span className="font-syne font-extrabold text-7xl leading-none text-offwhite/20">
                  +1
                </span>
                <div>
                  <p className="font-abril text-offwhite/50 text-lg leading-snug mb-2">
                    O mapa dos doces
                  </p>
                  <p className="font-jakarta font-light text-offwhite/30 text-sm leading-relaxed">
                    Croissants, cafés e sobremesas que realmente valem a parada.
                  </p>
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
