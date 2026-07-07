import { ArrowUpRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { Button } from '@/components/ui/Button'
import DotField from '@/components/ui/DotField'

const TILE_BASE =
  'group relative flex h-36 flex-col justify-between overflow-hidden rounded-2xl p-4 text-ink transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:h-44 sm:p-5'

const TILES = [
  { n: '01', label: 'Multilingual Chatbot', href: '#voice', bg: 'bg-b-blue' },
  { n: '02', label: 'Voice AI · Doctor report', href: '#voice', bg: 'bg-b-orange' },
  { n: '03', label: 'Image classification', href: '#india', bg: 'bg-b-red' },
  { n: '04', label: 'Yoga pose · YOLO', href: '#trust', bg: 'bg-b-green' },
  { n: '05', label: 'Ollama · Local RAG', href: '#trust', bg: 'bg-b-purple' },
  { n: '06', label: 'Health memory', href: '#india', bg: 'bg-b-yellow' },
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

        <AnimatedTitle
          lines={['Your health,', 'understood.']}
          className="mt-6 text-center font-display text-[clamp(3rem,11.5vw,9.5rem)] leading-[0.92] tracking-tight text-fg uppercase"
        />

        <FadeIn delay={0.35} className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="max-w-sm text-center text-sm text-fg-muted sm:text-left sm:text-base">
            Chatbot · Voice AI · Image classification · Yoga pose · Local RAG — one platform, built for every Indian.
          </p>
          <Button href="#voice" variant="primary" className="shrink-0">
            Explore features
          </Button>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          {TILES.map(({ n, label, href, bg }, i) => (
            <FadeIn key={n} delay={0.45 + i * 0.06} y={28}>
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
          ))}
        </div>
      </div>
    </section>
  )
}
