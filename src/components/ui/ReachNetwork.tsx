import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SIZE = 480
const CENTER = SIZE / 2

const CITIES = [
  {
    name: 'Delhi',
    angle: -Math.PI / 2,
    radius: 165,
    users: '2.1M+',
    lang: 'Hindi · Punjabi',
    stat: 'Most active region',
    color: '#1d6ff2',
  },
  {
    name: 'Mumbai',
    angle: -Math.PI / 2 + (Math.PI * 2) / 8,
    radius: 160,
    users: '1.8M+',
    lang: 'Marathi · Hindi',
    stat: 'Top chatbot usage',
    color: '#ff8a00',
  },
  {
    name: 'Bengaluru',
    angle: -Math.PI / 2 + (Math.PI * 2 * 2) / 8,
    radius: 165,
    users: '1.2M+',
    lang: 'Kannada · English',
    stat: 'Image AI leaders',
    color: '#12a150',
  },
  {
    name: 'Kolkata',
    angle: -Math.PI / 2 + (Math.PI * 2 * 3) / 8,
    radius: 158,
    users: '900K+',
    lang: 'Bengali · Hindi',
    stat: 'Voice AI growth',
    color: '#a06cf8',
  },
  {
    name: 'Chennai',
    angle: -Math.PI / 2 + (Math.PI * 2 * 4) / 8,
    radius: 162,
    users: '780K+',
    lang: 'Tamil · Telugu',
    stat: 'Yoga AI beta',
    color: '#e8452c',
  },
  {
    name: 'Hyderabad',
    angle: -Math.PI / 2 + (Math.PI * 2 * 5) / 8,
    radius: 160,
    users: '650K+',
    lang: 'Telugu · Urdu',
    stat: 'RAG local model',
    color: '#ffc21a',
  },
  {
    name: 'Pune',
    angle: -Math.PI / 2 + (Math.PI * 2 * 6) / 8,
    radius: 158,
    users: '540K+',
    lang: 'Marathi · Hindi',
    stat: 'Doctor reports',
    color: '#1d6ff2',
  },
  {
    name: 'Ahmedabad',
    angle: -Math.PI / 2 + (Math.PI * 2 * 7) / 8,
    radius: 162,
    users: '480K+',
    lang: 'Gujarati · Hindi',
    stat: 'Offline-first users',
    color: '#ff8a00',
  },
]

/** Animated data orb travelling from center to city */
function DataPulse({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.circle
      cx={CENTER}
      cy={CENTER}
      r={3.5}
      fill="var(--color-accent)"
      initial={{ cx: CENTER, cy: CENTER, opacity: 0, scale: 0 }}
      animate={{
        cx: [CENTER, x],
        cy: [CENTER, y],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.6,
        delay,
        repeat: Infinity,
        repeatDelay: 2.4,
        ease: 'easeInOut',
      }}
    />
  )
}

export function ReachNetwork() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Click outside to deselect
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (svgRef.current && !svgRef.current.contains(e.target as Node)) {
        setSelected(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const activeCity = CITIES.find(c => c.name === (selected ?? hovered))

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full max-w-[440px] cursor-default"
        aria-label="ProjectG1 city network"
      >
        {CITIES.map((city, i) => {
          const x = CENTER + city.radius * Math.cos(city.angle)
          const y = CENTER + city.radius * Math.sin(city.angle)
          const isActive = hovered === city.name || selected === city.name
          const isSelected = selected === city.name

          return (
            <g key={city.name}>
              {/* Connection line */}
              <motion.line
                x1={CENTER} y1={CENTER} x2={x} y2={y}
                stroke={isActive ? city.color : 'var(--color-border-strong)'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? '0' : '4 4'}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />

              {/* Data pulse orb along line */}
              <DataPulse x={x} y={y} delay={i * 0.35} />

              {/* City node */}
              <motion.g
                onMouseEnter={() => setHovered(city.name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(prev => prev === city.name ? null : city.name)}
                style={{ cursor: 'pointer' }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 280, damping: 18 }}
              >
                {/* Glow ring on hover */}
                <AnimatePresence>
                  {isActive && (
                    <motion.circle
                      cx={x} cy={y} r={14}
                      fill={city.color}
                      opacity={0.25}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>

                {/* Node dot */}
                <motion.circle
                  cx={x} cy={y}
                  r={isActive ? 8 : 5.5}
                  fill={isActive ? city.color : 'var(--color-accent)'}
                  stroke={isSelected ? 'white' : 'none'}
                  strokeWidth={isSelected ? 2 : 0}
                  style={{ transition: 'r 0.15s, fill 0.15s' }}
                />

                {/* City label */}
                <text
                  x={x}
                  y={y + (Math.sin(city.angle) >= -0.1 ? 22 : -14)}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isActive ? '700' : '500'}
                  fill={isActive ? 'var(--color-fg)' : 'var(--color-fg-muted)'}
                  style={{ transition: 'fill 0.15s, font-weight 0.15s', userSelect: 'none' }}
                >
                  {city.name}
                </text>
              </motion.g>
            </g>
          )
        })}

        {/* Central G1 hub */}
        <motion.circle
          cx={CENTER} cy={CENTER} r={36}
          fill="var(--color-accent)"
          opacity={0.15}
          animate={{ scale: [0.88, 1.12, 0.88] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={CENTER} cy={CENTER} r={26}
          fill="var(--color-accent)"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text
          x={CENTER} y={CENTER + 4}
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="var(--color-accent-fg)"
          style={{ userSelect: 'none', letterSpacing: '0.05em' }}
        >
          G1
        </text>
      </svg>

      {/* City info tooltip card */}
      <AnimatePresence mode="wait">
        {activeCity && (
          <motion.div
            key={activeCity.name}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none mt-4 mx-auto max-w-[260px] rounded-2xl border border-border-strong bg-surface px-5 py-4 shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-base font-black uppercase text-fg">
                {activeCity.name}
              </p>
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase text-ink"
                style={{ background: activeCity.color }}
              >
                {activeCity.users}
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-fg-muted">{activeCity.lang}</p>
            <p className="mt-1 text-xs font-bold text-accent">{activeCity.stat}</p>
            {selected === activeCity.name && (
              <p className="mt-2 text-[10px] text-fg-subtle">Click again to deselect</p>
            )}
          </motion.div>
        )}
        {!activeCity && (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-xs text-fg-subtle"
          >
            Hover or tap a city to explore coverage
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
