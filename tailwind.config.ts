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
        rosa: "#F2277E",
        manteiga: "#F7E455",
        preto: "#111111",
        offwhite: "#FAFAF8",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        abril: ["var(--font-abril)", "serif"],
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
      },
      animation: {
        blob: "blob 8s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
        "fade-up": "fade-up 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
