import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

/** Animated number counter — starts when scrolled into view, eases out. */
export function CountUp({ to, suffix = '', prefix = '', duration = 1800, className }: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(to)
    }

    requestAnimationFrame(step)
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
