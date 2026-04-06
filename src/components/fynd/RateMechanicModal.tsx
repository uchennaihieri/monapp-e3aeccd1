import { useState } from 'react'
import { Star, Search } from 'lucide-react'
import { ModalOverlay, CloseBtn, AmberBtn } from './ModalOverlay'
import type { Vehicle } from './VehicleDetailModal'

const DUMMY_MECHANICS = [
  { id: '1', name: 'Chukwu Emeka' },
  { id: '2', name: 'Adebayo Tunde' },
  { id: '3', name: 'Ibrahim Musa' },
  { id: '4', name: 'Okafor Nnamdi' },
  { id: '5', name: 'Balogun Segun' },
]

export default function RateMechanicModal({ vehicles, onClose }: { vehicles: Vehicle[]; onClose: () => void }) {
  const [search, setSearch] = useState('')
  const [selectedMechanic, setSelectedMechanic] = useState<string | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const filtered = DUMMY_MECHANICS.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
  const canSubmit = selectedMechanic && selectedVehicle && rating > 0

  function handleSubmit() {
    if (!canSubmit) return
    // Dummy — swap with real API later
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <ModalOverlay onClose={onClose}>
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(232,160,32,0.12)' }}>
            <Star size={24} className="text-amber-500 fill-amber-500" />
          </div>
          <h2 className="font-bold text-lg text-gray-900 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Thank you!</h2>
          <p className="text-sm text-gray-400 mb-5">Your rating has been submitted.</p>
          <AmberBtn onClick={onClose}>Done</AmberBtn>
        </div>
      </ModalOverlay>
    )
  }

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Rate Mechanic</h2>
        <CloseBtn onClick={onClose} />
      </div>

      {/* Search mechanic */}
      <label className="text-xs font-semibold text-gray-500 mb-1 block">Search Mechanic</label>
      <div className="relative mb-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setSelectedMechanic(null) }}
          placeholder="Type mechanic name…"
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none focus:border-gray-300 transition-colors"
        />
      </div>

      {/* Mechanic list */}
      {search.trim() && !selectedMechanic && (
        <div className="space-y-1 mb-3 max-h-36 overflow-y-auto">
          {filtered.length === 0 && <p className="text-xs text-gray-400 py-2 text-center">No mechanics found</p>}
          {filtered.map(m => (
            <button
              key={m.id}
              onClick={() => { setSelectedMechanic(m.id); setSearch(m.name) }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-900 hover:bg-amber-50 transition-colors cursor-pointer border-none bg-transparent"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {m.name}
            </button>
          ))}
        </div>
      )}

      {selectedMechanic && (
        <>
          {/* Select vehicle */}
          <label className="text-xs font-semibold text-gray-500 mb-1 block mt-2">Vehicle Serviced</label>
          <select
            value={selectedVehicle ?? ''}
            onChange={e => setSelectedVehicle(e.target.value || null)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none focus:border-gray-300 mb-4 cursor-pointer"
          >
            <option value="">Select vehicle…</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>{v.name} {v.year} — {v.plate}</option>
            ))}
          </select>

          {/* Star rating */}
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Your Rating</label>
          <div className="flex items-center gap-1 mb-5">
            {[1, 2, 3, 4, 5].map(i => (
              <button
                key={i}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i)}
                className="p-1 cursor-pointer bg-transparent border-none"
              >
                <Star
                  size={28}
                  className={`transition-colors ${
                    i <= (hoverRating || rating)
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-gray-200'
                  }`}
                />
              </button>
            ))}
            {rating > 0 && <span className="text-sm font-bold text-gray-600 ml-2">{rating}/5</span>}
          </div>

          <AmberBtn onClick={handleSubmit}>Submit Rating</AmberBtn>
        </>
      )}
    </ModalOverlay>
  )
}
