

// Scattered accent cells on the blueprint grid, Units-footer style.
const CELLS = [
  { top: '6%', left: '78%', bg: 'var(--color-b-purple)' },
  { top: '28%', left: '2%', bg: 'var(--color-b-blue)' },
  { top: '38%', left: '62%', bg: 'var(--color-b-orange)' },
  { top: '62%', left: '12%', bg: 'var(--color-b-red)' },
  { top: '58%', left: '88%', bg: 'var(--color-b-green)' },
]

export function Footer() {
  return (
    <footer className="px-4 pt-8 pb-8 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Giant wordmark on blueprint grid */}
        <div className="grid-paper relative mt-6 overflow-hidden rounded-3xl border border-border-strong">
          {CELLS.map((cell, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute size-[55px] sm:size-[55px]"
              style={{ top: cell.top, left: cell.left, background: cell.bg }}
            />
          ))}
          <p className="relative px-6 pt-16 pb-10 text-center font-display text-[clamp(4rem,17vw,15rem)] leading-[0.8] tracking-tight text-fg select-none sm:pt-24">
            projectG1.
          </p>
        </div>

        {/* Legal line */}
        <div className="mt-6 flex flex-col gap-4 pr-20 text-xs font-medium text-fg-muted sm:flex-row sm:items-center sm:justify-between sm:pr-0">
          <p className="font-bold text-fg">© {new Date().getFullYear()} ProjectG1. Made for India.</p>
          <p>Not a substitute for professional medical advice.</p>
          <div className="flex gap-2">
            {['FAQs', 'Privacy Policy', 'Data & Consent'].map((l) => (
              <a
                key={l}
                href="#top"
                className="rounded-full border border-border-strong px-4 py-2 transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
