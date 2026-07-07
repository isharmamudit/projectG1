import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { Parallax } from '@/components/ui/Parallax'
import DotField from '@/components/ui/DotField'

const TILE_BASE =
  'group relative flex h-36 flex-col justify-between overflow-hidden rounded-2xl p-4 text-ink transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:h-44 sm:p-5'

const TILES = [
  { n: '01', label: 'Chat in your language', href: '#voice', bg: 'bg-b-blue' },
  { n: '02', label: 'Talk — get a doctor report', href: '#voice', bg: 'bg-b-orange' },
  { n: '03', label: 'Scan your symptoms', href: '#india', bg: 'bg-b-red' },
  { n: '04', label: 'Yoga & posture coaching', href: '#trust', bg: 'bg-b-green' },
  { n: '05', label: 'Works without internet', href: '#trust', bg: 'bg-b-purple' },
  { n: '06', label: 'Your health, remembered', href: '#india', bg: 'bg-b-yellow' },
]

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-28 pb-14 sm:px-8">
      <DotField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,var(--color-bg)_0%,transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <FadeIn delay={0} y={-16}>
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-fg-muted uppercase sm:text-sm">
            An AI health platform for India
          </p>
        </FadeIn>

        <Parallax offset={-35}>
          <motion.h1
            className="mt-6 text-center font-display text-[clamp(3rem,11.5vw,9.5rem)] leading-[0.92] tracking-tight uppercase"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {(['Your', 'health,', 'understood.'] as const).map((w) => (
              <motion.span
                key={w}
                className="inline-block mr-[0.18em] last:mr-0 will-change-transform"
                style={w === 'health,' ? { color: 'var(--color-accent)' } : {}}
                variants={{
                  hidden: { opacity: 0, y: 48, rotateX: 40 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
                }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>
        </Parallax>

        <FadeIn delay={0.35} className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="max-w-sm text-center text-sm text-fg-muted sm:text-left sm:text-base">
            Ask in your dialect. Speak your symptoms. Photo a prescription. G1 understands — and acts.
          </p>
          <Button href="#voice" variant="primary" className="shrink-0">
            Explore features
          </Button>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          {TILES.map(({ n, label, href, bg }, i) => (
            <Parallax key={n} offset={i % 2 === 0 ? 25 : -25}>
              <FadeIn delay={0.45 + i * 0.06} y={28}>
                <a href={href} className={`${TILE_BASE} ${bg}`}>
                  <div className="flex items-start justify-between">
                    <span className="font-display text-lg sm:text-xl">{n}</span>
                    <ArrowUpRight
                      className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-6"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-sm leading-tight font-bold sm:text-base">{label}</span>
                </a>
              </FadeIn>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  )
}

