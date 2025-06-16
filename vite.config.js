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
        description: 'É um projeto para o cadastro e gerenciamento de colaboradores e seus documentos',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            
            src: 'icons/logoEasyCheck192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            
            src: 'icons/logoEasyCheck512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
