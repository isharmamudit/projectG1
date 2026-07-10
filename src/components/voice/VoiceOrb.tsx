import { motion } from 'framer-motion'
import { Mic, Loader2, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type VoiceMode = 'idle' | 'listening' | 'reviewing' | 'thinking' | 'speaking'

const RING_COUNT = 3

export function VoiceOrb({ mode, onTap }: { mode: VoiceMode; onTap: () => void }) {
  const tappable = mode === 'idle' || mode === 'listening'

  return (
    <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
      {(mode === 'listening' || mode === 'speaking') &&
        Array.from({ length: RING_COUNT }).map((_, i) => (
          <motion.span
            key={i}
            className={cn(
              'absolute rounded-full',
              mode === 'listening' ? 'bg-accent/20' : 'bg-tint-amber/20',
            )}
            style={{ width: 180, height: 180 }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          />
        ))}

      <motion.button
        type="button"
        onClick={onTap}
        disabled={!tappable}
        aria-label={mode === 'idle' ? 'Start talking' : mode === 'listening' ? 'Stop listening' : 'G1'}
        animate={
          mode === 'thinking'
            ? { scale: [1, 1.04, 1] }
            : mode === 'speaking'
              ? { scale: [1, 1.08, 1] }
              : { scale: 1 }
        }
        transition={{ duration: 1.1, repeat: mode === 'thinking' || mode === 'speaking' ? Infinity : 0, ease: 'easeInOut' }}
        whileHover={tappable ? { scale: 1.04 } : {}}
        whileTap={tappable ? { scale: 0.96 } : {}}
        className={cn(
          'relative flex size-[180px] items-center justify-center rounded-full',
          'bg-gradient-to-br from-accent via-accent/70 to-tint-amber/60',
          'border border-white/30 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_0_25px_rgba(255,255,255,0.15)] backdrop-blur-xl',
          tappable ? 'cursor-pointer' : 'cursor-default',
        )}
      >
        {mode === 'thinking' ? (
          <Loader2 className="size-12 animate-spin text-paper" strokeWidth={2} />
        ) : mode === 'speaking' ? (
          <Volume2 className="size-12 text-paper" strokeWidth={2} />
        ) : (
          <Mic className="size-12 text-paper" strokeWidth={2} />
        )}
      </motion.button>
    </div>
  )
}
