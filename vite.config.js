import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './', // Utiliser un chemin relatif pour que les fichiers soient trouvés après empaquetage
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist', // Dossier de sortie
    emptyOutDir: true // Vider le dossier avant de générer
  }
})
