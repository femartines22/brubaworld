import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
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
    <html lang="pt-BR" className={`${syne.variable} ${jakarta.variable} ${playfair.variable}`}>
      <body className="antialiased font-jakarta">{children}</body>
    </html>
  );
}
