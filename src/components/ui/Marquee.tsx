import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  className?: string
}

/** Units-style scrolling feature band: red strip, yellow chunky type, bolt separators. */
export function Marquee({ items, className }: MarqueeProps) {
  const row = (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8 pr-8 sm:gap-14 sm:pr-14">
          <span className="font-display text-sm tracking-wide whitespace-nowrap uppercase sm:text-lg">{item}</span>
          <Zap className="size-4 shrink-0 fill-current sm:size-5" />
        </span>
      ))}
    </>
  )

  return (
    <div className={cn('marquee bg-b-red py-3 text-b-yellow sm:py-4', className)} aria-hidden>
      <div className="marquee-track motion-reduce:animate-none">
        {row}
        {row}
      </div>
    </div>
  )
}
