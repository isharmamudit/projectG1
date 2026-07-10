import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ChevronLeft, Phone, Search, WifiOff, X } from 'lucide-react'
import { EMERGENCY_GUIDES, searchEmergencyGuides, type EmergencyGuide } from '@/lib/emergencyGuides'

/**
 * Deliberately static and AI-free — see emergencyGuides.ts for why. Cached
 * fully offline by the service worker (vite.config.ts) so this works with
 * zero network once visited once, which is the entire point of the page.
 */
export function EmergencyPage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<EmergencyGuide | null>(null)
  const results = searchEmergencyGuides(query)

  if (selected) {
    return (
      <div className="fixed inset-0 flex flex-col overflow-y-auto bg-paper">
        <div className="sticky top-0 flex items-center gap-3 border-b border-border bg-paper/95 px-4 py-3 backdrop-blur">
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Back"
            className="flex size-8 items-center justify-center rounded-full text-fg-muted hover:text-fg"
          >
            <ChevronLeft className="size-5" strokeWidth={2.5} />
          </button>
          <h1 className="font-display text-[16px] font-black text-fg">{selected.title}</h1>
        </div>

        <div className="flex-1 space-y-5 p-4 pb-24">
          <a
            href="tel:108"
            className="flex items-center justify-center gap-2 rounded-2xl bg-tint-rose px-4 py-3.5 text-[14px] font-black text-paper shadow-[0_8px_20px_-6px_rgba(220,38,38,0.5)]"
          >
            <Phone className="size-4" strokeWidth={2.5} />
            Call 108 / 112 now
          </a>

          <div className="rounded-2xl border border-tint-rose/30 bg-tint-rose/10 p-3">
            <p className="text-[12.5px] font-bold text-fg">{selected.callEmergencyWhen}</p>
          </div>

          <div>
            <h2 className="mb-2 text-[11px] font-black tracking-wide text-fg-muted uppercase">Do this now</h2>
            <ol className="space-y-2">
              {selected.immediateSteps.map((step, i) => (
                <li key={i} className="flex gap-2.5 rounded-xl border border-border bg-surface p-3 text-[13px] leading-relaxed text-fg">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-black text-accent-fg">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="mb-2 text-[11px] font-black tracking-wide text-fg-muted uppercase">Do NOT</h2>
            <ul className="space-y-1.5">
              {selected.doNot.map((item, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-fg-muted">
                  <X className="mt-0.5 size-3.5 shrink-0 text-tint-rose" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="pt-2 text-[10.5px] leading-relaxed text-fg-muted">
            General first-aid information only — not a diagnosis or a substitute for professional care. Call
            emergency services as soon as you're able to reach a signal.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-paper">
      <div className="border-b border-border bg-tint-rose/10 px-4 py-3">
        <div className="mb-2 flex items-center gap-2">
          <Link to="/" className="flex size-7 items-center justify-center rounded-full text-fg-muted hover:text-fg">
            <ChevronLeft className="size-4" strokeWidth={2.5} />
          </Link>
          <AlertTriangle className="size-4 text-tint-rose" strokeWidth={2.5} />
          <h1 className="font-display text-[15px] font-black text-fg">Emergency Guide</h1>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[9.5px] font-bold text-fg-muted">
            <WifiOff className="size-2.5" strokeWidth={2.5} />
            Works offline
          </span>
        </div>
        <a
          href="tel:108"
          className="flex items-center justify-center gap-2 rounded-xl bg-tint-rose px-3 py-2.5 text-[13px] font-black text-paper"
        >
          <Phone className="size-3.5" strokeWidth={2.5} />
          Call 108 / 112 now
        </a>
      </div>

      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2">
          <Search className="size-3.5 shrink-0 text-fg-muted" strokeWidth={2.5} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What's happening? e.g. chest pain, snake bite, seizure…"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-fg placeholder:text-fg-muted focus:outline-none"
          />
        </div>
      </div>

      <div data-lenis-prevent className="flex-1 space-y-2 overflow-y-auto p-4">
        {results.length === 0 && (
          <p className="py-8 text-center text-[12.5px] text-fg-muted">
            No exact match — call 108/112 and describe the situation.
          </p>
        )}
        {results.map((guide) => (
          <button
            key={guide.id}
            type="button"
            onClick={() => setSelected(guide)}
            className="w-full rounded-2xl border border-border bg-surface p-3.5 text-left transition-colors hover:bg-surface-2"
          >
            <span className="text-[13.5px] font-black text-fg">{guide.title}</span>
          </button>
        ))}
        {query === '' && (
          <p className="pt-2 text-[11px] text-fg-muted">
            Showing all {EMERGENCY_GUIDES.length} guides. This page was cached the last time you had a connection —
            it works with no signal.
          </p>
        )}
      </div>
    </div>
  )
}
