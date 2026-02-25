import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        'surface-hover': '#161616',
        border: '#222222',
        'border-hover': '#333333',
        accent: '#e8ff47',
        'accent-dim': 'rgba(232,255,71,0.15)',
        accent2: '#ff4757',
        accent3: '#47c8ff',
        text: '#f0f0f0',
        muted: '#666666',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
};

export default config;
