export interface VoiceTranscriptTurn {
  role: 'user' | 'ai'
  text: string
  timestamp: number
}

/** Keys and order must match api/voice-chat.ts's INTAKE_FIELDS. */
export const INTAKE_FIELD_KEYS = [
  'chiefComplaint',
  'symptomDuration',
  'age',
  'sex',
  'name',
  'height',
  'weight',
  'familyHistory',
  'currentMedications',
  'localMedicines',
] as const

export type IntakeFieldKey = (typeof INTAKE_FIELD_KEYS)[number]
export type IntakeState = Record<IntakeFieldKey, string | null>

export function emptyIntakeState(): IntakeState {
  return Object.fromEntries(INTAKE_FIELD_KEYS.map((k) => [k, null])) as IntakeState
}

export interface VoiceSession {
  sessionId: string
  languageCode: string
  startedAt: number
  transcript: VoiceTranscriptTurn[]
  intake: IntakeState
  intakeComplete: boolean
}

const STORAGE_KEY = 'projectg1-voice-session'

export function loadVoiceSession(): VoiceSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<VoiceSession>
    if (!parsed.sessionId || !Array.isArray(parsed.transcript)) return null
    // Sessions saved before intake tracking existed won't have these fields.
    return {
      ...parsed,
      intake: parsed.intake ?? emptyIntakeState(),
      intakeComplete: parsed.intakeComplete ?? false,
    } as VoiceSession
  } catch {
    return null
  }
}

export function saveVoiceSession(session: VoiceSession) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Storage full or unavailable — the conversation still works in-memory,
    // it just won't survive a reload. Not worth surfacing to the user.
  }
}

export function clearVoiceSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

export function newVoiceSession(languageCode: string): VoiceSession {
  return {
    sessionId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    languageCode,
    startedAt: Date.now(),
    transcript: [],
    intake: emptyIntakeState(),
    intakeComplete: false,
  }
}

/** Triggers a browser download of the transcript as plain text. */
export function downloadVoiceTranscript(session: VoiceSession) {
  const lines = session.transcript.map((turn) => {
    const who = turn.role === 'ai' ? 'G1' : 'You'
    const time = new Date(turn.timestamp).toLocaleTimeString('en-IN')
    return `[${time}] ${who}: ${turn.text}`
  })
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `g1-voice-transcript-${session.sessionId}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
