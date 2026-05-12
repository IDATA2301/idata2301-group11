import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':                 { target: 'http://10.212.27.62', changeOrigin: true },
      '/images/trip':         { target: 'http://10.212.27.62', changeOrigin: true },
      '/images/destination':  { target: 'http://10.212.27.62', changeOrigin: true },
    },
  },
})
