/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ===== Base Backgrounds =====
        bg: "var(--color-bg)",
        bgSoft: "#f9f9f9",
        surface: "#0a0a0a",
        surfaceSoft: "#141414",
        surfaceHard: "#080808",

        // ===== Text =====
        textPrimary: "#f9f9f9",
        textMuted: "#7e7e7e",
        textDark: "#000000",

        // ===== Accent / Brand =====
        accent: "#3b82f6",
        accentSoft: "#60a5fa",
        accentHover: "var(--color-accentHover)",
        accentA: "var(--color-accentA)",

        // ===== UI States =====
        hover: "#454545",
        border: "#2d2d2d",
        boxHover: "#111111",

        // ===== Status Colors =====
        success: "#10b981",
        successSoft: "#14532d",
        warning: "#ffb300",
        warningSoft: "#78350f",
        error: "#ef4444",
        errorSoft: "#881337",

        // ===== Extra / Legacy =====
        text: "var(--color-text)",
        subtext: "var(--color-subtext)",
        smtext: "var(--color-smtext)",
        info: "var(--color-info)",
        blue: "#0082fb",
        purple: "#9333ea",
        shadow: "var(--color-shadow)",
      },
    },
  },
  plugins: [],
};
