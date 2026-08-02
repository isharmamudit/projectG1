interface PixelIconProps {
  pattern: string[]
  fill: string
  className?: string
}

const CELL = 20

/**
 * Units-style pixel-art motif: a faint blueprint grid with cells lit up to
 * form a glyph. Pattern is rows of characters where '#' fills a cell.
 * Pure SVG rects — no canvas, no animation loop.
 */
export function PixelIcon({ pattern, fill, className }: PixelIconProps) {
  const rows = pattern.length
  const cols = Math.max(...pattern.map((r) => r.length))
  const w = cols * CELL
  const h = rows * CELL

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      {/* grid lines */}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line key={`v${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={h} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1} />
      ))}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * CELL} x2={w} y2={i * CELL} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1} />
      ))}
      {/* lit cells */}
      {pattern.flatMap((row, y) =>
        row.split('').map((ch, x) =>
          ch === '#' ? <rect key={`${x}-${y}`} x={x * CELL + 1} y={y * CELL + 1} width={CELL - 2} height={CELL - 2} fill={fill} /> : null,
        ),
      )}
    </svg>
  )
}

export const PIXEL = {
  chat: [
    '..######..',
    '.#......#.',
    '#..#.#.#.#',
    '#........#',
    '#..####..#',
    '.#......#.',
    '..###.##..',
    '.....#....',
  ],
  mic: [
    '...####...',
    '...#..#...',
    '...#..#...',
    '...####...',
    '..#....#..',
    '...####...',
    '....##....',
    '...####...',
  ],
  camera: [
    '..........',
    '...##.....',
    '.########.',
    '.#..##...#',
    '.#.####..#',
    '.#.####..#',
    '.#..##...#',
    '.########.',
  ],
  heart: [
    '..##..##..',
    '.########.',
    '##########',
    '##########',
    '.########.',
    '..######..',
    '...####...',
    '....##....',
  ],
  bolt: [
    '....###...',
    '...###....',
    '..###.....',
    '.#####....',
    '...###....',
    '..###.....',
    '.###......',
    '.#........',
  ],
} satisfies Record<string, string[]>
