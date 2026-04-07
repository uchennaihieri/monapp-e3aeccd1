import { useState } from 'react'
import { Star, Wrench, Calendar, Banknote, User, Car, ChevronRight } from 'lucide-react'
import { ModalOverlay, CloseBtn, AmberBtn } from './ModalOverlay'
import type { Vehicle } from './VehicleDetailModal'

interface RepairRecord {
  id: string
  mechanicName: string
  vehicleId: string
  repairType: string
  description: string
  amountPaid: number
  date: string
  status: 'completed' | 'in-progress'
  rating: number | null
}

// Dummy repairs keyed to vehicle ids — in production this comes from DB
function getDummyRepairs(vehicles: Vehicle[]): RepairRecord[] {
  const records: RepairRecord[] = []
  const repairs = [
    { repairType: 'Engine Overhaul', description: 'Complete engine rebuild with new gaskets and timing belt', mechanicName: 'Chukwu Emeka', amountPaid: 185000, date: '2026-03-28', rating: null },
    { repairType: 'Electrical Rewiring', description: 'Dashboard wiring harness replacement and alternator fix', mechanicName: 'Adebayo Tunde', amountPaid: 75000, date: '2026-03-15', rating: null },
    { repairType: 'Body Respray', description: 'Full body respray — pearl white with clear coat', mechanicName: 'Ibrahim Musa', amountPaid: 320000, date: '2026-02-20', rating: 4 },
    { repairType: 'Brake Pad Replacement', description: 'Front and rear brake pads with rotor resurfacing', mechanicName: 'Balogun Segun', amountPaid: 45000, date: '2026-01-10', rating: 5 },
  ]
  vehicles.forEach((v, vi) => {
    // Give each vehicle 2 repairs from the pool
    const slice = repairs.slice((vi * 2) % repairs.length, (vi * 2) % repairs.length + 2)
    slice.forEach((r, ri) => {
      records.push({ id: `${v.id}-r${ri}`, vehicleId: v.id, status: 'completed', ...r })
    })
  })
  return records
}

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

interface Props {
  onClose: () => void
  vehicles: Vehicle[]
}

export default function RateMechanicModal({ onClose, vehicles }: Props) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [repairs, setRepairs] = useState<RepairRecord[]>([])
  const [selectedRepair, setSelectedRepair] = useState<RepairRecord | null>(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const fmt = (n: number) => '₦' + n.toLocaleString()

  function pickVehicle(v: Vehicle) {
    setSelectedVehicle(v)
    const all = getDummyRepairs(vehicles)
    setRepairs(all.filter(r => r.vehicleId === v.id))
    setSelectedRepair(null)
    setRating(0)
    setComment('')
  }

  function handleSubmit() {
    if (!selectedRepair || rating === 0) return
    setSubmitted(true)
  }

  // ── Success screen ──
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

  // ── Rate selected repair ──
  if (selectedRepair) {
    const v = vehicles.find(x => x.id === selectedRepair.vehicleId)
    return (
      <ModalOverlay onClose={onClose}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Rate Repair</h2>
          <CloseBtn onClick={onClose} />
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Wrench size={14} className="text-amber-500" />
            <span className="font-semibold text-gray-900">{selectedRepair.repairType}</span>
          </div>
          <p className="text-xs text-gray-400">{selectedRepair.description}</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><User size={12} /> {selectedRepair.mechanicName}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Car size={12} /> {v?.name} {v?.year}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Calendar size={12} /> {selectedRepair.date}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Banknote size={12} /> {fmt(selectedRepair.amountPaid)}</div>
          </div>
          <p className="text-[0.65rem] text-gray-300 mt-1">Plate: {v?.plate}</p>
        </div>

        {selectedRepair.rating ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 mb-2">You already rated this repair</p>
            <div className="flex items-center justify-center gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={22} className={i <= selectedRepair.rating! ? 'text-amber-500 fill-amber-500' : 'text-gray-200'} />
              ))}
            </div>
            <AmberBtn onClick={() => { setSelectedRepair(null); setRating(0) }}>Back to repairs</AmberBtn>
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

  // ── Repairs list for selected vehicle ──
  if (selectedVehicle) {
    return (
      <ModalOverlay onClose={onClose}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Repairs — {selectedVehicle.name}</h2>
          <CloseBtn onClick={onClose} />
        </div>

        <button
          onClick={() => { setSelectedVehicle(null); setRepairs([]) }}
          className="text-xs text-amber-600 font-semibold mb-3 bg-transparent border-none cursor-pointer hover:underline"
        >
          ← Choose another vehicle
        </button>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {repairs.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-6">No repair records for this vehicle.</p>
          )}
          {repairs.map(r => (
            <button
              key={r.id}
              onClick={() => { setSelectedRepair(r); setRating(0); setComment('') }}
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
              <p className="text-[0.7rem] text-gray-400">{r.mechanicName} · {r.date}</p>
              <p className="text-[0.7rem] text-gray-400">{fmt(r.amountPaid)}</p>
            </button>
          ))}
        </div>
      </ModalOverlay>
    )
  }

  // ── Vehicle picker ──
  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Rate Mechanic</h2>
        <CloseBtn onClick={onClose} />
      </div>

      <p className="text-xs text-gray-400 mb-3">Select a vehicle to see its repair history and rate the mechanic's work.</p>

      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
        {vehicles.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-6">No vehicles registered yet.</p>
        )}
        {vehicles.map(v => (
          <button
            key={v.id}
            onClick={() => pickVehicle(v)}
            className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white text-left cursor-pointer hover:border-amber-200 hover:bg-amber-50/30 transition-all"
          >
            <Car size={18} className="text-gray-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-gray-900 truncate" style={{ fontFamily: 'Syne, sans-serif' }}>{v.name} {v.year}</p>
              <p className="text-xs text-gray-400">{v.plate}</p>
            </div>
            <ChevronRight size={14} className="text-gray-300 shrink-0" />
          </button>
        ))}
      </div>
    </ModalOverlay>
  )
}
