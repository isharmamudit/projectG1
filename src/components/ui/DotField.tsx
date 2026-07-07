import { useEffect, useRef, memo } from 'react'
import './DotField.css'

const TWO_PI = Math.PI * 2

interface DotFieldProps {
  dotRadius?: number
  dotSpacing?: number
  cursorRadius?: number
  bulgeStrength?: number
  glowRadius?: number
  gradientFrom?: string
  gradientTo?: string
  glowColor?: string
}

/**
 * Canvas 2D dot grid that bulges away from the cursor, with a soft SVG glow.
 * Ported from React Bits' DotField. Pauses its rAF loop when off-screen and
 * skips the interactive bulge under prefers-reduced-motion, so it stays cheap
 * on low-end devices even though it's always mounted in the hero.
 */
const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 22,
  cursorRadius = 260,
  bulgeStrength = 40,
  glowRadius = 220,
  gradientFrom = 'rgba(13, 115, 119, 0.28)',
  gradientTo = 'rgba(13, 115, 119, 0.08)',
  glowColor = '#0d7377',
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const dotsRef = useRef<{ ax: number; ay: number; sx: number; sy: number }[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 })
  const rafRef = useRef<number | null>(null)
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 })
  const glowOpacity = useRef(0)
  const engagement = useRef(0)
  const inViewRef = useRef(true)
  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`)

  useEffect(() => {
    const canvas = canvasRef.current
    const glowEl = glowRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let resizeTimer: ReturnType<typeof setTimeout>

    function resize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(doResize, 100)
    }

    function doResize() {
      if (!canvas) return
      const rect = canvas.parentElement!.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      sizeRef.current = { w, h, offsetX: rect.left + window.scrollX, offsetY: rect.top + window.scrollY }
      buildDots(w, h)
    }

    function buildDots(w: number, h: number) {
      const step = dotRadius + dotSpacing
      const cols = Math.floor(w / step)
      const rows = Math.floor(h / step)
      const padX = (w % step) / 2
      const padY = (h % step) / 2
      const dots = new Array(rows * cols)
      let idx = 0
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2
          const ay = padY + row * step + step / 2
          dots[idx++] = { ax, ay, sx: ax, sy: ay }
        }
      }
      dotsRef.current = dots
    }

    function onMouseMove(e: MouseEvent) {
      const s = sizeRef.current
      mouseRef.current.x = e.pageX - s.offsetX
      mouseRef.current.y = e.pageY - s.offsetY
    }

    const speedInterval = setInterval(() => {
      const m = mouseRef.current
      const dx = m.prevX - m.x
      const dy = m.prevY - m.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      m.speed += (dist - m.speed) * 0.5
      if (m.speed < 0.001) m.speed = 0
      m.prevX = m.x
      m.prevY = m.y
    }, 20)

    function tick() {
      const dots = dotsRef.current
      const m = mouseRef.current
      const { w, h } = sizeRef.current
      const len = dots.length

      const targetEngagement = Math.min(m.speed / 5, 1)
      engagement.current += (targetEngagement - engagement.current) * 0.06
      if (engagement.current < 0.001) engagement.current = 0
      const eng = engagement.current

      glowOpacity.current += (eng - glowOpacity.current) * 0.08
      if (glowEl) {
        glowEl.setAttribute('cx', String(m.x))
        glowEl.setAttribute('cy', String(m.y))
        glowEl.style.opacity = String(glowOpacity.current)
      }

      ctx!.clearRect(0, 0, w, h)
      const grad = ctx!.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, gradientFrom)
      grad.addColorStop(1, gradientTo)
      ctx!.fillStyle = grad

      const crSq = cursorRadius * cursorRadius
      const rad = dotRadius / 2

      ctx!.beginPath()
      for (let i = 0; i < len; i++) {
        const d = dots[i]
        const dx = m.x - d.ax
        const dy = m.y - d.ay
        const distSq = dx * dx + dy * dy

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq)
          const t = 1 - dist / cursorRadius
          const push = t * t * bulgeStrength * eng
          const angle = Math.atan2(dy, dx)
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15
        } else {
          d.sx += (d.ax - d.sx) * 0.1
          d.sy += (d.ay - d.sy) * 0.1
        }

        ctx!.moveTo(d.sx + rad, d.sy)
        ctx!.arc(d.sx, d.sy, rad, 0, TWO_PI)
      }
      ctx!.fill()

      if (inViewRef.current) rafRef.current = requestAnimationFrame(tick)
    }

    doResize()
    window.addEventListener('resize', resize)

    let observer: IntersectionObserver | undefined
    if (!reduceMotion) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      observer = new IntersectionObserver(
        ([entry]) => {
          inViewRef.current = entry.isIntersecting
          if (entry.isIntersecting && rafRef.current === null) {
            rafRef.current = requestAnimationFrame(tick)
          }
        },
        { threshold: 0 },
      )
      observer.observe(canvas)
      rafRef.current = requestAnimationFrame(tick)
    } else {
      // Static render only: draw once, skip the animation loop entirely.
      tick()
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      clearInterval(speedInterval)
      clearTimeout(resizeTimer)
      observer?.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="dot-field-container">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <svg className="pointer-events-none absolute inset-0 size-full">
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} stopOpacity={0.35} />
            <stop offset="100%" stopColor={glowColor} stopOpacity={0} />
          </radialGradient>
        </defs>
        <circle ref={glowRef} cx={-9999} cy={-9999} r={glowRadius} fill={`url(#${glowIdRef.current})`} style={{ opacity: 0 }} />
      </svg>
    </div>
  )
})

export default DotField
