import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          deep: "rgb(var(--orange-deep) / <alpha-value>)",
          DEFAULT: "#E87524",
          bright: "#F7943D",
          light: "rgb(var(--orange-light) / <alpha-value>)",
          pale: "rgb(var(--orange-pale) / <alpha-value>)",
        },
        maroon: {
          deep: "rgb(var(--maroon-deep) / <alpha-value>)",
          DEFAULT: "#781F3A",
          rich: "#9B304B",
          light: "rgb(var(--maroon-light) / <alpha-value>)",
          pale: "rgb(var(--maroon-pale) / <alpha-value>)",
        },
        forest: {
          deep: "rgb(var(--forest-deep) / <alpha-value>)",
          DEFAULT: "#26734D",
          fresh: "#3D9664",
          light: "rgb(var(--forest-light) / <alpha-value>)",
          pale: "rgb(var(--forest-pale) / <alpha-value>)",
        },
        sand: {
          bg: "rgb(var(--sand-bg) / <alpha-value>)",
          surface: "rgb(var(--sand-surface) / <alpha-value>)",
          muted: "rgb(var(--sand-muted) / <alpha-value>)",
          text: "rgb(var(--sand-text) / <alpha-value>)",
          subtext: "rgb(var(--sand-subtext) / <alpha-value>)",
          border: "rgb(var(--sand-border) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-kalpurush)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
