"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const guias = [
  {
    id: "paris",
    title: "Paris em 5 Dias: Guia para a Primeira Viagem",
    tag: "Disponível",
    active: true,
    href: "/roteiros/paris",
  },
  {
    id: "paris-expert",
    title: "Paris Expert: além do óbvio",
    tag: "Em breve",
    active: false,
    href: null,
  },
  {
    id: "restaurantes-paris",
    title: "Restaurantes de Paris por Bairro",
    tag: "Em breve",
    active: false,
    href: null,
  },
  {
    id: "paris-londres",
    title: "Paris + Londres em 1 Semana",
    tag: "Em breve",
    active: false,
    href: null,
  },
];

export default function Carrossel() {
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="roteiros"
      className="py-24 md:py-32 px-5 md:px-10"
      style={{ backgroundColor: "#F5E6A3" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal flex items-end justify-between mb-12">
          <div>
            <span className="font-jakarta font-medium text-sm text-preto/40 uppercase tracking-widest">
              guias de viagem
            </span>
            <h2 className="font-abril text-preto text-4xl md:text-6xl leading-tight mt-3">
              Roteiros Prontos.
            </h2>
          </div>
          {/* Arrow buttons */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-preto/20 flex items-center justify-center hover:bg-preto hover:text-offwhite hover:border-preto transition-all duration-200 text-preto/50"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-preto/20 flex items-center justify-center hover:bg-preto hover:text-offwhite hover:border-preto transition-all duration-200 text-preto/50"
              aria-label="Próximo"
            >
              →
            </button>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="reveal flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {guias.map((guia) => {
            const card = (
              <div
                className={`relative flex-shrink-0 w-72 md:w-80 snap-start rounded-3xl overflow-hidden transition-all duration-300 ${
                  guia.active
                    ? "cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
                    : "cursor-default"
                }`}
              >
                {/* Cover image area */}
                <div
                  className="w-full h-96 flex items-end p-6 relative"
                  style={{
                    background: guia.active
                      ? "linear-gradient(135deg, #111111 0%, #F2277E 100%)"
                      : "linear-gradient(135deg, #333333 0%, #555555 100%)",
                    filter: guia.active ? "none" : "blur(2px) brightness(0.7)",
                  }}
                >
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "radial-gradient(circle at 30% 40%, #F7E455 0%, transparent 60%), radial-gradient(circle at 70% 70%, #FAFAF8 0%, transparent 50%)",
                    }}
                  />
                  {/* Eiffel tower minimal icon */}
                  {guia.active && (
                    <div className="absolute top-6 right-6 opacity-20">
                      <svg width="48" height="64" viewBox="0 0 48 64" fill="white">
                        <path d="M24 2 L20 20 L16 20 L12 40 L8 40 L4 62 L44 62 L40 40 L36 40 L32 20 L28 20 Z M18 44 L30 44 L30 50 L18 50 Z" fillRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                  <div className="relative z-10">
                    {/* Tag */}
                    <span
                      className={`inline-flex items-center font-jakarta font-semibold text-xs px-3 py-1 rounded-full mb-3 ${
                        guia.active
                          ? "bg-rosa text-white"
                          : "bg-white/20 text-white/70"
                      }`}
                    >
                      {guia.active && <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />}
                      {guia.tag}
                    </span>
                    <h3 className="font-abril text-white text-xl leading-snug">
                      {guia.title}
                    </h3>
                  </div>
                </div>
              </div>
            );

            return guia.active && guia.href ? (
              <Link key={guia.id} href={guia.href} className="flex-shrink-0 w-72 md:w-80 snap-start">
                <div
                  className="relative rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
                >
                  {/* Cover image area */}
                  <div
                    className="w-full h-96 flex items-end p-6 relative"
                    style={{
                      background: "linear-gradient(135deg, #111111 0%, #F2277E 100%)",
                    }}
                  >
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "radial-gradient(circle at 30% 40%, #F7E455 0%, transparent 60%), radial-gradient(circle at 70% 70%, #FAFAF8 0%, transparent 50%)",
                      }}
                    />
                    <div className="absolute top-6 right-6 opacity-20">
                      <svg width="48" height="64" viewBox="0 0 48 64" fill="white">
                        <path d="M24 2 L20 20 L16 20 L12 40 L8 40 L4 62 L44 62 L40 40 L36 40 L32 20 L28 20 Z M18 44 L30 44 L30 50 L18 50 Z" fillRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <span className="inline-flex items-center font-jakarta font-semibold text-xs px-3 py-1 rounded-full mb-3 bg-rosa text-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
                        Disponível
                      </span>
                      <h3 className="font-abril text-white text-xl leading-snug">
                        {guia.title}
                      </h3>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div className="bg-preto px-6 py-4 flex items-center justify-between">
                    <span className="font-jakarta font-medium text-offwhite/60 text-sm">
                      Ver roteiro
                    </span>
                    <span className="text-rosa font-jakarta font-semibold text-sm">→</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div key={guia.id} className="flex-shrink-0 w-72 md:w-80 snap-start">
                <div className="relative rounded-3xl overflow-hidden">
                  {/* Cover image area */}
                  <div
                    className="w-full h-96 flex items-end p-6 relative"
                    style={{
                      background: "linear-gradient(135deg, #333333 0%, #555555 100%)",
                      filter: "blur(2px) brightness(0.7)",
                    }}
                  >
                    <div className="relative z-10">
                      <h3 className="font-abril text-white/60 text-xl leading-snug">
                        {guia.title}
                      </h3>
                    </div>
                  </div>
                  {/* Em breve overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-preto/40 backdrop-blur-[1px]">
                    <span className="font-jakarta font-semibold text-sm text-white/80 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                      Em breve
                    </span>
                  </div>
                  {/* Bottom */}
                  <div className="bg-preto/80 px-6 py-4">
                    <span className="font-jakarta font-medium text-offwhite/30 text-sm">
                      Em breve
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile arrows */}
        <div className="reveal flex md:hidden gap-3 mt-6 justify-center">
          <button
            onClick={() => scroll("left")}
            className="w-11 h-11 rounded-full border border-preto/20 flex items-center justify-center hover:bg-preto hover:text-offwhite transition-all duration-200 text-preto/50"
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-11 h-11 rounded-full border border-preto/20 flex items-center justify-center hover:bg-preto hover:text-offwhite transition-all duration-200 text-preto/50"
            aria-label="Próximo"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
