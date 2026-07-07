import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { FadeIn } from '@/components/ui/FadeIn'
import { SplitFlap } from '@/components/ui/SplitFlap'
import { CityGrid } from '@/components/ui/CityGrid'
import { SpotlightTilt } from '@/components/ui/SpotlightTilt'
import { Parallax } from '@/components/ui/Parallax'
import { useLanguage } from '@/lib/language'

const LANGUAGES = [
  'HINDI',
  'BENGALI',
  'TAMIL',
  'TELUGU',
  'MARATHI',
  'GUJARATI',
  'KANNADA',
  'PUNJABI',
  'ODIA',
  'ASSAMESE',
  'URDU',
  'ENGLISH',
]

const STATS = [
  { value: '12+', label: 'Languages & dialects', bg: 'bg-tint-violet/12 border border-tint-violet/25' },
  { value: '2G/3G', label: 'Runs on slower networks', bg: 'bg-tint-teal/12 border border-tint-teal/25' },
  { value: '28', label: 'States, one companion', bg: 'bg-tint-sage/12 border border-tint-sage/25' },
]

export function India() {
  const { t } = useLanguage()

  return (
    <section id="india" className="overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-fg-muted uppercase sm:text-sm">
            {t.india.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tight text-fg uppercase">
            {t.india.heading}
          </h2>
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-2">
          <div className="flex">
            <Parallax offset={-25} className="w-full">
              <SpotlightTilt className="glass-card h-full rounded-3xl backdrop-blur-xl bg-tint-amber/12 border border-tint-amber/25 p-7 text-fg sm:p-10">
                <AnimatedTitle
                  lines={[t.india.cardLine1, t.india.cardLine2]}
                  className="!justify-start text-left font-display text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] tracking-tight uppercase [&>div]:justify-start"
                />
                <p className="mt-6 max-w-md text-sm font-medium opacity-80 sm:text-base">
                  {t.india.cardBody}
                </p>
                <p className="mt-10 mb-3 font-display text-xs tracking-widest uppercase">{t.india.askIn}</p>
                <SplitFlap words={LANGUAGES} />
              </SpotlightTilt>
            </Parallax>
          </div>

          <div className="flex flex-col gap-4">
            <Parallax offset={25} className="w-full">
              <FadeIn delay={0.15} y={30}>
                <div className="rounded-3xl border border-border-strong p-4">
                  <CityGrid />
                </div>
              </FadeIn>
            </Parallax>
            
            <div className="grid grid-cols-3 gap-4">
              {STATS.map(({ value, label, bg }, i) => (
                <FadeIn key={label} delay={0.25 + i * 0.08} y={24}>
                  <div className={`glass-card h-full rounded-2xl backdrop-blur-xl ${bg} p-4 text-fg transition-transform duration-300 hover:-translate-y-1`}>
                    <p className="font-display text-xl sm:text-3xl">{value}</p>
                    <p className="mt-1 text-[11px] leading-tight font-bold sm:text-xs">{label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div> {/* closed Layout Grid Container div */}
      </div> {/* closed wrapper max-w-6xl div */}
    </section>
  )
}
