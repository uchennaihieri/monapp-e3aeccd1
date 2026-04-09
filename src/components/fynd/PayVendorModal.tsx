import { useState } from 'react'
import { Calendar, Hash, Car, Wrench, User, Banknote, Building2, ChevronRight } from 'lucide-react'
import { ModalOverlay, CloseBtn, AmberBtn } from './ModalOverlay'
import type { Vehicle } from './VehicleDetailModal'

interface RepairLookup {
  repairNumber: string
  date: string
  vehicleId: string
  repairType: string
  description: string
  mechanicName: string
  amount: number
  bankName: string
  accountName: string
  accountNumber: string
}

// Dummy lookup — in production this would be an API call
const DUMMY_LOOKUPS: RepairLookup[] = [
  { repairNumber: '40281', date: '2026-03-28', vehicleId: '', repairType: 'Engine Overhaul', description: 'Complete engine rebuild with new gaskets and timing belt', mechanicName: 'Chukwu Emeka', amount: 185000, bankName: 'GTBank', accountName: 'Chukwu Emeka Motors', accountNumber: '0123456789' },
  { repairNumber: '40315', date: '2026-03-15', vehicleId: '', repairType: 'Electrical Rewiring', description: 'Dashboard wiring harness replacement and alternator fix', mechanicName: 'Adebayo Tunde', amount: 75000, bankName: 'Access Bank', accountName: 'Tunde Auto Electrics', accountNumber: '9876543210' },
  { repairNumber: '40220', date: '2026-02-20', vehicleId: '', repairType: 'Body Respray', description: 'Full body respray — pearl white with clear coat', mechanicName: 'Ibrahim Musa', amount: 320000, bankName: 'First Bank', accountName: 'Ibrahim Panel & Paint', accountNumber: '5432167890' },
]

interface Props {
  onClose: () => void
  vehicles: Vehicle[]
  balance: number
}

export default function PayVendorModal({ onClose, vehicles, balance }: Props) {
  const [step, setStep] = useState<'input' | 'review' | 'success'>('input')
 
  const [repairNumber, setRepairNumber] = useState('')
  const [vehicleId, setVehicleId] = useState('')
  const [matchedRepair, setMatchedRepair] = useState<RepairLookup | null>(null)
  const [error, setError] = useState('')

  const fmt = (n: number) => '₦' + n.toLocaleString()

  function handleNext() {
    if (!repairNumber.trim() || !vehicleId) {
      setError('Please fill in all fields')
      return
    }
    // Dummy: match by repair number
    const found = DUMMY_LOOKUPS.find(r => r.repairNumber === repairNumber.trim())
    if (!found) {
      setError('Repair not found. Please check the repair number.')
      return
    }
    setMatchedRepair({ ...found, vehicleId })
    setError('')
    setStep('review')
  }

  function handlePay() {
    // Dummy payment
    setStep('success')
  }

  const selectedVehicle = vehicles.find(v => v.id === vehicleId)

  if (step === 'success') {
    return (
      <ModalOverlay onClose={onClose}>
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(232,160,32,0.12)' }}>
            <Banknote size={24} className="text-amber-500" />
          </div>
          <h2 className="font-bold text-lg text-gray-900 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Payment Sent!</h2>
          <p className="text-sm text-gray-400 mb-5">The vendor has been paid successfully.</p>
          <AmberBtn onClick={onClose}>Done</AmberBtn>
        </div>
      </ModalOverlay>
    )
  }

  if (step === 'review' && matchedRepair) {
    return (
      <ModalOverlay onClose={onClose}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Review Payment</h2>
          <CloseBtn onClick={onClose} />
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 mb-4 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Wrench size={14} className="text-amber-500" />
            <span className="font-semibold text-gray-900">{matchedRepair.repairType}</span>
          </div>
          <p className="text-xs text-gray-400">{matchedRepair.description}</p>

          <div className="border-t border-gray-100 pt-3 space-y-2">
            {[
              { icon: Hash, label: 'Repair #', value: matchedRepair.repairNumber },
              { icon: Calendar, label: 'Date', value: matchedRepair.date },
              { icon: Car, label: 'Vehicle', value: selectedVehicle ? `${selectedVehicle.name} ${selectedVehicle.year}` : '—' },
              { icon: User, label: 'Mechanic', value: matchedRepair.mechanicName },
              { icon: Banknote, label: 'Amount', value: fmt(matchedRepair.amount) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <Icon size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-400">{label}</span>
                <span className="ml-auto font-bold text-gray-900">{value}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 space-y-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-300">Pay to</p>
            {[
              { icon: Building2, label: 'Bank', value: matchedRepair.bankName },
              { icon: User, label: 'Account Name', value: matchedRepair.accountName },
              { icon: Hash, label: 'Account Number', value: matchedRepair.accountNumber },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <Icon size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-400">{label}</span>
                <span className="ml-auto font-bold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setStep('input')}
            className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handlePay}
            className="flex-1 py-3 rounded-xl text-sm font-bold border-none cursor-pointer text-white transition-colors"
            style={{ background: '#E8A020' }}
          >
            Pay {fmt(matchedRepair.amount)}
          </button>
        </div>
      </ModalOverlay>
    )
  }

  // ── Input step ──
  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Pay Vendor</h2>
        <CloseBtn onClick={onClose} />
      </div>

      <p className="text-xs text-gray-400 mb-4">Enter the repair details to find and pay your vendor.</p>

      <div className="space-y-3 mb-4">
        {/* Date
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Repair Date</label>
          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="date"
              value={repairDate}
              onChange={e => setRepairDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none focus:border-gray-300 transition-colors"
            />
          </div>
        </div> */}

        {/* Repair number */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Repair Number</label>
          <div className="relative">
            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              value={repairNumber}
              onChange={e => setRepairNumber(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="e.g. 40281"
              maxLength={5}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none focus:border-gray-300 transition-colors"
            />
          </div>
        </div>

        {/* Vehicle */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Vehicle Repaired</label>
          <div className="relative">
            <Car size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
            <select
              value={vehicleId}
              onChange={e => setVehicleId(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none focus:border-gray-300 transition-colors appearance-none cursor-pointer"
            >
              <option value="">Select vehicle</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>{v.name} {v.year} — {v.plate}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      <AmberBtn onClick={handleNext}>
        Next
      </AmberBtn>
    </ModalOverlay>
  )
}
