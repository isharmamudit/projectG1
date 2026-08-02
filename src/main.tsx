import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

// autoUpdate + skipWaiting/clientsClaim means a new deploy's service worker
// takes control on the next navigation, but a tab already open when the
// update lands keeps running the old cached JS until something reloads it —
// that's what made deploys look "stuck" (stale navbar, fixed bugs still
// reproducing) even after the fix was live. Force that reload automatically
// instead of relying on the user to hard-refresh.
registerSW({ immediate: true, onRegisteredSW(_url, reg) {
  reg?.update()
}, onNeedRefresh() {
  window.location.reload()
} })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
