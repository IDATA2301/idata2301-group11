import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_TARGET
  const imagesTarget = env.VITE_IMAGES_TARGET

  const proxy: Record<string, { target: string; changeOrigin: boolean }> = {}
  if (apiTarget) {
    proxy['/api'] = { target: apiTarget, changeOrigin: true }
  }
  if (imagesTarget) {
    proxy['/images/trip'] = { target: imagesTarget, changeOrigin: true }
    proxy['/images/destination'] = { target: imagesTarget, changeOrigin: true }
  }

  return {
    plugins: [react()],
    server: { proxy },
  }
})
