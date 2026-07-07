import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Slide {
  img: string
  alt: string
}

interface CoverflowStackProps {
  slides: Slide[]
  active: number
  className?: string
}

/**
 * A fanned "coverflow" stack: the active slide sits centered as a large
 * card, neighbors recede to either side with a scale/rotate/blur falloff
 * based on circular distance from active. Each card is sized well under
 * the container width so the neighbors have room to actually peek out
 * from behind the (opaque) active card, rather than being fully occluded
 * by it. Pure CSS transforms, no WebGL.
 */
export function CoverflowStack({ slides, active, className }: CoverflowStackProps) {
  const n = slides.length

  return (
    <div className={cn('relative h-full w-full bg-ink', className)} style={{ perspective: 1400 }}>
      {slides.map((slide, i) => {
        let raw = i - active
        if (raw > n / 2) raw -= n
        if (raw < -n / 2) raw += n
        const abs = Math.abs(raw)
        const hidden = abs > 2

        return (
          <motion.div
            key={slide.img}
            className="absolute top-1/2 left-1/2 h-[78%] w-[58%] overflow-hidden rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] sm:w-[46%]"
            style={{ zIndex: 10 - abs }}
            animate={{
              x: `calc(-50% + ${raw * 62}%)`,
              y: '-50%',
              scale: raw === 0 ? 1 : 0.86,
              rotateY: raw * -18,
              opacity: hidden ? 0 : 1,
              filter: raw === 0 ? 'brightness(1)' : 'brightness(0.88)',
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          >
            <img src={slide.img} alt={slide.alt} className="h-full w-full select-none object-cover" />
          </motion.div>
        )
      })}
    </div>
  )
}
