import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ⬅️ WAJIB untuk Netlify atau GitHub Pages
  plugins: [react(), tailwindcss()],
});
