import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to serve words.json at /api/words in development
    {
      name: 'serve-words-api',
      configureServer(server) {
        server.middlewares.use('/api/words', (_req, res) => {
          try {
            const wordsPath = path.join(__dirname, 'words.json');
            const wordsData = fs.readFileSync(wordsPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(wordsData);
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to load words' }));
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
