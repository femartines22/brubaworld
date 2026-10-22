"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// FOTOS do palco: a metade da tela que fica parada enquanto o texto rola.
// Com uma foto só, ela se move devagar. Quando a Bruna mandar mais fotos de viagem
// (verticais, 3:4), é só incluir aqui: elas passam a se alternar sozinhas.
const FOTOS = [{ src: "/bruba.jpeg", alt: "A Bruba em viagem, sorrindo, numa rua iluminada à noite" }];

const TEMPO_POR_FOTO = 6000;

export default function Palco({ className = "" }: { className?: string }) {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (FOTOS.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      if (!document.hidden) setAtual((i) => (i + 1) % FOTOS.length);
    }, TEMPO_POR_FOTO);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-creme2 ${className}`}>
      {FOTOS.map((foto, i) => (
        <Image
          key={foto.src}
          src={foto.src}
          alt={i === atual ? foto.alt : ""}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`object-cover object-[50%_35%] transition-opacity duration-[1600ms] ease-in-out ${
            FOTOS.length === 1 ? "anim-drift" : ""
          } ${i === atual ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
