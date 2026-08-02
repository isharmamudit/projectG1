import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  Heart,
  MapPin,
  Trophy,
  Users,
} from 'lucide-react'
import { Challenges } from '@/pages/community/Challenges'
import { Camps } from '@/pages/community/Camps'
import { Family } from '@/pages/community/Family'

type Tab = 'challenges' | 'camps' | 'family'

const TABS: { id: Tab; label: string; icon: React.ElementType; sub: string }[] = [
  { id: 'challenges', label: 'Wellness', icon: Trophy, sub: 'Daily challenges' },
  { id: 'camps', label: 'Health Camps', icon: MapPin, sub: 'Nearby events' },
  { id: 'family', label: 'Family', icon: Users, sub: 'Health circle' },
]

const SLIDE: any = {
  initial: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
}

/**
 * Community Wellness hub.
 *
 * Three panels — Challenges, Health Camps, Family — accessed via a sticky
 * bottom tab bar that matches the app's visual language. The individual
 * panels are rendered inline (not lazy-routed) so state survives tab switches.
 *
 * Route: /community
 */
export function CommunityHub() {
  const [tab, setTab] = useState<Tab>('challenges')
  const [prevTab, setPrevTab] = useState<Tab>('challenges')

  const tabOrder: Tab[] = ['challenges', 'camps', 'family']
  const dir = tabOrder.indexOf(tab) > tabOrder.indexOf(prevTab) ? 1 : -1

  function switchTab(next: Tab) {
    setPrevTab(tab)
    setTab(next)
  }

  return (
    <main className="flex min-h-dvh flex-col bg-paper">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-0">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-fg-muted transition-colors hover:text-fg"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} />
          CareBuddy
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="mb-1 flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-xl bg-accent-soft">
              <Heart className="size-3.5 text-accent" strokeWidth={2.5} />
            </div>
            <p className="text-[11px] font-black tracking-[0.22em] text-accent uppercase">
              Community Wellness
            </p>
          </div>
          <h1 className="font-display text-[clamp(1.9rem,6.5vw,2.8rem)] leading-[0.95] font-black text-fg">
            Preventive Care
          </h1>
          <p className="mt-2.5 max-w-xl text-[14px] leading-relaxed text-fg-muted">
            Stay ahead of illness through healthy habits, nearby health camps, and family coordination — before symptoms appear.
          </p>
        </motion.div>

        {/* ── Tab bar ─────────────────────────────────────────────────── */}
        <div
          className="mb-6 flex gap-1 overflow-x-auto rounded-2xl bg-surface-2 p-1"
          role="tablist"
          aria-label="Community sections"
        >
          {TABS.map((t) => {
            const Icon = t.icon
            const isActive = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${t.id}`}
                onClick={() => switchTab(t.id)}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  isActive ? 'bg-surface shadow-sm' : 'hover:bg-surface/50'
                }`}
              >
                <Icon
                  className={`size-4.5 transition-colors ${isActive ? 'text-accent' : 'text-fg-subtle'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-[12px] font-black leading-tight ${isActive ? 'text-fg' : 'text-fg-muted'}`}
                >
                  {t.label}
                </span>
                <span className="hidden text-[10px] text-fg-subtle sm:block">{t.sub}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Panel content ───────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-3xl flex-1 px-5 pb-16 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={tab}
            id={`panel-${tab}`}
            role="tabpanel"
            custom={dir}
            initial={SLIDE.initial}
            animate={SLIDE.animate}
            exit={SLIDE.exit}
            transition={SLIDE.transition}
          >
            {tab === 'challenges' && <Challenges />}
            {tab === 'camps' && <Camps />}
            {tab === 'family' && <Family />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
