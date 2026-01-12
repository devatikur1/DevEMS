/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ===== Base Backgrounds =====
        bg: "var(--color-bg)",
        bgSoft: "#ccc",
        surface: "#0a0a0a",
        surfaceSoft: "#141414",
        surfaceHard: "#080808",

        // ===== Text =====
        textPrimary: "#ccc",
        textMuted: "#a1a1a1",
        textDark: "#000000",

        // ===== Accent / Brand =====
        accent: "#3b82f6",
        accentSoft: "var(--color-accentSoft)",
        accentHover: "var(--color-accentHover)",
        accentA: "var(--color-accentA)",

        // ===== UI States =====
        hover: "var(--color-hover)",
        border: "var(--color-border)",
        boxHover: "var(--color-boxHover)",

        // ===== Status Colors =====
        success: "var(--color-success)",
        successSoft: "var(--color-successSoft)",
        warning: "var(--color-warning)",
        warningSoft: "var(--color-warningSoft)",
        error: "var(--color-error)",
        errorSoft: "var(--color-errorSoft)",

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
