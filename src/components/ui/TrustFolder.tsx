import { useRef, type RefObject } from 'react'
import { Folder, FolderOpen } from 'lucide-react'
import { motion } from 'framer-motion'

interface TrustFolderProps {
  label: string
  color: string
  isOpen: boolean
  onOpen: () => void
  initial: { top: string; left: string; rotate: number }
  canvasRef: RefObject<HTMLDivElement | null>
}

/**
 * A draggable folder icon that opens on click. Distinguishes a genuine
 * click from a drag-release with a ref flag (set in onDrag, cleared on
 * pointer down) rather than relying on Framer's onTap gesture recognizer,
 * which listens for raw pointer events and doesn't fire for synthetic
 * `click()` calls (browser automation, some test tooling).
 */
export function TrustFolder({ label, color, isOpen, onOpen, initial, canvasRef }: TrustFolderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const draggedRef = useRef(false)

  return (
    <motion.div
      ref={ref}
      drag
      dragConstraints={canvasRef}
      dragElastic={0.15}
      dragMomentum={false}
      onPointerDown={() => {
        draggedRef.current = false
      }}
      onDrag={() => {
        draggedRef.current = true
      }}
      onPointerUp={() => {
        if (!draggedRef.current) onOpen()
      }}
      whileDrag={{ scale: 1.06, cursor: 'grabbing' }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      initial={false}
      style={{ position: 'absolute', top: initial.top, left: initial.left, rotate: initial.rotate }}
      className="flex w-24 cursor-grab flex-col items-center gap-2 select-none touch-none sm:w-28"
    >
      {isOpen ? (
        <FolderOpen className="size-16 drop-shadow-sm sm:size-20" style={{ color }} strokeWidth={1.5} fill={color} fillOpacity={0.18} />
      ) : (
        <Folder className="size-16 drop-shadow-sm sm:size-20" style={{ color }} strokeWidth={1.5} fill={color} fillOpacity={0.18} />
      )}
      <span className="rounded-full bg-surface/80 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-fg shadow-sm">
        {label}
      </span>
    </motion.div>
  )
}
