import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightTiltProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  onClick?: () => void
}

/**
 * One pointer handler driving two effects: BentoTilt's perspective tilt
 * (Zentry) plus SpotlightCard's cursor-tracking radial highlight (React
 * Bits). Merged so a card doesn't pay for two mousemove listeners.
 */
export function SpotlightTilt({ children, className, spotlightColor = 'rgba(255,255,255,0.35)', onClick }: SpotlightTiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const relX = (e.clientX - left) / width
    const relY = (e.clientY - top) / height
    setTransform(
      `perspective(800px) rotateX(${(relY - 0.5) * 7}deg) rotateY(${(relX - 0.5) * -7}deg) scale3d(0.99, 0.99, 0.99)`,
    )
    el.style.setProperty('--mouse-x', `${e.clientX - left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - top}px`)
    el.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div
      ref={ref}
      style={{ transform }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTransform('')}
      onClick={onClick}
      className={cn('spotlight transition-transform duration-200 ease-out will-change-transform', className)}
    >
      {children}
    </div>
  )
}
