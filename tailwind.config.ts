import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1A1A2E", // Deep Navy (Dark mode background)
        foreground: "#F8F9FA", // White Smoke (Light text on dark background)

        primary: "#9945FF", // Solana Purple
        secondary: "#14F195", // Teal Blue (Accent)

        darkGray: "#2C2C54", // Sidebar, card background
        lightGray: "#A5A5A5", // Secondary text
        limeGreen: "#00FFA3", // Success, active states
        neonPink: "#FF00FF", // CTA buttons, highlights
        softRed: "#FF3B30", // Errors, warnings

        // Gradient Colors
        gradientStart: "#9945FF",
        gradientEnd: "#14F195",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(90deg, #9945FF 0%, #14F195 100%)",
        "gradient-secondary": "linear-gradient(45deg, #FF00FF 0%, #00FFA3 100%)",
        "gradient-dark": "linear-gradient(135deg, #1A1A2E 0%, #2C2C54 100%)",
      },
      fontFamily: {
        spaceGrotesk: "var(--font-space-gro), sans-serif",
        dmSans: "var(--font-dmSans), sans-serif",
      },
    },
  },
  plugins: [],
} satisfies Config;
