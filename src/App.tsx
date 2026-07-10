import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from '@/lib/language'
import { Splash } from '@/components/ui/Splash'
import { SmoothCursor } from '@/components/ui/SmoothCursor'
import { Landing } from '@/pages/Landing'
import { EmergencyPage } from '@/pages/EmergencyPage'

const VoicePage = lazy(() => import('@/pages/VoicePage').then((m) => ({ default: m.VoicePage })))

function App() {
  const location = useLocation()
  // /emergency must render instantly with no decorative delay — someone
  // opening it is very possibly in an actual emergency.
  const isEmergency = location.pathname === '/emergency'

  return (
    <LanguageProvider>
      {!isEmergency && <Splash />}
      {!isEmergency && <SmoothCursor />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/voice"
          element={
            <Suspense fallback={null}>
              <VoicePage />
            </Suspense>
          }
        />
        {/* Not lazy-loaded on purpose — this is the one page that must never
            depend on a chunk fetch succeeding when opened with no network. */}
        <Route path="/emergency" element={<EmergencyPage />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
