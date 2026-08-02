import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  href?: string
  icon?: boolean
  children: ReactNode
}

/**
 * Two-layer text roll on hover (capsule/AnimateBtn pattern): the resting
 * label sits in view, a duplicate slides up from below on hover.
 */
function RollLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-middle">
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  )
}

export function Button({ variant = 'primary', href, icon = true, className, children, ...props }: ButtonProps) {
  const base = cn(
    'group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-wide',
    'transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    variant === 'primary' && 'bg-accent text-accent-fg hover:bg-accent/90',
    variant === 'ghost' && 'border border-border-strong text-fg hover:bg-surface-2',
    className,
  )

  const content = (
    <>
      <RollLabel>{children}</RollLabel>
      {icon && (
        <span
          className={cn(
            'flex size-6 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
            variant === 'primary' ? 'bg-accent-fg/15' : 'bg-fg/10',
          )}
        >
          <ArrowUpRight className="size-3.5" strokeWidth={2.25} />
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a href={href} className={base}>
        {content}
      </a>
    )
  }

  return (
    <button className={base} {...props}>
      {content}
    </button>
  )
}
