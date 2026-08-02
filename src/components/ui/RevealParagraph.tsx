import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RevealParagraphProps {
  text: string
  className?: string
}

/**
 * Word-by-word scroll-linked opacity reveal. Each word's opacity is driven
 * directly off scroll progress via a MotionValue transform, so it updates
 * without triggering React re-renders per frame. Word-level (not
 * char-level) keeps the DOM node count and live scroll subscriptions low
 * for a single paragraph, and avoids a browser wrapping bug where
 * `text-wrap: balance` breaks line-wrapping when the text is split into
 * many individual inline elements.
 */
export function RevealParagraph({ text, className }: RevealParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={cn(className)}>
      {words.map((w, i) => (
        <Word key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  )
}

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  return <motion.span style={{ opacity }}>{word}{index < total - 1 ? ' ' : ''}</motion.span>
}
