import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import DotField from '@/components/ui/DotField'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Menon',
    role: 'Working Mother, Bengaluru',
    quote:
      'G1 understood my symptoms in Kannada and helped me figure out it was a vitamin deficiency — no hospital trip needed. Saved me hours.',
    image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=400&h=400&q=80',
    accent: '#2DD4BF',
  },
  {
    id: 2,
    name: 'Dr. Arun Sharma',
    role: 'General Physician, Delhi',
    quote:
      'My patients now come in with clear symptom logs from G1. It saves time and I can give a much more accurate diagnosis in fewer minutes.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=400&q=80',
    accent: '#F59E0B',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    role: 'Software Engineer, Pune',
    quote:
      'I travel a lot and never remember my medical history. G1 keeps everything in one place and generates a report I can hand to any doctor.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&q=80',
    accent: '#818CF8',
  },
  {
    id: 4,
    name: 'Savitri Devi',
    role: 'Homemaker, Varanasi',
    quote:
      'Meri Hindi mein baat karta hai aur asani se samjhata hai. Ab doctor ke paas jaane se pehle mujhe pata hota hai kya poochna hai.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&h=400&q=80',
    accent: '#F43F5E',
  },
  {
    id: 5,
    name: 'Kavya Reddy',
    role: 'College Student, Hyderabad',
    quote:
      'As someone who gets anxious about health, having G1 give me a calm, clear breakdown of my symptoms reduces my stress so much.',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400&q=80',
    accent: '#34D399',
  },
  {
    id: 6,
    name: 'Suresh Nair',
    role: 'Retired Bank Manager, Kochi',
    quote:
      'At my age I have multiple conditions. G1 tracks everything — medicines, reports, blood work — and reminds me what matters.',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&h=400&q=80',
    accent: '#60A5FA',
  },
  {
    id: 7,
    name: 'Neha Joshi',
    role: 'Nurse Practitioner, Mumbai',
    quote:
      'G1 bridges the gap between doctor visits beautifully. Patients stay informed and engaged with their health between appointments.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80',
    accent: '#E879F9',
  },
]

// Duplicate list to create seamless infinite scroll
const DOUBLED = [...TESTIMONIALS, ...TESTIMONIALS]

interface CardProps {
  item: (typeof TESTIMONIALS)[number]
  anyHovered: boolean
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function TestimonialCard({ item, anyHovered, isHovered, onMouseEnter, onMouseLeave }: CardProps) {
  return (
    <div
      className="relative flex-shrink-0 cursor-pointer"
      style={{
        width: 220,
        height: 300,
        perspective: '1000px',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Card flip container */}
      <motion.div
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* ── FRONT: Photo ── */}
        <motion.div
          animate={{
            filter: anyHovered && !isHovered ? 'grayscale(100%) brightness(0.55)' : 'grayscale(0%) brightness(1)',
            scale: isHovered ? 1.04 : 1,
          }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 rounded-[22px] overflow-hidden border border-white/10 shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* Gradient footer */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
            <p className="font-display text-[11px] font-black uppercase tracking-widest text-white leading-tight">
              {item.name}
            </p>
            <p className="text-[10px] font-semibold opacity-70 text-white mt-0.5">{item.role}</p>
          </div>
        </motion.div>

        {/* ── BACK: Testimonial ── */}
        <div
          className="absolute inset-0 rounded-[22px] border flex flex-col justify-between p-5 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(15,15,20,0.92)',
            borderColor: `${item.accent}40`,
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Accent glow blob */}
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
            style={{ background: item.accent }}
          />

          {/* Quote mark */}
          <div
            className="font-display text-5xl font-black leading-none select-none"
            style={{ color: item.accent, opacity: 0.6 }}
          >
            "
          </div>

          {/* Quote text */}
          <p className="text-[11.5px] font-semibold leading-relaxed text-white/90 relative z-10 flex-1 mt-2">
            {item.quote}
          </p>

          {/* Person info */}
          <div className="mt-4 pt-3 border-t relative z-10" style={{ borderColor: `${item.accent}30` }}>
            <p className="font-display text-[10px] font-black uppercase tracking-widest" style={{ color: item.accent }}>
              {item.name}
            </p>
            <p className="text-[9px] font-semibold text-white/50 mt-0.5">{item.role}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function Testimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const anyHovered = hoveredId !== null

  return (
    <section id="testimonials" className="relative pt-12 pb-20 sm:pt-14 sm:pb-24 overflow-hidden">
      {/* Interactive dot grid background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <DotField
          dotRadius={1.2}
          dotSpacing={18}
          bulgeStrength={55}
          glowRadius={180}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(45, 212, 191, 0.22)"
          gradientTo="rgba(13, 115, 119, 0.10)"
          glowColor="#0d7377"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-8 mb-14">
        {/* Section heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-fg-muted mb-4">
              Real Stories
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-black uppercase leading-[0.92] tracking-tight">
              Heard across
              <br />
              <span className="text-tint-teal">every state.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold opacity-60 max-w-xs leading-relaxed">
            From grandmothers in Varanasi to doctors in Mumbai — G1 speaks your language.
          </p>
        </div>
      </div>

      {/* Infinite scroll track */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setHoveredId(null)
        }}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg to-transparent" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-5 px-8"
          style={{
            animation: isPaused ? 'none' : 'testimonials-scroll 28s linear infinite',
            willChange: 'transform',
            width: 'max-content',
          }}
        >
          {DOUBLED.map((item, idx) => (
            <TestimonialCard
              key={`${item.id}-${idx}`}
              item={item}
              anyHovered={anyHovered}
              isHovered={hoveredId === idx}
              onMouseEnter={() => setHoveredId(idx)}
              onMouseLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>

      {/* Inline keyframe animation */}
      <style>{`
        @keyframes testimonials-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
