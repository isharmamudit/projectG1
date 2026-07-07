import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Styled placeholder for the future multilingual chatbot expander.
 * Intentionally inert — reserves the bottom-right slot so the real
 * component can drop in later without touching layout.
 */
export function ChatbotStub() {
  return (
    <motion.button
      type="button"
      title="Chat with G1 — coming soon"
      aria-label="Chat with G1, coming soon"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08, rotate: -8 }}
      whileTap={{ scale: 0.94 }}
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-ink text-b-yellow shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] sm:right-8 sm:bottom-8 sm:size-16"
    >
      <MessageCircle className="size-6 sm:size-7" strokeWidth={2.25} />
    </motion.button>
  )
}
