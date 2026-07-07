import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PixelIcon, PIXEL } from '@/components/ui/PixelIcon'
import { CursorImageTrail } from '@/components/ui/CursorImageTrail'

const CARDS = [
  {
    n: '01',
    bg: 'bg-b-blue',
    title: 'Chat',
    sub: 'In your language, your dialect',
    body: 'Hindi, Bhojpuri, Tamil, Hinglish — ask G1 anything in the language you think in. Expands from the bottom right corner.',
    tag: 'Language',
    pixel: PIXEL.chat,
    pixelFill: 'var(--color-b-green)',
    images: [
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=200&q=80',
    ],
  },
  {
    n: '02',
    bg: 'bg-b-orange',
    title: 'Voice',
    sub: 'Talk — get a doctor report',
    body: 'Speak your symptoms out loud. G1 asks 10 clinical questions, generates a structured report, and sends it to your doctor.',
    tag: 'Consultation',
    pixel: PIXEL.mic,
    pixelFill: 'var(--color-b-red)',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1484755560693-a4074577af3a?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=200&q=80',
    ],
  },
  {
    n: '03',
    bg: 'bg-b-green',
    title: 'Scan',
    sub: 'Photo your symptoms',
    body: 'Photograph a rash, burn, hair issue or upload an X-ray. G1 reads it and flags what needs attention.',
    tag: 'Visual AI',
    pixel: PIXEL.camera,
    pixelFill: 'var(--color-b-yellow)',
    images: [
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=200&q=80',
    ],
  },
  {
    n: '04',
    bg: 'bg-b-purple',
    title: 'Yoga',
    sub: 'Real-time posture coaching',
    body: 'Hold a pose in front of your camera. G1 watches your form in real time and tells you when to move to the next.',
    tag: 'Movement',
    pixel: PIXEL.heart,
    pixelFill: 'var(--color-b-red)',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=200&q=80',
    ],
  },
  {
    n: '05',
    bg: 'bg-b-yellow',
    title: 'Offline',
    sub: 'Works without internet',
    body: 'Blood group, allergies, current medications — all instantly accessible even without a signal, on any phone.',
    tag: 'Access',
    pixel: PIXEL.bolt,
    pixelFill: 'var(--color-b-red)',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=200&q=80',
    ],
  },
  {
    n: '06',
    bg: 'bg-b-red',
    title: 'Memory',
    sub: 'Your health, remembered',
    body: 'Every report, symptom, medicine and doctor visit — linked across time so your full story is ready at every appointment.',
    tag: 'Record',
    pixel: PIXEL.heart,
    pixelFill: 'var(--color-b-yellow)',
    images: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=200&q=80',
    ],
  },
]


/** Units.-style horizontal scroll: vertical scroll drives translateX strip */
export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%'])

  return (
    <div ref={containerRef} className="relative" style={{ height: `${CARDS.length * 110}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Section label */}
        <div className="absolute top-8 left-4 sm:left-8 z-20 flex items-center gap-4">
          <p className="text-xs font-semibold tracking-[0.25em] text-fg-muted uppercase sm:text-sm">
            What G1 does
          </p>
          <span className="hidden sm:block h-px w-16 bg-border-strong" />
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex gap-4 pl-4 sm:pl-8 will-change-transform"
        >
          {CARDS.map(({ n, bg, title, sub, body, tag, pixel, pixelFill, images }, i) => (
            <CursorImageTrail
              key={n}
              images={images}
              className={cn(
                'group relative flex-shrink-0 flex flex-col rounded-3xl overflow-hidden',
                'w-[84vw] sm:w-[430px] lg:w-[490px]',
                'h-[70vh] sm:h-[75vh] max-h-[640px]',
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className={cn(
                  'relative flex-1 flex flex-col justify-between p-7 text-ink spotlight w-full h-full',
                  bg,
                )}
                style={{ '--spotlight-color': 'rgba(255,255,255,0.25)' } as React.CSSProperties}
              >
                {/* Pixel icon */}
                <div className="absolute top-6 right-6 w-28 opacity-80">
                  <PixelIcon pattern={pixel} fill={pixelFill} className="w-full text-ink/20" />
                </div>

                {/* Watermark number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -bottom-4 font-display text-[9rem] leading-none font-black opacity-10 select-none"
                >
                  {n}
                </span>

                {/* Top badge */}
                <div className="flex items-start">
                  <span className="inline-flex items-center rounded-full border border-ink/30 px-3 py-1 text-[11px] font-black uppercase tracking-widest">
                    {tag}
                  </span>
                </div>

                {/* Main content */}
                <div className="relative z-10">
                  <p className="font-display text-[clamp(2.6rem,6.5vw,4rem)] leading-[0.9] tracking-tight uppercase">
                    {title}
                  </p>
                  <p className="mt-3 text-sm font-black opacity-70">{sub}</p>
                  <p className="mt-5 max-w-[22rem] text-sm font-medium opacity-70 leading-relaxed">
                    {body}
                  </p>
                </div>

                {/* Number tag */}
                <span className="self-end font-display text-xs font-black opacity-40 uppercase tracking-widest">
                  Feature {n}
                </span>
              </motion.div>
            </CursorImageTrail>
          ))}


          {/* Closing card */}
          <div className={cn(
            'flex-shrink-0 flex flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed border-border-strong',
            'w-[55vw] sm:w-[300px]',
            'h-[70vh] sm:h-[75vh] max-h-[640px]',
            'p-8 text-center',
          )}>
            <p className="font-display text-2xl uppercase tracking-tight text-fg leading-tight">
              More<br />coming<br />soon.
            </p>
            <a
              href="#voice"
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-paper transition-transform hover:scale-105"
            >
              See Voice AI ↓
            </a>
          </div>
        </motion.div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-8 left-4 sm:left-8 flex items-center gap-3">
          <div className="h-px w-28 bg-border-strong relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <span className="text-xs font-medium text-fg-muted">Scroll to explore features</span>
        </div>
      </div>
    </div>
  )
}
