import type { Config } from "tailwindcss";

/**
 * Tokens do Cadência.
 * A paleta nasce do assunto: laranja tangerina (movimento/calor) como família dominante,
 * azul elétrico + magenta + lima como acentos de categoria, e neutros quentes (papel)
 * e frios (night/carbon) separando fundo, superfície e overlay.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tangerine: {
          DEFAULT: "#FF5A0A",
          light: "#FF7A33",
          dark: "#E64A00",
          tint: "#FFE9DC",
          soft: "#FFF5EE",
        },
        ink: "#111111",
        body: "#5C5C5C",
        mist: "#F7F7F8",
        line: "#EDEDED",
        night: "#0B0B0F",
        carbon: "#15151C",
        smoke: "#26262F",
        electric: "#1F6BFF",
        magenta: "#FF2D8A",
        acid: "#B9E824",
        amber: "#FFB020",
        violet: "#7C3AED",
        success: "#12A150",
        warning: "#F5A524",
        danger: "#E5484D",
        info: "#2B7FFF",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        pill: "999px",
        card: "24px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(17,17,17,0.06)",
        lift: "0 18px 40px rgba(17,17,17,0.10)",
        cta: "0 12px 28px rgba(255,90,10,0.35)",
        glow: "0 0 0 1px rgba(255,90,10,0.35), 0 18px 60px rgba(255,90,10,0.22)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.35), 0 20px 50px rgba(11,11,15,0.35)",
      },
      maxWidth: {
        wrap: "1200px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        driftA: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(6%,-8%,0) scale(1.18)" },
        },
        driftB: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1.1)" },
          "50%": { transform: "translate3d(-8%,6%,0) scale(0.92)" },
        },
        driftC: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(0.95)" },
          "50%": { transform: "translate3d(4%,7%,0) scale(1.2)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.85)", opacity: "0.7" },
          "80%,100%": { transform: "scale(1.9)", opacity: "0" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        driftA: "driftA 26s cubic-bezier(0.45,0,0.55,1) infinite",
        driftB: "driftB 34s cubic-bezier(0.45,0,0.55,1) infinite",
        driftC: "driftC 30s cubic-bezier(0.45,0,0.55,1) infinite",
        pulseRing: "pulseRing 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        spinSlow: "spinSlow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
