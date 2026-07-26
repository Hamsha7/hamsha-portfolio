/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#FFB800',
        'brand-amber': '#F59E0B',
        'brand-gold': '#EAB308',
        'neon-blue': '#00f0ff',
        'neon-pink': '#ff00ff',
        'neon-purple': '#8b5cf6',
        'dark-bg': '#0B0C10',
        'dark-surface': '#12141D',
        'dark-card': '#191B28',
      },
      boxShadow: {
        'amber-glow': '0 0 25px rgba(255, 184, 0, 0.3)',
        'amber-lg': '0 10px 30px -5px rgba(255, 184, 0, 0.4)',
        'dark-card': '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 8px rgba(255, 184, 0, 0.4)' },
          '100%': { boxShadow: '0 0 24px rgba(255, 184, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

