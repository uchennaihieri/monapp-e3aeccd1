import { ModalOverlay, CloseBtn } from './ModalOverlay'

export type VehicleStatus = 'active' | 'missing' | 'sold' | 'inactive'

export interface Vehicle {
  id: string
  name: string
  year: string
  plate: string
  vin: string
  location: string
  status: VehicleStatus
  photos: { front: string | null; side: string | null; rear: string | null; interior: string | null }
}

export const STATUS_COLORS: Record<VehicleStatus, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-green-50', text: 'text-green-600', label: 'Active' },
  missing: { bg: 'bg-red-50', text: 'text-red-600', label: 'Missing' },
  sold: { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Sold' },
  inactive: { bg: 'bg-yellow-50', text: 'text-yellow-600', label: 'Inactive' },
}

const PHOTO_LABELS: { key: keyof Vehicle['photos']; label: string }[] = [
  { key: 'front', label: 'Front' },
  { key: 'side', label: 'Side' },
  { key: 'rear', label: 'Rear' },
  { key: 'interior', label: 'Interior' },
]

interface Props {
  vehicle: Vehicle
  onClose: () => void
  onChangeStatus: (vehicleId: string, status: VehicleStatus) => void
}

export default function VehicleDetailModal({ vehicle, onClose, onChangeStatus }: Props) {
  const s = STATUS_COLORS[vehicle.status]
  const hasPhotos = Object.values(vehicle.photos).some(Boolean)

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Vehicle Details</h2>
        <CloseBtn onClick={onClose} />
      </div>

      {/* Photos */}
      {hasPhotos && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {PHOTO_LABELS.map(({ key, label }) => (
            vehicle.photos[key] ? (
              <div key={key} className="relative rounded-xl overflow-hidden aspect-[4/3] border border-gray-100">
                <img src={vehicle.photos[key]!} alt={label} className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 left-1.5 text-[0.6rem] font-bold text-white bg-black/50 px-2 py-0.5 rounded-full">{label}</span>
              </div>
            ) : (
              <div key={key} className="rounded-xl aspect-[4/3] border border-gray-100 bg-gray-50 flex items-center justify-center">
                <span className="text-[0.65rem] text-gray-300">{label}</span>
              </div>
            )
          ))}
        </div>
      )}

      {/* Details */}
      <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4 space-y-3">
        {[
          ['Vehicle', `${vehicle.name} ${vehicle.year}`],
          ['Plate Number', vehicle.plate],
          ...(vehicle.vin ? [['VIN', vehicle.vin]] : []),
          ['Location', vehicle.location],
        ].map(([l, val]) => (
          <div key={l} className="flex justify-between text-sm">
            <span className="text-gray-400">{l}</span>
            <span className="font-bold text-gray-900">{val}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-400">Status</span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
        </div>
      </div>

      {/* Change Status */}
      <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-300 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Change Status</p>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(STATUS_COLORS) as VehicleStatus[])
          .filter(st => st !== vehicle.status)
          .map(st => {
            const sc = STATUS_COLORS[st]
            return (
              <button
                key={st}
                onClick={() => onChangeStatus(vehicle.id, st)}
                className={`py-2.5 rounded-xl text-xs font-semibold border cursor-pointer transition-all hover:shadow-sm ${sc.bg} ${sc.text} border-gray-200`}
              >
                Mark as {sc.label}
              </button>
            )
          })}
      </div>
    </ModalOverlay>
  )
}
