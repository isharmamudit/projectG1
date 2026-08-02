import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Copy,
  Download,
  FileText,
  Printer,
  ShieldCheck,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { loadSymptomHistory, loadDismissedFlags } from '@/lib/sehat/symptomHistory'
import { analyseSymptomHistory } from '@/lib/sehat/symptomAnalysis'
import type { WatchlistSymptom } from '@/lib/sehat/symptomHistory'
import {
  buildDoctorVisitReport,
  downloadDoctorVisitPdf,
  type DoctorVisitReport,
} from '@/lib/sehat/doctorReport'

const SYMPTOM_CHIP_STYLE: Record<WatchlistSymptom, { wash: string; text: string }> = {
  cough:       { wash: 'bg-tint-amber/12 border-tint-amber/25', text: 'text-tint-amber' },
  fever:       { wash: 'bg-tint-rose/12 border-tint-rose/25', text: 'text-tint-rose' },
  weight_loss: { wash: 'bg-tint-violet/12 border-tint-violet/25', text: 'text-tint-violet' },
}
const SYMPTOM_LABEL: Record<WatchlistSymptom, string> = {
  cough:       'Persistent Cough',
  fever:       'Recurring Fever',
  weight_loss: 'Unexplained Weight Loss',
}

const LEVEL_CHIP: Record<string, string> = {
  self_care:        'bg-tint-sage/12 text-tint-sage',
  see_doctor_soon:  'bg-tint-amber/12 text-tint-amber',
  see_doctor_today: 'bg-warm/12 text-warm',
  emergency:        'bg-sehat-alert-soft text-sehat-alert',
}

// ── Question accordion ────────────────────────────────────────────────────
function QuestionCard({ q, index }: { q: string; index: number }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    void navigator.clipboard.writeText(q)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
    >
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[10px] font-black text-accent">
        {index + 1}
      </span>
      <p className="flex-1 text-[13.5px] leading-relaxed text-fg">{q}</p>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy question"
        className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
      >
        <Copy className="size-3" strokeWidth={2.5} />
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </motion.div>
  )
}

