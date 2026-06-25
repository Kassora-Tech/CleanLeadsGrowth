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
        // Navy scale — brand primary
        navy: {
          50:  "#F4F8FC",
          100: "#E8F0F8",
          200: "#C8D9EC",
          300: "#9DBBD8",
          400: "#6B98C0",
          500: "#3F76A8",
          600: "#285A88",
          700: "#1A4470",
          800: "#0E3460",
          900: "#0B2A4A", // PRIMARY
          950: "#061A2E",
        },
        // Green — action items ONLY
        green: {
          400: "#7DD160",
          500: "#5FBF3F", // PRIMARY ACCENT
          600: "#4DA832",
          700: "#3C8C27",
        },
        // Neutral overrides
        slate: {
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#D1DCE8",
          300: "#B0C0CF",
          400: "#8898A8",
          500: "#637080",
          600: "#5A6E82",
          700: "#3D4F5E",
          800: "#253040",
          900: "#111820",
        },
      },
      fontFamily: {
        sans:    ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        navy:         "0 4px 24px -4px rgba(11,42,74,0.18)",
        "navy-lg":    "0 12px 40px -8px rgba(11,42,74,0.28)",
        green:        "0 4px 20px -4px rgba(95,191,63,0.35)",
        card:         "0 2px 12px -2px rgba(11,42,74,0.10)",
        "card-hover": "0 8px 32px -4px rgba(11,42,74,0.20)",
      },
      backgroundImage: {
        "gradient-navy":
          "linear-gradient(135deg, #0B2A4A 0%, #0E3460 100%)",
        "gradient-hero":
          "linear-gradient(160deg, #061A2E 0%, #0B2A4A 50%, #0E3460 100%)",
      },
      animation: {
        "shine":        "shine 0.6s ease forwards",
        "fade-up":      "fadeInUp 0.5s ease forwards",
        "slide-left":   "slideInLeft 0.4s ease forwards",
      },
      keyframes: {
        shine: {
          "0%":   { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(250%)" },
        },
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight:   "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
