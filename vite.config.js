import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        name: 'Easy Check',
        short_name: 'Easy Check',
        description: 'É um projeto para...',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            // src: 'icons/icon-192x192.png',
            src: 'icons/logoEasyCheck192.jpeg',
            sizes: '192x192',
            type: 'image/jpeg',
          },
          {
            // src: 'icons/icon-512x512.png',
            src: 'icons/logoEasyCheck512.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
          },
        ],
      },
    }),
  ],
});
