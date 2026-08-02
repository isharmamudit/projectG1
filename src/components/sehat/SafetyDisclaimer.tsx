import { Info } from 'lucide-react'
import { sehatT } from '@/lib/sehat/i18n'

/**
 * Rail #3. Deliberately a plain block in the document flow — not a modal, not
 * a toast, not a collapsible. There is no dismiss control and no state, so
 * there is nothing to accidentally hide it. Every AI-powered SEHAT screen
 * renders one.
 */
export function SafetyDisclaimer({ lang, className = '' }: { lang: string; className?: string }) {
  const t = sehatT(lang)
  return (
    <div className={`flex items-start gap-2 border-t border-border bg-surface-2 px-4 py-2.5 ${className}`}>
      <Info className="mt-0.5 size-3.5 shrink-0 text-fg-subtle" strokeWidth={2.5} />
      <p className="text-[11px] leading-relaxed text-fg-muted">{t.samvaad.disclaimer}</p>
    </div>
  )
}
