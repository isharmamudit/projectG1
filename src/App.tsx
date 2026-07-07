import { ThemeProvider } from '@/lib/theme'
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
  'Multilingual Chatbot · Gemini',
  'Voice AI · Vapi · 11labs',
  'Image Classification · CV',
  'Yoga Pose Estimator · YOLO',
  'Local RAG · Ollama',
  'Living Health Record',
  '12+ Indian dialects',
  'Doctor report generation',
]

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App
