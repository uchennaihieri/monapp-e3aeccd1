import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-5"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
        onClick={e => e.stopPropagation()}
        className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
      <X size={16} className="text-gray-500" />
    </button>
  )
}

export function AmberBtn({ children, onClick, icon, disabled }: { children: React.ReactNode; onClick: () => void; icon?: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`w-full py-3.5 rounded-xl text-sm font-bold text-black cursor-pointer transition-opacity flex items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      style={{ background: 'var(--amber)' }}
    >
      {icon}
      {children}
    </button>
  )
}
