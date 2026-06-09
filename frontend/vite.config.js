import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite yapılandırması
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages alt dizin (subpath) altında yayınlanacağı için "base" ayarı şart.
  // Proje "kullanici.github.io/internet-programlama-final-2026/" adresinde açılacağından
  // tüm varlık (asset) yolları bu öneki kullanmalıdır.
  base: '/internet-programlama-final-2026/',
})
