import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

declare const process: {
  env: Record<string, string | undefined>
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_URL || '/',
})
