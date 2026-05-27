/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ===== Base Backgrounds =====
        bg: "rgb(var(--bg) / <alpha-value>)",
        bgSoft: "rgb(var(--bgSoft) / <alpha-value>)",

        surface: "rgb(var(--surface) / <alpha-value>)",
        surfaceSoft: "rgb(var(--surfaceSoft) / <alpha-value>)",
        surfaceHard: "rgb(var(--surfaceHard) / <alpha-value>)",

        // ===== Text =====
        textPrimary: "rgb(var(--textPrimary) / <alpha-value>)",
        textMuted: "rgb(var(--textMuted) / <alpha-value>)",
        textDark: "rgb(var(--textDark) / <alpha-value>)",

        // ===== Accent / Brand =====
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentSoft: "rgb(var(--accentSoft) / <alpha-value>)",
        accentHover: "rgb(var(--accentHover) / <alpha-value>)",

        // ===== UI States =====
        hover: "rgb(var(--hover) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        boxHover: "rgb(var(--boxHover) / <alpha-value>)",

        // ===== Status Colors =====
        success: "rgb(var(--success) / <alpha-value>)",
        successSoft: "rgb(var(--successSoft) / <alpha-value>)",

        warning: "rgb(var(--warning) / <alpha-value>)",
        warningSoft: "rgb(var(--warningSoft) / <alpha-value>)",

        error: "rgb(var(--error) / <alpha-value>)",
        errorSoft: "rgb(var(--errorSoft) / <alpha-value>)",

        info: "rgb(var(--info) / <alpha-value>)",
        infoSoft: "rgb(var(--infoSoft) / <alpha-value>)",

        // ===== Extra / Legacy =====
        blue: "rgb(var(--blue) / <alpha-value>)",
        purple: "rgb(var(--purple) / <alpha-value>)",
        shadow: "rgb(var(--shadow) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
