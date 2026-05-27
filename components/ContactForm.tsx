"use client";

import { useEffect, useRef } from "react";

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
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
      id="contato"
      ref={ref}
      className="bg-offwhite py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left */}
          <div>
            <div className="reveal">
              <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
                vamos começar
              </span>
              <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight mt-3">
                Me conta
                <br />
                tudo.
              </h2>
            </div>
            <div className="reveal mt-8 space-y-4 font-jakarta font-light text-preto/60 text-lg leading-relaxed">
              <p>
                Nas próximas semanas estarei viajando e testando mais um
                roteiro. Me acompanha pelo Instagram enquanto isso — assim que
                voltar, abrimos as consultas novamente.
              </p>
            </div>

            <div className="reveal mt-10 flex flex-wrap gap-3">
              {["100% individual", "feito do zero", "resposta em até 48h"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-preto text-offwhite font-jakarta font-medium text-xs px-4 py-2 rounded-full"
                  >
                    <span className="w-1 h-1 rounded-full bg-rosa" />
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right — offline card */}
          <div className="reveal">
            <div className="bg-preto rounded-3xl p-10 md:p-14 flex flex-col items-start gap-8">
              <div>
                <h3 className="font-abril text-offwhite text-3xl md:text-4xl leading-tight mb-5">
                  Estou fora
                  <br />
                  por enquanto.
                </h3>
                <p className="font-jakarta font-light text-offwhite/60 text-base md:text-lg leading-relaxed">
                  Nas próximas semanas estarei viajando e o formulário ficará
                  temporariamente fora do ar. Me acompanhe no Instagram em
                  tempo real!
                </p>
              </div>

              <a
                href="https://www.instagram.com/brubaworld"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rosa text-white font-jakarta font-semibold text-base px-8 py-4 rounded-full hover:bg-rosa/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-rosa/20"
              >
                seguir no Instagram →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
