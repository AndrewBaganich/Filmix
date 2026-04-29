import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

const API_URL = import.meta.env.VITE_API_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname, "./src")
    }
  },
  server: {
    proxy: {
      '/api': `${API_URL}`
    }
  }
})
