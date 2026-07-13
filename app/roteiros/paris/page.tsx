"use client";

import { useState } from "react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const KIWIFY_URL = "https://pay.kiwify.com.br/yMypo41";

const paraQuem = [
  "Você vai a Paris pela primeira vez e não quer desperdiçar um dia",
  "Você tem pouco tempo e quer aproveitar ao máximo",
  "Você não quer ficar horas no Google tentando montar um roteiro",
  "Você viaja sozinha, com amigas, em casal ou em família",
];

const dias = [
  {
    num: "01",
    titulo: "Torre Eiffel e a margem esquerda",
    desc: "O dia mais icônico logo de cara. O guia mostra o ângulo secreto do Trocadéro que evita a multidão, o horário certo pra subir, e o restaurante do chef com preço justo logo ali do lado. E um alerta sobre o golpe da pulseirinha que pega todo turista desavisado.",
    pilulas: ["Ângulo secreto do Trocadéro", "Horário certo pra subir", "Alerta de golpe", "Jantar histórico desde 1680"],
  },
  {
    num: "02",
    titulo: "Louvre, Île de la Cité e Jardim de Luxemburgo",
    desc: "O dia mais cultural, quase tudo a pé. O guia indica as 3 alas do Louvre que valem pra primeira visita (sem se perder em 4 horas), a entrada que tem fila menor, e a Sainte-Chapelle — o lugar mais lindo de Paris que quase todo turista pula.",
    pilulas: ["Entrada com fila menor", "As 3 alas certas do Louvre", "Sainte-Chapelle com sol", "Atenção: fecha toda terça"],
  },
  {
    num: "03",
    titulo: "Montmartre, Pigalle e Ópera",
    desc: "O dia mais fotogênico. Subir pela escadaria certa (não pelo funicular cheio), o café da Amélie Poulain, o 'eu te amo' em 300 idiomas, almoço de comida francesa de verdade por menos de 20€ e a vista gratuita das Galeries Lafayette com a Torre Eiffel ao fundo.",
    pilulas: ["Escadaria certa pra subir", "Café da Amélie", "Vista gratuita", "Jantar no Moulin Rouge"],
  },
  {
    num: "04",
    titulo: "Marais e o coração histórico",
    desc: "O bairro mais charmoso de Paris, feito pra perder o rumo de propósito. O guia indica as ruelas certas, o falafel mais famoso da cidade, o mousse de chocolate servido na vasilha gigante e por que o Marais é a melhor escolha se o seu dia 4 cair num domingo.",
    pilulas: ["Ruelas medievais", "Falafel lendário", "Dica do domingo", "Mercado mais antigo de Paris"],
  },
  {
    num: "05",
    titulo: "Champs-Élysées, Arco do Triunfo e despedida",
    desc: "O último dia fecha em grande estilo. A vista do topo do Arco do Triunfo — que na opinião da Bruba é melhor que a da Torre Eiffel, porque a torre está na foto. E um aviso importante: nunca atravesse a rotatória.",
    pilulas: ["Vista que supera a Torre Eiffel", "Aviso da rotatória", "Jantar de despedida", "Torre piscando uma última vez"],
  },
];

const extras = [
  {
    icon: "📋",
    titulo: "Checklist de reservas na ordem certa",
    texto: "O que reservar assim que comprar a passagem. O que deixar pra 4 semanas antes. O que só abre com poucos dias de antecedência. Na ordem certa, sem esquecer nada.",
  },
  {
    icon: "🚇",
    titulo: "Guia completo do metrô parisiense",
    texto: "Desde novembro de 2025 não existe mais bilhete de papel em Paris. O guia explica o novo sistema, os passes certos pra cada situação e o erro que gera multa na saída — que quase todo turista comete.",
  },
  {
    icon: "🛡",
    titulo: "Alertas de golpe por ponto turístico",
    texto: "Pulseirinha no Trocadéro. Jogo dos copinhos na base da torre. Arrastão no metrô. O guia avisa antes, ponto a ponto, com a regra única que resolve tudo.",
  },
];

