import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { FadeIn } from '@/components/ui/FadeIn'
import { BounceIn } from '@/components/ui/BounceIn'
import { SpotlightTilt } from '@/components/ui/SpotlightTilt'
import { PixelIcon, PIXEL } from '@/components/ui/PixelIcon'

const CARDS = [
  {
    title: 'Text',
    pattern: PIXEL.chat,
    pixel: 'var(--color-b-green)',
    detail: 'Type in Hindi, English, or Hinglish — Saathi reads it the way you write it.',
  },
  {
    title: 'Voice',
    pattern: PIXEL.mic,
    pixel: 'var(--color-b-red)',
    detail: 'Speak your symptoms out loud in your own dialect. No typing required.',
  },
  {
    title: 'Image',
    pattern: PIXEL.camera,
    pixel: 'var(--color-b-yellow)',
    detail: 'Photograph a prescription, a lab report, or a rash — Saathi understands it.',
  },
]

export function Capabilities() {
  return (
    <section id="capabilities" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimatedTitle
          lines={['However you tell it.']}
          className="text-center font-display text-[clamp(2rem,6vw,4.5rem)] leading-tight tracking-tight text-fg uppercase"
        />
        <FadeIn delay={0.2} className="mx-auto mt-5 max-w-xl text-center">
          <p className="text-base text-fg-muted sm:text-lg">
            No forms to fill in a language that isn&apos;t yours. A voice note today, a photo tomorrow, a typed
            question next week — one story, not three.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {CARDS.map(({ title, pattern, pixel, detail }, i) => (
            <BounceIn key={title} index={i}>
              <SpotlightTilt
                className="h-full rounded-3xl bg-b-blue p-6 text-ink sm:p-8"
                spotlightColor="rgba(255,255,255,0.3)"
              >
                <PixelIcon pattern={pattern} fill={pixel} className="mx-auto w-40 max-w-full text-ink sm:w-48" />
                <h3 className="mt-8 text-center font-display text-xl uppercase sm:text-2xl">{title}</h3>
                <p className="mt-3 text-center text-sm font-medium opacity-80">{detail}</p>
              </SpotlightTilt>
            </BounceIn>
          ))}
        </div>
      </div>
    </section>
  )
}
