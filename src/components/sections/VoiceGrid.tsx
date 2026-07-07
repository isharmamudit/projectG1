import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, FileText, Send, Loader2, ChevronRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { ClipReveal } from '@/components/ui/ClipReveal'

const QUESTIONS = [
  'Name & age?',
  'Height & weight?',
  "What's the main problem?",
  'Family history?',
  'Current medications?',
  'Since when — symptoms?',
  'Any allergies?',
  'Locality? (for medicine availability)',
  'Previous diagnoses?',
  'Preferred language for report?',
]

const TRANSCRIPT_LINES = [
  { role: 'ai', text: "Hello, I'm your G1 health assistant. Let's build your report together." },
  { role: 'user', text: 'My name is Rajesh Kumar, 43 years old.' },
  { role: 'ai', text: "Got it, Rajesh. What's your height and weight?" },
  { role: 'user', text: 'Around 5 foot 8, 74 kilos.' },
  { role: 'ai', text: "Thanks. Now tell me what's been bothering you." },
  { role: 'user', text: 'Chest pain since 3 days, gets worse at night.' },
]

const REPORT_FIELDS = [
  { label: 'Patient', value: 'Rajesh Kumar, M, 43' },
  { label: 'Chief Complaint', value: 'Chest pain × 3 days, nocturnal exacerbation' },
  { label: 'BMI', value: '24.8 — Normal' },
  { label: 'Risk Flag', value: '⚠ Cardiac screening recommended', accent: true },
  { label: 'Next Step', value: 'ECG + Lipid panel' },
]