const depoimentos = [
  {
    texto: "O roteiro foi simplesmente perfeito. Cada detalhe fez sentido pra gente.",
    nome: "Simone",
    local: "Malta",
  },
  {
    texto: "Virei Paris pela primeira vez sem nenhum estresse. Sabia exatamente onde ir e em que ordem.",
    nome: "Rafaella",
    local: "Paris",
  },
  {
    texto: "Já fui em outros países com roteiros genéricos e a diferença é absurda. Esse guia tem alma.",
    nome: "Maria",
    local: "Barcelona",
  },
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

export default function ParisPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>

        {/* 1. Hero */}
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
            <h1 className="font-abril text-offwhite text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Paris em 5 Dias:
            </h1>
            <p className="font-jakarta font-semibold text-rosa text-xl md:text-3xl lg:text-4xl leading-tight mt-2 mb-8">
              Guia para a Primeira Viagem
            </p>
            <div className="space-y-4 max-w-2xl">
              <p className="font-jakarta font-medium text-offwhite/90 text-lg md:text-xl leading-relaxed italic">
                O roteiro que eu gostaria de ter recebido antes da minha primeira viagem para Paris.
              </p>
              <p className="font-jakarta font-light text-offwhite/60 text-base md:text-lg leading-relaxed">
                Depois de morar na França e visitar Paris diversas vezes, reuni neste guia tudo o que realmente faz diferença para aproveitar a cidade sem estresse. É só abrir no celular e viajar com tranquilidade.
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

        {/* 3. Cinco dias. Tudo pensado. */}
        <section className="bg-preto py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-offwhite/40 uppercase tracking-widest">
              dentro do guia
            </span>
            <h2 className="font-abril text-offwhite text-3xl md:text-5xl leading-tight mt-3 mb-4">
              Cinco dias. Tudo pensado.
            </h2>
            <p className="font-jakarta font-light text-offwhite/50 text-base md:text-lg leading-relaxed max-w-2xl mb-14">
              Não é uma lista de atrações do Google. É um roteiro com contexto, ordem certa, dicas de quem já foi e os alertas que ninguém te conta antes.
            </p>

            <div className="space-y-6">
              {dias.map((dia) => (
                <div
                  key={dia.num}
                  className="border border-offwhite/10 rounded-3xl p-8 md:p-10 hover:border-offwhite/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <span
                      className="font-syne font-extrabold text-6xl md:text-7xl leading-none flex-shrink-0"
                      style={{ color: "#F5E6A3" }}
                    >
                      {dia.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-abril text-offwhite text-2xl md:text-3xl leading-tight mb-4">
                        {dia.titulo}
                      </h3>
                      <p className="font-jakarta font-light text-offwhite/60 text-base leading-relaxed mb-6">
                        {dia.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dia.pilulas.map((p) => (
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
                      dia extra opcional
                    </span>
                    <h3 className="font-abril text-offwhite/60 text-2xl md:text-3xl leading-tight mb-4">
                      Versalhes ou Giverny
                    </h3>
                    <p className="font-jakarta font-light text-offwhite/40 text-base leading-relaxed">
                      Se sobrar um dia, o guia traz as duas melhores opções de bate-volta: o palácio mais famoso do mundo e o jardim de Monet. Com como chegar, horário certo pra ir e o bilhete que você NÃO pode usar (e que gera multa na saída).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Os extras que fazem diferença */}
        <section
          className="py-20 md:py-28 px-5 md:px-10"
          style={{ backgroundColor: "#F2277E" }}
        >
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-white/60 uppercase tracking-widest">
              tem mais
            </span>
            <h2 className="font-abril text-white text-3xl md:text-5xl leading-tight mt-3 mb-4">
              O guia dentro do guia.
            </h2>
            <p className="font-jakarta font-light text-white/70 text-base md:text-lg mb-12">
              Além dos 5 dias, tem tudo isso também.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {extras.map((card) => (
                <div
                  key={card.titulo}
                  className="bg-white/10 border border-white/20 rounded-2xl p-7 flex flex-col gap-4"
                >
                  <span className="text-3xl">{card.icon}</span>
                  <h3 className="font-abril text-white text-xl leading-snug">
                    {card.titulo}
                  </h3>
                  <p className="font-jakarta font-light text-white/70 text-sm leading-relaxed">
                    {card.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Quanto você economiza */}
        <section className="bg-preto py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-offwhite/40 uppercase tracking-widest">
              vale a pena?
            </span>
            <h2 className="font-abril text-offwhite text-3xl md:text-5xl leading-tight mt-3 mb-10">
              Quanto você economiza.
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
              {[
                { label: "Horas de pesquisa", sem: "30h+", com: "0h" },
                { label: "Risco de erro", sem: "Alto", com: "Zero" },
              ].map((item) => (
                <div key={item.label} className="bg-offwhite/5 border border-offwhite/10 rounded-2xl p-6">
                  <p className="font-jakarta font-medium text-offwhite/60 text-sm mb-4">{item.label}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-center bg-offwhite/5 rounded-xl p-3">
                      <p className="font-jakarta font-light text-offwhite/40 text-xs mb-1">Sem guia</p>
                      <p className="font-syne font-extrabold text-offwhite/40 text-lg">{item.sem}</p>
                    </div>
                    <span className="text-offwhite/20 font-jakarta">→</span>
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

        {/* 6. Depoimentos */}
        <section className="bg-offwhite py-20 md:py-28 px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
              quem já foi
            </span>
            <h2 className="font-abril text-preto text-3xl md:text-5xl leading-tight mt-3 mb-10">
              O que estão dizendo.
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {depoimentos.map((dep) => (
                <div key={dep.nome} className="bg-white border border-preto/8 rounded-2xl p-7 flex flex-col gap-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm" style={{ color: "#F5E6A3", filter: "drop-shadow(0 0 2px #000)" }}>★</span>
                    ))}
                  </div>
                  <p className="font-jakarta font-light text-preto/70 text-base leading-relaxed flex-1">
                    &ldquo;{dep.texto}&rdquo;
                  </p>
                  <div>
                    <p className="font-jakarta font-semibold text-rosa text-sm">{dep.nome}</p>
                    <p className="font-jakarta font-light text-preto/40 text-xs">{dep.local}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Preço + CTA */}
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
            <p className="font-jakarta font-light text-preto/70 text-lg mb-2">
              Tudo isso por <span className="font-semibold text-preto">R$ 39,90</span>. É só comprar, baixar e levar no celular. Paris te espera.
            </p>
            <p className="font-jakarta font-medium text-preto/50 text-sm mb-10">
              Entrega imediata, direto no seu e-mail.
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
              aria-label="Comprar guia de Paris"
            >
              <div
                className="w-64 md:w-80 mx-auto aspect-[3/4] rounded-3xl flex items-end p-8 relative overflow-hidden group-hover:scale-[1.03] group-hover:shadow-2xl transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #111111 0%, #F2277E 100%)" }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #F7E455 0%, transparent 60%)" }}
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
                  <h3 className="font-abril text-white text-xl leading-snug">
                    Paris em 5 Dias: Guia para a Primeira Viagem
                  </h3>
                </div>
              </div>
              <p className="font-jakarta font-light text-preto/40 text-xs mt-3">
                Clique para ir ao checkout seguro
              </p>
            </a>
          </div>
        </section>

        {/* FAQ — última seção */}
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