// ── Timeline entry ─────────────────────────────────────────────────────────
function TimelineEntry({
  entry,
  index,
  total,
}: {
  entry: DoctorVisitReport['timeline'][number]
  index: number
  total: number
}) {
  const symptoms = entry.symptoms.length > 0 ? entry.symptoms : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex gap-4"
    >
      {/* Spine */}
      <div className="flex flex-col items-center">
        <div className="mt-1 size-2.5 rounded-full bg-accent" />
        {index < total - 1 && <div className="mt-1 w-0.5 flex-1 bg-border" />}
      </div>
      {/* Content */}
      <div className="min-w-0 flex-1 pb-4">
        <p className="text-[11px] font-bold text-fg-muted">{entry.date}</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {symptoms.length === 0 ? (
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-fg-muted">
              General symptoms
            </span>
          ) : (
            symptoms.map((s) => {
              const style = SYMPTOM_CHIP_STYLE[s]
              return (
                <span
                  key={s}
                  className={cn('rounded-full border px-2.5 py-1 text-[11px] font-bold', style.wash, style.text)}
                >
                  {SYMPTOM_LABEL[s]}
                </span>
              )
            })
          )}
          <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-bold', LEVEL_CHIP[entry.level] ?? 'bg-surface-2 text-fg-muted')}>
            {entry.level.replace(/_/g, ' ')}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Doctor Visit Companion page.
 *
 * Reads from the symptom session history in localStorage and constructs a
 * pre-consultation summary. No AI call is made — the summary is built from
 * structured data using clinical thresholds.
 *
 * Route: /sehat/doctor-report
 */
export function DoctorReport() {
  const [report, setReport] = useState<DoctorVisitReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [printing, setPrinting] = useState(false)

  useEffect(() => {
    try {
      const sessions = loadSymptomHistory()
      const dismissed = loadDismissedFlags()
      const flags = analyseSymptomHistory(sessions).filter(
        (f) => !dismissed.includes(f.symptom),
      )
      if (flags.length === 0) {
        setError('no_flags')
        return
      }
      const primarySymptoms = flags.map((f) => f.symptom)
      const relevantSessions = sessions.filter((s) =>
        s.detectedSymptoms.some((sym) => primarySymptoms.includes(sym)),
      )
      setReport(buildDoctorVisitReport(relevantSessions, primarySymptoms))
    } catch {
      setError('failed')
    }
  }, [])

  const printReport = () => {
    setPrinting(true)
    setTimeout(() => {
      window.print()
      setPrinting(false)
    }, 100)
  }

  const downloadPdf = () => {
    if (!report) return
    downloadDoctorVisitPdf(report)
  }

  // ── Empty / error state ───────────────────────────────────────────────
  if (error) {
    return (
      <main className="min-h-dvh bg-paper">
        <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
          <Link
            to="/sehat"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-bold text-fg-muted transition-colors hover:text-fg"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
            SEHAT
          </Link>
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-surface-2">
              <ClipboardList className="size-8 text-fg-subtle" strokeWidth={1.5} />
            </div>
            <h1 className="mt-4 font-display text-[22px] font-black text-fg">No symptom history found</h1>
            <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-fg-muted">
              Complete at least two Samvaad triage sessions with the same symptom to generate a Doctor Visit Report.
            </p>
            <Link
              to="/sehat/samvaad"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent px-5 py-3 text-[13px] font-bold text-accent-fg transition-opacity hover:opacity-90"
            >
              Start a Samvaad Session
              <ChevronRight className="size-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // ── Loading skeleton ──────────────────────────────────────────────────
  if (!report) {
    return (
      <main className="min-h-dvh bg-paper">
        <div className="mx-auto w-full max-w-2xl space-y-4 px-5 pt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-surface-2" />
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-paper print:bg-white">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
        {/* Back nav — hidden on print */}
        <Link
          to="/sehat"
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-bold text-fg-muted transition-colors hover:text-fg print:hidden"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} />
          SEHAT
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[11px] font-black tracking-[0.22em] text-accent uppercase">
            Doctor Visit Companion
          </p>
          <h1 className="mt-2 font-display text-[clamp(1.8rem,6vw,2.6rem)] leading-[0.95] font-black text-fg">
            Your Pre-Consultation Report
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
            Generated from {report.sessionCount} assessment{report.sessionCount !== 1 ? 's' : ''} over {report.spanDays} day{report.spanDays !== 1 ? 's' : ''} ·{' '}
            {new Date(report.generatedAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-5 flex flex-wrap gap-2 print:hidden"
        >
          <button
            type="button"
            onClick={downloadPdf}
            className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-2.5 text-[12.5px] font-bold text-accent-fg transition-transform active:scale-95"
          >
            <Download className="size-4" strokeWidth={2.5} />
            Download PDF
          </button>
          <button
            type="button"
            onClick={printReport}
            disabled={printing}
            className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-2.5 text-[12.5px] font-bold text-fg transition-colors hover:bg-surface-2"
          >
            <Printer className="size-4" strokeWidth={2.5} />
            {printing ? 'Preparing…' : 'Print Report'}
          </button>
        </motion.div>

        {/* Sections */}
        <div className="mt-8 space-y-6">
          {/* AI Health Summary */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-tint-teal/25 bg-tint-teal/8 p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <FileText className="size-4 text-tint-teal" strokeWidth={2.25} />
              <h2 className="font-display text-[15px] font-black text-fg">Health Summary</h2>
            </div>
            <p className="text-[14px] leading-relaxed text-fg">{report.aiSummary}</p>
          </motion.section>

          {/* Current Symptoms */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="mb-3 text-[11px] font-black tracking-[0.2em] text-fg-muted uppercase">
              Reported Symptoms
            </h2>
            <div className="flex flex-wrap gap-2">
              {report.primarySymptoms.map((s) => {
                const style = SYMPTOM_CHIP_STYLE[s]
                return (
                  <span
                    key={s}
                    className={cn('rounded-full border px-4 py-2 text-[13px] font-bold', style.wash, style.text)}
                  >
                    {SYMPTOM_LABEL[s]}
                  </span>
                )
              })}
            </div>
          </motion.section>

          {/* Symptom Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-4 text-[11px] font-black tracking-[0.2em] text-fg-muted uppercase">
              Symptom Timeline
            </h2>
            <div>
              {report.timeline.map((entry, i) => (
                <TimelineEntry key={i} entry={entry} index={i} total={report.timeline.length} />
              ))}
            </div>
          </motion.section>

          {/* Recommendation */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-3xl border border-border bg-surface p-5"
          >
            <h2 className="mb-2.5 text-[11px] font-black tracking-[0.2em] text-fg-muted uppercase">
              Recommendation
            </h2>
            <p className="text-[14px] font-bold leading-relaxed text-fg">{report.recommendation}</p>
            <a
              href="https://hfrd.mohfw.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-accent-soft px-3.5 py-2 text-[12.5px] font-bold text-accent transition-colors hover:bg-accent/20"
            >
              Find nearest PHC
              <ChevronRight className="size-3.5" strokeWidth={2.5} />
            </a>
          </motion.section>

          {/* Questions for Doctor */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-3 text-[11px] font-black tracking-[0.2em] text-fg-muted uppercase">
              Questions to Ask Your Doctor
            </h2>
            <div className="space-y-2.5">
              {report.questionsForDoctor.map((q, i) => (
                <QuestionCard key={i} q={q} index={i} />
              ))}
            </div>
          </motion.section>

          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 rounded-2xl border border-border bg-surface-2 p-4">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-fg-subtle" strokeWidth={2.25} />
            <p className="text-[11.5px] leading-relaxed text-fg-muted">
              This report summarises information entered by the user across multiple assessments. It is not a diagnosis. It is intended solely to help a licensed doctor understand the context before a consultation.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
