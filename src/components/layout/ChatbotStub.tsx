import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Globe2, HeartPulse, LogOut, MessageCircle, Mic, Paperclip, Send, Smile, ThumbsDown, ThumbsUp, X } from 'lucide-react'
import { COPY, LANGUAGES } from '@/lib/languages'
import { useLanguage } from '@/lib/language'
import { cn } from '@/lib/utils'
import { speechLocaleFor } from '@/lib/speechLocales'
import { compressImageFile } from '@/lib/image'
import { downloadDoctorReportPdf } from '@/lib/report'

interface ChatMessage {
  id: number
  role: 'user' | 'ai'
  text: string
  image?: string
}

interface PendingImage {
  dataUrl: string
  mimeType: string
}

// Minimal shape of the bits of the Web Speech API we actually use — the
// standard lib.dom types don't (yet) include SpeechRecognition everywhere,
// and it's only ever reached via the vendor-prefixed constructor anyway.
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

let nextId = 0

function Avatar({ size }: { size: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-surface"
      style={{ width: size, height: size }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-gradient-to-br from-tint-amber to-accent"
        style={{ width: size * 0.76, height: size * 0.76 }}
      >
        <HeartPulse className="text-paper" style={{ width: size * 0.44, height: size * 0.44 }} strokeWidth={2.4} />
      </div>
    </div>
  )
}

/**
 * The real chat widget: a floating trigger that expands into a glass panel.
 * First interaction is always a language pick (reuses the site-wide language
 * context, so choosing here also switches the whole page) — then a live
 * conversation backed by api/chat.ts.
 */
export function ChatbotStub() {
  const { code, setCode, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<'language' | 'chat'>('language')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [ratings, setRatings] = useState<Record<number, 'up' | 'down'>>({})
  const [isListening, setIsListening] = useState(false)
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping, showQuickReplies, pendingImage])

  // Stop any in-flight recognition session on unmount so it doesn't keep
  // listening after the widget (or the whole page) goes away.
  useEffect(() => {
    return () => recognitionRef.current?.stop()
  }, [])

  const speechLocale = speechLocaleFor(code)
  const speechSupported =
    Boolean(speechLocale) &&
    typeof window !== 'undefined' &&
    Boolean((window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition)

  function toggleListening() {
    if (!speechSupported || !speechLocale) return

    if (isListening) {
      recognitionRef.current?.stop()
      return
    }

    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike
      webkitSpeechRecognition?: new () => SpeechRecognitionLike
    }
    const RecognitionCtor = w.SpeechRecognition ?? w.webkitSpeechRecognition
    if (!RecognitionCtor) return

    const recognition = new RecognitionCtor()
    recognition.lang = speechLocale
    recognition.continuous = false
    recognition.interimResults = true

    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setInput(transcript)
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition
    setIsListening(true)
    recognition.start()
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const compressed = await compressImageFile(file)
      setPendingImage(compressed)
    } catch {
      // Silently ignore — this is a nice-to-have attachment, not critical path.
    }
  }

  function selectLanguage(langCode: string) {
    setCode(langCode)
    const copy = COPY[langCode] ?? COPY.en
    setMessages([{ id: nextId++, role: 'ai', text: copy.chatbot.greeting }])
    setRatings({})
    setShowQuickReplies(true)
    setPendingImage(null)
    setView('chat')
  }

  async function send(text?: string) {
    const value = (text ?? input).trim()
    const image = pendingImage
    if (!value && !image) return

    const historyForRequest = messages.map((m) => ({ role: m.role, text: m.text }))
    setMessages((prev) => [...prev, { id: nextId++, role: 'user', text: value, image: image?.dataUrl }])
    setInput('')
    setPendingImage(null)
    setShowQuickReplies(false)
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: value,
          history: historyForRequest,
          languageCode: code,
          image: image ? { dataUrl: image.dataUrl, mimeType: image.mimeType } : undefined,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data: { reply?: string } = await res.json()
      if (!data.reply) throw new Error('Empty reply')
      setMessages((prev) => [...prev, { id: nextId++, role: 'ai', text: data.reply as string }])
    } catch {
      setMessages((prev) => [...prev, { id: nextId++, role: 'ai', text: t.chatbot.errorFallback }])
    } finally {
      setIsTyping(false)
    }
  }

  function endChat() {
    const copy = COPY[code] ?? COPY.en
    setMessages([{ id: nextId++, role: 'ai', text: copy.chatbot.greeting }])
    setRatings({})
    setShowQuickReplies(true)
    setPendingImage(null)
    setInput('')
  }

  async function requestReport() {
    if (isGeneratingReport || messages.length === 0) return
    setShowQuickReplies(false)
    setIsGeneratingReport(true)
    try {
      const historyForRequest = messages.map((m) => ({ role: m.role, text: m.text }))
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: historyForRequest, languageCode: code }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data: { ready: boolean; followUp: string; report: import('@/lib/report').DoctorReport | null } =
        await res.json()

      if (!data.ready || !data.report) {
        setMessages((prev) => [...prev, { id: nextId++, role: 'ai', text: data.followUp || t.chatbot.errorFallback }])
        return
      }

      downloadDoctorReportPdf(data.report, currentLang.englishName)
      setMessages((prev) => [
        ...prev,
        { id: nextId++, role: 'ai', text: t.chatbot.reportReady ?? 'Your report is ready — check your downloads.' },
      ])
    } catch {
      setMessages((prev) => [...prev, { id: nextId++, role: 'ai', text: t.chatbot.errorFallback }])
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const currentLang = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0]

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={t.chatbot.title}
        aria-label={open ? 'Close chat' : t.chatbot.title}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-ink text-tint-amber shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] sm:right-8 sm:bottom-8 sm:size-16"
      >
        <span className="absolute inset-0 -z-10 animate-[bob_2.4s_ease-in-out_infinite] rounded-full bg-accent/40 blur-xl" aria-hidden />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="size-6 sm:size-7" strokeWidth={2.25} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="size-6 sm:size-7" strokeWidth={2.25} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed right-4 bottom-24 left-4 z-50 h-[min(600px,calc(100vh-140px))] max-w-[380px] sm:right-8 sm:left-auto sm:bottom-28 sm:w-[360px]"
          >
            {/* glass-card sets its own position: relative, which — combined
                on the same element as the Tailwind `fixed` utility above —
                loses the cascade fight and silently reverts to relative
                (same class of bug as the language-switcher dropdown). Keeping
                the glass styling on a nested div sidesteps it entirely. */}
            <div className="glass-card flex h-full w-full flex-col overflow-hidden rounded-[26px] border border-white/20 bg-surface/85 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
            {view === 'language' ? (
              <>
                <div className="relative bg-gradient-to-br from-accent via-accent/80 to-ink px-5 pt-7 pb-6 text-center">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute top-3.5 right-3.5 flex size-7 items-center justify-center rounded-full bg-white/15 text-paper transition-colors hover:bg-white/25"
                  >
                    <X className="size-3.5" strokeWidth={2.5} />
                  </button>
                  <div className="mx-auto mb-3 flex size-[68px] items-center justify-center rounded-full bg-paper shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)]">
                    <Avatar size={54} />
                  </div>
                  <p className="font-display text-[15px] font-black text-paper">{t.chatbot.title}</p>
                  <p className="mt-1 text-[11.5px] text-paper/75">{t.chatbot.pickLanguage}</p>
                </div>

                <div
                  data-lenis-prevent
                  className="grid flex-1 grid-cols-2 content-start gap-2 overflow-y-auto p-4"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => selectLanguage(lang.code)}
                      className={cn(
                        'flex flex-col items-start gap-0.5 rounded-2xl border px-3 py-2.5 text-left transition-colors',
                        lang.code === code
                          ? 'border-accent bg-accent/10'
                          : 'border-border bg-surface hover:bg-surface-2',
                      )}
                    >
                      <span className="text-[13px] font-black text-fg">{lang.nativeName}</span>
                      <span className="text-[10px] font-semibold text-fg-muted">{lang.englishName}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-border p-4 pt-3">
                  <button
                    type="button"
                    onClick={() => selectLanguage(code)}
                    className="w-full rounded-full bg-accent py-2.5 text-[13px] font-black text-accent-fg transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    {t.chatbot.continueIn} {currentLang.nativeName}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2.5 bg-gradient-to-br from-accent via-accent/85 to-ink px-4 py-3.5">
                  <Avatar size={36} />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[13px] font-black text-paper">{t.chatbot.title}</p>
                    <button
                      type="button"
                      onClick={() => setView('language')}
                      className="flex items-center gap-1 text-[10px] font-semibold text-paper/75 hover:text-paper"
                    >
                      <Globe2 className="size-2.5" strokeWidth={2.5} />
                      {currentLang.nativeName} · {t.chatbot.changeLanguage}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-paper transition-colors hover:bg-white/25"
                  >
                    <X className="size-3.5" strokeWidth={2.5} />
                  </button>
                </div>

                <div ref={listRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {messages.map((m, i) => {
                    const isLast = i === messages.length - 1
                    return (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {m.role === 'ai' ? (
                          <div className="flex max-w-[88%] items-start gap-2">
                            <Avatar size={22} />
                            <div>
                              <div className="glass-card rounded-tl-[4px] rounded-tr-2xl rounded-b-2xl border border-border bg-surface/80 px-3 py-2 text-[12.5px] leading-relaxed text-fg backdrop-blur-xl">
                                {m.text}
                              </div>
                              <div className="mt-1.5 flex items-center gap-1.5 pl-0.5">
                                <span className="text-[10px] text-fg-muted">{t.chatbot.helpfulQuestion}</span>
                                <button
                                  type="button"
                                  aria-label="Helpful"
                                  aria-pressed={ratings[m.id] === 'up'}
                                  onClick={() => setRatings((r) => ({ ...r, [m.id]: 'up' }))}
                                  className={cn(
                                    'flex size-5 items-center justify-center rounded-full border transition-colors',
                                    ratings[m.id] === 'up' ? 'border-tint-sage bg-tint-sage/25 text-fg' : 'border-border bg-surface text-fg-muted hover:text-fg',
                                  )}
                                >
                                  <ThumbsUp className="size-2.5" strokeWidth={2.25} />
                                </button>
                                <button
                                  type="button"
                                  aria-label="Not helpful"
                                  aria-pressed={ratings[m.id] === 'down'}
                                  onClick={() => setRatings((r) => ({ ...r, [m.id]: 'down' }))}
                                  className={cn(
                                    'flex size-5 items-center justify-center rounded-full border transition-colors',
                                    ratings[m.id] === 'down' ? 'border-tint-rose bg-tint-rose/25 text-fg' : 'border-border bg-surface text-fg-muted hover:text-fg',
                                  )}
                                >
                                  <ThumbsDown className="size-2.5" strokeWidth={2.25} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end">
                            <div className="max-w-[80%] space-y-1.5 rounded-tr-[4px] rounded-tl-2xl rounded-b-2xl bg-ink px-3 py-2 text-[12.5px] leading-relaxed text-paper">
                              {m.image && (
                                <img src={m.image} alt="Attachment" className="max-h-40 w-full rounded-xl object-cover" />
                              )}
                              {m.text && <p>{m.text}</p>}
                            </div>
                          </div>
                        )}

                        {isLast && showQuickReplies && m.role === 'ai' && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5 pl-8">
                            {t.chatbot.quickReplies.map((qr) => (
                              <button
                                key={qr}
                                type="button"
                                onClick={() => send(qr)}
                                className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[11px] font-bold text-fg transition-colors hover:bg-accent/20"
                              >
                                {qr}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )
                  })}

                  {isTyping && (
                    <div className="flex items-center gap-2">
                      <Avatar size={22} />
                      <div className="glass-card flex items-center gap-1 rounded-tl-[4px] rounded-tr-2xl rounded-b-2xl border border-border bg-surface/80 px-3.5 py-2.5 backdrop-blur-xl">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="size-1.5 animate-bounce rounded-full bg-fg-muted"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 border-t border-border bg-surface/60 px-3 py-2">
                  <button
                    type="button"
                    onClick={endChat}
                    className="flex items-center gap-1 rounded-full px-2 py-1 text-[10.5px] font-bold text-fg-muted transition-colors hover:text-fg"
                  >
                    <LogOut className="size-3" strokeWidth={2.25} />
                    {t.chatbot.endChat ?? 'End chat'}
                  </button>
                  <button
                    type="button"
                    onClick={requestReport}
                    disabled={isGeneratingReport || messages.length === 0}
                    className={cn(
                      'ml-auto flex items-center gap-1 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10.5px] font-bold text-fg transition-colors hover:bg-accent/20',
                      (isGeneratingReport || messages.length === 0) && 'cursor-not-allowed opacity-50',
                    )}
                  >
                    <FileText className="size-3" strokeWidth={2.25} />
                    {isGeneratingReport ? (t.chatbot.generatingReport ?? 'Preparing your report…') : (t.chatbot.getReport ?? 'Get doctor report')}
                  </button>
                </div>

                <div className="border-t border-border bg-surface/40 p-3">
                  {pendingImage && (
                    <div className="mb-2 flex items-center gap-2 rounded-xl border border-border bg-surface px-2 py-1.5">
                      <img src={pendingImage.dataUrl} alt="Pending attachment" className="size-9 rounded-lg object-cover" />
                      <span className="flex-1 text-[11px] font-semibold text-fg-muted">Photo ready to send</span>
                      <button
                        type="button"
                        onClick={() => setPendingImage(null)}
                        aria-label="Remove attachment"
                        className="flex size-6 shrink-0 items-center justify-center rounded-full text-fg-muted hover:text-fg"
                      >
                        <X className="size-3.5" strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-1 rounded-full border border-border bg-surface pr-1 pl-3.5">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') send()
                      }}
                      placeholder={isListening ? t.chatbot.listening : t.chatbot.placeholder}
                      className="min-w-0 flex-1 bg-transparent py-2.5 text-[12.5px] text-fg placeholder:text-fg-muted focus:outline-none"
                    />
                    <button type="button" title="Emoji (coming soon)" className="flex size-7 shrink-0 items-center justify-center rounded-full text-fg-muted hover:text-fg">
                      <Smile className="size-3.5" strokeWidth={2} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelected}
                      className="hidden"
                    />
                    <button
                      type="button"
                      title="Attach a photo"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex size-7 shrink-0 items-center justify-center rounded-full text-fg-muted hover:text-fg"
                    >
                      <Paperclip className="size-3.5" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      title={speechSupported ? 'Voice input' : 'Voice input not available for this language'}
                      disabled={!speechSupported}
                      onClick={toggleListening}
                      className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-full transition-colors',
                        !speechSupported && 'cursor-not-allowed opacity-40',
                        isListening ? 'bg-tint-rose/25 text-fg' : 'bg-fg/8 text-fg-muted hover:text-fg',
                      )}
                    >
                      <Mic className="size-3.5" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => send()}
                      aria-label="Send"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-transform hover:scale-105 active:scale-90"
                    >
                      <Send className="size-3.5" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </>
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
