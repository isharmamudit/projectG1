import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── city data (8 cities, arranged around the 3×3 grid) ─── */
const CITIES = [
  { name: 'Delhi',     lang: 'Hindi · Punjabi',    users: '2.1M+', feature: 'Chat in 20+ dialects',    color: '#1d6ff2', txt: '#fff',     col: 0, row: 0 },
  { name: 'Mumbai',    lang: 'Marathi · Hindi',     users: '1.8M+', feature: 'Doctor reports daily',    color: '#ff8a00', txt: '#1a1a1a',  col: 1, row: 0 },
  { name: 'Bengaluru', lang: 'Kannada · English',   users: '1.2M+', feature: 'Image scan active',       color: '#12a150', txt: '#fff',     col: 2, row: 0 },
  { name: 'Chennai',   lang: 'Tamil · Telugu',      users: '780K+', feature: 'Yoga coaching live',      color: '#e8452c', txt: '#fff',     col: 0, row: 1 },
  // G1 hub → col:1 row:1 (center)
  { name: 'Kolkata',   lang: 'Bengali · Hindi',     users: '900K+', feature: 'Voice consults growing',  color: '#a06cf8', txt: '#fff',     col: 2, row: 1 },
  { name: 'Hyderabad', lang: 'Telugu · Urdu',       users: '650K+', feature: 'Offline records used',    color: '#ffc21a', txt: '#1a1a1a',  col: 0, row: 2 },
  { name: 'Pune',      lang: 'Marathi · Hindi',     users: '540K+', feature: 'Reports sent to doctors', color: '#1d6ff2', txt: '#fff',     col: 1, row: 2 },
  { name: 'Ahmedabad', lang: 'Gujarati · Hindi',    users: '480K+', feature: 'Works on 2G',             color: '#ff8a00', txt: '#1a1a1a',  col: 2, row: 2 },
]

/**
 * SVG viewBox "0 0 300 300" with uniform 3×3 cells of size 100×100.
 * Centre of cell (col, row) = (col*100 + 50, row*100 + 50)
 * G1 hub centre = (150, 150)
 */
function cellCentre(col: number, row: number) {
  return { x: col * 100 + 50, y: row * 100 + 50 }
}

const G1 = { x: 150, y: 150 } // centre cell

/** Animated dot that travels from G1 → city */
function Pulse({ city, color, delay }: { city: typeof CITIES[0]; color: string; delay: number }) {
  const to = cellCentre(city.col, city.row)
  return (
    <motion.circle
      r={4}
      fill={color}
      initial={{ cx: G1.x, cy: G1.y, opacity: 0, scale: 0 }}
      animate={{
        cx: [G1.x, to.x],
        cy: [G1.y, to.y],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{ duration: 1.4, delay, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
    />
  )
}

export function CityGrid() {
  const [hovered, setHovered] = useState<string | null>(null)
  const activeCity = CITIES.find(c => c.name === hovered)

  /* build a 3×3 slot array (null = G1 hub) */
  const slots: (typeof CITIES[0] | null)[] = Array(9).fill(null)
  CITIES.forEach(c => { slots[c.row * 3 + c.col] = c })
  // slot index 4 (col:1 row:1) stays null → G1 hub

  return (
    <div className="relative">
      {/* ── SVG connection layer ── */}
      <svg
        viewBox="0 0 300 300"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        {CITIES.map((city, i) => {
          const to   = cellCentre(city.col, city.row)
          const isOn = hovered === city.name
          return (
            <g key={city.name}>
              {/* Static dashed line */}
              <line
                x1={G1.x} y1={G1.y} x2={to.x} y2={to.y}
                stroke={isOn ? city.color : '#c8c1b8'}
                strokeWidth={isOn ? 2.5 : 1}
                strokeDasharray={isOn ? '0' : '5 5'}
                opacity={isOn ? 1 : 0.5}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s' }}
              />
              {/* Travelling data pulse */}
              <Pulse city={city} color={isOn ? city.color : 'var(--color-accent)'} delay={i * 0.3} />
            </g>
          )
        })}
      </svg>

      {/* ── 3×3 CSS grid ── */}
      <div className="relative grid grid-cols-3 gap-3 auto-rows-[110px]">
        {slots.map((city) => {
          if (city === null) {
            /* ── G1 hub ── */
            return (
              <div key="g1-hub" className="flex items-center justify-center">
                <div className="relative flex h-20 w-20 items-center justify-center">
                  {/* Outer pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: activeCity ? activeCity.color : 'var(--color-accent)', opacity: 0.15 }}
                    animate={{ scale: [0.85, 1.25, 0.85] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Middle ring */}
                  <motion.div
                    className="absolute inset-2 rounded-full"
                    style={{ background: activeCity ? activeCity.color : 'var(--color-accent)', opacity: 0.25 }}
                    animate={{ scale: [0.9, 1.12, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  />
                  {/* Core */}
                  <motion.div
                    className="relative z-10 flex h-14 w-14 flex-col items-center justify-center rounded-full text-white shadow-lg"
                    style={{ background: activeCity ? activeCity.color : 'var(--color-accent)' }}
                    animate={{ scale: activeCity ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="font-display text-[10px] font-black uppercase tracking-widest leading-none">
                      Project
                    </span>
                    <span className="font-display text-base font-black uppercase leading-none">
                      G1
                    </span>
                  </motion.div>
                </div>
              </div>
            )
          }

          const isHovered = hovered === city.name

          return (
            <motion.div
              key={city.name}
              onHoverStart={() => setHovered(city.name)}
              onHoverEnd={() => setHovered(null)}
              animate={{
                backgroundColor: isHovered ? city.color : 'transparent',
                scale: isHovered ? 1.04 : 1,
                zIndex: isHovered ? 10 : 1,
              }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="relative flex cursor-default flex-col justify-between overflow-hidden rounded-2xl border border-border-strong p-3"
            >
              {/* City name */}
              <p
                className="font-display text-[11px] font-black uppercase leading-tight tracking-tight sm:text-xs"
                style={{ color: isHovered ? city.txt : 'var(--color-fg)' }}
              >
                {city.name}
              </p>

              {/* Bottom info */}
              <div>
                <AnimatePresence mode="wait">
                  {isHovered ? (
                    <motion.div
                      key="on"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.14 }}
                    >
                      <p
                        className="text-[10px] font-black uppercase leading-snug"
                        style={{ color: city.txt }}
                      >
                        {city.feature}
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-1">
                        <p
                          className="text-[9px] font-semibold opacity-70 leading-none"
                          style={{ color: city.txt }}
                        >
                          {city.lang}
                        </p>
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9px] font-black"
                          style={{ background: 'rgba(0,0,0,0.2)', color: city.txt }}
                        >
                          {city.users}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="off"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[9px] font-medium text-fg-muted leading-snug"
                    >
                      {city.lang}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
