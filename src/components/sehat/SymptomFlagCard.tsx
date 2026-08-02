import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ChevronRight, X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { markFlagDismissed } from '@/lib/sehat/symptomHistory'
import type { SymptomFlag } from '@/lib/sehat/symptomAnalysis'

interface FlagContent {
  headline: string
  body: string
  subtext: string
  cta: string
  ctaHref: string
  accent: {
    wash: string
    border: string
    icon: string
    label: string
    cta: string
  }
}

const FLAG_CONTENT: Record<string, FlagContent> = {
  cough: {
    headline: 'Cough noticed across multiple check-ins',
    body: 'A cough lasting more than two weeks should be checked by a healthcare professional. Free TB screening is available at your nearest Primary Health Centre — no prescription needed.',
    subtext:
      'This is not a diagnosis. It is a reminder based on public-health guidelines that recommend evaluation for a persistent cough.',
    cta: 'Find nearby PHC',
    ctaHref: 'https://hfrd.mohfw.gov.in/',
    accent: {
      wash: 'bg-tint-amber/10',
      border: 'border-tint-amber/30',
      icon: 'text-tint-amber',
      label: 'text-tint-amber',
      cta: 'bg-tint-amber/15 text-tint-amber hover:bg-tint-amber/25',
    },
  },
  fever: {
    headline: 'Fever recorded across multiple sessions',
    body: 'Fever that persists for more than seven days may indicate something that needs medical evaluation. An ASHA worker or PHC can run a basic malaria and typhoid test for free.',
    subtext:
      'This is not a diagnosis. It is a reminder that prolonged fever warrants professional assessment.',
    cta: 'Find nearby PHC',
    ctaHref: 'https://hfrd.mohfw.gov.in/',
    accent: {
      wash: 'bg-tint-rose/10',
      border: 'border-tint-rose/30',
      icon: 'text-tint-rose',
      label: 'text-tint-rose',
      cta: 'bg-tint-rose/15 text-tint-rose hover:bg-tint-rose/25',
    },
  },
  weight_loss: {
    headline: 'Weight loss mentioned several times',
    body: 'Unexplained or unintended weight loss over several weeks is worth discussing with a doctor. It can be caused by many treatable conditions. A free consultation at your PHC is the right first step.',
    subtext:
      'This is not a diagnosis. It is a reminder based on clinical guidelines that repeated unintended weight loss should be evaluated.',
    cta: 'Find nearby PHC',
    ctaHref: 'https://hfrd.mohfw.gov.in/',
    accent: {
      wash: 'bg-tint-violet/10',
      border: 'border-tint-violet/30',
      icon: 'text-tint-violet',
      label: 'text-tint-violet',
      cta: 'bg-tint-violet/15 text-tint-violet hover:bg-tint-violet/25',
    },
  },
}

interface SymptomFlagCardProps {
  flag: SymptomFlag
  onDismiss: (symptom: string) => void
}

/**
 * A dismissible information card that surfaces when a watchlist symptom has
 * recurred past its clinical threshold.
 *
 * Design constraints:
 * — Never says "you have [disease]". Headlines are observations, not verdicts.
 * — The subtext line always attributes the threshold to published guidelines.
 * — The CTA is "Find nearby PHC", not "Get tested for TB" — routing, not diagnosis.
 * — Dismiss is always available and permanently respected until a new session.
 */
export function SymptomFlagCard({ flag, onDismiss }: SymptomFlagCardProps) {
  const [expanded, setExpanded] = useState(false)
  const content = FLAG_CONTENT[flag.symptom]
  if (!content) return null

  function handleDismiss() {
    markFlagDismissed(flag.symptom as Parameters<typeof markFlagDismissed>[0])
    onDismiss(flag.symptom)
  }

  const spanLabel =
    flag.spanDays === 1
      ? 'yesterday and today'
      : `${flag.spanDays} days`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border p-4',
        content.accent.wash,
        content.accent.border,
      )}
      role="alert"
      aria-label="Persistent symptom notice"
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full',
            content.accent.wash,
            content.accent.border,
            'border',
          )}
          aria-hidden
        >
          <AlertCircle className={cn('size-4', content.accent.icon)} strokeWidth={2.25} />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'text-[10px] font-black tracking-[0.18em] uppercase',
              content.accent.label,
            )}
          >
            Health notice · {spanLabel}
          </p>
          <p className="mt-0.5 text-[14px] font-bold leading-snug text-fg">
            {content.headline}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss this notice"
          className="flex size-7 shrink-0 items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-fg/8 hover:text-fg"
        >
          <X className="size-3.5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-border bg-paper p-4">
              <div className="mb-3 flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-[12px] font-bold text-fg-muted uppercase tracking-wider">AI Reasoning</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-tint-sage/15 px-2 py-0.5 text-[10px] font-black tracking-widest text-tint-sage uppercase">
                  Confidence <span className="text-[11px]">HIGH</span>
                </span>
              </div>
              
              <p className="text-[13px] leading-relaxed text-fg mb-3 font-semibold">
                You reported {flag.symptom.replace('_', ' ')} in {flag.sessionCount} assessments over {flag.spanDays} days.
              </p>
              
              <p className="text-[13px] leading-relaxed text-fg mb-3">
                {content.body}
              </p>
              
              <div className="space-y-2 mb-3">
                <p className="text-[11px] font-bold text-fg-muted uppercase tracking-wider">Based on:</p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-[12px] text-fg/80">
                    <CheckCircle2 className="size-3.5 text-tint-sage" />
                    Symptoms reported repeatedly
                  </li>
                  <li className="flex items-center gap-2 text-[12px] text-fg/80">
                    <CheckCircle2 className="size-3.5 text-tint-sage" />
                    Persistent duration ({flag.spanDays} days)
                  </li>
                  <li className="flex items-center gap-2 text-[12px] text-fg/80">
                    <CheckCircle2 className="size-3.5 text-tint-sage" />
                    Multiple clinical assessments
                  </li>
                </ul>
              </div>

              <p className="text-[11px] leading-relaxed text-fg-muted italic border-t border-border/50 pt-3">
                {content.subtext}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action row */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[12px] font-bold text-fg-muted transition-colors hover:text-fg"
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Why am I seeing this?'}
        </button>

        <span className="flex-1" />

        <Link
          to="/sehat/doctor-report"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-[12px] font-bold text-fg transition-colors hover:bg-surface-2"
        >
          Prepare for Visit
        </Link>

        <a
          href={content.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-bold transition-colors',
            content.accent.cta,
          )}
        >
          {content.cta}
          <ChevronRight className="size-3.5" strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  )
}

