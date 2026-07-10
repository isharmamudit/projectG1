import { useEffect, useRef, useState } from 'react'
import { Download, Paperclip, RotateCcw, Send, X } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { VoiceOrb, type VoiceMode } from '@/components/voice/VoiceOrb'
import { VoiceTranscriptPanel } from '@/components/voice/VoiceTranscriptPanel'
import { compressImageFile } from '@/lib/image'
import {
  clearVoiceSession,
  downloadVoiceTranscript,
  loadVoiceSession,
  newVoiceSession,
  saveVoiceSession,
  INTAKE_FIELD_KEYS,
  type IntakeState,
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

interface PendingImage {
  dataUrl: string
  mimeType: string
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
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const intakeAnsweredCount = INTAKE_FIELD_KEYS.filter((k) => session.intake[k]).length

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

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const compressed = await compressImageFile(file)
      setPendingImage(compressed)
    } catch {
      // Nice-to-have attachment — not worth surfacing a failure for.
    }
  }

  async function sendTurn(text: string) {
    const image = pendingImage
    if (!text.trim() && !image) return
    setPendingTranscript(null)
    setPendingImage(null)

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
          intakeState: session.intake,
          image: image ? { dataUrl: image.dataUrl, mimeType: image.mimeType } : undefined,
        }),
      })
      if (!chatRes.ok) throw new Error('chat failed')
      const chatData: { reply?: string; intakeUpdates?: Partial<IntakeState>; intakeComplete?: boolean } =
        await chatRes.json()
      const reply = chatData.reply
      if (!reply) throw new Error('empty reply')

      const aiTurn = { role: 'ai' as const, text: reply, timestamp: Date.now() }
      // Only merge fields the model actually just learned — a null here means
      // "not mentioned this turn," not "clear the existing value."
      const newlyLearned = Object.fromEntries(
        Object.entries(chatData.intakeUpdates ?? {}).filter(([, v]) => v != null && v !== ''),
      )
      setSession((s) => ({
        ...s,
        transcript: [...s.transcript, aiTurn],
        intake: { ...s.intake, ...newlyLearned },
        intakeComplete: s.intakeComplete || Boolean(chatData.intakeComplete),
      }))
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
    setPendingImage(null)
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

        {!session.intakeComplete && (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${(intakeAnsweredCount / INTAKE_FIELD_KEYS.length) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-fg-muted">
              {intakeAnsweredCount} of {INTAKE_FIELD_KEYS.length} details
            </span>
          </div>
        )}

        <VoiceOrb mode={mode} onTap={handleOrbTap} />

        <p className="text-[12px] font-semibold text-fg-muted">
          {mode === 'idle' && 'Tap to talk to G1'}
          {mode === 'listening' && 'Listening… tap to stop'}
          {mode === 'reviewing' && 'Review what G1 heard'}
          {mode === 'thinking' && 'Thinking…'}
          {mode === 'speaking' && 'Speaking…'}
        </p>

        {error && <p className="text-[12px] font-semibold text-tint-rose">{error}</p>}

        {pendingImage && (
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-2 py-1.5">
            <img src={pendingImage.dataUrl} alt="Pending attachment" className="size-9 rounded-lg object-cover" />
            <span className="text-[11px] font-semibold text-fg-muted">Photo ready</span>
            <button
              type="button"
              onClick={() => sendTurn('')}
              aria-label="Send photo"
              className="flex size-7 items-center justify-center rounded-full bg-accent text-accent-fg"
            >
              <Send className="size-3.5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => setPendingImage(null)}
              aria-label="Remove attachment"
              className="flex size-7 items-center justify-center rounded-full text-fg-muted hover:text-fg"
            >
              <X className="size-3.5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        <VoiceTranscriptPanel
          history={session.transcript}
          pendingTranscript={pendingTranscript}
          onConfirm={sendTurn}
          onDismiss={handleDismiss}
        />

        <div className="flex items-center gap-2">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelected} className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-bold text-fg-muted transition-colors hover:text-fg"
          >
            <Paperclip className="size-3" strokeWidth={2.5} />
            Attach photo
          </button>
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
