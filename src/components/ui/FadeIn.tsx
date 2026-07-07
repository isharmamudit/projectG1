import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  as?: ElementType
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}

const EASE = [0.25, 0.1, 0.25, 1] as const

export function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: FadeInProps) {
  const Comp = motion.create(as) as ElementType<HTMLMotionProps<'div'>>

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}
