import { useEffect, useState } from 'react'

const COLORS = ['var(--color-b-blue)', 'var(--color-b-orange)', 'var(--color-b-red)', 'var(--color-b-green)', 'var(--color-b-purple)']

/**
 * Full-viewport splash wipe: two rows of five color panels slide away in a
 * staggered wave, then the overlay unmounts. Pure CSS keyframes (Creative
 * Studio splash pattern) — total cost is ~1.4s of transforms, and it is
 * skipped entirely under prefers-reduced-motion.
 */
export function Splash() {
  const [gone, setGone] = useState(false)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (reduced) {
      setGone(true)
      return
    }
    document.documentElement.style.overflow = 'hidden'
    const id = setTimeout(() => {
      setGone(true)
      document.documentElement.style.overflow = ''
    }, 1450)
    return () => {
      clearTimeout(id)
      document.documentElement.style.overflow = ''
    }
  }, [reduced])

  if (gone) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex flex-col" aria-hidden>
      {(['splash-up', 'splash-down'] as const).map((anim) => (
        <div key={anim} className="flex h-1/2 w-full">
          {COLORS.map((color, i) => (
            <div
              key={i}
              className="h-full w-1/5"
              style={{
                background: color,
                animation: `${anim} 0.9s cubic-bezier(0.96, -0.02, 0.38, 1.01) forwards`,
                animationDelay: `${0.35 + i * 0.06}s`,
              }}
            />
          ))}
        </div>
      ))}
      <span className="absolute inset-0 flex items-center justify-center font-display text-[clamp(2.5rem,8vw,6rem)] text-white [animation:splash-up_0.5s_ease_forwards] [animation-delay:0.45s]">
        projectG1.
      </span>
    </div>
  )
}
