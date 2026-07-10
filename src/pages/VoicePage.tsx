import { useEffect, useRef, useState } from 'react'
import { Download, RotateCcw } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { VoiceOrb, type VoiceMode } from '@/components/voice/VoiceOrb'
import { VoiceTranscriptPanel } from '@/components/voice/VoiceTranscriptPanel'
import {
  clearVoiceSession,
  downloadVoiceTranscript,
  loadVoiceSession,
  newVoiceSession,
  saveVoiceSession,
  type VoiceSession,
} from '@/lib/voiceSession'

// Minimal shape of the Web Speech API bits actually used — mirrors the same
// hand-typed interface in ChatbotStub.tsx, since lib.dom doesn't include
// SpeechRecognition and it's only ever reached via the vendor-prefixed ctor.
interface SpeechRecognitionLike extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start(): void
  stop(): void
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
}

// Phase 1 scope: English, Hindi, and Hinglish only (full 13-language matrix
// lands in the Phase 3 UI-polish pass).
const VOICE_LANGUAGES = [
  { code: 'en', label: 'English', speechLocale: 'en-IN' },
  { code: 'hi', label: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'hi-en', label: 'Hinglish', speechLocale: 'hi-IN' },
]

export function VoicePage() {
  const [session, setSession] = useState<VoiceSession>(() => loadVoiceSession() ?? newVoiceSession('en'))
  const [mode, setMode] = useState<VoiceMode>('idle')
  const [pendingTranscript, setPendingTranscript] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    saveVoiceSession(session)
  }, [session])

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
      audioRef.current?.pause()
    }
  }, [])

  const activeLanguage = VOICE_LANGUAGES.find((l) => l.code === session.languageCode) ?? VOICE_LANGUAGES[0]

  const speechSupported =
    typeof window !== 'undefined' &&
    Boolean(
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition,
    )

  function startListening() {
    if (!speechSupported) {
      setError('Voice input is not supported in this browser. Try Chrome.')
      return
    }
    setError(null)
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike
      webkitSpeechRecognition?: new () => SpeechRecognitionLike
    }
    const RecognitionCtor = w.SpeechRecognition ?? w.webkitSpeechRecognition
    if (!RecognitionCtor) return

    const recognition = new RecognitionCtor()
    recognition.lang = activeLanguage.speechLocale
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setPendingTranscript(transcript.trim())
      setMode('reviewing')
    }
    recognition.onend = () => {
      setMode((m) => (m === 'listening' ? 'idle' : m))
    }
    recognition.onerror = () => {
      setError("Didn't catch that — tap the orb to try again.")
      setMode('idle')
    }

    recognitionRef.current = recognition
    setMode('listening')
    recognition.start()
  }

  function handleOrbTap() {
    if (mode === 'idle') {
      startListening()
    } else if (mode === 'listening') {
      recognitionRef.current?.stop()
    }
  }

  function handleDismiss() {
    setPendingTranscript(null)
    setMode('idle')
  }

  async function handleConfirm(text: string) {
    if (!text.trim()) return
    setPendingTranscript(null)

    const userTurn = { role: 'user' as const, text, timestamp: Date.now() }
    const historyForRequest = session.transcript.map((t) => ({ role: t.role, text: t.text }))
    setSession((s) => ({ ...s, transcript: [...s.transcript, userTurn] }))
    setMode('thinking')
    setError(null)

    try {
      const chatRes = await fetch('/api/voice-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyForRequest,
          languageCode: session.languageCode,
        }),
      })
      if (!chatRes.ok) throw new Error('chat failed')
      const chatData: { reply?: string } = await chatRes.json()
      const reply = chatData.reply
      if (!reply) throw new Error('empty reply')

      const aiTurn = { role: 'ai' as const, text: reply, timestamp: Date.now() }
      setSession((s) => ({ ...s, transcript: [...s.transcript, aiTurn] }))
      setMode('speaking')

      const ttsRes = await fetch('/api/voice-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reply }),
      })
      if (!ttsRes.ok) throw new Error('tts failed')
      const audioBlob = await ttsRes.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      audio.onended = () => {
        setMode('idle')
        URL.revokeObjectURL(audioUrl)
      }
      audio.onerror = () => {
        setMode('idle')
        URL.revokeObjectURL(audioUrl)
      }
      await audio.play()
    } catch {
      setError('Something went wrong. Please try again.')
      setMode('idle')
    }
  }

  function handleNewConversation() {
    clearVoiceSession()
    setSession(newVoiceSession(session.languageCode))
    setPendingTranscript(null)
    setMode('idle')
    setError(null)
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-gradient-to-b from-surface to-surface-2">
      <Navbar />

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 pt-24 pb-8">
        <div className="flex items-center gap-2">
          {VOICE_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setSession((s) => ({ ...s, languageCode: lang.code }))}
              className={`rounded-full border px-3 py-1 text-[11px] font-bold transition-colors ${
                lang.code === session.languageCode
                  ? 'border-accent bg-accent/10 text-fg'
                  : 'border-border bg-surface text-fg-muted hover:text-fg'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <VoiceOrb mode={mode} onTap={handleOrbTap} />

        <p className="text-[12px] font-semibold text-fg-muted">
          {mode === 'idle' && 'Tap to talk to G1'}
          {mode === 'listening' && 'Listening… tap to stop'}
          {mode === 'reviewing' && 'Review what G1 heard'}
          {mode === 'thinking' && 'Thinking…'}
          {mode === 'speaking' && 'Speaking…'}
        </p>

        {error && <p className="text-[12px] font-semibold text-tint-rose">{error}</p>}

        <VoiceTranscriptPanel
          history={session.transcript}
          pendingTranscript={pendingTranscript}
          onConfirm={handleConfirm}
          onDismiss={handleDismiss}
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => downloadVoiceTranscript(session)}
            disabled={session.transcript.length === 0}
            className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-bold text-fg-muted transition-colors hover:text-fg disabled:opacity-40"
          >
            <Download className="size-3" strokeWidth={2.5} />
            Save transcript
          </button>
          <button
            type="button"
            onClick={handleNewConversation}
            className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-bold text-fg-muted transition-colors hover:text-fg"
          >
            <RotateCcw className="size-3" strokeWidth={2.5} />
            Start new conversation
          </button>
        </div>
      </div>
    </div>
  )
}