/** 4-box grid showcasing the Voice AI doctor workflow */
export function VoiceGrid() {
  const [activeQ, setActiveQ] = useState(2)

  return (
    <section id="voice" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <ClipReveal>
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-fg-muted uppercase sm:text-sm">
            Feature 02 — Voice AI
          </p>
        </ClipReveal>
        <ClipReveal>
          <h2 className="mt-4 text-center font-display text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-tight text-fg uppercase">
            Talk to a doctor.
            <br />
            Get a report.
          </h2>
        </ClipReveal>
        <FadeIn delay={0.2} className="mx-auto mt-6 max-w-2xl text-center">
          <p className="text-base text-fg-muted sm:text-lg">
            Powered by Vapi AI · 11labs · OpenAI. A voice agent walks through 10 clinical
            questions, generates a structured report, and lets you send it directly to your doctor.
          </p>
        </FadeIn>

        {/* 4-box grid */}
        <div className="mt-14 grid gap-4 lg:grid-cols-2">

          {/* BOX 1 — AI Orb */}
          <FadeIn delay={0.1} y={30}>
            <div className="relative flex h-72 flex-col items-center justify-center overflow-hidden rounded-3xl bg-b-blue text-ink sm:h-80">
              {/* Animated concentric rings */}
              {[80, 120, 160, 200].map((size, i) => (
                <motion.div
                  key={size}
                  className="absolute rounded-full border border-ink/20"
                  style={{ width: size, height: size }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                />
              ))}
              {/* Core orb */}
              <motion.div
                className="relative z-10 flex size-16 items-center justify-center rounded-full bg-ink text-paper shadow-xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Mic className="size-7" strokeWidth={2} />
              </motion.div>
              <p className="relative z-10 mt-5 font-display text-xl font-black uppercase">AI is listening</p>
              <p className="relative z-10 mt-1 text-xs font-bold opacity-60">Vapi AI · 11labs · OpenAI</p>

              {/* Question progress */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold opacity-60">Question {activeQ + 1} / {QUESTIONS.length}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/20">
                  <motion.div
                    className="h-full bg-ink/70 rounded-full"
                    animate={{ width: `${((activeQ + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* BOX 2 — Live Transcript */}
          <FadeIn delay={0.15} y={30}>
            <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-surface border border-border-strong sm:h-80">
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <div className="size-2 animate-pulse rounded-full bg-b-green" />
                <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Live Transcript</span>
              </div>
              {/* Chat lines */}
              <div className="flex-1 overflow-hidden px-5 py-3 space-y-3">
                <AnimatePresence initial={false}>
                  {TRANSCRIPT_LINES.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.12 }}
                      className={`flex gap-2 ${line.role === 'ai' ? '' : 'flex-row-reverse'}`}
                    >
                      <div className={`size-5 shrink-0 rounded-full text-[9px] font-black flex items-center justify-center mt-0.5 ${line.role === 'ai' ? 'bg-accent text-accent-fg' : 'bg-b-yellow text-ink'}`}>
                        {line.role === 'ai' ? 'G1' : 'U'}
                      </div>
                      <p className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs font-medium leading-snug ${line.role === 'ai' ? 'bg-surface-2 text-fg-muted' : 'bg-b-yellow text-ink'}`}>
                        {line.text}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {/* Questions feed */}
              <div className="border-t border-border px-5 py-3">
                <p className="text-xs font-bold text-fg-muted mb-1.5">Sequential questions</p>
                <div className="flex gap-1.5 flex-wrap">
                  {QUESTIONS.slice(0, 5).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveQ(i)}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${i === activeQ ? 'bg-accent text-accent-fg' : 'bg-surface-2 text-fg-muted hover:bg-accent/20'}`}
                    >
                      Q{i + 1}
                    </button>
                  ))}
                  <span className="text-[10px] text-fg-subtle self-center">+5 more</span>
                </div>
                <p className="mt-1.5 text-xs text-fg-muted italic">"{QUESTIONS[activeQ]}"</p>
              </div>
            </div>
          </FadeIn>

          {/* BOX 3 — Report Generation */}
          <FadeIn delay={0.2} y={30}>
            <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-b-green text-ink sm:h-80">
              <div className="flex items-center gap-2 px-6 pt-6 pb-3">
                <FileText className="size-5" strokeWidth={2.5} />
                <span className="font-display text-sm uppercase font-black">Structured Report</span>
                <span className="ml-auto text-xs font-bold opacity-60">AI → LLM</span>
              </div>
              <div className="flex-1 px-6 space-y-2 overflow-hidden">
                {REPORT_FIELDS.map(({ label, value, accent }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                    className={`flex items-start justify-between border-b border-ink/20 pb-2 ${accent ? 'text-b-red' : ''}`}
                  >
                    <span className="text-xs font-bold opacity-70 shrink-0 mr-3">{label}</span>
                    <span className={`text-xs font-black text-right ${accent ? 'text-b-red font-black' : ''}`}>{value}</span>
                  </motion.div>
                ))}
              </div>
              <div className="px-6 pb-5 pt-3 flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin opacity-60" strokeWidth={2.5} />
                <span className="text-xs font-bold opacity-60">Gemini / OpenAI processing…</span>
              </div>
            </div>
          </FadeIn>

          {/* BOX 4 — Send to Doctor */}
          <FadeIn delay={0.25} y={30}>
            <div className="flex h-72 flex-col gap-3 rounded-3xl bg-b-purple p-6 text-ink sm:h-80">
              <div className="flex items-center gap-2">
                <Send className="size-5" strokeWidth={2.5} />
                <span className="font-display text-sm uppercase font-black">Send & Schedule</span>
              </div>
              <p className="text-xs font-medium opacity-70 leading-relaxed">
                Share the generated report with a doctor, or schedule a follow-up consultation directly.
              </p>

              {/* Action buttons */}
              <div className="mt-auto space-y-2.5">
                {[
                  { label: 'Send report to Dr. Mehta', sub: 'WhatsApp · Email · Portal', bg: 'bg-ink text-paper' },
                  { label: 'Schedule follow-up', sub: '3-day reminder set', bg: 'bg-ink/20 text-ink' },
                  { label: 'Save to health record', sub: 'Offline accessible', bg: 'bg-ink/20 text-ink' },
                ].map(({ label, sub, bg }) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all ${bg}`}
                  >
                    <div>
                      <p className="text-xs font-black">{label}</p>
                      <p className="text-[10px] opacity-60 mt-0.5">{sub}</p>
                    </div>
                    <ChevronRight className="size-4 shrink-0 opacity-60" strokeWidth={2.5} />
                  </motion.button>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
