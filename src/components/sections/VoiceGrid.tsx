import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  FileText,
  Send,
  Loader2,
  ChevronRight,
  MessageSquare,
  Languages,
  Activity,
  Sparkles,
  Camera,
  Heart,
  WifiOff,
  Database,
  Calendar,
  Layers,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react'

// --- Data for Feature 01: Chat ---
const CHAT_LANGUAGES = ['Hindi', 'Bhojpuri', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Bengali', 'Punjabi']
const CHAT_MOCK = [
  { role: 'user', text: 'Mujhe kal se sar dard aur halka fever hai.' },
  { role: 'ai', text: 'Sar dard aur bukhar ke sath kya gale me kharash ya jukham bhi hai?' },
  { role: 'user', text: 'Haan, gale me halka dard hai.' },
]

// --- Data for Feature 02: Voice AI ---
const QUESTIONS = [
  'Name & age?',
  'Height & weight?',
  'What is the main problem?',
  'Family history?',
  'Current medications?',
  'Since when symptoms?',
  'Any allergies?',
  'Locality?',
  'Previous diagnoses?',
  'Preferred language?',
]
const TRANSCRIPT_LINES = [
  { role: 'ai', text: "Hello, I'm your G1 health assistant. Let's build your report together." },
  { role: 'user', text: 'My name is Rajesh Kumar, 43 years old.' },
  { role: 'ai', text: "Got it, Rajesh. What's your height and weight?" },
  { role: 'user', text: 'Around 5 foot 8, 74 kilos.' },
  { role: 'ai', text: "Thanks. Now tell me what's been bothering you." },
  { role: 'user', text: 'Chest pain since 3 days, gets worse at night.' },
]
const REPORT_FIELDS = [
  { label: 'Patient', value: 'Rajesh Kumar, M, 43' },
  { label: 'Chief Complaint', value: 'Chest pain × 3 days, nocturnal exacerbation' },
  { label: 'BMI', value: '24.8 — Normal' },
  { label: 'Risk Flag', value: '⚠ Cardiac screening recommended', accent: true },
  { label: 'Next Step', value: 'ECG + Lipid panel' },
]

// --- Data for Feature 03: Scan (Visual AI) ---
const SCAN_CLASSES = [
  { name: 'Eczema / Skin Rash', conf: '94%' },
  { name: 'X-Ray / Bone Fracture', conf: '88%' },
  { name: 'Burn / Tissue Grade 2', conf: '91%' },
  { name: 'Prescription OCR Scan', conf: '99%' },
]

// --- Data for Feature 04: Yoga ---
const YOGA_POSES = [
  { name: 'Tadasana (Mountain Pose)', status: 'Done', score: '98%' },
  { name: 'Vrikshasana (Tree Pose)', status: 'Active', score: '94%' },
  { name: 'Virabhadrasana (Warrior)', status: 'Pending', score: '--' },
]

// --- Data for Feature 05: Offline ---
const OFFLINE_CARD = [
  { label: 'Blood Group', value: 'O Negative' },
  { label: 'Allergies', value: 'Penicillin, Dust' },
  { label: 'Emergency Contact', value: '+91 98765 43210' },
]

// --- Data for Feature 06: Memory ---
const TIMELINE_EVENTS = [
  { date: 'Jun 12, 2026', type: 'Consultation', title: 'Viral Fever Follow-up' },
  { date: 'Mar 08, 2026', type: 'Lab Report', title: 'CBC & Thyroid Panel' },
  { date: 'Jan 15, 2026', type: 'Prescription', title: 'Anti-hypertensive meds' },
]

const FEATURES_DEEP = [
  {
    id: 'chat',
    n: '01',
    name: 'Chatbot',
    title: 'Chat in your language. Any dialect.',
    description: 'Hindi, Bhojpuri, Tamil, Hinglish — ask G1 anything in the language you think in. It translates, simplifies medical terms, and responds instantly.',
    colorClass: 'bg-b-blue',
  },
  {
    id: 'voice',
    n: '02',
    name: 'Voice AI',
    title: 'Talk to a doctor. Get a report.',
    description: 'Speak your symptoms out loud. G1 walks through 10 sequential clinical questions, compiles a structured doctor report, and schedules next steps.',
    colorClass: 'bg-b-orange',
  },
  {
    id: 'scan',
    n: '03',
    name: 'Scan AI',
    title: 'Photo your symptoms. Scan reports.',
    description: 'Photograph skin issues, upload heart scans and X-rays, or scan printed prescriptions. G1 classifies anomalies and formats them for your profile.',
    colorClass: 'bg-b-red',
  },
  {
    id: 'yoga',
    n: '04',
    name: 'Yoga Pose',
    title: 'Real-time posture coaching.',
    description: 'Track and correct your form live through your phone camera. G1 evaluates pose coordinates, scores alignment accuracy, and guides hold timers.',
    colorClass: 'bg-b-green',
  },
  {
    id: 'offline',
    n: '05',
    name: 'Offline-First',
    title: 'Works entirely without internet.',
    description: 'On-device models search your local medical library, compile offline answers, and sync automatically as soon as a connection is detected.',
    colorClass: 'bg-b-purple',
  },
  {
    id: 'memory',
    n: '06',
    name: 'Timeline',
    title: 'Your health history, remembered.',
    description: 'A longitudinal, linked health timeline. Connect symptoms, drug prescriptions, and clinical files across months and years automatically.',
    colorClass: 'bg-b-yellow',
  },
]

export function VoiceGrid() {
  const [activeTab, setActiveTab] = useState(1) // index in FEATURES_DEEP (default to Voice AI which is 1)
  const [activeQ, setActiveQ] = useState(2) // sequential questions active index
  const [laserPos, setLaserPos] = useState(0) // scanner laser position for Scan AI
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi')

  // Scanner animation loop
  useEffect(() => {
    if (activeTab !== 2) return
    const interval = setInterval(() => {
      setLaserPos(prev => (prev === 0 ? 100 : 0))
    }, 1800)
    return () => clearInterval(interval)
  }, [activeTab])

  const currentFeature = FEATURES_DEEP[activeTab]

  return (
    <section id="voice" className="px-4 py-24 sm:px-8 sm:py-32 bg-paper relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-fg-muted uppercase sm:text-sm">
            Interactive Capabilities
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-tight text-fg uppercase">
            Deep dive into <span className="text-accent">G1.</span>
          </h2>
        </div>

        {/* Tab Controls Carousel Selectors */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 border-b border-border pb-6">
          {FEATURES_DEEP.map((feat, idx) => {
            const isActive = activeTab === idx
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(idx)}
                className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-ink text-paper scale-105 shadow-md'
                    : 'bg-surface-2 text-fg-muted hover:bg-surface-3 hover:text-fg'
                }`}
              >
                <span className="opacity-45 mr-1.5">{feat.n}</span>
                {feat.name}
              </button>
            )
          })}
        </div>

        {/* Selected slide title & intro text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeature.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-8 max-w-3xl text-center"
          >
            <h3 className="font-display text-2xl font-black uppercase text-fg sm:text-4xl">
              {currentFeature.title}
            </h3>
            <p className="mt-4 text-sm font-semibold text-fg-muted sm:text-base leading-relaxed">
              {currentFeature.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ─── Bento Grid Renderers for each Feature ─── */}
        <div className="mt-14 overflow-hidden min-h-[640px] lg:min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.id}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 lg:grid-cols-2"
            >
              {/* === FEATURE 01: CHATBOT === */}
              {currentFeature.id === 'chat' && (
                <>
                  {/* BOX 1: Dialect Wheel */}
                  <div className="relative flex h-72 flex-col items-center justify-center overflow-hidden rounded-3xl bg-b-blue text-ink sm:h-80 p-6">
                    <Sparkles className="absolute top-4 right-4 size-5 opacity-40 animate-pulse" />
                    <p className="font-display text-xs tracking-widest uppercase opacity-65 mb-4">Choose Dialect</p>
                    <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                      {CHAT_LANGUAGES.map(lang => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLanguage(lang)}
                          className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                            selectedLanguage === lang
                              ? 'bg-ink text-paper scale-105'
                              : 'bg-ink/10 text-ink hover:bg-ink/20'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2">
                      <Languages className="size-4 animate-bounce" />
                      <span className="text-xs font-black uppercase">Active Engine: {selectedLanguage}-G1</span>
                    </div>
                  </div>

                  {/* BOX 2: Live Translation Feed */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-surface border border-border-strong sm:h-80">
                    <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                      <MessageSquare className="size-4 text-b-blue" />
                      <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Dialect Engine Feed</span>
                    </div>
                    <div className="flex-1 overflow-hidden px-5 py-4 space-y-3">
                      {CHAT_MOCK.map((line, i) => (
                        <div key={i} className={`flex gap-2 ${line.role === 'ai' ? '' : 'flex-row-reverse'}`}>
                          <div className={`size-5 shrink-0 rounded-full text-[9px] font-black flex items-center justify-center mt-0.5 ${line.role === 'ai' ? 'bg-accent text-accent-fg' : 'bg-b-blue text-ink'}`}>
                            {line.role === 'ai' ? 'G1' : 'U'}
                          </div>
                          <p className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs font-medium leading-snug ${line.role === 'ai' ? 'bg-surface-2 text-fg-muted' : 'bg-b-blue text-ink'}`}>
                            {line.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOX 3: Standardization Index */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-b-green text-ink sm:h-80 p-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-ink/10">
                      <Activity className="size-4" />
                      <span className="font-display text-xs uppercase font-black">Standardization Index</span>
                    </div>
                    <div className="flex-1 space-y-3 pt-3">
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Input Sentence ({selectedLanguage})</p>
                        <p className="text-xs font-black mt-0.5">"Mujhe sar dard hai"</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Clinical Translation</p>
                        <p className="text-xs font-black mt-0.5">Cephalgia / Headache</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Engine Confidence</p>
                        <p className="text-xs font-black mt-0.5">99.8% Match Rate</p>
                      </div>
                    </div>
                  </div>

                  {/* BOX 4: Bottom-Right Trigger View */}
                  <div className="flex h-72 flex-col gap-3 rounded-3xl bg-b-purple p-6 text-ink sm:h-80">
                    <span className="font-display text-xs uppercase font-black opacity-60">Integration Layout</span>
                    <p className="text-xs font-medium opacity-70">
                      Expand the dialect selector instantly by tapping the bottom-right bubble on any screen.
                    </p>
                    <div className="mt-auto rounded-2xl bg-ink p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-accent flex items-center justify-center">
                          <MessageSquare className="size-4 text-accent-fg animate-pulse" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-paper uppercase">Dialect Picker</p>
                          <p className="text-[9px] text-paper/60">Bottom-Right Overlay</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-accent/25 text-accent text-[10px] font-black uppercase px-2.5 py-1">
                        Active
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* === FEATURE 02: VOICE AI === */}
              {currentFeature.id === 'voice' && (
                <>
                  {/* BOX 1 — AI Orb */}
                  <div className="relative flex h-72 flex-col items-center justify-center overflow-hidden rounded-3xl bg-b-orange text-ink sm:h-80">
                    {[80, 120, 160, 200].map((size, i) => (
                      <motion.div
                        key={size}
                        className="absolute rounded-full border border-ink/20"
                        style={{ width: size, height: size }}
                        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                      />
                    ))}
                    <motion.div
                      className="relative z-10 flex size-16 items-center justify-center rounded-full bg-ink text-paper shadow-xl"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Mic className="size-7" strokeWidth={2} />
                    </motion.div>
                    <p className="relative z-10 mt-5 font-display text-xl font-black uppercase">G1 is listening</p>
                    <p className="relative z-10 mt-1 text-xs font-bold opacity-60">Your voice. Your language.</p>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold opacity-60">Question {activeQ + 1} / {QUESTIONS.length}</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/20">
                        <motion.div
                          className="h-full bg-ink/70 rounded-full"
                          animate={{ width: `${((activeQ + 1) / QUESTIONS.length) * 100}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* BOX 2 — Live Transcript */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-surface border border-border-strong sm:h-80">
                    <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                      <div className="size-2 animate-pulse rounded-full bg-b-green" />
                      <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Live Transcript</span>
                    </div>
                    <div className="flex-1 overflow-hidden px-5 py-3 space-y-3">
                      <AnimatePresence initial={false}>
                        {TRANSCRIPT_LINES.map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.12 }}
                            className={`flex gap-2 ${line.role === 'ai' ? '' : 'flex-row-reverse'}`}
                          >
                            <div className={`size-5 shrink-0 rounded-full text-[9px] font-black flex items-center justify-center mt-0.5 ${line.role === 'ai' ? 'bg-accent text-accent-fg' : 'bg-b-orange text-ink'}`}>
                              {line.role === 'ai' ? 'G1' : 'U'}
                            </div>
                            <p className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs font-medium leading-snug ${line.role === 'ai' ? 'bg-surface-2 text-fg-muted' : 'bg-b-orange text-ink'}`}>
                              {line.text}
                            </p>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    <div className="border-t border-border px-5 py-3">
                      <p className="text-xs font-bold text-fg-muted mb-1.5">Sequential questions</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {QUESTIONS.slice(0, 5).map((q, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveQ(i)}
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${i === activeQ ? 'bg-accent text-accent-fg' : 'bg-surface-2 text-fg-muted hover:bg-accent/20'}`}
                          >
                            Q{i + 1}
                          </button>
                        ))}
                        <span className="text-[10px] text-fg-subtle self-center">+5 more</span>
                      </div>
                      <p className="mt-1.5 text-xs text-fg-muted italic">"{QUESTIONS[activeQ]}"</p>
                    </div>
                  </div>

                  {/* BOX 3 — Report Generation */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-b-green text-ink sm:h-80">
                    <div className="flex items-center gap-2 px-5 py-3">
                      <FileText className="size-5" strokeWidth={2.5} />
                      <span className="font-display text-sm uppercase font-black">Doctor Report</span>
                      <span className="ml-auto text-xs font-bold opacity-60">Generated instantly</span>
                    </div>
                    <div className="flex-1 px-6 space-y-2 overflow-hidden">
                      {REPORT_FIELDS.map(({ label, value, accent }) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35 }}
                          className={`flex items-start justify-between border-b border-ink/20 pb-2 ${accent ? 'text-b-red' : ''}`}
                        >
                          <span className="text-xs font-bold opacity-70 shrink-0 mr-3">{label}</span>
                          <span className={`text-xs font-black text-right ${accent ? 'text-b-red font-black' : ''}`}>{value}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-6 pb-5 pt-3 flex items-center gap-2">
                      <Loader2 className="size-3.5 animate-spin opacity-60" strokeWidth={2.5} />
                      <span className="text-xs font-bold opacity-60">Building your report…</span>
                    </div>
                  </div>

                  {/* BOX 4 — Actions */}
                  <div className="flex h-72 flex-col gap-3 rounded-3xl bg-b-purple p-6 text-ink sm:h-80">
                    <div className="flex items-center gap-2">
                      <Send className="size-5" strokeWidth={2.5} />
                      <span className="font-display text-sm uppercase font-black">Send & Schedule</span>
                    </div>
                    <p className="text-xs font-medium opacity-70 leading-relaxed">
                      Share the report with your doctor or schedule a check-up.
                    </p>
                    <div className="mt-auto space-y-2">
                      {[
                        { label: 'Send report to Dr. Mehta', sub: 'WhatsApp · Email · Portal', bg: 'bg-ink text-paper' },
                        { label: 'Schedule follow-up', sub: '3-day reminder set', bg: 'bg-ink/20 text-ink' },
                      ].map(({ label, sub, bg }) => (
                        <button key={label} className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left transition-all ${bg}`}>
                          <div>
                            <p className="text-xs font-black">{label}</p>
                            <p className="text-[9px] opacity-60 mt-0.5">{sub}</p>
                          </div>
                          <ChevronRight className="size-4 shrink-0 opacity-60" strokeWidth={2.5} />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* === FEATURE 03: SCAN AI === */}
              {currentFeature.id === 'scan' && (
                <>
                  {/* BOX 1: Camera Scan Viewfinder */}
                  <div className="relative flex h-72 flex-col items-center justify-center overflow-hidden rounded-3xl bg-b-red text-ink sm:h-80 p-6">
                    <Camera className="absolute top-4 right-4 size-5 opacity-40" />
                    <div className="relative h-44 w-60 rounded-xl border-2 border-dashed border-ink/40 flex flex-col items-center justify-center overflow-hidden">
                      {/* Scanning Laser Line */}
                      <motion.div
                        className="absolute inset-x-0 h-1 bg-accent shadow-[0_0_12px_4px_var(--color-accent)] z-20"
                        animate={{ top: [`${laserPos}%`] }}
                        style={{ top: '0%' }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <div className="absolute inset-0 bg-ink/10 flex items-center justify-center">
                        <span className="text-[10px] font-black uppercase opacity-60 tracking-wider">Scanning Document...</span>
                      </div>
                    </div>
                    <span className="text-xs font-black uppercase mt-3">Prescription OCR Classifier</span>
                  </div>

                  {/* BOX 2: Detection List */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-surface border border-border-strong sm:h-80 p-5">
                    <div className="flex items-center gap-2 border-b border-border pb-3">
                      <div className="size-2 rounded-full bg-b-red" />
                      <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Model Confidence Output</span>
                    </div>
                    <div className="flex-1 space-y-3 pt-4">
                      {SCAN_CLASSES.map(cls => (
                        <div key={cls.name} className="flex justify-between border-b border-border pb-2">
                          <span className="text-xs font-bold text-fg-muted">{cls.name}</span>
                          <span className="text-xs font-black text-accent">{cls.conf}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOX 3: Extracted Metadata */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-b-green text-ink sm:h-80 p-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-ink/10">
                      <FileText className="size-4" />
                      <span className="font-display text-xs uppercase font-black">Extracted Metadata</span>
                    </div>
                    <div className="flex-1 space-y-3 pt-3">
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Medicine Identified</p>
                        <p className="text-xs font-black">Paracetamol 650mg</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Dosage Rule</p>
                        <p className="text-xs font-black">1-0-1 (Twice daily after meals)</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Anomaly Check</p>
                        <p className="text-xs font-black text-b-red">⚠ Potential drug interaction flagged</p>
                      </div>
                    </div>
                  </div>

                  {/* BOX 4: Quick Actions */}
                  <div className="flex h-72 flex-col gap-3 rounded-3xl bg-b-purple p-6 text-ink sm:h-80">
                    <span className="font-display text-xs uppercase font-black opacity-60">Record Syncing</span>
                    <p className="text-xs font-medium opacity-70">
                      Add the processed scan to your history or share it instantly with the clinic.
                    </p>
                    <div className="mt-auto space-y-2">
                      <button className="flex w-full items-center justify-between rounded-xl bg-ink px-4 py-2.5 text-left text-paper transition-all">
                        <span className="text-xs font-black">Save to Memory Profile</span>
                        <ChevronRight className="size-4 opacity-60" />
                      </button>
                      <button className="flex w-full items-center justify-between rounded-xl bg-ink/20 px-4 py-2.5 text-left transition-all">
                        <span className="text-xs font-black">Send Scan to Pharmacist</span>
                        <ChevronRight className="size-4 opacity-60" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* === FEATURE 04: YOGA === */}
              {currentFeature.id === 'yoga' && (
                <>
                  {/* BOX 1: Stick Skeleton Viewfinder */}
                  <div className="relative flex h-72 flex-col items-center justify-center overflow-hidden rounded-3xl bg-b-green text-ink sm:h-80 p-6">
                    <Heart className="absolute top-4 right-4 size-5 opacity-40" />
                    <div className="relative h-40 w-44 rounded-full border-4 border-ink/30 flex items-center justify-center bg-ink/5">
                      <svg viewBox="0 0 100 100" className="h-28 w-28 text-ink">
                        <circle cx="50" cy="20" r="8" fill="currentColor" />
                        <line x1="50" y1="28" x2="50" y2="65" stroke="currentColor" strokeWidth="4" />
                        <line x1="50" y1="35" x2="25" y2="20" stroke="currentColor" strokeWidth="4" />
                        <line x1="50" y1="35" x2="75" y2="20" stroke="currentColor" strokeWidth="4" />
                        <line x1="50" y1="65" x2="30" y2="90" stroke="currentColor" strokeWidth="4" />
                        <line x1="50" y1="65" x2="70" y2="90" stroke="currentColor" strokeWidth="4" />
                      </svg>
                      <span className="absolute top-2 right-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-black text-paper uppercase">
                        94%
                      </span>
                    </div>
                    <span className="text-xs font-black uppercase mt-3">Live Frame Coordinates</span>
                  </div>

                  {/* BOX 2: Pose List & Completed Poses */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-surface border border-border-strong sm:h-80 p-5">
                    <div className="flex items-center gap-2 border-b border-border pb-3">
                      <CheckCircle2 className="size-4 text-b-green" />
                      <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Session Routine</span>
                    </div>
                    <div className="flex-1 space-y-3 pt-4">
                      {YOGA_POSES.map(pose => (
                        <div key={pose.name} className="flex justify-between border-b border-border pb-2 items-center">
                          <span className="text-xs font-bold text-fg-muted">{pose.name}</span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            pose.status === 'Done' ? 'bg-b-green text-ink' : pose.status === 'Active' ? 'bg-b-orange text-ink animate-pulse' : 'bg-surface-3 text-fg-subtle'
                          }`}>{pose.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOX 3: Feedback Stats */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-b-orange text-ink sm:h-80 p-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-ink/10">
                      <TrendingUp className="size-4" />
                      <span className="font-display text-xs uppercase font-black">Live Performance Stats</span>
                    </div>
                    <div className="flex-1 space-y-3 pt-3">
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Spine Alignment</p>
                        <p className="text-xs font-black">178° (Perfect)</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Balance Stability</p>
                        <p className="text-xs font-black">Steady (Low jitter)</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Hold Timer</p>
                        <p className="text-xs font-black text-b-red animate-pulse">8s remaining</p>
                      </div>
                    </div>
                  </div>

                  {/* BOX 4: Coach Settings */}
                  <div className="flex h-72 flex-col gap-3 rounded-3xl bg-b-purple p-6 text-ink sm:h-80">
                    <span className="font-display text-xs uppercase font-black opacity-60">Coaching Controls</span>
                    <p className="text-xs font-medium opacity-70">
                      Adjust voice commands or output a posture alignment summary of your daily stretches.
                    </p>
                    <div className="mt-auto space-y-2">
                      <button className="flex w-full items-center justify-between rounded-xl bg-ink px-4 py-2.5 text-left text-paper transition-all">
                        <span className="text-xs font-black">Enable Audio Cues</span>
                        <ChevronRight className="size-4 opacity-60" />
                      </button>
                      <button className="flex w-full items-center justify-between rounded-xl bg-ink/20 px-4 py-2.5 text-left transition-all">
                        <span className="text-xs font-black">Export Routine Report</span>
                        <ChevronRight className="size-4 opacity-60" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* === FEATURE 05: OFFLINE === */}
              {currentFeature.id === 'offline' && (
                <>
                  {/* BOX 1: Signal strength bars */}
                  <div className="relative flex h-72 flex-col items-center justify-center overflow-hidden rounded-3xl bg-b-purple text-ink sm:h-80 p-6">
                    <WifiOff className="absolute top-4 right-4 size-5 opacity-40" />
                    <div className="flex items-end gap-2.5 h-20 mb-6">
                      {[15, 30, 48, 65, 85].map((height, idx) => (
                        <div
                          key={idx}
                          className="w-4 rounded-t-sm bg-ink/10"
                          style={{ height }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-black uppercase text-b-red animate-pulse">No Network Connection</span>
                    <span className="text-xs font-bold opacity-60 mt-1">Local Processing Enabled</span>
                  </div>

                  {/* BOX 2: Local RAG search mock */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-surface border border-border-strong sm:h-80 p-5">
                    <div className="flex items-center gap-2 border-b border-border pb-3">
                      <Database className="size-4 text-b-purple" />
                      <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Local Health Database</span>
                    </div>
                    <div className="flex-1 space-y-3 pt-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-fg-subtle">Local Query</p>
                        <p className="text-xs font-black">"What are my allergies?"</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-fg-subtle">Engine Response (0ms Cloud Latency)</p>
                        <p className="text-xs font-black text-accent">"You are allergic to Penicillin and Dust."</p>
                      </div>
                    </div>
                  </div>

                  {/* BOX 3: Emergency Card Offline Payload */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-b-orange text-ink sm:h-80 p-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-ink/10">
                      <FileText className="size-4" />
                      <span className="font-display text-xs uppercase font-black">Encrypted offline card</span>
                    </div>
                    <div className="flex-1 space-y-3 pt-3">
                      {OFFLINE_CARD.map(card => (
                        <div key={card.label} className="flex justify-between border-b border-ink/15 pb-2">
                          <span className="text-xs font-bold opacity-75">{card.label}</span>
                          <span className="text-xs font-black">{card.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOX 4: Sync control */}
                  <div className="flex h-72 flex-col gap-3 rounded-3xl bg-b-yellow p-6 text-ink sm:h-80">
                    <span className="font-display text-xs uppercase font-black opacity-60">Sync Operations</span>
                    <p className="text-xs font-medium opacity-70">
                      All local notes, queries and classifications automatically backup to the cloud once a network signal is recovered.
                    </p>
                    <div className="mt-auto">
                      <button className="flex w-full items-center justify-between rounded-xl bg-ink px-4 py-2.5 text-left text-paper transition-all">
                        <span className="text-xs font-black">Enable Auto-Sync</span>
                        <ChevronRight className="size-4 opacity-60" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* === FEATURE 06: TIMELINE === */}
              {currentFeature.id === 'memory' && (
                <>
                  {/* BOX 1: Timeline Map */}
                  <div className="relative flex h-72 flex-col overflow-hidden rounded-3xl bg-b-yellow text-ink sm:h-80 p-6">
                    <Calendar className="absolute top-4 right-4 size-5 opacity-40" />
                    <p className="font-display text-xs tracking-widest uppercase opacity-65 mb-4">Patient Journey Map</p>
                    <div className="flex-1 flex flex-col justify-between relative pl-4 border-l border-ink/20">
                      {TIMELINE_EVENTS.map((event, idx) => (
                        <div key={idx} className="relative mb-2 last:mb-0">
                          <div className="absolute -left-[21px] top-1.5 size-2.5 rounded-full bg-accent border-2 border-b-yellow" />
                          <p className="text-[10px] font-bold opacity-60 leading-none">{event.date}</p>
                          <p className="text-xs font-black uppercase tracking-tight mt-0.5 leading-none">{event.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOX 2: Connected Node Map */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-surface border border-border-strong sm:h-80 p-5">
                    <div className="flex items-center gap-2 border-b border-border pb-3">
                      <Layers className="size-4 text-b-yellow" />
                      <span className="text-xs font-bold text-fg-muted uppercase tracking-wider">Connected Symptoms Index</span>
                    </div>
                    <div className="flex-1 space-y-3 pt-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-fg-subtle">Cluster Node</p>
                        <p className="text-xs font-black">Hyperacidity / Indigestion</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-fg-subtle">Correlated Factors</p>
                        <p className="text-xs font-black text-accent">Links to 3 doctor visits & 2 prescription scans</p>
                      </div>
                    </div>
                  </div>

                  {/* BOX 3: Medication Record */}
                  <div className="flex h-72 flex-col overflow-hidden rounded-3xl bg-b-blue text-ink sm:h-80 p-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-ink/10">
                      <Activity className="size-4" />
                      <span className="font-display text-xs uppercase font-black">Medication Tracker</span>
                    </div>
                    <div className="flex-1 space-y-3 pt-3">
                      <div className="flex justify-between border-b border-ink/10 pb-1.5">
                        <span className="text-xs font-bold">Amlodipine 5mg</span>
                        <span className="text-[10px] font-black uppercase text-accent">Active</span>
                      </div>
                      <div className="flex justify-between border-b border-ink/10 pb-1.5">
                        <span className="text-xs font-bold">Azithromycin 500mg</span>
                        <span className="text-[10px] font-black uppercase opacity-55">Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* BOX 4: Export Options */}
                  <div className="flex h-72 flex-col gap-3 rounded-3xl bg-b-purple p-6 text-ink sm:h-80">
                    <span className="font-display text-xs uppercase font-black opacity-60">Records Integration</span>
                    <p className="text-xs font-medium opacity-70">
                      Unify with official governmental healthcare profiles or print records securely.
                    </p>
                    <div className="mt-auto space-y-2">
                      <button className="flex w-full items-center justify-between rounded-xl bg-ink px-4 py-2.5 text-left text-paper transition-all">
                        <span className="text-xs font-black">Unify with ABHA ID</span>
                        <ChevronRight className="size-4 opacity-60" />
                      </button>
                      <button className="flex w-full items-center justify-between rounded-xl bg-ink/20 px-4 py-2.5 text-left transition-all">
                        <span className="text-xs font-black">Export Health Timeline</span>
                        <ChevronRight className="size-4 opacity-60" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
