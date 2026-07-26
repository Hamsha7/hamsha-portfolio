import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // On Vercel, process.env.VERCEL is set automatically.
  // Using process.env.VERCEL ? '/' : './' ensures compatibility with Vercel, GitHub Pages, and local dev.
  base: process.env.VERCEL ? '/' : './',
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,
    strictPort: false,
  },
})
