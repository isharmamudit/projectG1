import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ProgressRingProps {
  /** 0–1 */
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
  /** Tailwind color class for the track */
  trackClass?: string
  /** Tailwind color class for the fill */
  fillClass?: string
  children?: React.ReactNode
}

/**
 * SVG progress ring with a smooth animated fill.
 * Uses CSS stroke-dashoffset transition rather than framer-motion so it
 * works correctly inside AnimatePresence without double-triggering.
 */
export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 7,
  className,
  trackClass = 'text-border',
  fillClass = 'text-accent',
  children,
}: ProgressRingProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress))
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - clampedProgress)

  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const el = circleRef.current
    if (!el) return
    el.style.strokeDashoffset = String(offset)
  }, [offset])

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(clampedProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          className={cn('stroke-current opacity-15', trackClass)}
        />
        {/* Fill */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn('stroke-current transition-all duration-700 ease-out', fillClass)}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
          }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      )}
    </div>
  )
}
