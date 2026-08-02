import { cn } from '@/lib/utils'
import { sehatT } from '@/lib/sehat/i18n'

export type TriageLevel = 'self_care' | 'see_doctor_soon' | 'see_doctor_today' | 'emergency'

interface TriageBandProps {
  level: TriageLevel | null
  lang: string
  /** True while a request is in flight — the band pulses instead of sitting dead. */
  pending?: boolean
}

/**
 * A hospital wristband, pinned to the top of the triage flow.
 *
 * It is the one element that is always on screen and always answers the only
 * question that matters: how urgent is this. Neutral while the conversation
 * is still gathering information, then resolving to a colour and a named
 * level in the user's own language.
 *
 * The red is --color-sehat-alert and appears here only at level "emergency".
 * Every other level uses an existing palette tint, so the red never becomes
 * ambient.
 */
const TONES: Record<TriageLevel, { bar: string; text: string; dot: string }> = {
  self_care: { bar: 'bg-tint-sage/15 border-tint-sage/35', text: 'text-tint-sage', dot: 'bg-tint-sage' },
  see_doctor_soon: { bar: 'bg-tint-amber/15 border-tint-amber/40', text: 'text-tint-amber', dot: 'bg-tint-amber' },
  see_doctor_today: { bar: 'bg-warm/15 border-warm/45', text: 'text-warm', dot: 'bg-warm' },
  emergency: { bar: 'bg-sehat-alert border-sehat-alert', text: 'text-white', dot: 'bg-white' },
}

const IDLE = { bar: 'bg-surface-2 border-border', text: 'text-fg-muted', dot: 'bg-fg-subtle' }

export function TriageBand({ level, lang, pending = false }: TriageBandProps) {
  const t = sehatT(lang)
  const tone = level ? TONES[level] : IDLE

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex shrink-0 items-center gap-3 border-b px-4 py-2.5 transition-colors duration-500',
        tone.bar,
      )}
    >
      {/* Clasp holes — the detail that makes it read as a wristband rather
          than a status bar. Purely decorative. */}
      <div className="flex shrink-0 items-center gap-1" aria-hidden>
        <span className={cn('size-1.5 rounded-full opacity-40', tone.dot)} />
        <span className={cn('size-1.5 rounded-full opacity-40', tone.dot)} />
        <span className={cn('size-1.5 rounded-full opacity-40', tone.dot)} />
      </div>

      <div className="min-w-0 flex-1">
        <p className={cn('text-[8.5px] font-black tracking-[0.22em] uppercase opacity-70', tone.text)}>
          {t.band.label}
        </p>
        <p className={cn('truncate font-display text-[15px] leading-tight font-black', tone.text)}>
          {level ? t.levels[level] : t.band.idle}
        </p>
      </div>

      {pending && (
        <span className={cn('size-2 shrink-0 animate-pulse rounded-full', tone.dot)} aria-hidden />
      )}

      {!level && !pending && (
        <span className="shrink-0 text-[10px] text-fg-subtle">{t.band.idleHint}</span>
      )}
    </div>
  )
}
