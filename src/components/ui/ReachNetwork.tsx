import { motion } from 'framer-motion'

const CITIES = ['Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad']

const SIZE = 400
const CENTER = SIZE / 2
const RADIUS = 148

/**
 * City nodes wired to a central "G1" hub — a dependency-free SVG
 * stand-in for a literal map. Chosen over a WebGL globe (e.g. cobe) because
 * WebGL support is genuinely inconsistent on the low-end Android devices
 * this product targets; this renders identically everywhere.
 */
export function ReachNetwork() {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto w-full max-w-[380px]" aria-hidden>
      {CITIES.map((city, i) => {
        const angle = (i / CITIES.length) * Math.PI * 2 - Math.PI / 2
        const x = CENTER + RADIUS * Math.cos(angle)
        const y = CENTER + RADIUS * Math.sin(angle)
        const labelY = y + (Math.sin(angle) >= 0 ? 20 : -14)

        return (
          <g key={city}>
            <motion.line
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="var(--color-border-strong)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r={5.5}
              fill="var(--color-accent)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ delay: 0.25 + i * 0.06, type: 'spring', stiffness: 260, damping: 18 }}
            />
            <text
              x={x}
              y={labelY}
              textAnchor="middle"
              fontSize="12"
              fontWeight={500}
              fill="var(--color-fg-muted)"
            >
              {city}
            </text>
          </g>
        )
      })}

      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={30}
        fill="var(--color-accent)"
        opacity={0.18}
        initial={{ scale: 0.85 }}
        animate={{ scale: [0.85, 1.15, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx={CENTER} cy={CENTER} r={22} fill="var(--color-accent)" />
      <text x={CENTER} y={CENTER + 4} textAnchor="middle" fontSize="11" fontWeight={700} fill="var(--color-accent-fg)">
        G1
      </text>
    </svg>
  )
}
