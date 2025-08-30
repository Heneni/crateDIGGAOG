import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});