import { useState, useEffect } from 'react'
import { Phone, Star, MapPin } from 'lucide-react'
import { ModalOverlay, CloseBtn } from './ModalOverlay'

interface Mechanic {
  id: string
  firstName: string
  lastName: string
  specialty: string
  distance: string
  rating: number
  phone: string
}

// Dummy mechanics data
const DUMMY_MECHANICS: Mechanic[] = [
  { id: '1', firstName: 'Chukwu', lastName: 'Emeka', specialty: 'Engine & Transmission', distance: '1.2 km', rating: 4.5, phone: '+2348012345678' },
  { id: '2', firstName: 'Adebayo', lastName: 'Tunde', specialty: 'Electrical Systems', distance: '2.0 km', rating: 4.8, phone: '+2348023456789' },
  { id: '3', firstName: 'Ibrahim', lastName: 'Musa', specialty: 'Body Work & Painting', distance: '3.5 km', rating: 4.2, phone: '+2348034567890' },
  { id: '4', firstName: 'Okafor', lastName: 'Nnamdi', specialty: 'AC & Cooling', distance: '4.1 km', rating: 3.9, phone: '+2348045678901' },
  { id: '5', firstName: 'Balogun', lastName: 'Segun', specialty: 'Brake & Suspension', distance: '5.8 km', rating: 4.7, phone: '+2348056789012' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}
        />
      ))}
      <span className="text-[0.65rem] text-gray-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function FindMechanicModal({ onClose }: { onClose: () => void }) {
  const [mechanics] = useState<Mechanic[]>(DUMMY_MECHANICS)

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Find Mechanic</h2>
        <CloseBtn onClick={onClose} />
      </div>
      <p className="text-xs text-gray-400 mb-4">Mechanics near your location</p>

      <div className="space-y-2">
        {mechanics.map(m => (
          <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
              style={{ background: 'rgba(232,160,32,0.12)', color: '#b8760c', fontFamily: 'Syne, sans-serif' }}
            >
              {m.firstName[0]}{m.lastName[0]}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-gray-900 truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
                {m.firstName} {m.lastName}
              </p>
              <p className="text-[0.65rem] text-gray-400">{m.specialty}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Stars rating={m.rating} />
                <span className="flex items-center gap-0.5 text-[0.65rem] text-gray-400">
                  <MapPin size={10} /> {m.distance}
                </span>
              </div>
            </div>

            {/* Call button */}
            <a
              href={`tel:${m.phone}`}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors"
              style={{ background: 'rgba(34,197,94,0.1)' }}
            >
              <Phone size={16} className="text-green-600" />
            </a>
          </div>
        ))}
      </div>
    </ModalOverlay>
  )
}
