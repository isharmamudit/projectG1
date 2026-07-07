import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

/**
 * Performant scroll-driven vertical parallax wrapper.
 * Shifts its children by [-offset, offset] pixels as it passes through the viewport.
 */
export function Parallax({ children, offset = 40, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Interpolate y offset based on scroll progress through viewport
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
