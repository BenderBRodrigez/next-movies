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
        primary: 'var(--primary)',
        error: 'var(--error)',
        background: 'var(--background)',
        input: 'var(--input)',
        card: 'var(--card)',
        text: 'var(--text)',
      }
    },
  },
  plugins: [],
};
export default config;
