import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Abril_Fatface } from "next/font/google";
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

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-abril",
  weight: "400",
});

export const metadata: Metadata = {
  title: "brubaworld — Roteiros de viagem para a Europa",
  description:
    "Roteiros de viagem 100% personalizados para a Europa. Feito do zero pra você, não pra uma turma.",
  openGraph: {
    title: "brubaworld — Roteiros de viagem para a Europa",
    description: "Roteiros 100% individuais feitos do zero pra você.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${jakarta.variable} ${abrilFatface.variable}`}>
      <body className="antialiased font-jakarta">{children}</body>
    </html>
  );
}
