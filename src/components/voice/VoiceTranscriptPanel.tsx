import { useEffect, useState } from 'react'
import { Check, Pencil, X } from 'lucide-react'
import type { VoiceTranscriptTurn } from '@/lib/voiceSession'

interface Props {
  history: VoiceTranscriptTurn[]
  pendingTranscript: string | null
  onConfirm: (text: string) => void
  onDismiss: () => void
}

/**
 * Shows the rolling conversation, plus — when a spoken turn has just been
 * captured — a Confirm/Edit/Dismiss step before it's sent to the AI. This is
 * the core safety net for a medical context: a mis-transcription (e.g. "no
 * allergies" heard as "known allergies") should never silently reach the
 * model.
 */
export function VoiceTranscriptPanel({ history, pendingTranscript, onConfirm, onDismiss }: Props) {
  const [draft, setDraft] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (pendingTranscript !== null) {
      setDraft(pendingTranscript)
      setEditing(false)
    }
  }, [pendingTranscript])

  return (
    <div className="glass-card flex w-full max-w-md flex-col gap-3 rounded-[22px] border border-white/20 bg-surface/80 p-4 backdrop-blur-xl">
      <div
        data-lenis-prevent
        className="flex max-h-52 flex-col gap-2 overflow-y-auto"
      >
        {history.length === 0 && pendingTranscript === null && (
          <p className="py-6 text-center text-[12px] text-fg-muted">
            Tap the orb and start speaking — G1 is listening.
          </p>
        )}
        {history.map((turn, i) => (
          <div key={i} className={turn.role === 'user' ? 'text-right' : 'text-left'}>
            <span
              className={
                turn.role === 'user'
                  ? 'inline-block rounded-2xl bg-ink px-3 py-1.5 text-[12.5px] text-paper'
                  : 'inline-block rounded-2xl border border-border bg-surface px-3 py-1.5 text-[12.5px] text-fg'
              }
            >
              {turn.text}
            </span>
          </div>
        ))}
      </div>

      {pendingTranscript !== null && (
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-3">
          <p className="mb-1.5 text-[10px] font-bold tracking-wide text-fg-muted uppercase">Live transcript</p>
          {editing ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full resize-none rounded-lg border border-border bg-surface p-2 text-[13px] text-fg focus:outline-none"
              rows={2}
              autoFocus
            />
          ) : (
            <p className="text-[13px] font-semibold text-fg">"{draft}"</p>
          )}
          <div className="mt-2.5 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                onConfirm(draft)
                setEditing(false)
              }}
              disabled={!draft.trim()}
              className="flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold text-accent-fg disabled:opacity-40"
            >
              <Check className="size-3" strokeWidth={2.5} />
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-bold text-fg"
            >
              <Pencil className="size-3" strokeWidth={2.5} />
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                onDismiss()
                setEditing(false)
              }}
              className="ml-auto flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold text-fg-muted hover:text-fg"
            >
              <X className="size-3" strokeWidth={2.5} />
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
