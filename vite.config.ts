import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // Only the /emergency route needs to work with zero network — that's
      // the whole point of this page. Precaching the full app shell here
      // (not just emergency assets) means the JS/CSS bundle needed to render
      // it is guaranteed cached too, not just its data.
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'projectG1 Emergency Guide',
        short_name: 'G1 Emergency',
        description: 'Offline-first emergency first-aid guidance — works with no signal.',
        theme_color: '#12181a',
        background_color: '#faf6f0',
        display: 'standalone',
        start_url: '/emergency',
        icons: [],
      },
      workbox: {
        // Precache everything Vite builds (JS/CSS/HTML) so the app shell
        // itself loads with zero network once visited once.
        globPatterns: ['**/*.{js,css,html}'],
        navigateFallback: '/index.html',
      },
      devOptions: {
        // Lets us verify offline behavior against `npm run dev` too, not
        // just a production build.
        enabled: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
