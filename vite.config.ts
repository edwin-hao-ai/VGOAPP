import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

declare const process: {
  env: Record<string, string | undefined>
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_URL || '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        // Standalone product page served at /remotecrab/ (VGO Studio).
        // Static multi-page build — no SPA fallback needed on Caddy.
        remotecrab: 'remotecrab/index.html',
        remotecrabPrivacy: 'remotecrab/privacy/index.html',
      },
    },
  },
})
