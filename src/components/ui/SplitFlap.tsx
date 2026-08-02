import { useEffect, useRef, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const FLAP_CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const COL_DELAY = 40
const STEP_MS = 45
const FLIP_DURATION = 0.26

interface SplitFlapProps {
  words: string[]
  cols?: number
  intervalMs?: number
  className?: string
}

/**
 * Single-row split-flap board that cycles through a word list, pausing on
 * each for `intervalMs`. A scoped-down cousin of shadcn's TextFlippingBoard
 * (that one drives a 6x22 grid for freeform paragraphs) — here we only ever
 * need one short word at a time, so a ~10-cell single row keeps the same
 * mechanical-flip feel at a fraction of the DOM/animation cost.
 */
export function SplitFlap({ words, cols = 10, intervalMs = 2400, className }: SplitFlapProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs)
    return () => clearInterval(id)
  }, [words.length, intervalMs])

  const target = words[index].toUpperCase().padStart(Math.ceil((cols + words[index].length) / 2), ' ').padEnd(cols, ' ').slice(0, cols)

  return (
    <div className={cn('inline-grid gap-1', className)} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: cols }).map((_, i) => (
        <FlapCell key={i} target={target[i] ?? ' '} delay={i * COL_DELAY} />
      ))}
    </div>
  )
}

const FlapCell = memo(function FlapCell({ target, delay }: { target: string; delay: number }) {
  const [current, setCurrent] = useState(' ')
  const [prev, setPrev] = useState(' ')
  const [flipId, setFlipId] = useState(0)
  const curRef = useRef(' ')
  const targetRef = useRef<string | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    const normalized = FLAP_CHARS.includes(target) ? target : ' '
    if (normalized === targetRef.current) return
    targetRef.current = normalized
    if (normalized === ' ' && curRef.current === ' ') return

    const scrambleCount = 6 + Math.floor(Math.random() * 6)

    const runStep = (i: number) => {
      const isLast = i === scrambleCount
      const ch = isLast ? normalized : FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))]
      setPrev(curRef.current)
      curRef.current = ch
      setCurrent(ch)
      setFlipId((n) => n + 1)
      if (!isLast) {
        timers.current.push(setTimeout(() => runStep(i + 1), STEP_MS))
      }
    }

    timers.current.push(setTimeout(() => runStep(1), delay))
    return () => timers.current.forEach(clearTimeout)
  }, [target, delay])

  const show = current === ' ' ? ' ' : current
  const showPrev = prev === ' ' ? ' ' : prev

  return (
    <div className="relative aspect-[3/4] w-7 overflow-hidden rounded-[3px] border border-border-strong bg-surface-2 sm:w-9">
      <div className="relative size-full [perspective:240px] [transform-style:preserve-3d]">
        <div className="absolute inset-x-0 top-0 flex h-1/2 items-end justify-center overflow-hidden">
          <span className="translate-y-1/2 text-lg font-bold text-fg sm:text-xl">{show}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-start justify-center overflow-hidden">
          <span className="-translate-y-1/2 text-lg font-bold text-fg sm:text-xl">{show}</span>
        </div>

        {flipId > 0 && (
          <motion.div
            key={flipId}
            className="absolute inset-x-0 top-0 z-10 flex h-1/2 origin-bottom items-end justify-center overflow-hidden bg-surface-2 [backface-visibility:hidden]"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -100 }}
            transition={{ duration: FLIP_DURATION, ease: [0.55, 0.055, 0.675, 0.19] }}
          >
            <span className="translate-y-1/2 text-lg font-bold text-fg sm:text-xl">{showPrev}</span>
          </motion.div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-px bg-border-strong/70" />
      </div>
    </div>
  )
})
