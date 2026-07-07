import { LanguageProvider } from '@/lib/language'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Navbar } from '@/components/layout/Navbar'
import { ChatbotStub } from '@/components/layout/ChatbotStub'
import { Footer } from '@/components/layout/Footer'
import { Splash } from '@/components/ui/Splash'
import { SmoothCursor } from '@/components/ui/SmoothCursor'
import { Marquee } from '@/components/ui/Marquee'
import { HorizontalScroll } from '@/components/ui/HorizontalScroll'
import { Hero } from '@/components/sections/Hero'
import { Problems } from '@/components/sections/Problems'
import { VoiceGrid } from '@/components/sections/VoiceGrid'
import { India } from '@/components/sections/India'
import { Trust } from '@/components/sections/Trust'
import { CTA } from '@/components/sections/CTA'

const FEATURES = [
  'Chat in 12+ Indian languages',
  'Talk to G1 — get a doctor report',
  'Scan symptoms with your camera',
  'Real-time yoga coaching',
  'Works without internet',
  'Your full health history, one place',
  'Speaks Hindi, Tamil, Bhojpuri & more',
  'Send reports directly to your doctor',
]

function App() {
  return (
    <LanguageProvider>
      <Splash />
      <SmoothCursor />
      <SmoothScroll>
        <Navbar />
        <main>
          {/* 1. Hero */}
          <Hero />

          {/* Feature ribbon */}
          <Marquee items={FEATURES} />

          {/* 2. Problems — why existing apps fail */}
          <Problems />

          {/* 3. Horizontal scroll — 6 main features */}
          <HorizontalScroll />

          {/* Feature ribbon */}
          <Marquee items={FEATURES} />

          {/* 4. Voice AI — deep dive 4-box grid */}
          <VoiceGrid />

          {/* 5. India reach */}
          <India />

          {/* 6. Trust */}
          <Trust />

          {/* 7. CTA */}
          <CTA />
        </main>
        <Footer />
        <ChatbotStub />
      </SmoothScroll>
    </LanguageProvider>
  )
}

export default App
