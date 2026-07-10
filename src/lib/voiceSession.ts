export interface VoiceTranscriptTurn {
  role: 'user' | 'ai'
  text: string
  timestamp: number
}

export interface VoiceSession {
  sessionId: string
  languageCode: string
  startedAt: number
  transcript: VoiceTranscriptTurn[]
}

const STORAGE_KEY = 'projectg1-voice-session'

export function loadVoiceSession(): VoiceSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as VoiceSession
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
