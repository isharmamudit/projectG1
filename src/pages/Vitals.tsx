import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Watch, 
  Smartphone, 
  HeartPulse, 
  Activity, 
  Moon, 
  Footprints,
  Flame,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles
} from 'lucide-react'
import { useAuth } from '@/lib/auth'

type SyncState = 'idle' | 'requesting' | 'connecting' | 'synced'

export function Vitals() {
  const { user } = useAuth()
  const [syncState, setSyncState] = useState<SyncState>('idle')

  // Data persistence for the illusion
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      const isSynced = window.localStorage.getItem(`sehat-vitals-synced-${user.phone}`)
      if (isSynced === 'true') {
        setSyncState('synced')
      }
    }
  }, [user])

  const handleSync = () => {
    setSyncState('requesting')
    setTimeout(() => setSyncState('connecting'), 2000)
    setTimeout(() => {
      setSyncState('synced')
      if (user) {
        window.localStorage.setItem(`sehat-vitals-synced-${user.phone}`, 'true')
      }
    }, 4500)
  }

  const resetSync = () => {
    setSyncState('idle')
    if (user) {
      window.localStorage.removeItem(`sehat-vitals-synced-${user.phone}`)
    }
  }

  return (
    <main className="min-h-screen bg-bg pb-24 pt-28">
      <div className="mx-auto max-w-lg px-5">
        <header className="mb-8">
          <h1 className="font-display text-3xl font-black tracking-tight text-fg">
            My Vitals
          </h1>
          <p className="mt-1 text-[15px] leading-relaxed text-fg-subtle">
            Connect your smartwatch to unlock personalized AI health insights.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {syncState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl border border-border bg-surface p-6 shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-tint-blue/10">
                  <Watch className="size-10 text-tint-blue" strokeWidth={2} />
                </div>
                <h2 className="mb-2 text-xl font-bold text-fg">Connect Wearable</h2>
                <p className="mb-8 text-[15px] leading-relaxed text-fg-subtle">
                  Sync data securely from Google Health Connect or Apple HealthKit to power your AI Health Score. Compatible with Noise, Fastrack, Samsung, Fitbit, and more.
                </p>
                <button
                  onClick={handleSync}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-tint-blue px-6 py-4 font-bold text-white shadow-lg shadow-tint-blue/20 transition-transform active:scale-95"
                >
                  <Smartphone className="size-5" />
                  Sync via Health Connect
                </button>
              </div>
            </motion.div>
          )}

          {(syncState === 'requesting' || syncState === 'connecting') && (
            <motion.div
              key="syncing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface py-16 text-center shadow-sm"
            >
              <RefreshCw className="mb-6 size-10 animate-spin text-tint-blue" strokeWidth={2} />
              <h2 className="mb-2 text-lg font-bold text-fg">
                {syncState === 'requesting' ? 'Requesting Permissions...' : 'Syncing with Smartwatch...'}
              </h2>
              <p className="text-[15px] text-fg-subtle">
                {syncState === 'requesting' 
                  ? 'Waiting for Google Health Connect...' 
                  : 'Pulling Heart Rate, SpO₂, Sleep, and Steps...'}
              </p>
            </motion.div>
          )}

          {syncState === 'synced' && (
            <motion.div
              key="synced"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* AI Health Score */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-tint-blue to-tint-violet p-6 text-white shadow-lg">
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-black/10 blur-3xl" />
                
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider">AI Health Score</h2>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-display text-5xl font-black">86</span>
                      <span className="text-lg font-medium text-white/70">/100</span>
                    </div>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                    <Sparkles className="size-6 text-white" />
                  </div>
                </div>

                <div className="relative z-10 mt-6 space-y-2 rounded-2xl bg-black/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-green-300" />
                    <span>Stable heart rate (+2)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-green-300" />
                    <span>Good SpO₂ levels (+5)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="size-4 text-amber-200" />
                    <span>Low activity today (-4)</span>
                  </div>
                </div>
              </div>

              {/* Grid of Vitals */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-tint-rose">
                    <HeartPulse className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Heart Rate</span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="font-display text-3xl font-black text-fg">72</span>
                    <span className="mb-1 text-sm font-medium text-fg-subtle">BPM</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-green-600">Normal resting</p>
                </div>

                <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-tint-blue">
                    <Activity className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">SpO₂</span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="font-display text-3xl font-black text-fg">98</span>
                    <span className="mb-1 text-sm font-medium text-fg-subtle">%</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-green-600">Healthy oxygen</p>
                </div>

                <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-tint-violet">
                    <Moon className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Sleep</span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="font-display text-3xl font-black text-fg">5<span className="text-xl">h</span> 20<span className="text-xl">m</span></span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-amber-600">Below average</p>
                </div>

                <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-tint-sage">
                    <Footprints className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Steps</span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="font-display text-3xl font-black text-fg">8,432</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-fg-subtle">
                    <Flame className="inline size-3.5 text-tint-amber" /> 320 kcal
                  </p>
                </div>
              </div>

              {/* AI Insight */}
              <div className="rounded-3xl border border-tint-blue/20 bg-tint-blue/5 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="size-5 text-tint-blue" />
                  <h3 className="font-bold text-fg">CareBuddy Insight</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-fg-subtle">
                  Your resting heart rate is very stable at 72 BPM, but your sleep duration (5h 20m) is lower than your average. Consider resting early tonight to maintain your 86/100 health score!
                </p>
              </div>

              <div className="pt-4 text-center">
                <button
                  onClick={resetSync}
                  className="text-sm font-medium text-fg-subtle hover:text-fg hover:underline transition-colors"
                >
                  Disconnect Wearable
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
