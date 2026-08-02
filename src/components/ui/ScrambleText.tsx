import { useEffect, useRef, useState, useCallback } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#@|ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface ScrambleTextProps {
  text: string
  className?: string
  /** 'hover' = scramble on mouse-enter | 'mount' = scramble once on mount */
  trigger?: 'hover' | 'mount'
  /** ms to complete the reveal */
  duration?: number
  /** how many scramble passes before revealing each char */
  scramblePasses?: number
}

/**
 * Scrambles through random characters before revealing the real text,
 * left-to-right. Classic "hacker terminal" decryption effect.
 */
export function ScrambleText({
  text,
  className,
  trigger = 'hover',
  duration = 900,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<number | null>(null)
  const running = useRef(false)

  const run = useCallback(() => {
    if (running.current) return
    running.current = true
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const revealedCount = Math.floor(progress * text.length)

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealedCount) return char
            // still scrambling
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(text)
        running.current = false
      }
    }

    frameRef.current = requestAnimationFrame(step)
  }, [text, duration])

  // Mount trigger
  useEffect(() => {
    if (trigger === 'mount') {
      const t = setTimeout(run, 300)
      return () => clearTimeout(t)
    }
  }, [trigger, run])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  if (trigger === 'hover') {
    return (
      <span className={className} onMouseEnter={run}>
        {display}
      </span>
    )
  }

  return <span className={className}>{display}</span>
}
