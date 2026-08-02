import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ClipRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/** Clip-path wipe reveal from a center sliver to full width (SPYLT ClipPathTitle pattern). */
export function ClipReveal({ children, className, delay = 0 }: ClipRevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }}
      whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.83, 0, 0.17, 1] }}
    >
      {children}
    </motion.div>
  )
}
