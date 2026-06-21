import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: "#CBA6F7",
        electric: "#3B82F6",
        pink: "#FFB6C1",
        charcoal: "#2E2E2E",
      },
      boxShadow: {
        glow: "0 24px 70px rgba(203, 166, 247, 0.32)",
        blue: "0 22px 55px rgba(59, 130, 246, 0.24)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shine: "shine 1.8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shine: {
          "0%": { transform: "translateX(-120%) rotate(12deg)" },
          "100%": { transform: "translateX(160%) rotate(12deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
