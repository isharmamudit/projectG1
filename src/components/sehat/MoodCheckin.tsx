import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  saveMoodEntry,
  todaysMoodEntry,
  recentMoodHistory,
  moodToTone,
  type SleepRating,
  type EnergyRating,
  type InterestRating,
  type MoodEntry,
} from '@/lib/sehat/moodHistory'

// ── Supportive responses ──────────────────────────────────────────────────
// Deliberately varied so repetition doesn't make them feel automated.
// None of them assign a diagnosis or a score.
const RESPONSES = [
  'Thank you for checking in with yourself today. That takes a moment of care.',
  'Small check-ins like this add up. You are paying attention, and that matters.',
  'Taking a moment to notice how you feel is already a form of self-care.',
  'Checking in with yourself is a quiet act of kindness. Thank you for doing it.',
  'Even on ordinary days, noticing how you feel is worth something.',
  'Taking small breaks and small pauses can make a real difference over time.',
  'Talking with someone you trust — even briefly — can really help on harder days.',
]

function pickResponse(): string {
  return RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
}

// ── Option buttons ────────────────────────────────────────────────────────
interface OptionProps<T extends string> {
  label: string
  value: T
  selected: T | null
  onSelect: (v: T) => void
}

function OptionBtn<T extends string>({ label, value, selected, onSelect }: OptionProps<T>) {
  const isSelected = selected === value
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={isSelected}
      className={cn(
        'flex-1 rounded-xl px-3 py-2.5 text-[13px] font-bold transition-all duration-200',
        'border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        isSelected
          ? 'border-accent bg-accent-soft text-accent scale-[1.02]'
          : 'border-border bg-surface-2 text-fg-muted hover:border-border-strong hover:text-fg',
      )}
    >
      {label}
    </button>
  )
}

// ── Mood dot — history ────────────────────────────────────────────────────
function MoodDot({ entry }: { entry: MoodEntry }) {
  const tone = moodToTone(entry)
  const dotColor =
    tone === 'good'
      ? 'bg-tint-sage'
      : tone === 'low'
        ? 'bg-tint-rose'
        : 'bg-tint-amber'

  const dayLabel = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'short',
  })

  return (
    <div className="flex flex-col items-center gap-1.5" title={entry.date}>
      <span
        className={cn('size-2.5 rounded-full', dotColor)}
        aria-label={`${dayLabel}: ${tone}`}
      />
      <span className="text-[9px] font-bold text-fg-subtle">{dayLabel}</span>
    </div>
  )
}

// ── Main widget ───────────────────────────────────────────────────────────
type Step = 'prompt' | 'questions' | 'done'

/**
 * Mood check-in widget.
 *
 * Intentionally lightweight — three tap-to-answer questions about sleep,
 * energy, and interest. No score is computed. No label is assigned.
 * Output is supportive language plus the Tele-MANAS number.
 *
 * The widget checks today's entry on mount; if the user has already checked in
 * today, it skips straight to the "done" state with the previous entry shown.
 */
