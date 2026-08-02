import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProgressRing } from '@/components/community/ProgressRing'
import {
  type Challenge,
  type ChallengeProgress,
  incrementProgress,
} from '@/lib/community/challenges'

const ACCENT_FILL: Record<string, string> = {
  'tint-sage':   'text-tint-sage',
  'tint-blue':   'text-tint-blue',
  'tint-violet': 'text-tint-violet',
  'tint-amber':  'text-tint-amber',
  'tint-teal':   'text-tint-teal',
  'tint-rose':   'text-tint-rose',
}

const ACCENT_WASH: Record<string, string> = {
  'tint-sage':   'bg-tint-sage/12 border-tint-sage/25',
  'tint-blue':   'bg-tint-blue/12 border-tint-blue/25',
  'tint-violet': 'bg-tint-violet/12 border-tint-violet/25',
  'tint-amber':  'bg-tint-amber/12 border-tint-amber/25',
  'tint-teal':   'bg-tint-teal/12 border-tint-teal/25',
  'tint-rose':   'bg-tint-rose/12 border-tint-rose/25',
}

const ACCENT_BADGE: Record<string, string> = {
  'tint-sage':   'bg-tint-sage/20 text-tint-sage',
  'tint-blue':   'bg-tint-blue/20 text-tint-blue',
  'tint-violet': 'bg-tint-violet/20 text-tint-violet',
  'tint-amber':  'bg-tint-amber/20 text-tint-amber',
  'tint-teal':   'bg-tint-teal/20 text-tint-teal',
  'tint-rose':   'bg-tint-rose/20 text-tint-rose',
}

interface ChallengeCardProps {
  challenge: Challenge
  progress: ChallengeProgress
  isToday?: boolean
  onProgressChange?: (updated: ChallengeProgress) => void
}

export function ChallengeCard({
  challenge,
  progress,
  isToday = false,
  onProgressChange,
}: ChallengeCardProps) {
  const [localProgress, setLocalProgress] = useState(progress)
  const [justCompleted, setJustCompleted] = useState(false)

  const pct = Math.min(localProgress.today / challenge.target, 1)
  const done = localProgress.completedToday
  const fill = ACCENT_FILL[challenge.accent] ?? 'text-accent'
  const wash = ACCENT_WASH[challenge.accent] ?? 'bg-accent-soft border-accent/20'
  const badge = ACCENT_BADGE[challenge.accent] ?? 'bg-accent-soft text-accent'

  // Step sizes vary by challenge type
  const step =
    challenge.id === 'steps' ? 500
    : challenge.id === 'water' ? 1
    : challenge.id === 'sleep' ? 1
    : 5

  const handleAdd = useCallback(() => {
    const updated = incrementProgress(challenge.id, step, challenge.target)
    const wasNotDone = !localProgress.completedToday
    setLocalProgress(updated)
    if (wasNotDone && updated.completedToday) {
      setJustCompleted(true)
      setTimeout(() => setJustCompleted(false), 2500)
    }
    onProgressChange?.(updated)
  }, [challenge.id, challenge.target, localProgress.completedToday, onProgressChange, step])

  const handleSub = useCallback(() => {
    const updated = incrementProgress(challenge.id, -step, challenge.target)
    setLocalProgress(updated)
    onProgressChange?.(updated)
  }, [challenge.id, challenge.target, onProgressChange, step])

  return (
    <motion.div
      layout
      className={cn(
        'spotlight relative overflow-hidden rounded-3xl border p-5 transition-shadow',
        wash,
        isToday && 'ring-2 ring-offset-2 ring-accent/30',
      )}
    >
      {/* Completion celebration overlay */}
      <AnimatePresence>
        {justCompleted && (
          <motion.div
            key="celebrate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl bg-accent/90 backdrop-blur-sm"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="text-5xl"
            >
              {challenge.emoji}
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 font-display text-[18px] font-black text-accent-fg"
            >
              Challenge Complete!
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[12px] text-accent-fg/80"
            >
              🔥 {localProgress.streak} day streak
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start gap-4">
        {/* Progress ring */}
        <ProgressRing
          progress={pct}
          size={64}
          strokeWidth={6}
          fillClass={fill}
        >
          <span className="text-[18px]">{challenge.emoji}</span>
        </ProgressRing>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              {isToday && (
                <span className={cn('text-[9px] font-black tracking-[0.2em] uppercase', fill)}>
                  Today's Challenge
                </span>
              )}
              <h3 className="font-display text-[15px] font-black leading-tight text-fg">
                {challenge.title}
              </h3>
            </div>
            {done && (
              <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black', badge)}>
                ✓ Done
              </span>
            )}
          </div>

          <p className="mt-0.5 text-[12px] leading-relaxed text-fg-muted line-clamp-2">
            {challenge.description}
          </p>

          {/* Progress bar + count */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-fg/10">
              <motion.div
                className={cn('h-full rounded-full', fill.replace('text-', 'bg-'))}
                initial={{ width: '0%' }}
                animate={{ width: `${pct * 100}%` }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
            <span className="shrink-0 text-[11px] font-bold text-fg-muted">
              {localProgress.today}/{challenge.target} {challenge.unit}
            </span>
          </div>
        </div>
      </div>

      {/* Controls + streak */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className={cn('text-[11px] font-black', fill)}>🔥 {localProgress.streak}</span>
          <span className="text-[11px] text-fg-muted">day streak</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSub}
            disabled={localProgress.today <= 0}
            aria-label={`Decrease ${challenge.title}`}
            className="flex size-8 items-center justify-center rounded-xl border border-border bg-surface text-fg-muted transition-colors hover:text-fg disabled:opacity-30"
          >
            <Minus className="size-3.5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={handleAdd}
            disabled={done}
            aria-label={`Log progress for ${challenge.title}`}
            className={cn(
              'flex size-8 items-center justify-center rounded-xl transition-colors',
              done
                ? 'bg-fg/8 text-fg-subtle cursor-not-allowed'
                : `${fill.replace('text-', 'bg-').replace('tint-', 'bg-tint-')}/15 ${fill} hover:opacity-80`,
            )}
          >
            <Plus className="size-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
