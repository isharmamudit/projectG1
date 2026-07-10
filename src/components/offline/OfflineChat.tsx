import { useEffect, useRef, useState } from 'react'
import { Send, Wifi, WifiOff } from 'lucide-react'
import type { InitProgressReport, MLCEngineInterface } from '@mlc-ai/web-llm'
import { loadOfflineEngine, offlineWebGpuSupported, streamOfflineReply, type OfflineChatTurn } from '@/lib/offlineChat'

type LoadState = 'idle' | 'loading' | 'ready' | 'unsupported' | 'error'

/**
 * A genuinely on-device chatbot (WebLLM + WebGPU) for when there's no
 * network at all. Deliberately separate from the Groq-backed /voice and
 * ChatbotStub features — this is a much smaller, weaker model running
 * locally, so it's framed throughout as a lower-reliability fallback, not
 * a replacement. Real emergencies are still routed to the static,
 * hallucination-free Emergency Guide tab next to this one.
 */
export function OfflineChat() {
  const [loadState, setLoadState] = useState<LoadState>('idle')
  const [progress, setProgress] = useState<InitProgressReport | null>(null)
  const [messages, setMessages] = useState<OfflineChatTurn[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const engineRef = useRef<MLCEngineInterface | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!offlineWebGpuSupported()) setLoadState('unsupported')
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isStreaming])

  async function handleLoad() {
    setLoadState('loading')
    try {
      const engine = await loadOfflineEngine(setProgress)
      engineRef.current = engine
      setLoadState('ready')
      setMessages([
        {
          role: 'assistant',
          content:
            "I'm G1 Offline — a simpler, on-device version of G1 that works with no internet. I'm not as capable as the full assistant, so for anything serious, call 108/112 or check the Emergency Guide. What's going on?",
        },
      ])
    } catch {
      setLoadState('error')
    }
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || !engineRef.current || isStreaming) return
    setInput('')
    const nextMessages: OfflineChatTurn[] = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setIsStreaming(true)

    try {
      let acc = ''
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])
      for await (const delta of streamOfflineReply(engineRef.current, nextMessages)) {
        acc += delta
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: acc }
          return copy
        })
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Something went wrong running the offline model. Try again.' }])
    } finally {
      setIsStreaming(false)
    }
  }

  if (loadState === 'unsupported') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <WifiOff className="size-6 text-fg-muted" strokeWidth={2} />
        <p className="text-[13px] font-bold text-fg">On-device AI isn't supported in this browser</p>
        <p className="max-w-xs text-[12px] text-fg-muted">
          Try Chrome or Edge on a recent Android phone or desktop. For now, use the Guides tab instead.
        </p>
      </div>
    )
  }

  if (loadState === 'idle' || loadState === 'error' || loadState === 'loading') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <Wifi className="size-6 text-accent" strokeWidth={2} />
        <p className="text-[13px] font-bold text-fg">Download the offline AI (~900 MB)</p>
        <p className="max-w-xs text-[12px] text-fg-muted">
          Do this once while you have Wi-Fi or good signal. After that, this chat works with zero connection,
          anywhere.
        </p>
        {loadState === 'loading' && progress && (
          <div className="w-full max-w-xs">
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(progress.progress ?? 0) * 100}%` }} />
            </div>
            <p className="mt-1.5 text-[10.5px] text-fg-muted">{progress.text}</p>
          </div>
        )}
        {loadState === 'error' && <p className="text-[12px] font-bold text-tint-rose">Download failed. Check your connection and try again.</p>}
        <button
          type="button"
          onClick={handleLoad}
          disabled={loadState === 'loading'}
          className="rounded-full bg-accent px-4 py-2 text-[12.5px] font-black text-accent-fg disabled:opacity-50"
        >
          {loadState === 'loading' ? 'Downloading…' : 'Download & start'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div ref={listRef} data-lenis-prevent className="flex-1 space-y-2.5 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div
              className={
                m.role === 'user'
                  ? 'max-w-[85%] rounded-2xl bg-ink px-3 py-2 text-[12.5px] text-paper'
                  : 'max-w-[85%] rounded-2xl border border-border bg-surface px-3 py-2 text-[12.5px] text-fg'
              }
            >
              {m.content || '…'}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 border-t border-border p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message…"
          className="min-w-0 flex-1 rounded-full border border-border bg-surface px-3.5 py-2 text-[12.5px] text-fg placeholder:text-fg-muted focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
          aria-label="Send"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg disabled:opacity-40"
        >
          <Send className="size-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