export function MoodCheckin() {
  const alreadyDone = todaysMoodEntry()

  const [step, setStep] = useState<Step>(alreadyDone ? 'done' : 'prompt')
  const [sleep, setSleep] = useState<SleepRating | null>(null)
  const [energy, setEnergy] = useState<EnergyRating | null>(null)
  const [interest, setInterest] = useState<InterestRating | null>(null)
  const [response] = useState(pickResponse)
  const [savedEntry, setSavedEntry] = useState<MoodEntry | null>(alreadyDone)

  const history = recentMoodHistory(7)
  const canSubmit = sleep !== null && energy !== null && interest !== null

  function handleSubmit() {
    if (!canSubmit) return
    const entry = saveMoodEntry({ sleep: sleep!, energy: energy!, interest: interest! })
    setSavedEntry(entry)
    setStep('done')
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-2xl bg-accent-soft">
          <Heart className="size-4 text-accent" strokeWidth={2.25} />
        </div>
        <div>
          <h2 className="font-display text-[16px] font-black leading-tight text-fg">
            How are you feeling today?
          </h2>
          <p className="text-[11px] text-fg-muted">A moment for you</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ── Prompt ── */}
        {step === 'prompt' && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <p className="mb-4 text-[13px] leading-relaxed text-fg-muted">
              Three quick questions — no scores, no labels. Just a moment of noticing.
            </p>
            <button
              type="button"
              onClick={() => setStep('questions')}
              className="w-full rounded-2xl bg-accent-soft py-3 text-[13px] font-bold text-accent transition-colors hover:bg-accent/20"
            >
              Check in now
            </button>
          </motion.div>
        )}

        {/* ── Questions ── */}
        {step === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* Q1 */}
            <div>
              <p className="mb-2 text-[12px] font-black tracking-wide text-fg-muted uppercase">
                How did you sleep?
              </p>
              <div className="flex gap-2">
                <OptionBtn<SleepRating> label="Well" value="well" selected={sleep} onSelect={setSleep} />
                <OptionBtn<SleepRating> label="Okay" value="okay" selected={sleep} onSelect={setSleep} />
                <OptionBtn<SleepRating> label="Poorly" value="poorly" selected={sleep} onSelect={setSleep} />
              </div>
            </div>

            {/* Q2 */}
            <div>
              <p className="mb-2 text-[12px] font-black tracking-wide text-fg-muted uppercase">
                How is your energy?
              </p>
              <div className="flex gap-2">
                <OptionBtn<EnergyRating> label="High" value="high" selected={energy} onSelect={setEnergy} />
                <OptionBtn<EnergyRating> label="Average" value="average" selected={energy} onSelect={setEnergy} />
                <OptionBtn<EnergyRating> label="Low" value="low" selected={energy} onSelect={setEnergy} />
              </div>
            </div>

            {/* Q3 */}
            <div>
              <p className="mb-2 text-[12px] font-black tracking-wide text-fg-muted uppercase">
                Interest in usual activities?
              </p>
              <div className="flex gap-2">
                <OptionBtn<InterestRating> label="Normal" value="normal" selected={interest} onSelect={setInterest} />
                <OptionBtn<InterestRating> label="Less" value="less" selected={interest} onSelect={setInterest} />
                <OptionBtn<InterestRating> label="Not at all" value="not_at_all" selected={interest} onSelect={setInterest} />
              </div>
            </div>

            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'w-full rounded-2xl py-3 text-[13px] font-bold transition-all duration-200',
                canSubmit
                  ? 'bg-accent text-accent-fg shadow-[0_4px_16px_-4px_rgba(13,115,119,0.35)]'
                  : 'bg-surface-2 text-fg-subtle cursor-not-allowed',
              )}
            >
              Submit
            </motion.button>
          </motion.div>
        )}

        {/* ── Done ── */}
        {step === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {savedEntry && (
              <p className="mb-4 text-[13px] leading-relaxed text-fg">{response}</p>
            )}

            {/* Tele-MANAS — always visible in done state */}
            <a
              href="tel:14416"
              className="flex w-full items-center gap-3 rounded-2xl border border-border bg-surface-2 p-3.5 transition-colors hover:border-border-strong"
              aria-label="Call Tele-MANAS helpline 14416"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-accent-soft">
                <Phone className="size-4 text-accent" strokeWidth={2.25} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-black text-fg">Need someone to talk to?</p>
                <p className="text-[11px] text-fg-muted">
                  Tele-MANAS · 14416 · Free · 24 hours
                </p>
              </div>
            </a>

            {/* 7-day history */}
            {history.length > 1 && (
              <div className="mt-4">
                <p className="mb-2.5 text-[10px] font-black tracking-wide text-fg-subtle uppercase">
                  Past 7 days
                </p>
                <div className="flex items-end gap-3">
                  {[...history].reverse().map((e) => (
                    <MoodDot key={e.date} entry={e} />
                  ))}
                </div>
              </div>
            )}

            {/* Re-check option — only if today's entry was pre-existing */}
            {alreadyDone && (
              <button
                type="button"
                onClick={() => {
                  setSleep(null)
                  setEnergy(null)
                  setInterest(null)
                  setStep('questions')
                }}
                className="mt-3 text-[11.5px] font-bold text-fg-muted transition-colors hover:text-fg"
              >
                Update today's check-in
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
