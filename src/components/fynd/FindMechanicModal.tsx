import { useState, useEffect } from 'react'
import { Phone, Star, MapPin, Search, Loader2, Navigation } from 'lucide-react'
import { ModalOverlay, CloseBtn } from './ModalOverlay'

interface Mechanic {
  id: string
  firstName: string
  lastName: string
  specialty: string
  lat: number
  lng: number
  rating: number
  phone: string
}

const DUMMY_MECHANICS: Mechanic[] = [
  { id: '1', firstName: 'Chukwu', lastName: 'Emeka', specialty: 'Engine & Transmission', lat: 6.4541, lng: 3.3947, rating: 4.5, phone: '+2348012345678' },
  { id: '2', firstName: 'Adebayo', lastName: 'Tunde', specialty: 'Electrical Systems', lat: 6.4600, lng: 3.3890, rating: 4.8, phone: '+2348023456789' },
  { id: '3', firstName: 'Ibrahim', lastName: 'Musa', specialty: 'Body Work & Painting', lat: 6.4700, lng: 3.4050, rating: 4.2, phone: '+2348034567890' },
  { id: '4', firstName: 'Okafor', lastName: 'Nnamdi', specialty: 'AC & Cooling', lat: 6.4450, lng: 3.4100, rating: 3.9, phone: '+2348045678901' },
  { id: '5', firstName: 'Balogun', lastName: 'Segun', specialty: 'Brake & Suspension', lat: 6.4800, lng: 3.3800, rating: 4.7, phone: '+2348056789012' },
  { id: '6', firstName: 'Eze', lastName: 'Chidera', specialty: 'Engine & Transmission', lat: 6.4520, lng: 3.3960, rating: 4.0, phone: '+2348067890123' },
  { id: '7', firstName: 'Yusuf', lastName: 'Aliyu', specialty: 'Diagnostics & Tuning', lat: 6.4650, lng: 3.3920, rating: 4.6, phone: '+2348078901234' },
  { id: '8', firstName: 'Okeke', lastName: 'Ifeanyi', specialty: 'Electrical Systems', lat: 6.4380, lng: 3.4200, rating: 3.8, phone: '+2348089012345' },
]

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

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

type SortBy = 'distance' | 'rating'

export default function FindMechanicModal({ onClose }: { onClose: () => void }) {
  const [userLat, setUserLat] = useState<number | null>(null)
  const [userLng, setUserLng] = useState<number | null>(null)
  const [locating, setLocating] = useState(true)
  const [locError, setLocError] = useState('')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('distance')
  const [minRating, setMinRating] = useState(0)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocError('Geolocation not supported')
      setLocating(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLat(pos.coords.latitude)
        setUserLng(pos.coords.longitude)
        setLocating(false)
      },
      () => {
        setLocError('Location access denied. Showing default distances.')
        // fallback to Lagos Island
        setUserLat(6.4541)
        setUserLng(3.3947)
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  const enriched = DUMMY_MECHANICS.map(m => ({
    ...m,
    distanceKm: userLat != null && userLng != null ? haversineKm(userLat, userLng, m.lat, m.lng) : 0,
  }))

  const filtered = enriched
    .filter(m => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
        m.specialty.toLowerCase().includes(q)
      const matchesRating = m.rating >= minRating
      return matchesSearch && matchesRating
    })
    .sort((a, b) => (sortBy === 'distance' ? a.distanceKm - b.distanceKm : b.rating - a.rating))

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Find Mechanic</h2>
        <CloseBtn onClick={onClose} />
      </div>

      {/* Location status */}
      {locating ? (
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Loader2 size={14} className="animate-spin" /> Detecting your location…
        </div>
      ) : locError ? (
        <p className="text-xs text-amber-600 mb-3 flex items-center gap-1"><Navigation size={12} /> {locError}</p>
      ) : (
        <p className="text-xs text-green-600 mb-3 flex items-center gap-1"><Navigation size={12} /> Location detected</p>
      )}

      {/* Search */}
      <div className="relative mb-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or specialty…"
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none focus:border-gray-300 transition-colors"
        />
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          Sort:
          <button
            onClick={() => setSortBy('distance')}
            className={`px-2 py-1 rounded-lg text-xs border-none cursor-pointer transition-colors ${sortBy === 'distance' ? 'bg-amber-100 text-amber-700 font-semibold' : 'bg-gray-100 text-gray-500'}`}
          >
            Distance
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-2 py-1 rounded-lg text-xs border-none cursor-pointer transition-colors ${sortBy === 'rating' ? 'bg-amber-100 text-amber-700 font-semibold' : 'bg-gray-100 text-gray-500'}`}
          >
            Rating
          </button>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
          Min:
          {[0, 3, 4].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`px-2 py-1 rounded-lg text-xs border-none cursor-pointer transition-colors ${minRating === r ? 'bg-amber-100 text-amber-700 font-semibold' : 'bg-gray-100 text-gray-500'}`}
            >
              {r === 0 ? 'All' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
        {filtered.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-6">No mechanics match your search.</p>
        )}
        {filtered.map(m => (
          <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
              style={{ background: 'rgba(232,160,32,0.12)', color: '#b8760c', fontFamily: 'Syne, sans-serif' }}
            >
              {m.firstName[0]}{m.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-gray-900 truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
                {m.firstName} {m.lastName}
              </p>
              <p className="text-[0.65rem] text-gray-400">{m.specialty}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Stars rating={m.rating} />
                <span className="flex items-center gap-0.5 text-[0.65rem] text-gray-400">
                  <MapPin size={10} /> {m.distanceKm.toFixed(1)} km
                </span>
              </div>
            </div>
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
