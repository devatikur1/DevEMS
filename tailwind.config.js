/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base Theme Colors
        bg: "#000000", // Deep black base background
        surface: "#0a0a0a", // Surface for cards or section
        boxHover: "#1f1f1f", // Highlight or accent color
        accent: "#3b82f6", // Highlight or accent color
        accentA: "#27272a", // Highlight or accent color
        text: "#cccccc", // Main text color
        subtext: "#eeeeee", // Muted text color
        smtext: "#9f9fa9", // Muted text color
        border: "#2d2d2d", // Divider color
        hover: "#181818", // Hover state

        // Status subtle variants
        success: "#10B981",
        warning: "#ffb300",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
