// import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
    // un-comment this when you want to enable sentry source map upload
    // sentryVitePlugin({
    //   org: 'trizlink',
    //   project: 'trizlink-frontend-local'
    // })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173
  },

  build: {
    // also change this to 'true' when you want to enable sentry source map upload
    sourcemap: false
  }
});
