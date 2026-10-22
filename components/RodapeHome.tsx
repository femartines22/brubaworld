import Image from "next/image";
import Listras from "@/components/Listras";

// Rodapé da home: foto da Bruba numa metade, o menu em tamanho grande na outra.
// As páginas de guia continuam usando o Footer antigo.
const MENU = [
  { label: "Sobre", href: "#sobre" },
  { label: "Países", href: "#paises" },
  { label: "Como viajar", href: "#como-viajar" },
  { label: "Roteiros", href: "#roteiros" },
  { label: "Avaliações", href: "#avaliacoes" },
];

const REDES = [
  { label: "TikTok", href: "https://tiktok.com/@brubaworld" },
  { label: "Instagram", href: "https://instagram.com/brubaworld" },
  { label: "Linktree", href: "https://linktr.ee/brgm_bruba" },
];

export default function RodapeHome() {
  return (
    <footer className="pt-24 lg:pt-40 pb-4 lg:pb-6">
      <Listras cor="bg-rosa" fundo="bg-creme" className="h-10 lg:h-14 rounded-2xl mb-4 lg:mb-6" />

      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="relative h-[50svh] lg:h-auto lg:min-h-[80svh] rounded-2xl overflow-hidden bg-creme2">
          <Image
            src="/bruba.jpeg"
            alt="A Bruba em viagem"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_25%] scale-[1.35] origin-[50%_25%]"
          />
        </div>

        <div className="bg-creme2 rounded-2xl px-5 py-10 lg:px-16 lg:py-20 flex flex-col">
          <a
            href="#inicio"
            className="font-display font-bold text-grafite text-[1.25rem] hover:text-rosaDeep transition-colors duration-200 self-start"
          >
            bruba<span className="font-script italic font-normal text-rosaDeep">world</span>
          </a>

          <nav aria-label="Menu do rodapé" className="mt-10 lg:mt-14">
            <h2 className="sr-only">Menu</h2>
            <ul className="menu-rodape space-y-3 lg:space-y-5">
              {MENU.map((m) => (
                <li key={m.href}>
                  <a
                    href={m.href}
                    className="inline-block font-display font-bold text-grafite text-[1.875rem] lg:text-[2.75rem] leading-[1.06] tracking-[-0.02em]"
                  >
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-14 lg:mt-auto lg:pt-16">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {REDES.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-sublinhado font-jakarta font-medium text-grafite text-[1.0625rem]"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-jakarta text-cinza text-sm mt-6">
              © {new Date().getFullYear()} brubaworld. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
