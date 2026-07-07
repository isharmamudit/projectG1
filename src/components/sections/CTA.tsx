import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

export function CTA() {
  return (
    <section className="px-4 pb-8 sm:px-8">
      <FadeIn>
        <a
          href="#top"
          className="group flex items-center justify-between gap-4 rounded-full bg-ink px-7 py-6 text-paper transition-transform duration-300 hover:scale-[1.01] sm:px-12 sm:py-8"
        >
          <ArrowDown className="hidden size-7 text-b-yellow transition-transform duration-300 group-hover:translate-y-1 sm:block" strokeWidth={2.5} />
          <span className="text-center font-display text-[clamp(1.25rem,4vw,2.75rem)] leading-none tracking-tight uppercase">
            Start your health story
          </span>
          <ArrowUpRight
            className="size-7 shrink-0 text-b-yellow transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-10"
            strokeWidth={2.5}
          />
        </a>
      </FadeIn>
    </section>
  )
}
