import { useState, useEffect, type ReactNode } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'

/** Wires up global Lenis smooth scroll, skipped entirely under prefers-reduced-motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (!enabled) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.1, smoothWheel: true }}
      ref={(instance: LenisRef | null) => {
        if (import.meta.env.DEV) (window as unknown as { __lenis?: unknown }).__lenis = instance?.lenis
      }}
    >
      {children}
    </ReactLenis>
  )
}
