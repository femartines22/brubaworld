"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Sobre", href: "#sobre" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-preto/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          className="font-syne font-extrabold text-xl tracking-tight text-offwhite hover:text-manteiga transition-colors"
        >
          bruba<span className="text-rosa">world</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-jakarta font-medium text-sm text-offwhite/70 hover:text-offwhite transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contato"
          className="hidden md:inline-flex items-center gap-2 bg-rosa text-white font-jakarta font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-rosa/90 transition-colors"
        >
          quero ser avisado →
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-offwhite transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-offwhite transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-offwhite transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-preto transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 pb-6" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-5 pt-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-jakarta font-medium text-base text-offwhite/80 hover:text-offwhite transition-colors block"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-rosa text-white font-jakarta font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-rosa/90 transition-colors mt-2"
              onClick={() => setMenuOpen(false)}
            >
              quero ser avisado →
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
