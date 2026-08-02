import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import fs from 'fs'

function vercelApiPlugin() {
  return {
    name: 'vite-plugin-vercel-api',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/')) {
          return next()
        }

        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
        const routePath = url.pathname.replace(/^\/api\//, '')
        
        const relativeApiPath = `./api/${routePath}.ts`
        const absoluteApiPath = path.resolve(__dirname, relativeApiPath)

        if (!fs.existsSync(absoluteApiPath)) {
          console.warn(`API route file not found: ${absoluteApiPath}`)
          return next()
        }

        try {
          let bodyData = ''
          if (['POST', 'PUT', 'PATCH'].includes(req.method || '')) {
            await new Promise((resolve, reject) => {
              req.on('data', (chunk: any) => {
                bodyData += chunk
              })
              req.on('end', resolve)
              req.on('error', reject)
            })
          }

          let parsedBody = undefined
          if (bodyData) {
            try {
              parsedBody = JSON.parse(bodyData)
            } catch {
              parsedBody = bodyData
            }
          }

          const vercelReq = Object.assign(req, {
            body: parsedBody,
            query: Object.fromEntries(url.searchParams.entries()),
          })

          const vercelRes = Object.assign(res, {
            status(code: number) {
              res.statusCode = code
              return vercelRes
            },
            json(data: any) {
              if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json')
              }
              res.end(JSON.stringify(data))
              return vercelRes
            },
            send(data: any) {
              if (typeof data === 'object') {
                return vercelRes.json(data)
              }
              res.end(data)
              return vercelRes
            },
          })

          const module = await server.ssrLoadModule(relativeApiPath)
          const handler = module.default || module

          if (typeof handler === 'function') {
            await handler(vercelReq, vercelRes)
          } else {
            console.error(`No default export handler in ${relativeApiPath}`)
            next()
          }
        } catch (err) {
          console.error(`Error handling API route ${req.url}:`, err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Internal Server Error', details: String(err) }))
          }
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  if (!process.env.GROQ_API_KEY) {
    process.env.GROQ_API_KEY = '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'
  }

  return {
    plugins: [
      vercelApiPlugin(),
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: null,
        includeAssets: ['favicon.ico'],
        manifest: {
          name: 'CareBuddy Emergency Guide',
          short_name: 'CareBuddy Emergency',
          description: 'Offline-first emergency first-aid guidance — works with no signal.',
          theme_color: '#12181a',
          background_color: '#faf6f0',
          display: 'standalone',
          start_url: '/emergency',
          icons: [],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html}'],
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/(?!emergency)/],
          maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        },
        devOptions: {
          enabled: false,
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
  }
})
