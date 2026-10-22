"use client";

import { useEffect } from "react";

/**
 * Entrada das partes de cada seção da home: tudo que tem data-reveal sobe e aparece
 * quando chega na tela, em sequência dentro da mesma seção.
 *
 * O conteúdo só fica escondido depois que o script inline da página adiciona a classe
 * js-motion; se algo falhar, a classe reveal-all mostra tudo depois de 4 segundos.
 */
export default function MotionLayer() {
  useEffect(() => {
    const raiz = document.documentElement;
    const w = window as Window & { __revealFallback?: number };
    if (w.__revealFallback) clearTimeout(w.__revealFallback);

    const elementos = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("is-in");
            observer.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    elementos.forEach((el) => {
      const secao = el.closest("section, footer");
      const irmaos = secao
        ? Array.from(secao.querySelectorAll<HTMLElement>("[data-reveal]"))
        : [];
      const ordem = Math.max(0, irmaos.indexOf(el));
      el.style.transitionDelay = `${Math.min(ordem, 6) * 75}ms`;
      observer.observe(el);
    });

    raiz.classList.add("js-motion");
    return () => observer.disconnect();
  }, []);

  return null;
}
