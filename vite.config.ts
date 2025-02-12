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
    port: 3000, // ✅ Chỉnh cổng tại đây
    host: 'localhost', // (Tùy chọn) Cho phép truy cập từ localhost
    open: true, // (Tùy chọn) Tự động mở trình duyệt khi chạy
  }
})