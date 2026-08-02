import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Info, Loader2, RotateCcw, Sun } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import { sehatT } from '@/lib/sehat/i18n'
import { cn } from '@/lib/utils'

interface Question {
  key: keyof Answers
  label: string
  hint: string
  options: string[]
}

interface Answers {
  wakeTime: string
  sleepTime: string
  energyDip: string
  mealTiming: string
  screenBeforeBed: string
  outdoorLight: string
}

interface RhythmBlock {
  time: string
  title: string
  detail: string
  traditional: string | null
}

const QUESTIONS: Question[] = [
  {
    key: 'wakeTime',
    label: 'What time do you usually wake up?',
    hint: 'On an ordinary day, not a holiday.',
    options: ['Before 5 AM', '5–6 AM', '6–7 AM', '7–8 AM', 'After 8 AM'],
  },
  {
    key: 'sleepTime',
    label: 'What time do you usually go to sleep?',
    hint: 'When you actually fall asleep, not when you lie down.',
    options: ['Before 9 PM', '9–10 PM', '10–11 PM', '11 PM–12 AM', 'After midnight'],
  },
  {
    key: 'energyDip',
    label: 'When do you feel most tired during the day?',
    hint: 'The part of the day you find hardest to push through.',
    options: ['Mid-morning', 'Just after lunch', 'Late afternoon', 'Evening', 'It varies'],
  },
  {
    key: 'mealTiming',
    label: 'When is your largest meal?',
    hint: 'The meal you eat the most at.',
    options: ['Breakfast', 'Lunch', 'Early dinner', 'Late dinner', 'It varies'],
  },
  {
    key: 'screenBeforeBed',
    label: 'How long do you use a screen before sleeping?',
    hint: 'Phone, TV, or computer in bed or just before it.',
    options: ['None', 'Under 30 minutes', '30–60 minutes', '1–2 hours', 'More than 2 hours'],
  },
  {
    key: 'outdoorLight',
    label: 'How much time do you spend outdoors in daylight?',
    hint: 'Any time outside, including travel and work.',
    options: ['Almost none', 'Under 30 minutes', '30–60 minutes', '1–3 hours', 'Most of the day'],
  },
]

const EMPTY: Answers = {
  wakeTime: '', sleepTime: '', energyDip: '',
  mealTiming: '', screenBeforeBed: '', outdoorLight: '',
}

/**
 * Circadian-aligned daily scheduling.
 *
 * Deliberately not a dosha or constitution quiz. Six self-report questions
 * about when things happen produce a schedule of when things could happen —
 * nothing is diagnosed, classified, or claimed to be improved. That framing
 * is stated on the page, not just in the prompt, because it is the honest
 * answer to "so is this Ayurveda?" and it should not require asking.
 */
