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
        // Brand core
        lavender: {
          DEFAULT: "#9164D2",
          50: "#FAF5FF",
          100: "#F1EAFE",
          200: "#E4D4FC",
          300: "#CDB2F5",
          400: "#B58EE8",
          500: "#9164D2",
          600: "#7A4EBC",
          700: "#623D9E",
          800: "#4A2E7A",
          900: "#33215A",
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
          soft: "#F1EAFE",
        },
        // Category identities
        sky: {
          DEFAULT: "#67B7F2",
          soft: "#E5F2FD",
          deep: "#3A8FC9",
        },
        grass: {
          DEFAULT: "#96B83B",
          soft: "#EDF3D9",
          deep: "#6E8B27",
        },
        blush: {
          DEFAULT: "#E95774",
          soft: "#FBE1E7",
          deep: "#B93755",
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
        soft: "0 20px 60px -30px rgba(74, 46, 122, 0.25)",
        card: "0 30px 80px -40px rgba(74, 46, 122, 0.35)",
        glow: "0 0 120px rgba(145, 100, 210, 0.35)",
      },
      backgroundImage: {
        "lavender-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(145,100,210,0.28) 0%, rgba(241,234,254,0) 70%)",
        "hero-wash":
          "linear-gradient(180deg, #FAFAFC 0%, #F1EAFE 55%, #FAFAFC 100%)",
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
