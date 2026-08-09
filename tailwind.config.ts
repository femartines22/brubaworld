import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tons da marca (mantidos)
        rosa: "#F2277E",
        manteiga: "#F7E455",
        manteigaClara: "#F5E6A3",
        preto: "#111111",
        grafite: "#2B2B2B",
        offwhite: "#FAFAF8",

        // Variações derivadas dos tons acima, para o layout editorial.
        // Mesma matiz, só mudando luminosidade — não são cores novas.
        rosaDeep: "#C81E5C", // rosa escurecido, para texto sobre fundo claro
        rosaTint: "#FFE3EE", // rosa clarinho, fundo de card e badge
        manteigaSoft: "#FBF1D3", // amarelo bem claro, fundo de seção
        creme: "#FCF4E6", // fundo dominante da página
        creme2: "#F7ECDA", // segunda camada de creme, chips e linhas finas
        cinza: "#746A5D", // texto secundário, tom quente
        cinzaClaro: "#B9AA92", // texto terciário e preço riscado

        // Azul de Londres — usado no botão dividido do guia combinado.
        // Escurecido em relação ao card para o texto branco ter contraste.
        londres: "#5B7C99",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        script: ["var(--font-script)", "serif"],
        // Números: Inter por enquanto. Quando a licença web da Bootzy chegar,
        // basta trocar a fonte que alimenta --font-num em app/layout.tsx.
        num: ["var(--font-num)", "sans-serif"],
      },
      keyframes: {
        blob: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { borderRadius: "50% 60% 30% 60% / 30% 40% 70% 60%" },
          "75%": { borderRadius: "60% 30% 60% 40% / 70% 50% 40% 30%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        blob: "blob 8s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
        "fade-up": "fade-up 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