export function Dinacharya() {
  const { code } = useLanguage()
  const t = sehatT(code)

  const [answers, setAnswers] = useState<Answers>(EMPTY)
  const [pending, setPending] = useState(false)
  const [summary, setSummary] = useState('')
  const [blocks, setBlocks] = useState<RhythmBlock[] | null>(null)
  const [isFallback, setIsFallback] = useState(false)

  const answered = QUESTIONS.filter((q) => answers[q.key]).length
  const complete = answered === QUESTIONS.length

  async function submit() {
    if (!complete || pending) return
    setPending(true)
    try {
      const res = await fetch('/api/sehat/rhythm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, languageCode: code }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      const data = await res.json()
      setSummary(data.summary ?? '')
      setBlocks(Array.isArray(data.blocks) ? data.blocks : [])
      setIsFallback(data.source === 'fallback')
    } catch {
      // Same posture as the server: a generic sensible day beats an error box.
      setSummary('A general day built around light, meals and a steady wind-down.')
      setBlocks([
        { time: 'On waking', title: 'Keep a steady wake time', detail: 'The same wake time each day anchors everything else.', traditional: null },
        { time: 'Within 1 hour', title: 'Get outdoor light', detail: 'Ten to fifteen minutes outside helps set your body clock.', traditional: null },
        { time: 'Midday', title: 'Main meal', detail: 'Keep the largest meal in the middle of the day where you can.', traditional: null },
        { time: 'Early afternoon', title: 'Expect a natural dip', detail: 'A short walk works better than a long nap.', traditional: null },
        { time: '3 hours before bed', title: 'Last full meal', detail: 'Finishing earlier gives your body time to settle.', traditional: null },
        { time: '1 hour before bed', title: 'Screens down, lights low', detail: 'Dim light in the last hour makes falling asleep easier.', traditional: null },
      ])
      setIsFallback(true)
    } finally {
      setPending(false)
    }
  }

  function reset() {
    setAnswers(EMPTY)
    setBlocks(null)
    setSummary('')
    setIsFallback(false)
  }

  return (
    <main className="min-h-dvh bg-paper">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-20">
        <Link
          to="/sehat"
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-bold text-fg-muted transition-colors hover:text-fg"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} />
          SEHAT
        </Link>

        <div className="flex items-center gap-2.5">
          <Sun className="size-6 text-tint-amber" strokeWidth={2.25} />
          <div>
            <h1 className="font-display text-[26px] leading-tight font-black text-fg">
              {t.hub.dinacharyaTitle}
            </h1>
            <p className="text-[12px] font-bold text-tint-amber">{t.hub.dinacharyaSub}</p>
          </div>
        </div>

        {/* Said plainly, up front. This is the honest framing, and it belongs
            on the page rather than in an FAQ. */}
        <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-border bg-surface-2 p-3.5">
          <Info className="mt-0.5 size-4 shrink-0 text-fg-subtle" strokeWidth={2.5} />
          <p className="text-[12px] leading-relaxed text-fg-muted">
            This is <strong className="font-black text-fg">circadian-aligned scheduling</strong> — when
            to do ordinary things, based on the times you give. It is{' '}
            <strong className="font-black text-fg">not</strong> a dosha or constitution assessment, and
            it makes no health claims. Traditional Dinacharya vocabulary appears only where it
            genuinely names a time of day.
          </p>
        </div>

        {!blocks ? (
          <>
            <div className="mt-8 space-y-6">
              {QUESTIONS.map((q, i) => (
                <div key={q.key}>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[11px] font-black text-fg-subtle">0{i + 1}</span>
                    <h2 className="text-[14.5px] font-black text-fg">{q.label}</h2>
                  </div>
                  <p className="mt-0.5 mb-2.5 pl-6 text-[11.5px] text-fg-muted">{q.hint}</p>
                  <div className="flex flex-wrap gap-1.5 pl-6">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: opt }))}
                        className={cn(
                          'rounded-xl px-3.5 py-2 text-[12.5px] font-bold transition-colors',
                          answers[q.key] === opt
                            ? 'bg-accent text-accent-fg'
                            : 'bg-surface-2 text-fg-muted hover:text-fg',
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => void submit()}
              disabled={!complete || pending}
              className="mt-9 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-4 text-[15px] font-black text-accent-fg transition-opacity disabled:opacity-35"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" strokeWidth={2.5} />
                  Building your day…
                </>
              ) : complete ? (
                'Build my day'
              ) : (
                `Answer all six — ${answered} of 6 done`
              )}
            </button>
          </>
        ) : (
          <>
            <p className="mt-8 text-[15px] leading-relaxed font-bold text-fg">{summary}</p>

            {isFallback && (
              <p className="mt-3 rounded-xl border border-border bg-surface-2 p-3 text-[11.5px] leading-relaxed text-fg-muted">
                We could not reach the scheduling service, so this is a general circadian day rather
                than one built from your answers.
              </p>
            )}

            <ol className="mt-7 space-y-0">
              {blocks.map((b, i) => (
                <li key={i} className="relative flex gap-4 pb-7 last:pb-0">
                  {/* Timeline spine */}
                  {i < blocks.length - 1 && (
                    <span className="absolute top-4 left-[7px] h-full w-px bg-border" aria-hidden />
                  )}
                  <span className="relative z-10 mt-[7px] size-[15px] shrink-0 rounded-full border-[3px] border-paper bg-tint-amber" />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] font-black tracking-wide text-fg-subtle uppercase">
                      {b.time}
                    </p>
                    <h3 className="mt-0.5 text-[15px] leading-tight font-black text-fg">{b.title}</h3>
                    {b.traditional && (
                      <span className="mt-1 inline-block rounded-md bg-tint-amber/15 px-2 py-0.5 text-[10.5px] font-bold text-tint-amber">
                        {b.traditional}
                      </span>
                    )}
                    <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{b.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={reset}
              className="mt-9 flex w-full items-center justify-center gap-2 rounded-2xl border border-border-strong px-5 py-3.5 text-[14px] font-black text-fg transition-colors hover:bg-surface-2"
            >
              <RotateCcw className="size-4" strokeWidth={2.5} />
              Start again
            </button>
          </>
        )}
      </div>
    </main>
  )
}
