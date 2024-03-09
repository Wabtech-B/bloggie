import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      xs: "400px",
      sm: "600px",
      md: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1950px",
    },
    fontFamily: {
      thiccboi: "var(--font-thicccboi)",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      gridTemplateColumns: {
        "250-auto": "250px calc(100% - 250px)",
        "auto-300": "calc(100% - 300px) 300px",
        "60-auto": "60px calc(100% - 60px)",
        "minmax-uto-200": "repeat(auto-fit, minmax(200px, 1fr))",
      },
      colors: {
        brand: "#EA3C12",
        main: "#f5f5f9",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "shadows/xs": "0px 1px 2px 0px rgba(18,18,23,0.05)",
        "shadows/sm":
          "0px 1px 2px 0px rgba(18,18,23,0.06), 0px 1px 3px 0px rgba(18,18,23,0.1)",
        "shadows/md":
          "0px 2px 4px -1px rgba(18,18,23,0.06), 0px 4px 6px -1px rgba(18,18,23,0.08)",
        "shadows/lg":
          "0px 4px 6px -2px rgba(18,18,23,0.05), 0px 10px 15px -3px rgba(18,18,23,0.08)",
        "shadows/xl":
          "0px 10px 10px -5px rgba(18,18,23,0.04), 0px 20px 25px -5px rgba(18,18,23,0.1)",
        "shadows/2xl": "0px 25px 50px -12px rgba(18,18,23,0.25)",
        "shadows/overlay":
          "0px 2px 4px 0px rgba(18,18,23,0.04), 0px 5px 8px 0px rgba(18,18,23,0.04), 0px 10px 18px 0px rgba(18,18,23,0.03), 0px 24px 48px 0px rgba(18,18,23,0.03), 0px 0px 0px 1px rgba(18,18,23,0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        ".text-muted": {
          opacity: 0.8,
        },
        ".transition-a": {
          transition: "all 0.3s ease-in-out",
        },
        ".box-shadow": {
          "box-shadow": ".5rem .5rem 1.5rem rgba(0,0,0,0.1)",
        },
        ".flex-center-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-center-between": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ".flex-align-center": {
          display: "flex",
          alignItems: "center",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;

export default config;
