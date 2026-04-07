interface Props { isOpen: boolean; onClose: () => void; type?: 'card' | 'fynd' }
export default function SuccessModal({ isOpen, onClose, type = 'card' }: Props) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,0.75)' }}>
      <div className="w-full max-w-sm p-8 text-center rounded-2xl"
        style={{ background: '#111', border: '1px solid var(--border)' }}>
        <div className="text-5xl mb-5">{type === 'fynd' ? '🛡️' : '💳'}</div>
        <h2 className="h3 mb-3">
          {type === 'fynd' ? 'Fynd request received!' : "You're on the list!"}
        </h2>
        <p className="text-white/55 text-sm mb-6 leading-relaxed">
          {type === 'fynd'
            ? 'We\'ll call you to set up your Fynd access and explain the ₦10k refundable balance.'
            : 'We\'ll call you shortly to get your Monapp card set up.'}
        </p>
        <button onClick={onClose} className="btn btn-green btn-full">Done</button>
      </div>
    </div>
  )
}
