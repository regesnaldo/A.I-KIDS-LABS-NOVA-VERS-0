import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define o caminho base para deploy no GitHub Pages
  // Deve corresponder ao nome do repositório
  base: '/A.I-KIDS-LABS-NOVA-VERS-0/',
  server: {
    // Configura proxy para evitar CORS em desenvolvimento local (opcional)
    // Mas estamos usando CORS no backend, então não é estritamente necessário
    port: 5173
  }
})
