"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
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
      id="sobre"
      ref={ref}
      className="py-24 md:py-32 px-5 md:px-10"
      style={{ backgroundColor: "#F2277E" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Text column */}
          <div className="order-2 md:order-1 flex flex-col gap-6">
            <div className="reveal">
              <span className="font-jakarta font-medium text-sm text-white/60 uppercase tracking-widest">
                quem faz
              </span>
              <h2 className="font-abril text-white text-4xl md:text-6xl leading-tight mt-3">
                Oi, eu sou
                <br />a Bruba.
              </h2>
              <p className="font-abril text-white/90 text-2xl md:text-3xl mt-4 leading-snug">
                Sou apaixonada por viagens.
              </p>
            </div>

            {/* Credentials card */}
            <div className="reveal bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <p className="font-jakarta font-light text-white text-base leading-relaxed">
                Já morei em{" "}
                <span className="font-semibold">Lille, na França</span>,
                trabalhei como Cast Member no{" "}
                <span className="font-semibold">Walt Disney World, em Orlando</span>,
                e já visitei mais de{" "}
                <span className="font-semibold">20 países</span>.
              </p>
            </div>

            {/* Language line */}
            <div className="reveal flex flex-wrap gap-2">
              {["🇧🇷 Português", "🇫🇷 Francês", "🇬🇧 Inglês"].map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center font-jakarta font-medium text-sm bg-white/20 text-white border border-white/30 px-4 py-1.5 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* Body paragraphs */}
            <div className="reveal space-y-4 font-jakarta font-light text-white/80 text-base md:text-lg leading-relaxed">
              <p>
                Já perdi a conta de quantos roteiros montei pra mim, amigos e
                família. Sempre do mesmo jeito: pesquisando tudo e testando
                na prática o que realmente vale a pena.
              </p>
              <p>
                O{" "}
                <em className="font-medium text-white not-italic">
                  @brubaworld
                </em>{" "}
                nasceu porque percebi que o mercado era escasso de roteiros
                realmente exclusivos. Os roteiros prontos não serviam. São
                genéricos. São cansativos. Não pertencem a ninguém.
              </p>
              <p className="font-medium text-white">
                Então resolvi fazer diferente.
              </p>
            </div>

            {/* Quote box */}
            <div
              className="reveal rounded-2xl p-6 md:p-8"
              style={{ backgroundColor: "#F5E6A3" }}
            >
              <p className="font-abril text-preto text-xl md:text-2xl leading-snug">
                &ldquo;Eu não vendo roteiro. Eu planejo a sua viagem como se
                fosse a minha.&rdquo;
              </p>
              <span className="font-jakarta font-medium text-preto/50 text-sm mt-3 block">
                Bruba
              </span>
            </div>
          </div>

          {/* Photo column */}
          <div className="order-1 md:order-2 reveal">
            <div className="relative">
              <div className="w-full aspect-[3/4] max-w-sm mx-auto rounded-3xl overflow-hidden">
                <Image
                  src="/bruba.jpeg"
                  alt="Foto da Bruba"
                  width={480}
                  height={640}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Decorative blobs */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-manteiga/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-preto/20 rounded-full blur-3xl pointer-events-none" />

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-preto text-offwhite font-jakarta font-medium text-xs px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
                20+ países visitados
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
