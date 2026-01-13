// Trigger deploy: Base path and ErrorBoundary added
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure absolute paths for Vercel
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
})  server: {
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
