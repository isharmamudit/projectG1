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
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80', // chat assistant graphic
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=200&q=80', // chat messenger interface
      'https://images.unsplash.com/photo-1675557009875-436f09780264?auto=format&fit=crop&w=200&q=80', // chatgpt text console
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=200&q=80', // digital AI node hand
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=200&q=80', // writing translation sheet
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
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=200&q=80', // glowing AI voice assistant gradient circle
      'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=200&q=80', // glowing assistant orb
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=200&q=80', // sound waves spectrum lines
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80', // telehealth conversation
      'https://images.unsplash.com/photo-1484755560693-a4074577af3a?auto=format&fit=crop&w=200&q=80', // recording microphone
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
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=200&q=80', // brain CT/MRI scans list
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&q=80', // doctor looking at scan screens
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=200&q=80', // dermatological check
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=200&q=80', // glowing clinic xray scanner
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80', // visual computer vision scanning
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
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=200&q=80', // dots / coordinates laser tracker
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=200&q=80', // skeletal joint lines network
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=200&q=80', // yoga pose stretch
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=200&q=80', // joint grid mapping
      'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=200&q=80', // pose alignment
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
      'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=200&q=80', // poor village healthcare outreach checkup
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&q=80', // remote place (no signal/wifi)
      'https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=200&q=80', // no wifi signal alert/symbol
      'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=200&q=80', // rural India village farms
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=200&q=80', // offline lock data
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
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=200&q=80', // calendar timeline logs (saved timeline)
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=200&q=80', // stack of medical files/llm reports saved
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=200&q=80', // stored timeline logs binder
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=200&q=80', // connected health nodes memory
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=200&q=80', // digitalized notes database
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
