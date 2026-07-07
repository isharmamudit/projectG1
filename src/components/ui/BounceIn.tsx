import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BounceInProps {
  children: ReactNode
  index?: number
  className?: string
}

/** Elastic scale-in on scroll into view (BounceCards pattern, ported to a Framer Motion spring). */
export function BounceIn({ children, index = 0, className }: BounceInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.08 }}
    >
      {children}
    </motion.div>
  )
}
