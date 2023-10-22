import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 8080,
    hmr: false,
  },
  build: {
    // generate manifest.json in outDir
    assetsDir: './',
    rollupOptions: {
      // overwrite default .html entry
      input: 'src/index.jsx',
      output: {
        entryFileNames: `[name].js`,
      },
    },
  },
  plugins: [react()],
});
