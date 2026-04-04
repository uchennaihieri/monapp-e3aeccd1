import { useState, useRef } from 'react'
import { Camera, X } from 'lucide-react'
import { ModalOverlay, CloseBtn, AmberBtn } from './ModalOverlay'

interface VehicleForm {
  name: string
  year: string
  vin: string
  plate: string
  location: string
  photos: { front: string | null; side: string | null; rear: string | null; interior: string | null }
}

const PHOTO_LABELS: { key: keyof VehicleForm['photos']; label: string }[] = [
  { key: 'front', label: 'Front' },
  { key: 'side', label: 'Side' },
  { key: 'rear', label: 'Rear' },
  { key: 'interior', label: 'Interior' },
]

interface Props {
  onClose: () => void
  onAdd: (data: { name: string; year: string; vin: string; plate: string; location: string; photos: VehicleForm['photos'] }) => void
}

export default function AddVehicleModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState<VehicleForm>({
    name: '', year: '', vin: '', plate: '', location: '',
    photos: { front: null, side: null, rear: null, interior: null },
  })
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function handlePhoto(key: keyof VehicleForm['photos'], file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      setForm(prev => ({ ...prev, photos: { ...prev.photos, [key]: reader.result as string } }))
    }
    reader.readAsDataURL(file)
  }

  function removePhoto(key: keyof VehicleForm['photos']) {
    setForm(prev => ({ ...prev, photos: { ...prev.photos, [key]: null } }))
  }

  const canSubmit = form.name.trim() && form.year.trim() && form.plate.trim()

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Add Vehicle</h2>
        <CloseBtn onClick={onClose} />
      </div>

      <div className="space-y-3 mb-5">
        <Input label="Vehicle Name / Make *" placeholder="e.g. Toyota Camry" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} />
        <Input label="Year *" placeholder="e.g. 2020" value={form.year} onChange={v => setForm(p => ({ ...p, year: v }))} />
        <Input label="VIN (optional)" placeholder="Vehicle Identification Number" value={form.vin} onChange={v => setForm(p => ({ ...p, vin: v }))} />
        <Input label="Plate Number *" placeholder="e.g. ABC-123-XY" value={form.plate} onChange={v => setForm(p => ({ ...p, plate: v }))} />
        <Input label="Location" placeholder="e.g. Lagos" value={form.location} onChange={v => setForm(p => ({ ...p, location: v }))} />
      </div>

      <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-300 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Vehicle Photos</p>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {PHOTO_LABELS.map(({ key, label }) => (
          <div key={key} className="relative">
            <input
              ref={el => { fileRefs.current[key] = el }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { if (e.target.files?.[0]) handlePhoto(key, e.target.files[0]) }}
            />
            {form.photos[key] ? (
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-gray-200">
                <img src={form.photos[key]!} alt={label} className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(key)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center cursor-pointer"
                >
                  <X size={12} className="text-white" />
                </button>
                <span className="absolute bottom-1.5 left-1.5 text-[0.6rem] font-bold text-white bg-black/50 px-2 py-0.5 rounded-full">{label}</span>
              </div>
            ) : (
              <button
                onClick={() => fileRefs.current[key]?.click()}
                className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <Camera size={18} className="text-gray-300" />
                <span className="text-[0.65rem] font-semibold text-gray-400">{label}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      <AmberBtn onClick={() => { if (canSubmit) onAdd(form) }}>Add Vehicle</AmberBtn>
    </ModalOverlay>
  )
}

function Input({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 mb-1 block">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-400 transition-colors"
      />
    </div>
  )
}
