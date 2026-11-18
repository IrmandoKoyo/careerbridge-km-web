import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Subpath disamakan dengan konvensi UPRO Hub (https://upro.web.id/kmclass)
export default defineConfig({
  base: '/kmclass/',
  plugins: [
    tailwindcss(),
    react(),
  ],
})
