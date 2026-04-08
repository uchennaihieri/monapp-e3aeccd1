import { useState, useEffect } from 'react'
import { Phone, Star, MapPin, Search, Loader2, Navigation, ChevronLeft, User } from 'lucide-react'
import { ModalOverlay, CloseBtn } from './ModalOverlay'
import { supabase } from '@/util/supabase'

export interface Mechanic {
  id: string
  first_name: string
  last_name: string
  business_name?: string
  avatar_url?: string
  specialty: string
  lat: number
  lng: number
  rating: number
  phone: string
}

type EnrichedMechanic = Mechanic & { distanceKm: number }

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
  const [mechanics, setMechanics] = useState<Mechanic[]>([])
  const [loadingMechanics, setLoadingMechanics] = useState(true)
  const [selectedMechanic, setSelectedMechanic] = useState<EnrichedMechanic | null>(null)
  const [userLat, setUserLat] = useState<number | null>(null)
  const [userLng, setUserLng] = useState<number | null>(null)
  const [locating, setLocating] = useState(true)
  const [locError, setLocError] = useState('')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('distance')
  const [minRating, setMinRating] = useState(0)

  useEffect(() => {
    async function fetchMechanics() {
      const { data, error } = await supabase.from('mechanic').select('*')
      if (!error && data) {
        setMechanics(data as Mechanic[])
      }
      setLoadingMechanics(false)
    }
    fetchMechanics()
  }, [])

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

  const enriched = mechanics.map(m => ({
    ...m,
    distanceKm: userLat != null && userLng != null ? haversineKm(userLat, userLng, m.lat, m.lng) : 0,
  }))

  const filtered = enriched
    .filter(m => {
      const q = search.toLowerCase()
      const fullName = `${m.first_name} ${m.last_name}`.toLowerCase()
      const bizName = (m.business_name || '').toLowerCase()
      const matchesSearch =
        !q ||
        fullName.includes(q) ||
        bizName.includes(q) ||
        (m.specialty && m.specialty.toLowerCase().includes(q))
      const matchesRating = m.rating >= minRating
      return matchesSearch && matchesRating
    })
    .sort((a, b) => (sortBy === 'distance' ? a.distanceKm - b.distanceKm : b.rating - a.rating))

  return (
    <ModalOverlay onClose={onClose}>
      {selectedMechanic ? (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setSelectedMechanic(null)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
               <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Mechanic Details</h2>
          </div>
          
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-4 overflow-hidden shadow-sm border-4 border-white">
              {selectedMechanic.avatar_url ? (
                <img src={selectedMechanic.avatar_url} alt="Mechanic" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-amber-600" />
              )}
            </div>
            <h3 className="font-bold text-xl text-gray-900 text-center leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              {selectedMechanic.business_name || `${selectedMechanic.first_name} ${selectedMechanic.last_name}`}
            </h3>
            {selectedMechanic.business_name && (
              <p className="text-sm text-gray-500 mt-1">{selectedMechanic.first_name} {selectedMechanic.last_name}</p>
            )}
            <p className="text-xs font-semibold text-amber-700 mt-2 bg-amber-100 px-3 py-1 rounded-full">{selectedMechanic.specialty}</p>
            
            <div className="flex items-center gap-4 mt-5 text-sm text-gray-600 bg-gray-50 py-3 px-4 rounded-2xl w-full justify-center shadow-sm border border-gray-100">
              <span className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">Rating</span>
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  {selectedMechanic.rating ? selectedMechanic.rating.toFixed(1) : 'New'} <Star size={12} className="text-amber-500 fill-amber-500 -mt-0.5" />
                </span>
              </span>
              <div className="w-px h-8 bg-gray-200"></div>
              <span className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">Distance</span>
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  {selectedMechanic.distanceKm.toFixed(1)} km <MapPin size={12} className="text-gray-400 -mt-0.5" />
                </span>
              </span>
            </div>
          </div>

          <a
            href={`tel:${selectedMechanic.phone}`}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold transition-all shadow-sm shadow-green-200 hover:shadow-md"
          >
            <Phone size={18} />
            Call Mechanic Now
          </a>
        </div>
      ) : (
        <>
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
            {loadingMechanics ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Loader2 size={24} className="animate-spin text-amber-500" />
                <p className="text-sm text-gray-500">Finding mechanics nearby...</p>
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No mechanics match your search.</p>
            ) : (
              filtered.map(m => {
                const displayName = m.business_name || `${m.first_name} ${m.last_name}`
                const initials = m.business_name ? m.business_name.substring(0, 2) : `${m.first_name?.[0] || ''}${m.last_name?.[0] || ''}`
                
                return (
                  <div 
                    key={m.id} 
                    onClick={() => setSelectedMechanic(m)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 cursor-pointer hover:border-amber-200 hover:shadow-sm transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 uppercase overflow-hidden ring-2 ring-transparent group-hover:ring-amber-100 transition-all"
                      style={{ background: 'rgba(232,160,32,0.12)', color: '#b8760c', fontFamily: 'Syne, sans-serif' }}
                    >
                      {m.avatar_url ? (
                        <img src={m.avatar_url} alt={displayName} className="w-full h-full object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {displayName}
                      </p>
                      <p className="text-[0.65rem] text-gray-400 truncate">{m.specialty}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Stars rating={m.rating || 0} />
                        <span className="flex items-center gap-0.5 text-[0.65rem] text-gray-400">
                          <MapPin size={10} /> {m.distanceKm.toFixed(1)} km
                        </span>
                      </div>
                    </div>
                    <a
                      href={`tel:${m.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors bg-green-50 hover:bg-green-100"
                    >
                      <Phone size={16} className="text-green-600" />
                    </a>
                  </div>
                )
              })
            )}
          </div>
        </>
      )}
    </ModalOverlay>
  )
}
