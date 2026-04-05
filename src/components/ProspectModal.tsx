import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { supabase } from '@/util/supabase'

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara',
]

interface Props {
  isOpen: boolean
  phone: string
  onClose: () => void
  onSuccess: () => void
}

export default function ProspectModal({ isOpen, phone, onClose, onSuccess }: Props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [state, setState] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!firstName.trim() || !lastName.trim() || !state) {
      setError('Please fill in all fields')
      return
    }
    setError('')
    setLoading(true)
    try {
      const { error: dbError } = await supabase.from('prospects').insert({
        phoneNumber: phone,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        state,
        converted: false,
        converter: null,
      })
      if (dbError) throw dbError
      setFirstName('')
      setLastName('')
      setState('')
      onSuccess()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-5"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl p-6"
            style={{ background: '#111', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-white">Almost there!</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <X size={16} className="text-white/60" />
              </button>
            </div>

            <p className="text-white/50 text-sm mb-5">Enter your name so our agents can reach you.</p>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/25 transition-colors"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/25 transition-colors"
              />
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-white/25 transition-colors appearance-none"
                style={{ colorScheme: 'dark' }}
              >
                <option value="" disabled>Select State</option>
                {NIGERIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                onClick={submit}
                disabled={loading}
                className="btn btn-green btn-full text-[1rem] flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : 'Submit'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )


  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please fill in both fields')
      return
    }
    setError('')
    setLoading(true)
    try {
      const { error: dbError } = await supabase.from('prospects').insert({
        phoneNumber: phone,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        converted: false,
        converter: null,
      })
      if (dbError) throw dbError
      setFirstName('')
      setLastName('')
      onSuccess()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-5"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl p-6"
            style={{ background: '#111', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-white">Almost there!</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <X size={16} className="text-white/60" />
              </button>
            </div>

            <p className="text-white/50 text-sm mb-5">Enter your name so our agents can reach you.</p>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/25 transition-colors"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/25 transition-colors"
              />

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                onClick={submit}
                disabled={loading}
                className="btn btn-green btn-full text-[1rem] flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : 'Submit'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
