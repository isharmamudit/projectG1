import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const DESKTOP_POINTER_QUERY = '(any-hover: hover) and (any-pointer: fine)'
const SPRING = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }

/**
 * Physics-based custom cursor (magicui SmoothCursor pattern): a teal arrow
 * that trails the pointer on springs and rotates into the direction of
 * travel. Desktop fine-pointers only — touch devices and reduced-motion
 * users never mount it, and the native cursor is left alone for them.
 */
export function SmoothCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  const lastPos = useRef({ x: 0, y: 0 })
  const lastTime = useRef(Date.now())
  const prevAngle = useRef(0)
  const accRotation = useRef(0)

  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)
  const rotation = useSpring(0, { ...SPRING, damping: 60, stiffness: 300 })
  const scale = useSpring(1, { ...SPRING, stiffness: 500, damping: 35 })

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_POINTER_QUERY)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(mq.matches && !reduced.matches)
    update()
    mq.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      mq.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    let rafId = 0
    let scaleTimeout: ReturnType<typeof setTimeout> | null = null

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        setVisible(true)
        const now = Date.now()
        const dt = now - lastTime.current
        const vx = dt > 0 ? (e.clientX - lastPos.current.x) / dt : 0
        const vy = dt > 0 ? (e.clientY - lastPos.current.y) / dt : 0
        lastTime.current = now
        lastPos.current = { x: e.clientX, y: e.clientY }

        x.set(e.clientX)
        y.set(e.clientY)

        const speed = Math.hypot(vx, vy)
        if (speed > 0.1) {
          const angle = Math.atan2(vy, vx) * (180 / Math.PI) + 90
          let diff = angle - prevAngle.current
          if (diff > 180) diff -= 360
          if (diff < -180) diff += 360
          accRotation.current += diff
          rotation.set(accRotation.current)
          prevAngle.current = angle
          scale.set(0.92)
          if (scaleTimeout) clearTimeout(scaleTimeout)
          scaleTimeout = setTimeout(() => scale.set(1), 140)
        }
      })
    }

    document.body.style.cursor = 'none'
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.body.style.cursor = ''
      if (rafId) cancelAnimationFrame(rafId)
      if (scaleTimeout) clearTimeout(scaleTimeout)
    }
  }, [enabled, x, y, rotation, scale])

  if (!enabled) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        translateX: '-50%',
        translateY: '-50%',
        rotate: rotation,
        scale,
        zIndex: 110,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      initial={false}
      transition={{ duration: 0.15 }}
    >
      <svg width={26} height={28} viewBox="0 0 50 54" fill="none">
        <path
          d="M42.68 41.15 27.51 6.8c-.78-1.77-3.3-1.77-4.12 0L7.6 41.15c-.84 1.83.93 3.74 2.81 3.05l13.97-5.15a2.3 2.3 0 0 1 1.56 0l13.87 5.15c1.88.69 3.68-1.22 2.87-3.05Z"
          fill="var(--color-accent)"
          stroke="var(--color-bg)"
          strokeWidth={3}
        />
      </svg>
    </motion.div>
  )
}
