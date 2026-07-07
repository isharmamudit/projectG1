import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpotlightTilt } from '@/components/ui/SpotlightTilt'
import { PixelIcon, PIXEL } from '@/components/ui/PixelIcon'
import { useLanguage } from '@/lib/language'

const CARDS = [
  {
    bg: 'bg-tint-amber/12 border border-tint-amber/25',
    title: 'Privacy',
    sub: 'Your data stays yours',
    rows: ['Encrypted health records', 'Never sold, ever', 'You control every share', 'Delete anytime'],
  },
  {
    bg: 'bg-tint-sage/12 border border-tint-sage/25',
    title: 'Honesty',
    sub: 'Every answer, explained',
    rows: ['Reasoning shown, not hidden', 'Sources you can check', 'Clear "see a doctor" flags', 'Reviewed against clinical guidance'],
  },
  {
    bg: 'bg-tint-teal/12 border border-tint-teal/25',
    title: 'Readiness',
    sub: 'There in an emergency',
    rows: ['Allergies & blood group offline', 'Medicines list offline', 'Works without a signal', 'One-tap emergency card'],
  },
]

export function Trust() {
  const { t } = useLanguage()

  return (
    <section id="trust" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-between">
          <AnimatedTitle
            lines={[t.trust.line1, t.trust.line2]}
            className="text-center font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-fg uppercase lg:text-left lg:[&>div]:justify-start"
          />
          <FadeIn delay={0.2} className="hidden w-32 shrink-0 lg:block">
            <PixelIcon pattern={PIXEL.heart} fill="var(--color-tint-rose)" className="w-full text-fg-subtle" />
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {CARDS.map(({ bg, title, sub, rows }, i) => (
            <FadeIn key={title} delay={i * 0.1} y={30}>
              <SpotlightTilt className={`glass-card h-full rounded-3xl backdrop-blur-xl ${bg} p-6 text-fg sm:p-8`}>
                <h3 className="font-display text-xl uppercase sm:text-2xl">{title}</h3>
                <p className="mt-1 text-sm font-bold">{sub}</p>
                <ul className="mt-6">
                  {rows.map((row) => (
                    <li key={row} className="border-b border-fg/15 py-3 text-sm font-medium">
                      {row}
                    </li>
                  ))}
                </ul>
              </SpotlightTilt>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
