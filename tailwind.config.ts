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
        // Brand core — sky blue, anchored on packaging cyan #37B2E6
        sky: {
          DEFAULT: "#37B2E6",
          soft: "#DDF1FB",
          deep: "#0C74B0",
          50: "#F0F9FE",
          100: "#DDF1FB",
          200: "#B7E2F6",
          300: "#82CCEE",
          400: "#5AB9E7",
          500: "#37B2E6",
          600: "#1B93CC",
          700: "#0C74B0",
          800: "#095C8D",
          900: "#063E60",
        },
        // Legacy lavender alias → sky (keeps stragglers from breaking builds)
        lavender: {
          DEFAULT: "#37B2E6",
          50: "#F0F9FE",
          100: "#DDF1FB",
          200: "#B7E2F6",
          300: "#82CCEE",
          400: "#5AB9E7",
          500: "#37B2E6",
          600: "#1B93CC",
          700: "#0C74B0",
          800: "#095C8D",
          900: "#063E60",
        },
        // MERV performance tier tokens (design system)
        "merv-standard": {
          DEFAULT: "#37B2E6",
          soft: "#DDF1FB",
          deep: "#0C74B0",
        },
        "merv-pro": {
          DEFAULT: "#4FA968",
          soft: "#DBEEE1",
          50: "#F1F9F3",
          100: "#DBEEE1",
          200: "#B6DDC3",
          300: "#8FCAA4",
          400: "#6EB585",
          500: "#4FA968",
          600: "#3B8A54",
          700: "#2C6C41",
          800: "#204F30",
          900: "#143220",
          deep: "#2C6C41",
        },
        "merv-max": {
          DEFAULT: "#8A6FD1",
          soft: "#E4DBF7",
          50: "#F3EFFB",
          100: "#E4DBF7",
          200: "#CBB8ED",
          300: "#B295E1",
          400: "#9E82D9",
          500: "#8A6FD1",
          600: "#6C51B5",
          700: "#4B2FA0",
          800: "#372377",
          900: "#22174B",
          deep: "#4B2FA0",
        },
        // Iridescent accent gradient companions (packaging wave palette)
        mint: {
          soft: "#D6F1E4",
          DEFAULT: "#6DCFA7",
          deep: "#2B8E63",
        },
        iris: {
          soft: "#E4DBF7",
          DEFAULT: "#8A6FD1",
          deep: "#4B2FA0",
        },
        charcoal: {
          DEFAULT: "#17171B",
          soft: "#2A2A32",
          mid: "#4A4A55",
          light: "#7A7A85",
        },
        canvas: {
          DEFAULT: "#FAFAFC",
          warm: "#F7F6FA",
          soft: "#DCEEFA",
        },
        // Category identities
        grass: {
          DEFAULT: "#96B83B",
          soft: "#EDF3D9",
          deep: "#6E8B27",
        },
        blush: {
          DEFAULT: "#1E3A6B",
          soft: "#DCE3F0",
          deep: "#0F1F42",
        },
        smoke: {
          DEFAULT: "#7566A5",
          soft: "#E6E2EF",
          deep: "#4E4278",
        },
        graphite: {
          DEFAULT: "#4A4A55",
          soft: "#E7E5EB",
          deep: "#2B2B33",
        },
        gold: {
          DEFAULT: "#E9B95C",
          soft: "#FBEFD3",
          deep: "#B78A2E",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Satoshi",
          "Manrope",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem, 3.6vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 2.4vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        eyebrow: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.18em" }],
      },
      borderRadius: {
        card: "0.75rem",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 20px 60px -30px rgba(11, 90, 148, 0.22)",
        card: "0 30px 80px -40px rgba(11, 90, 148, 0.32)",
        glow: "0 0 120px rgba(27, 143, 209, 0.32)",
      },
      backgroundImage: {
        "sky-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(58,168,226,0.28) 0%, rgba(223,241,251,0) 70%)",
        "lavender-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(58,168,226,0.28) 0%, rgba(223,241,251,0) 70%)",
        "hero-wash":
          "linear-gradient(180deg, #FAFAFC 0%, #DFF1FB 55%, #FAFAFC 100%)",
        // Iridescent packaging wave: sky → mint → iris (subtle)
        "iris-wash":
          "linear-gradient(105deg, rgba(58,168,226,0.18) 0%, rgba(109,207,167,0.15) 45%, rgba(138,111,209,0.18) 100%)",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "50%": { opacity: "0.7" },
          "100%": { transform: "translateX(20px)", opacity: "0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        drift: "drift 8s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
