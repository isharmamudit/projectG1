import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BentoTiltProps {
  children: ReactNode
  className?: string
}

/** Pointer-driven tilt (Zentry BentoTilt pattern) — pure transform math, no dependency. */
export function BentoTilt({ children, className }: BentoTiltProps) {
  const [transform, setTransform] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const relativeX = (e.clientX - left) / width
    const relativeY = (e.clientY - top) / height
    const tiltX = (relativeY - 0.5) * 10
    const tiltY = (relativeX - 0.5) * -10
    setTransform(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`)
  }

  const handleMouseLeave = () => setTransform('')

  return (
    <div
      ref={ref}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('transition-transform duration-200 ease-out will-change-transform', className)}
    >
      {children}
    </div>
  )
}
