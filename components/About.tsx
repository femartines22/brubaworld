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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      ref={ref}
      className="bg-rosa py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text column */}
          <div className="order-2 md:order-1">
            <div className="reveal">
              <span className="font-jakarta font-medium text-sm text-white/60 uppercase tracking-widest">
                quem faz
              </span>
              <h2 className="font-abril text-white text-4xl md:text-6xl leading-tight mt-3 mb-8">
                Oi, eu sou
                <br />a Bruba.
              </h2>
            </div>

            <div className="reveal space-y-5 font-jakarta font-light text-white/80 text-lg leading-relaxed">
              <p>
                Sou apaixonada por viagem e obcecada com organização. Já morei
                em Lille, na França, trabalhei na Disney em Orlando como Cast
                Member e já viajei pra mais de 30 países. Falo francês, inglês
                e espanhol. Mas mais do que colecionar destinos, aprendi a{" "}
                <em>entender</em> lugares de verdade.
              </p>
              <p>
                Já perdi a conta de quantos roteiros eu montei pra mim, pra
                família, pra amigos, sempre do mesmo jeito: pesquisando tudo do
                zero e pensando no que faz sentido pra <em>aquela</em> pessoa,
                não pra qualquer pessoa.
              </p>
              <p>
                O brubaworld nasceu porque eu percebi que muita gente queria
                viajar mas não sabia por onde começar, e os roteiros prontos não
                serviam. São genéricos. São cansativos. São feitos pra uma turma
                que não é você.
              </p>
              <p>Então eu resolvi fazer diferente.</p>
            </div>

            {/* Quote box */}
            <div className="reveal mt-10 bg-manteiga rounded-2xl p-6 md:p-8">
              <p className="font-abril text-preto text-xl md:text-2xl leading-snug">
                &ldquo;Eu não vendo roteiro. Eu planejo a sua viagem como se fosse a
                minha.&rdquo;
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

              {/* Decorative blob */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-manteiga/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-preto/20 rounded-full blur-3xl pointer-events-none" />

              {/* Floating pill */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-preto text-offwhite font-jakarta font-medium text-xs px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
                ✈ já viajou pra mais de 30 países
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
