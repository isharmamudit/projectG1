import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PixelIcon, PIXEL } from '@/components/ui/PixelIcon'

const CARDS = [
  {
    n: '01',
    bg: 'bg-b-blue',
    spotBg: 'rgba(255,255,255,0.25)',
    title: 'Chatbot',
    sub: 'Multilingual · Gemini',
    body: 'Ask in Hindi, Bhojpuri, Tamil, Hinglish — G1 responds in your dialect. Powered by Gemini. Expands from bottom-right corner.',
    tag: 'NLP · Gemini',
    pixel: PIXEL.chat,
    pixelFill: 'var(--color-b-green)',
  },
  {
    n: '02',
    bg: 'bg-b-orange',
    spotBg: 'rgba(0,0,0,0.15)',
    title: 'Voice AI',
    sub: 'Vapi · 11labs · OpenAI',
    body: '10 sequential clinical questions, answered out loud. Your voice → transcript → structured doctor report.',
    tag: 'Voice · LLM',
    pixel: PIXEL.mic,
    pixelFill: 'var(--color-b-red)',
  },
  {
    n: '03',
    bg: 'bg-b-green',
    spotBg: 'rgba(0,0,0,0.15)',
    title: 'Image AI',
    sub: 'Classification Model',
    body: 'Photo a skin rash, burn, hair issue or upload heart scans and X-rays. G1 classifies and flags concerns instantly.',
    tag: 'CV · Classification',
    pixel: PIXEL.camera,
    pixelFill: 'var(--color-b-yellow)',
  },
  {
    n: '04',
    bg: 'bg-b-purple',
    spotBg: 'rgba(255,255,255,0.2)',
    title: 'Yoga AI',
    sub: 'YOLO Pose Estimator',
    body: '6–7 yoga poses trained. Real-time pose feedback via webcam with timer-based hold detection.',
    tag: 'YOLO · CV',
    pixel: PIXEL.heart,
    pixelFill: 'var(--color-b-red)',
  },
  {
    n: '05',
    bg: 'bg-b-yellow',
    spotBg: 'rgba(0,0,0,0.12)',
    title: 'Local RAG',
    sub: 'Ollama · On-device',
    body: 'Generated reports feed a local RAG system via Ollama. Query your health history without sending data to any cloud.',
    tag: 'Ollama · Privacy',
    pixel: PIXEL.bolt,
    pixelFill: 'var(--color-b-red)',
  },
  {
    n: '06',
    bg: 'bg-b-red',
    spotBg: 'rgba(255,255,255,0.2)',
    title: 'Memory',
    sub: 'Living health record',
    body: 'Every report, medicine, symptom and doctor visit — linked across time. Your history speaks for you at every consultation.',
    tag: 'Record · Timeline',
    pixel: PIXEL.heart,
    pixelFill: 'var(--color-b-yellow)',
  },
]

/** Units.-style horizontal scroll: vertical scroll drives translateX strip */
export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%'])

  return (
    <div ref={containerRef} className="relative" style={{ height: `${CARDS.length * 110}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Section label */}
        <div className="absolute top-8 left-4 sm:left-8 z-20 flex items-center gap-4">
          <p className="text-xs font-semibold tracking-[0.25em] text-fg-muted uppercase sm:text-sm">
            What G1 does
          </p>
          <span className="hidden sm:block h-px w-16 bg-border-strong" />
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex gap-4 pl-4 sm:pl-8 will-change-transform"
        >
          {CARDS.map(({ n, bg, title, sub, body, tag, pixel, pixelFill }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className={cn(
                'group relative flex-shrink-0 flex flex-col justify-between overflow-hidden rounded-3xl p-7 text-ink spotlight',
                'w-[84vw] sm:w-[430px] lg:w-[490px]',
                'h-[70vh] sm:h-[75vh] max-h-[640px]',
                bg,
              )}
              style={{ '--spotlight-color': 'rgba(255,255,255,0.25)' } as React.CSSProperties}
            >
              {/* Pixel icon */}
              <div className="absolute top-6 right-6 w-28 opacity-80">
                <PixelIcon pattern={pixel} fill={pixelFill} className="w-full text-ink/20" />
              </div>

              {/* Watermark number */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -bottom-4 font-display text-[9rem] leading-none font-black opacity-10 select-none"
              >
                {n}
              </span>

              {/* Top badge */}
              <div className="flex items-start">
                <span className="inline-flex items-center rounded-full border border-ink/30 px-3 py-1 text-[11px] font-black uppercase tracking-widest">
                  {tag}
                </span>
              </div>

              {/* Main content */}
              <div className="relative z-10">
                <p className="font-display text-[clamp(2.6rem,6.5vw,4rem)] leading-[0.9] tracking-tight uppercase">
                  {title}
                </p>
                <p className="mt-3 text-sm font-black opacity-70">{sub}</p>
                <p className="mt-5 max-w-[22rem] text-sm font-medium opacity-70 leading-relaxed">
                  {body}
                </p>
              </div>

              {/* Number tag */}
              <span className="self-end font-display text-xs font-black opacity-40 uppercase tracking-widest">
                Feature {n}
              </span>
            </motion.div>
          ))}

          {/* Closing card */}
          <div className={cn(
            'flex-shrink-0 flex flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed border-border-strong',
            'w-[55vw] sm:w-[300px]',
            'h-[70vh] sm:h-[75vh] max-h-[640px]',
            'p-8 text-center',
          )}>
            <p className="font-display text-2xl uppercase tracking-tight text-fg leading-tight">
              More<br />coming<br />soon.
            </p>
            <a
              href="#voice"
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-paper transition-transform hover:scale-105"
            >
              See Voice AI ↓
            </a>
          </div>
        </motion.div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-8 left-4 sm:left-8 flex items-center gap-3">
          <div className="h-px w-28 bg-border-strong relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <span className="text-xs font-medium text-fg-muted">Scroll to explore features</span>
        </div>
      </div>
    </div>
  )
}
