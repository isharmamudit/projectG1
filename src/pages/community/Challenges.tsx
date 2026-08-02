import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BounceIn } from '@/components/ui/BounceIn'
import { ChallengeCard } from '@/components/community/ChallengeCard'
import {
  getTodayChallenge,
  getWeeklyChallenges,
  loadProgress,
  type ChallengeProgress,
} from '@/lib/community/challenges'

export function Challenges() {
  const todayChallenge = getTodayChallenge()
  const weeklyChallenges = getWeeklyChallenges()

  // Progress state — keyed by challenge id
  const [progress, setProgress] = useState<Record<string, ChallengeProgress>>(() => {
    const all = [todayChallenge, ...weeklyChallenges]
    return Object.fromEntries(all.map((c) => [c.id, loadProgress(c.id)]))
  })

  // Re-read on mount in case another tab updated storage
  useEffect(() => {
    const all = [todayChallenge, ...weeklyChallenges]
    setProgress(Object.fromEntries(all.map((c) => [c.id, loadProgress(c.id)])))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleProgressChange(id: string, updated: ChallengeProgress) {
    setProgress((prev) => ({ ...prev, [id]: updated }))
  }

  const todayProg = progress[todayChallenge.id]
  const todayPct = todayProg ? Math.min(todayProg.today / todayChallenge.target, 1) : 0

  return (
    <div className="space-y-8">
      {/* Today's Challenge — hero card */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <p className="text-[11px] font-black tracking-[0.2em] text-fg-muted uppercase">
            Today's Challenge
          </p>
          <span className="flex-1 border-t border-border" />
          <span className="text-[11px] font-bold text-fg-muted">
            {Math.round(todayPct * 100)}% complete
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ChallengeCard
            challenge={todayChallenge}
            progress={progress[todayChallenge.id] ?? { challengeId: todayChallenge.id, startDate: '', today: 0, streak: 0, totalCompletions: 0, completedToday: false, lastUpdated: 0 }}
            isToday
            onProgressChange={(p) => handleProgressChange(todayChallenge.id, p)}
          />
        </motion.div>
      </section>

      {/* Weekly rotation */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <p className="text-[11px] font-black tracking-[0.2em] text-fg-muted uppercase">
            This Week's Challenges
          </p>
          <span className="flex-1 border-t border-border" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {weeklyChallenges.map((c, i) => (
            <BounceIn key={c.id} index={i}>
              <ChallengeCard
                challenge={c}
                progress={
                  progress[c.id] ?? {
                    challengeId: c.id,
                    startDate: '',
                    today: 0,
                    streak: 0,
                    totalCompletions: 0,
                    completedToday: false,
                    lastUpdated: 0,
                  }
                }
                onProgressChange={(p) => handleProgressChange(c.id, p)}
              />
            </BounceIn>
          ))}
        </div>
      </section>
    </div>
  )
}
