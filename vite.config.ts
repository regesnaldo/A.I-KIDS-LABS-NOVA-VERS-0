import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Este comando 'base' é o que faz o site aparecer no seu link do GitHub
export default defineConfig({
  plugins: [react()],
  base: '/A.I-KIDS-LABS-NOVA-VERS-O/',
})
