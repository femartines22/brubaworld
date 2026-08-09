import type { Metadata } from "next";
import { Fraunces, Instrument_Serif, Inter, Syne } from "next/font/google";
import "./globals.css";

// Syne continua carregada porque as páginas internas de roteiro ainda a usam.
// O redesign editorial vale só para a Home.
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

// Títulos — peso 700 nos títulos grandes (600 foi testado e achado fino demais).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
});

// Palavra de destaque dentro dos títulos, sempre em itálico.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
  style: ["normal", "italic"],
});

// Corpo, labels e botões.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600"],
});

// Números (preços, contadores, dias do guia).
// Hoje é a própria Inter. Quando a licença web da Bootzy chegar, trocar
// esta constante por next/font/local apontando para public/fonts/bootzy/.
const numeros = Inter({
  subsets: ["latin"],
  variable: "--font-num",
  weight: ["600", "700"],
});

const TITULO = "brubaworld — Roteiros de viagem por quem já viveu cada destino";
const DESCRICAO =
  "Guias de viagem criados por quem já foi, testou e recomenda só o que realmente vale a pena.";
const SITE = "https://www.brubaworld.com.br";

export const metadata: Metadata = {
  // Necessário para o Next montar a URL absoluta da imagem de compartilhamento.
  metadataBase: new URL(SITE),
  title: TITULO,
  description: DESCRICAO,
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    type: "website",
    url: SITE,
    siteName: "brubaworld",
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "brubaworld — Roteiros feitos por quem já viveu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${instrumentSerif.variable} ${inter.variable} ${numeros.variable} ${syne.variable}`}
    >
      <body className="antialiased font-jakarta bg-creme text-grafite">{children}</body>
    </html>
  );
}
