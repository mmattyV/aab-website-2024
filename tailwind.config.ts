import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        brandRed: "#A41212",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-sm": {
          textShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
        },
        ".text-shadow-lg": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
      });
    }),
  ],
};

export default config;