// Trigger deploy: Base path and ErrorBoundary added
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure absolute paths for Vercel
  server: {
    host: true, // Listen on all addresses
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
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
