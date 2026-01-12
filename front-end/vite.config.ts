import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // Otimizações para evitar timeout no Vercel
    sourcemap: false, // Desliga mapas de código (reduz tempo/memória)
    chunkSizeWarningLimit: 1000, // Aumenta limite de aviso
    rollupOptions: {
      output: {
        manualChunks: {
          // Agrupa bibliotecas principais em um chunk separado
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Agrupa utilitários
          'vendor-utils': ['axios', 'lucide-react']
        }
      }
    }
  }
})
