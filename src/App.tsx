import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/lib/language'
import { Splash } from '@/components/ui/Splash'
import { SmoothCursor } from '@/components/ui/SmoothCursor'
import { Landing } from '@/pages/Landing'

const VoicePage = lazy(() => import('@/pages/VoicePage').then((m) => ({ default: m.VoicePage })))

function App() {
  return (
    <LanguageProvider>
      <Splash />
      <SmoothCursor />
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
      </Routes>
    </LanguageProvider>
  )
}

export default App
