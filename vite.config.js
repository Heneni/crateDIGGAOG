import { defineConfig } from 'vite';
import { resolve } from 'path';

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
  },
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src')
    }
  }
});