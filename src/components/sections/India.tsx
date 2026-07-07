import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { FadeIn } from '@/components/ui/FadeIn'
import { SplitFlap } from '@/components/ui/SplitFlap'
import { CityGrid } from '@/components/ui/CityGrid'
import { SpotlightTilt } from '@/components/ui/SpotlightTilt'
import { Parallax } from '@/components/ui/Parallax'

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
  { value: '12+', label: 'Languages & dialects', bg: 'bg-b-purple' },
  { value: '2G/3G', label: 'Runs on slower networks', bg: 'bg-b-yellow' },
  { value: '28', label: 'States, one companion', bg: 'bg-b-green' },
]

export function India() {
  return (
    <section id="india" className="overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-fg-muted uppercase sm:text-sm">
            Regional Access
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tight text-fg uppercase">
            No household left behind.
          </h2>
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-2">
          <div className="flex">
            <Parallax offset={-25} className="w-full">
              <SpotlightTilt className="h-full rounded-3xl bg-b-orange p-7 text-ink sm:p-10">
                <AnimatedTitle
                  lines={['Every corner', 'of India.']}
                  className="!justify-start text-left font-display text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] tracking-tight uppercase [&>div]:justify-start"
                />
                <p className="mt-6 max-w-md text-sm font-medium opacity-80 sm:text-base">
                  Built for the semi-urban and rural households most health apps design around, not for. Low
                  bandwidth, modest phones, and a dialect that isn&apos;t English — all assumed from day one.
                </p>
                <p className="mt-10 mb-3 font-display text-xs tracking-widest uppercase">Ask G1 in</p>
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
                  <div className={`h-full rounded-2xl ${bg} p-4 text-ink transition-transform duration-300 hover:-translate-y-1`}>
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
