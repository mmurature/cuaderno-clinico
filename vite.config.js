import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// En GitHub Pages la app vive en /<nombre-del-repo>/. El workflow define BASE_PATH.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  // Compatibilidad: iPhone con iOS 14+, Android/Chrome y Firefox de los últimos años
  build: { target: ['es2019', 'safari14', 'chrome87', 'firefox78', 'edge88'], cssTarget: ['safari14', 'chrome87', 'firefox78'] },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Meditas',
        short_name: 'Meditas',
        description: 'Fichas de patologías y procedimientos, repaso diario, evoluciones, fórmulas y registro quirúrgico.',
        lang: 'es-AR',
        theme_color: '#f3f6f8',
        background_color: '#f3f6f8',
        display: 'standalone',
        start_url: base,
        scope: base,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'fuentes', expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 } }
          }
        ]
      }
    })
  ]
});
