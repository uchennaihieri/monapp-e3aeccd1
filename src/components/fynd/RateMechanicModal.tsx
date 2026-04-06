import { useState } from 'react'
import { Star, Search, Wrench, Calendar, Banknote, User, Car } from 'lucide-react'
import { ModalOverlay, CloseBtn, AmberBtn } from './ModalOverlay'

interface RepairRecord {
  id: string
  mechanicName: string
  vehicleName: string
  plateNumber: string
  repairType: string
  description: string
  amountPaid: number
  date: string
  status: 'completed' | 'in-progress'
  rating: number | null
}

const DUMMY_REPAIRS: RepairRecord[] = [
  { id: 'r1', mechanicName: 'Chukwu Emeka', vehicleName: 'Toyota Camry', plateNumber: 'LAG-234-AB', repairType: 'Engine Overhaul', description: 'Complete engine rebuild with new gaskets and timing belt', amountPaid: 185000, date: '2026-03-28', status: 'completed', rating: null },
  { id: 'r2', mechanicName: 'Adebayo Tunde', vehicleName: 'Honda Accord', plateNumber: 'ABJ-901-CD', repairType: 'Electrical Rewiring', description: 'Dashboard wiring harness replacement and alternator fix', amountPaid: 75000, date: '2026-03-15', status: 'completed', rating: null },
  { id: 'r3', mechanicName: 'Ibrahim Musa', vehicleName: 'Toyota Camry', plateNumber: 'LAG-234-AB', repairType: 'Body Respray', description: 'Full body respray — pearl white with clear coat', amountPaid: 320000, date: '2026-02-20', status: 'completed', rating: 4 },
  { id: 'r4', mechanicName: 'Balogun Segun', vehicleName: 'Honda Accord', plateNumber: 'ABJ-901-CD', repairType: 'Brake Pad Replacement', description: 'Front and rear brake pads with rotor resurfacing', amountPaid: 45000, date: '2026-01-10', status: 'completed', rating: 5 },
]

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          className="p-0.5 cursor-pointer bg-transparent border-none"
        >
          <Star
            size={28}
            className={`transition-colors ${i <= (hover || value) ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`}
          />
        </button>
      ))}
      {value > 0 && <span className="text-sm font-bold text-gray-600 ml-2">{value}/5</span>}
    </div>
  )
}

export default function RateMechanicModal({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState<RepairRecord[]>([])
  const [selected, setSelected] = useState<RepairRecord | null>(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSearch() {
    if (!search.trim()) return
    const q = search.toLowerCase()
    const found = DUMMY_REPAIRS.filter(
      r =>
        r.plateNumber.toLowerCase().includes(q) ||
        r.mechanicName.toLowerCase().includes(q) ||
        r.vehicleName.toLowerCase().includes(q)
    )
    setResults(found)
    setSearched(true)
    setSelected(null)
    setRating(0)
    setComment('')
  }

  function handleSubmit() {
    if (!selected || rating === 0) return
    setSubmitted(true)
  }

  const fmt = (n: number) => '₦' + n.toLocaleString()

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

  if (selected) {
    return (
      <ModalOverlay onClose={onClose}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Rate Repair</h2>
          <CloseBtn onClick={onClose} />
        </div>

        {/* Repair summary */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Wrench size={14} className="text-amber-500" />
            <span className="font-semibold text-gray-900">{selected.repairType}</span>
          </div>
          <p className="text-xs text-gray-400">{selected.description}</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><User size={12} /> {selected.mechanicName}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Car size={12} /> {selected.vehicleName}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Calendar size={12} /> {selected.date}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Banknote size={12} /> {fmt(selected.amountPaid)}</div>
          </div>
          <p className="text-[0.65rem] text-gray-300 mt-1">Plate: {selected.plateNumber}</p>
        </div>

        {selected.rating ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 mb-2">You already rated this repair</p>
            <div className="flex items-center justify-center gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={22} className={i <= selected.rating! ? 'text-amber-500 fill-amber-500' : 'text-gray-200'} />
              ))}
            </div>
            <AmberBtn onClick={() => { setSelected(null); setRating(0) }}>Back to results</AmberBtn>
          </div>
        ) : (
          <>
            <label className="text-xs font-semibold text-gray-500 mb-2 block">Your Rating</label>
            <StarRating value={rating} onChange={setRating} />

            <label className="text-xs font-semibold text-gray-500 mb-1 block mt-4">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="How was the repair experience?"
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none focus:border-gray-300 resize-none mb-4"
            />

            <AmberBtn onClick={handleSubmit}>Submit Rating</AmberBtn>
          </>
        )}
      </ModalOverlay>
    )
  }

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Rate Mechanic</h2>
        <CloseBtn onClick={onClose} />
      </div>

      <p className="text-xs text-gray-400 mb-3">Search for your repair by plate number, vehicle name, or mechanic name.</p>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="e.g. LAG-234-AB or Chukwu"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none focus:border-gray-300 transition-colors"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold border-none cursor-pointer transition-colors"
          style={{ background: '#E8A020', color: '#fff' }}
        >
          Search
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
          {results.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-6">No repair records found.</p>
          )}
          {results.map(r => (
            <button
              key={r.id}
              onClick={() => { setSelected(r); setRating(0); setComment('') }}
              className="w-full text-left p-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-amber-200 transition-colors cursor-pointer block"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-gray-900">{r.repairType}</span>
                {r.rating ? (
                  <span className="flex items-center gap-0.5 text-xs text-amber-500">
                    <Star size={10} className="fill-amber-500" /> {r.rating}/5
                  </span>
                ) : (
                  <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold">Unrated</span>
                )}
              </div>
              <p className="text-[0.7rem] text-gray-400">{r.mechanicName} · {r.vehicleName} · {r.date}</p>
              <p className="text-[0.7rem] text-gray-400">{fmt(r.amountPaid)} · {r.plateNumber}</p>
            </button>
          ))}
        </div>
      )}
    </ModalOverlay>
  )
}
