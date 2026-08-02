import { Phone, ShieldAlert, HeartHandshake, ChevronLeft } from 'lucide-react'
import type { RedFlagResult } from '@/lib/sehat/redflags'
import { sehatT } from '@/lib/sehat/i18n'

interface EmergencyScreenProps {
  flag: RedFlagResult
  lang: string
  onBack: () => void
}

/**
 * Terminal state. When this renders, the conversation is over — no further
 * questions, and no AI call was ever made for the message that triggered it.
 *
 * Two variants, because routing a suicidal message to an ambulance is the
 * wrong answer. The self-harm path shows Tele-MANAS (14416, India's national
 * mental health helpline) and drops the emergency-red styling for something
 * warmer; alarm is not what that moment needs.
 *
 * This is the only screen in SEHAT permitted to use --color-sehat-alert. If
 * that red shows up anywhere else, it stops meaning anything.
 */
export function EmergencyScreen({ flag, lang, onBack }: EmergencyScreenProps) {
  const t = sehatT(lang)
  const isSelfHarm = flag.variant === 'mental_health'
  const instruction = t.instructions[flag.category]

  const accent = isSelfHarm
    ? { band: 'bg-accent', text: 'text-accent-fg', ring: 'border-accent/30', wash: 'bg-accent-soft' }
    : { band: 'bg-sehat-alert', text: 'text-white', ring: 'border-sehat-alert/30', wash: 'bg-sehat-alert-soft' }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-paper">
      {/* The band. Full bleed, no rounding, no decoration — it should read as
          an alarm, not as a card. */}
      <div className={`${accent.band} px-5 py-6`}>
        <div className="mx-auto flex w-full max-w-xl items-start gap-3">
          {isSelfHarm ? (
            <HeartHandshake className={`mt-0.5 size-6 shrink-0 ${accent.text}`} strokeWidth={2.5} />
          ) : (
            <ShieldAlert className={`mt-0.5 size-6 shrink-0 ${accent.text}`} strokeWidth={2.5} />
          )}
          <h1 className={`font-display text-[22px] leading-tight font-black ${accent.text}`}>
            {isSelfHarm ? t.emergency.headingSelfHarm : t.emergency.heading}
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-xl flex-1 space-y-5 px-5 py-6">
        {/* ONE instruction. Never a list — a person in this state cannot
            triage a bulleted set of options. */}
        <div>
          <h2 className="mb-2 text-[11px] font-black tracking-wide text-fg-muted uppercase">
            {t.emergency.oneInstruction}
          </h2>
          <p className={`rounded-2xl border ${accent.ring} ${accent.wash} p-4 text-[17px] leading-relaxed font-bold text-fg`}>
            {instruction}
          </p>
        </div>

        <a
          href={isSelfHarm ? 'tel:14416' : 'tel:108'}
          className={`flex w-full items-center justify-center gap-3 rounded-2xl ${accent.band} px-5 py-5 text-[19px] font-black ${accent.text} shadow-[0_10px_28px_-10px_rgba(0,0,0,0.45)] transition-transform active:scale-[0.98]`}
        >
          <Phone className="size-5" strokeWidth={2.75} />
          {isSelfHarm ? t.emergency.callTeleManas : t.emergency.callAmbulance}
        </a>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <h2 className="mb-1 text-[11px] font-black tracking-wide text-fg-muted uppercase">
            {t.emergency.facilityLabel}
          </h2>
          <p className="text-[15px] font-bold text-fg">
            {isSelfHarm ? t.facilities.tele_manas : t.facilities.emergency}
          </p>
        </div>

        <p className="text-[13px] leading-relaxed text-fg-muted">
          {isSelfHarm ? t.emergency.stoppedSelfHarm : t.emergency.stopped}
        </p>

        {/* Stating this plainly is the point of the whole architecture: the
            user should know a fixed rule made this call, not a model. */}
        <div className="flex items-start gap-2 rounded-xl border border-border bg-surface-2 p-3">
          <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-fg-subtle" strokeWidth={2.5} />
          <p className="text-[11.5px] leading-relaxed text-fg-muted">
            {t.emergency.noAi}
            <span className="ml-1 font-mono text-[10.5px] text-fg-subtle">({flag.matched})</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 py-2 text-[13px] font-bold text-fg-muted transition-colors hover:text-fg"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} />
          {t.emergency.back}
        </button>
      </div>
    </div>
  )
}
