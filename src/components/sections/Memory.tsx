import { ClipReveal } from '@/components/ui/ClipReveal'
import { RevealParagraph } from '@/components/ui/RevealParagraph'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpotlightTilt } from '@/components/ui/SpotlightTilt'

const STEPS = [
  {
    n: '01',
    bg: 'bg-b-blue',
    label: 'Report uploaded',
    detail: 'A photo of a prescription or a lab PDF — either works.',
  },
  {
    n: '02',
    bg: 'bg-b-yellow',
    label: 'Pattern noticed',
    detail: 'Saathi compares it against everything that came before.',
  },
  {
    n: '03',
    bg: 'bg-b-red',
    label: 'Visit prepared',
    detail: 'A summary and the right questions, ready before you walk in.',
  },
  {
    n: '04',
    bg: 'bg-b-green',
    label: 'Follow-up remembered',
    detail: 'The next review or refill, nudged before it is missed.',
  },
]

export function Memory() {
  return (
    <section id="memory" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ClipReveal>
          <h2 className="text-center font-display text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-tight text-fg uppercase">
            Every report.
            <br />
            Every visit. Connected.
          </h2>
        </ClipReveal>

        <RevealParagraph
          text="Most health apps forget you the moment you close them. Reports become dead PDFs, and every visit starts from zero. Saathi keeps one continuous record — reports, medicines, symptoms, and doctors linked across time — so your history speaks for you."
          className="mx-auto mt-8 max-w-2xl text-center text-base text-fg-muted sm:text-lg"
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ n, bg, label, detail }, i) => (
            <FadeIn key={n} delay={i * 0.1} y={30}>
              <SpotlightTilt className={`h-full rounded-3xl ${bg} p-6 text-ink sm:min-h-[15rem]`}>
                <div className="flex h-full flex-col justify-between gap-8">
                  <span className="font-display text-3xl sm:text-4xl">{n}</span>
                  <div>
                    <h3 className="font-display text-base uppercase sm:text-lg">{label}</h3>
                    <p className="mt-2 text-sm font-medium opacity-80">{detail}</p>
                  </div>
                </div>
              </SpotlightTilt>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
