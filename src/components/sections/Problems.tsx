import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { CountUp } from '@/components/ui/CountUp'
import { Parallax } from '@/components/ui/Parallax'
import { useLanguage } from '@/lib/language'
import DotField from '@/components/ui/DotField'

const STAT_META = [
  { to: 800, suffix: 'M+', color: 'text-tint-rose' },
  { to: 92, suffix: '%', color: 'text-tint-amber' },
  { to: 12, suffix: 'M+', color: 'text-fg' },
]

// Helper to compute circular index offset on a loop of size N
const getCircularOffset = (i: number, activeIndex: number, N: number) => {
  let diff = i - activeIndex
  while (diff < -N / 2) diff += N
  while (diff > N / 2) diff -= N
  return diff
}

interface CarouselCardProps {
  card: { n: string; title: string; detail: string; image: string }
  index: number
  activeIndex: number
  totalCards: number
  spacing: number
  yBase: any
  imgY: any
  setActiveIndex: (idx: number) => void
  hoveredIndex: number | null
  setHoveredIndex: (idx: number | null) => void
}

function CarouselCard({
  card,
  index,
  activeIndex,
  totalCards,
  spacing,
  yBase,
  imgY,
  setActiveIndex,
  hoveredIndex,
  setHoveredIndex,
}: CarouselCardProps) {
  // Compute circular index offset so cards wrap around infinitely in the fan arch
  const offset = getCircularOffset(index, activeIndex, totalCards)
  
  // Arch layout mechanics
  let rotateVal = offset * 8
  let xVal = offset * spacing
  let yVal = Math.abs(offset) * 12
  let scaleVal = 1 - Math.abs(offset) * 0.06

  // Adjust card alignment on hover to create extra space
  if (hoveredIndex !== null) {
    const offsetH = getCircularOffset(hoveredIndex, activeIndex, totalCards)
    if (offset < offsetH) {
      // Shift left cards further left to make space
      xVal -= 45
    } else if (offset > offsetH) {
      // Shift right cards further right to make space
      xVal += 45
    } else {
      // The hovered card itself scales up and floats slightly higher
      scaleVal += 0.08
      yVal -= 15
    }
  }

  // Scroll parallax multiplier: center card shifts most, side cards shift less
  const multiplier = 1 - Math.min(Math.abs(offset) * 0.35, 0.8)
  const cardY = useTransform(yBase, (v: number) => v * multiplier + yVal)

  return (
    <motion.div
      style={{
        zIndex: index === hoveredIndex ? 25 : 10 - Math.abs(offset),
        position: 'absolute',
        y: cardY,
      }}
      animate={{
        x: xVal,
        rotate: rotateVal,
        scale: scaleVal,
        // Hide card if it's offset by 3 (opposite side of the circle) to keep transitions clean
        opacity: Math.abs(offset) >= 3 ? 0 : 1,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      onClick={() => setActiveIndex(index)}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="group relative overflow-hidden rounded-[28px] border border-white/20 shadow-2xl bg-surface cursor-pointer select-none w-[240px] h-[360px] sm:w-[320px] sm:h-[480px]"
    >
      {/* Card background photo with scroll parallax */}
      <motion.img
        src={card.image}
        alt={card.title}
        style={{ y: imgY }}
        className="absolute -top-[10%] h-[120%] w-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-110"
      />

      {/* Translucent Dim overlay to preserve transparency on hover */}
      <div className="absolute inset-0 bg-ink/30 transition-opacity duration-300 group-hover:bg-ink/45" />

      {/* Default overlay: card title & number at the bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 text-paper transition-opacity duration-300 group-hover:opacity-0 flex flex-col justify-end h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <span className="font-display text-[9px] sm:text-[10px] font-black opacity-60 block tracking-widest">{card.n}</span>
        <h3 className="font-display text-sm sm:text-base font-black uppercase leading-snug mt-1">{card.title}</h3>
      </div>

      {/* Hover Glassmorphism Info Panel - Centered text alignment & High transparency */}
      <div className="glass-premium absolute inset-0 border border-white/20 p-6 sm:p-8 flex flex-col justify-center items-center text-center z-20 text-white transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
        <div className="relative z-10">
          <span className="font-display text-xs font-black opacity-60 block mb-2">{card.n}</span>
          <h4 className="font-display text-sm sm:text-[15px] font-black uppercase leading-snug text-tint-amber mb-4">
            {card.title}
          </h4>
          <p className="text-[11px] sm:text-[12px] font-semibold opacity-95 leading-relaxed max-w-[95%] mx-auto">
            {card.detail}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Problems() {
  const { code, t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(2)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [spacing, setSpacing] = useState(190)

  const sectionRef = useRef<HTMLDivElement>(null)

  // Track scroll progress of the Problems section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Global base parallax translations mapping scroll position
  const yBase = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const imgY = useTransform(scrollYProgress, [0, 1], [-25, 25])

  useEffect(() => {
    const handleResize = () => {
      // Dynamic spacing: 95 on mobile, 190 on desktop to fit larger card bounds
      setSpacing(window.innerWidth < 640 ? 95 : 190)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const CAROUSEL_CARDS = [
    {
      n: '01',
      title: t.problems.cards[0].title,
      detail: t.problems.cards[0].detail,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    },
    {
      n: '02',
      title: t.problems.cards[1].title,
      detail: t.problems.cards[1].detail,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    },
    {
      n: '03',
      title: t.problems.cards[2].title,
      detail: t.problems.cards[2].detail,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    },
    {
      n: '04',
      title: t.problems.cards[3].title,
      detail: t.problems.cards[3].detail,
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80',
    },
    {
      n: '05',
      title: t.problems.cards[4].title,
      detail: t.problems.cards[4].detail,
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
    },
    {
      n: '06',
      title: t.problems.cards[5].title,
      detail: t.problems.cards[5].detail,
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    },
  ]

  return (
    <section id="problems" ref={sectionRef} className="overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-fg-muted">{t.problems.eyebrow}</p>
        </div>

        {/* Layout Stack Container: stacked vertically */}
        <div className="flex flex-col gap-8 w-full">

          {/* ─── TOP BLOCK: full-width framing card with side-by-side content and stats ─── */}
          <div className="w-full">
            <Parallax offset={-15} className="w-full">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card w-full rounded-3xl bg-tint-teal/10 border border-tint-teal/22 backdrop-blur-xl p-8 sm:p-10 text-fg relative overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7">
                    <span className="inline-block border border-fg/25 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest mb-6">
                      {t.problems.tabProblems}
                    </span>

                    <motion.h2
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                      className="perspective-[1000px] font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-black uppercase leading-[0.9] tracking-tight"
                    >
                      {code === 'en' ? (
                        <>
                          {['What every', 'health app'].map((line) => (
                            <motion.span
                              key={line}
                              className="block"
                              variants={{
                                hidden: { opacity: 0, y: 26, rotateX: 25 },
                                visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
                              }}
                            >
                              {line}
                            </motion.span>
                          ))}
                          <motion.span
                            className="block"
                            variants={{
                              hidden: { opacity: 0, y: 26, rotateX: 25 },
                              visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
                            }}
                          >
                            gets <ScrambleText text="wrong." trigger="mount" duration={1000} className="text-tint-rose" />
                          </motion.span>
                        </>
                      ) : (
                        <motion.span
                          className="block"
                          variants={{
                            hidden: { opacity: 0, y: 26 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                          }}
                        >
                          {t.problems.heading}
                        </motion.span>
                      )}
                    </motion.h2>

                    <p className="mt-6 text-xs sm:text-sm font-semibold opacity-85 leading-relaxed max-w-2xl">
                      {t.problems.subhead}
                    </p>
                  </div>

                  {/* Stats Counters on the right, stacked vertically */}
                  <div className="md:col-span-5 flex flex-col gap-6 justify-center border-t border-fg/10 pt-6 md:border-t-0 md:pt-0 md:border-l md:pl-8 border-fg/10 h-full">
                    {STAT_META.map(({ to, suffix, color }, i) => (
                      <div key={i} className="text-left">
                        <p className={`font-display text-3xl sm:text-4xl font-black leading-none ${color}`}>
                          <CountUp to={to} suffix={suffix} duration={1200} />
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider opacity-85 mt-2 leading-none">
                          {t.problems.statsLabels[i]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Parallax>
          </div>

          {/* ─── BOTTOM BLOCK: 3D circular fanned coverflow carousel with interactive DotField background ─── */}
          <div className="w-full flex flex-col items-center relative py-12 px-6 rounded-[40px] bg-fg/[0.015] border border-fg/5 overflow-visible">
            {/* Interactive DotField canvas background */}
            <DotField
              className="absolute inset-0 pointer-events-auto select-none rounded-[40px] opacity-[0.25]"
              dotRadius={1.5}
              dotSpacing={14}
              bulgeStrength={67}
              glowRadius={160}
              sparkle={false}
              waveAmplitude={0}
              gradientFrom="var(--color-fg)"
              gradientTo="var(--color-fg)"
              glowColor="var(--color-accent)"
            />

            {/* Slider view-deck container */}
            <div className="relative flex items-center justify-center h-[400px] sm:h-[580px] md:h-[620px] w-full max-w-4xl mx-auto overflow-visible z-10">
              {CAROUSEL_CARDS.map((card, i) => (
                <CarouselCard
                  key={i}
                  card={card}
                  index={i}
                  activeIndex={activeIndex}
                  totalCards={CAROUSEL_CARDS.length}
                  spacing={spacing}
                  yBase={yBase}
                  imgY={imgY}
                  setActiveIndex={setActiveIndex}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
            </div>

            {/* Slide navigation controls: cyclic wrapping */}
            <div className="flex items-center justify-center gap-6 mt-6 z-10">
              <button
                onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : CAROUSEL_CARDS.length - 1))}
                aria-label="Previous slide"
                className="flex size-9 items-center justify-center rounded-full border border-fg/10 bg-surface/50 text-fg hover:bg-surface transition-all active:scale-95"
              >
                <ChevronLeft className="size-4" strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-1.5">
                {CAROUSEL_CARDS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`size-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'bg-fg w-4' : 'bg-fg/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveIndex(prev => (prev < CAROUSEL_CARDS.length - 1 ? prev + 1 : 0))}
                aria-label="Next slide"
                className="flex size-9 items-center justify-center rounded-full border border-fg/10 bg-surface/50 text-fg hover:bg-surface transition-all active:scale-95"
              >
                <ChevronRight className="size-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
