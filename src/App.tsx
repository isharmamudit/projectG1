import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { LanguageProvider } from '@/lib/language'
import { AuthProvider, useAuth } from '@/lib/auth'
import { Splash } from '@/components/ui/Splash'
import { SmoothCursor } from '@/components/ui/SmoothCursor'
import { Landing } from '@/pages/Landing'
import { EmergencyPage } from '@/pages/EmergencyPage'
import { SehatHub } from '@/pages/sehat/SehatHub'
import { Samvaad } from '@/pages/sehat/Samvaad'
import { Timeline } from '@/pages/Timeline'
import { Login } from '@/pages/Login'
import { Vitals } from '@/pages/Vitals'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return <>{children}</>
}

const VoicePage = lazy(() => import('@/pages/VoicePage').then((m) => ({ default: m.VoicePage })))

// Lazy on purpose — Abhyaas pulls in MediaPipe's vision runtime, which has no
// business sitting in the main bundle for people who only came to use triage.
const Abhyaas = lazy(() => import('@/pages/sehat/Abhyaas').then((m) => ({ default: m.Abhyaas })))
const Dinacharya = lazy(() => import('@/pages/sehat/Dinacharya').then((m) => ({ default: m.Dinacharya })))

// Community Wellness — separate experience; lazy-split to keep the main
// bundle lean. Doctor Report is low-traffic so also deferred.
const CommunityHub = lazy(() => import('@/pages/community/CommunityHub').then((m) => ({ default: m.CommunityHub })))
const DoctorReport = lazy(() => import('@/pages/sehat/DoctorReport').then((m) => ({ default: m.DoctorReport })))

function App() {
  const location = useLocation()
  // /emergency must render instantly with no decorative delay — someone
  // opening it is very possibly in an actual emergency.
  const isEmergency = location.pathname === '/emergency'

  return (
    <AuthProvider>
      <LanguageProvider>
        {!isEmergency && <Splash />}
        {!isEmergency && <SmoothCursor />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
        <Route
          path="/voice"
          element={
            <ProtectedRoute>
              <Suspense fallback={null}>
                <VoicePage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        {/* Not lazy-loaded on purpose — this is the one page that must never
            depend on a chunk fetch succeeding when opened with no network. */}
        <Route path="/emergency" element={<EmergencyPage />} />
        
        {/* Longitudinal Health Record & Wearables */}
        <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
        <Route path="/vitals" element={<ProtectedRoute><Vitals /></ProtectedRoute>} />

        {/* SEHAT — triage, posture, daily rhythm. All namespaced under /sehat. */}
        <Route path="/sehat" element={<ProtectedRoute><SehatHub /></ProtectedRoute>} />
        <Route path="/sehat/samvaad" element={<ProtectedRoute><Samvaad /></ProtectedRoute>} />
        <Route
          path="/sehat/abhyaas"
          element={
            <ProtectedRoute>
              <Suspense fallback={null}>
                <Abhyaas />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sehat/dinacharya"
          element={
            <ProtectedRoute>
              <Suspense fallback={null}>
                <Dinacharya />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sehat/doctor-report"
          element={
            <ProtectedRoute>
              <Suspense fallback={null}>
                <DoctorReport />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Community Wellness — preventive care dashboard */}
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Suspense fallback={null}>
                <CommunityHub />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </LanguageProvider>
  </AuthProvider>
  )
}

export default App


