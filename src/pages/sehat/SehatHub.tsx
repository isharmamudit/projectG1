import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ChevronLeft, ArrowUpRight, MessageSquareHeart, ShieldCheck, Sun } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/language'
import { sehatT } from '@/lib/sehat/i18n'
import { loadSymptomHistory, loadDismissedFlags } from '@/lib/sehat/symptomHistory'
import { analyseSymptomHistory } from '@/lib/sehat/symptomAnalysis'
import type { SymptomFlag } from '@/lib/sehat/symptomAnalysis'
import { SymptomFlagCard } from '@/components/sehat/SymptomFlagCard'
import { MoodCheckin } from '@/components/sehat/MoodCheckin'
import { SeasonalCards } from '@/components/sehat/SeasonalCards'

/**
 * Entry point for the three SEHAT modules, plus the safety section.
 *
 * Three additional features are surfaced here as non-interruptive widgets:
 *   1. Persistent symptom flags — alerts for recurring watchlist symptoms.
 *   2. Mood check-in — lightweight daily well-being widget.
 *   3. Seasonal prevention cards — contextual public-health guidance.
 *
 * The rails are stated on the page rather than buried in a policy document,
 * because "we do not name diseases" is only credible if it is visible before
 * you start typing symptoms.
 */
export function SehatHub() {
  const { code } = useLanguage()
  const t = sehatT(code)

  // ── Symptom flags ─────────────────────────────────────────────────────────
  const [flags, setFlags] = useState<SymptomFlag[]>([])

  useEffect(() => {
    const history = loadSymptomHistory()
    const dismissed = loadDismissedFlags()
    const all = analyseSymptomHistory(history)
    // Filter out anything the user already dismissed this cycle.
    setFlags(all.filter((f) => !dismissed.includes(f.symptom)))
  }, [])

  function handleDismissFlag(symptom: string) {
    setFlags((prev) => prev.filter((f) => f.symptom !== symptom))
  }

  const cards = [
    {
      to: '/sehat/samvaad',
      icon: MessageSquareHeart,
      title: t.hub.samvaadTitle,
      sub: t.hub.samvaadSub,
      body: t.hub.samvaadBody,
      wash: 'bg-tint-sage/12 border-tint-sage/25',
      accent: 'text-tint-sage',
    },
    {
      to: '/sehat/abhyaas',
      icon: Activity,
      title: t.hub.abhyaasTitle,
      sub: t.hub.abhyaasSub,
      body: t.hub.abhyaasBody,
      wash: 'bg-tint-violet/12 border-tint-violet/25',
      accent: 'text-tint-violet',
    },
    {
      to: '/sehat/dinacharya',
      icon: Sun,
      title: t.hub.dinacharyaTitle,
      sub: t.hub.dinacharyaSub,
      body: t.hub.dinacharyaBody,
      wash: 'bg-tint-amber/12 border-tint-amber/25',
      accent: 'text-tint-amber',
    },
  ]

  const rails = [
    { title: t.hub.rail1, body: t.hub.rail1Body },
    { title: t.hub.rail2, body: t.hub.rail2Body },
    { title: t.hub.rail3, body: t.hub.rail3Body },
    { title: t.hub.rail4, body: t.hub.rail4Body },
  ]

  return (
    <main className="min-h-dvh bg-paper">
      <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-16">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-bold text-fg-muted transition-colors hover:text-fg"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} />
          CareBuddy
        </Link>

        <p className="text-[11px] font-black tracking-[0.22em] text-accent uppercase">{t.hub.eyebrow}</p>
        <h1 className="mt-2 font-display text-[clamp(2rem,7vw,3rem)] leading-[0.95] font-black text-fg">
          {t.hub.heading}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">{t.hub.sub}</p>

        {/* ── Feature 1: Persistent symptom flags ───────────────────────── */}
        <AnimatePresence>
          {flags.length > 0 && (
            <div className="mt-8 space-y-3">
              {flags.map((flag) => (
                <SymptomFlagCard
                  key={flag.symptom}
                  flag={flag}
                  onDismiss={handleDismissFlag}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* ── Module cards ──────────────────────────────────────────────── */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {cards.map((c, i) => (
            <Link
              key={c.to}
              to={c.to}
              className={`spotlight group flex flex-col rounded-3xl border p-5 transition-transform hover:scale-[1.015] ${c.wash} ${
                i === 0 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <c.icon className={`size-6 ${c.accent}`} strokeWidth={2.25} />
                <ArrowUpRight
                  className="size-4 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.5}
                />
              </div>
              <h2 className="mt-4 font-display text-[20px] leading-tight font-black text-fg">{c.title}</h2>
              <p className={`text-[11px] font-black tracking-wide uppercase ${c.accent}`}>{c.sub}</p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-fg-muted">{c.body}</p>
            </Link>
          ))}
        </div>

        {/* ── Feature 2: Mood check-in ───────────────────────────────────── */}
        <section className="mt-10" aria-label="Mood check-in">
          <MoodCheckin />
        </section>

        {/* ── Feature 3: Seasonal prevention ────────────────────────────── */}
        <section className="mt-8" aria-label="Seasonal prevention tips">
          <SeasonalCards />
        </section>

        {/* ── Rails ─────────────────────────────────────────────────────── */}
        <section className="mt-12">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="size-4 text-accent" strokeWidth={2.5} />
            <h2 className="font-display text-[17px] font-black text-fg">{t.hub.railsHeading}</h2>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {rails.map((r, i) => (
              <div key={r.title} className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] font-black text-fg-subtle">0{i + 1}</span>
                  <h3 className="text-[14px] font-black text-fg">{r.title}</h3>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-fg-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
