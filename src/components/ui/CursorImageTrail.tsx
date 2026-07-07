import { useRef, useState, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TrailImage {
  id: number
  url: string
  x: number
  y: number
  zIndex: number
  rotation: number
}

interface CursorImageTrailProps {
  images: string[]
  /** Threshold in pixels to spawn the next image */
  threshold?: number
  className?: string
  children: React.ReactNode
}

/**
 * CursorImageTrail: Spawns a floating polaroid-style image trail
 * at the mouse coordinates as the user moves their cursor over the container.
 */
export function CursorImageTrail({ images, threshold = 65, className, children }: CursorImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [trail, setTrail] = useState<TrailImage[]>([])
  const lastPosRef = useRef({ x: 0, y: 0 })
  const imageIndexRef = useRef(0)
  const zIndexRef = useRef(50)
  const counterRef = useRef(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate distance since last spawn
    const dx = x - lastPosRef.current.x
    const dy = y - lastPosRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > threshold) {
      lastPosRef.current = { x, y }

      // Get next image URL
      const url = images[imageIndexRef.current]
      imageIndexRef.current = (imageIndexRef.current + 1) % images.length

      // Increment layering
      zIndexRef.current += 1
      counterRef.current += 1
      const id = counterRef.current

      // Random rotation for Awwwards scattered look
      const rotation = Math.random() * 24 - 12

      const newImg: TrailImage = {
        id,
        url,
        x,
        y,
        zIndex: zIndexRef.current,
        rotation,
      }

      // Add new image, limit list size to prevent layout lag
      setTrail(prev => [...prev.slice(-6), newImg])

      // Auto fade-out cleanup
      setTimeout(() => {
        setTrail(prev => prev.filter(img => img.id !== id))
      }, 950)
    }
  }

  const handleMouseLeave = () => {
    // Fade out remaining trail when cursor leaves the card
    setTrail([])
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {/* Underlying card content */}
      {children}

      {/* Floating images trail */}
      <AnimatePresence>
        {trail.map(img => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.5, x: img.x - 70, y: img.y - 75 }}
            animate={{ opacity: 0.85, scale: 1, x: img.x - 70, y: img.y - 75 }}
            exit={{ opacity: 0, scale: 0.7, y: img.y - 50, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="pointer-events-none absolute size-36 overflow-hidden rounded-2xl border-4 border-paper bg-surface shadow-[0_12px_24px_-10px_rgba(0,0,0,0.4)]"
            style={{
              zIndex: img.zIndex,
              transformOrigin: 'center center',
              rotate: `${img.rotation}deg`,
            }}
          >
            <img
              src={img.url}
              alt="G1 context thumbnail"
              className="h-full w-full object-cover select-none"
              loading="lazy"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
