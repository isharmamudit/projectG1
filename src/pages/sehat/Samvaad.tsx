import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Phone, RotateCcw, Send, ShieldCheck, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import { sehatT, SEHAT_LANGUAGES } from '@/lib/sehat/i18n'
import { checkRedFlags, type RedFlagResult } from '@/lib/sehat/redflags'
import { EmergencyScreen } from '@/components/sehat/EmergencyScreen'
import { SafetyDisclaimer } from '@/components/sehat/SafetyDisclaimer'
import { TriageBand, type TriageLevel } from '@/components/sehat/TriageBand'
import { cn } from '@/lib/utils'
import { saveSymptomSession, detectSymptomsInText, clearDismissedFlag } from '@/lib/sehat/symptomHistory'

interface Msg {
  role: 'user' | 'assistant'
  text: string
}

type Facility = 'home' | 'asha_worker' | 'phc' | 'district_hospital' | 'emergency'

interface TriageResult {
  level: TriageLevel
  reason: string
  next_step: string
  facility: Facility
  source: 'redflag' | 'model' | 'fallback'
}

/**
 * Structured symptom triage.
 *
 * The safety rails are load-bearing here, not decoration:
 *  - checkRedFlags runs on submit BEFORE any fetch. On a hit the network is
 *    never touched and EmergencyScreen takes over the viewport.
 *  - The triage band is a sibling of the scroll container, not inside it, so
 *    it cannot be scrolled out of view.
 *  - The disclaimer is a plain block with no dismiss control.
 *  - The 108 button sits in the header for the whole flow. It is deliberately
 *    NOT emergency-red: if that red appeared on an idle button it would stop
 *    meaning anything by the time it actually mattered.
 */
