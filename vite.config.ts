import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
=======
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
>>>>>>> 2236a15784afac7ab16982ec8273df530c81166b
})
