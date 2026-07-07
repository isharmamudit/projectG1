import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTitleProps {
  lines: string[]
  className?: string
  wordClassName?: string
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
}

const word = {
  hidden: { opacity: 0, y: 40, rotateX: 40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

/** Word-by-word reveal on scroll into view (Zentry AnimatedTitle pattern, ported to Framer Motion). */
export function AnimatedTitle({ lines, className, wordClassName }: AnimatedTitleProps) {
  return (
    <motion.div
      className={cn('perspective-[1000px]', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      variants={container}
    >
      {lines.map((line, i) => (
        <div key={i} className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {line.split(' ').map((w, j) => (
            <motion.span
              key={j}
              variants={word}
              className={cn('inline-block will-change-transform', wordClassName)}
            >
              {w}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  )
}