export function Samvaad() {
  const { code } = useLanguage()
  const [lang, setLang] = useState(code)
  const t = sehatT(lang)

  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [level, setLevel] = useState<TriageLevel | null>(null)
  const [result, setResult] = useState<TriageResult | null>(null)
  const [flag, setFlag] = useState<RedFlagResult | null>(null)

  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, result, pending])

  function reset() {
    setMessages([])
    setInput('')
    setLevel(null)
    setResult(null)
    setFlag(null)
    setPending(false)
  }

  async function send() {
    const text = input.trim()
    if (!text || pending) return

    // ── Rail #2. Before the fetch, before anything else. ──
    const hit = checkRedFlags(text, lang)
    if (hit) {
      setFlag(hit)
      setLevel('emergency')
      return
    }

    const history = messages.map((m) => ({ role: m.role, text: m.text }))
    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setResult(null)
    setPending(true)

    try {
      const res = await fetch('/api/sehat/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, languageCode: lang }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      const data = await res.json()

      // The server runs the same matcher. If it caught something this client
      // missed, honour it — that is the whole point of checking twice.
      if (data?.redFlag) {
        setFlag(data.redFlag as RedFlagResult)
        setLevel('emergency')
        return
      }

      setLevel(data.level as TriageLevel)
      if (data.mode === 'question' && data.question) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.question }])
      } else {
        const triageResult: TriageResult = {
          level: data.level,
          reason: data.reason,
          next_step: data.next_step,
          facility: data.facility,
          source: data.source ?? 'model',
        }
        setResult(triageResult)
        // Persist to symptom history so SehatHub can detect recurrence.
        const allText = messages.map((m) => m.text).join(' ') + ' ' + text
        const detected = detectSymptomsInText(allText)
        // A new session resets dismissal for any symptom it records, so the
        // flag will re-surface on the hub the next time the user opens it.
        detected.forEach((sym) => clearDismissedFlag(sym))
        saveSymptomSession({
          sessionId: `samvaad-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          timestamp: Date.now(),
          level: data.level as TriageLevel,
          detectedSymptoms: detected,
          rawText: allText.slice(0, 500),
        })
      }
    } catch {
      // Fail upward on the client too. An unreachable service must never look
      // like reassurance. Strings are left empty on purpose — a fallback
      // result is re-read from the live language at render time, so switching
      // language after a failure translates it rather than stranding it in
      // whichever language happened to be active when the fetch died.
      setLevel('see_doctor_soon')
      setResult({
        level: 'see_doctor_soon',
        reason: '',
        next_step: '',
        facility: 'phc',
        source: 'fallback',
      })
      // Still persist the symptom text — the service failure doesn't mean the
      // session didn't happen; it means we couldn't triage it.
      const allText = messages.map((m) => m.text).join(' ') + ' ' + text
      const detected = detectSymptomsInText(allText)
      detected.forEach((sym) => clearDismissedFlag(sym))
      saveSymptomSession({
        sessionId: `samvaad-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
        level: 'see_doctor_soon',
        detectedSymptoms: detected,
        rawText: allText.slice(0, 500),
      })
    } finally {
      setPending(false)
    }
  }

  if (flag) {
    return <EmergencyScreen flag={flag} lang={lang} onBack={reset} />
  }

  const started = messages.length > 0 || result !== null

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-paper">
      <TriageBand level={level} lang={lang} pending={pending} />

      <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5">
        <Link
          to="/sehat"
          aria-label="Back"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg"
        >
          <ChevronLeft className="size-5" strokeWidth={2.5} />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-[15px] leading-tight font-black text-fg">
            {t.samvaad.title}
          </h1>
          <p className="truncate text-[10.5px] text-fg-muted">{t.samvaad.subtitle}</p>
        </div>
        {started && (
          <button
            type="button"
            onClick={reset}
            aria-label={t.samvaad.restart}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg"
          >
            <RotateCcw className="size-4" strokeWidth={2.5} />
          </button>
        )}
        {/* Rail #4 — always reachable, never alarming until it needs to be. */}
        <a
          href="tel:108"
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-ink px-3 py-2 text-[12.5px] font-black text-paper transition-transform active:scale-95"
        >
          <Phone className="size-3.5" strokeWidth={2.75} />
          108
        </a>
      </header>

      <div className="flex shrink-0 gap-1.5 overflow-x-auto border-b border-border px-4 py-2">
        {SEHAT_LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={cn(
              'shrink-0 rounded-xl px-3.5 py-2 text-[13px] font-bold transition-colors',
              lang === l.code
                ? 'bg-accent text-accent-fg'
                : 'bg-surface-2 text-fg-muted hover:text-fg',
            )}
          >
            {l.native}
          </button>
        ))}
      </div>

      <div data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <div className="flex justify-start">
          <p className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border bg-surface px-3.5 py-2.5 text-[13.5px] leading-relaxed text-fg">
            {t.samvaad.opening}
          </p>
        </div>

        {messages.map((m, i) => (
          <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <p
              className={cn(
                'max-w-[85%] px-3.5 py-2.5 text-[13.5px] leading-relaxed',
                m.role === 'user'
                  ? 'rounded-2xl rounded-tr-sm bg-accent text-accent-fg'
                  : 'rounded-2xl rounded-tl-sm border border-border bg-surface text-fg',
              )}
            >
              {m.text}
            </p>
          </div>
        ))}

        {pending && (
          <div className="flex justify-start">
            <p className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-border bg-surface px-3.5 py-2.5 text-[13px] text-fg-muted">
              <Sparkles className="size-3.5 animate-pulse" strokeWidth={2.5} />
              {t.samvaad.thinking}
            </p>
          </div>
        )}

        {result && (
          <div className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-[14px] leading-relaxed font-bold text-fg">
              {result.source === 'fallback' ? t.samvaad.errorTitle : result.reason}
            </p>

            <div className="mt-3.5">
              <h2 className="mb-1 text-[10px] font-black tracking-wide text-fg-muted uppercase">
                {t.samvaad.nextStep}
              </h2>
              <p className="text-[13.5px] leading-relaxed text-fg">
                {result.source === 'fallback' ? t.samvaad.errorBody : result.next_step}
              </p>
            </div>

            <div className="mt-3.5">
              <h2 className="mb-1 text-[10px] font-black tracking-wide text-fg-muted uppercase">
                {t.samvaad.goTo}
              </h2>
              <p className="text-[13.5px] font-bold text-fg">{t.facilities[result.facility]}</p>
            </div>

            {result.source === 'fallback' && (
              <div className="mt-3.5 flex items-start gap-2 rounded-xl border border-border bg-surface-2 p-2.5">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-fg-subtle" strokeWidth={2.5} />
                <p className="text-[11px] leading-relaxed text-fg-muted">{t.samvaad.failSafeNote}</p>
              </div>
            )}
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Rail #3 — part of the page, no dismiss control, always above the composer. */}
      <SafetyDisclaimer lang={lang} />

      <div className="flex shrink-0 items-end gap-2 border-t border-border bg-surface px-3 py-2.5">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              void send()
            }
          }}
          rows={1}
          placeholder={t.samvaad.placeholder}
          className="max-h-32 min-h-[42px] flex-1 resize-none rounded-2xl border border-border bg-paper px-3.5 py-2.5 text-[13.5px] text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
        />
        <button
          type="button"
          onClick={() => void send()}
          disabled={!input.trim() || pending}
          aria-label={t.samvaad.send}
          className="flex size-[42px] shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-fg transition-opacity disabled:opacity-35"
        >
          <Send className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
