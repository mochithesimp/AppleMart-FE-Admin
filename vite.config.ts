import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Remove the css.postcss configuration
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000, 
    host: true, 
    open: false, 
  },
  define: {
    'process.env': process.env
  },
})