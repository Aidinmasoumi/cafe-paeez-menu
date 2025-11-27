import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        dark: "#121212",
        card: "#1E1E1E",
      },
      fontFamily: {
        // اینجا اسم اون متغیری که تو layout ساختیم رو میدیم
        sans: ["var(--font-custom)", "sans-serif"], 
      },
    },
  },
  plugins: [],
};
export default config;