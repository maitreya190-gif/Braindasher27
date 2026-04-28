import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false
  },
  preview: {
    port: 4173
  }
});
