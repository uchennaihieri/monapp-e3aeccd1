import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ShieldCheck, Wrench, AlertTriangle, Plus, ArrowDownToLine, Clock, CalendarDays, Banknote, ChevronRight, PlusCircle } from 'lucide-react'
import { ModalOverlay, CloseBtn, AmberBtn } from '../components/fynd/ModalOverlay'
import AddVehicleModal from '../components/fynd/AddVehicleModal'
import VehicleDetailModal, { STATUS_COLORS, type Vehicle, type VehicleStatus } from '../components/fynd/VehicleDetailModal'

const TODAY = new Date()
const MATURITY = new Date(TODAY.getFullYear() + 1, TODAY.getMonth(), TODAY.getDate())
const fmt = (d: Date) => d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })

const INITIAL_VEHICLES: Vehicle[] = [
  { id: '1', name: 'Toyota Camry', year: '2020', plate: 'ABC-123-XY', vin: '', location: 'Lagos', status: 'active', photos: { front: null, side: null, rear: null, interior: null } },
]

export default function FyndDashboardPage() {
  const [balance, setBalance] = useState(0)
  const [fyndActive, setFyndActive] = useState(false)
  const [autoRenew, setAutoRenew] = useState(true)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showActivateConfirm, setShowActivateConfirm] = useState(false)
  const [showReportMissing, setShowReportMissing] = useState(false)
  const [showVehicleDetail, setShowVehicleDetail] = useState<Vehicle | null>(null)
  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES)

  const canActivate = balance >= 25000

  function handleActivateClick() {
    if (!canActivate) return
    setShowActivateConfirm(true)
  }

  function confirmActivation() {
    setFyndActive(true)
    setShowActivateConfirm(false)
  }

  function handleMoneySent() {
    setBalance(prev => prev + 25000)
    setShowDeposit(false)
  }

  function addVehicle(data: { name: string; year: string; vin: string; plate: string; location: string; photos: Vehicle['photos'] }) {
    const id = String(Date.now())
    setVehicles(prev => [...prev, { id, ...data, status: 'active' as VehicleStatus }])
    setShowAddVehicle(false)
  }

  function changeVehicleStatus(vehicleId: string, status: VehicleStatus) {
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, status } : v))
    setShowVehicleDetail(null)
  }

  function reportMissing(vehicleId: string) {
    changeVehicleStatus(vehicleId, 'missing')
    setShowReportMissing(false)
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
        <img src="/icons/monapp-logo-white.svg" alt="Monapp" className="h-[22px]" style={{ filter: 'invert(1)' }} />
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-amber-50 text-amber-600" style={{ fontFamily: 'Syne, sans-serif' }}>
          JD
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="w-full max-w-lg mx-auto">
          {/* Greeting */}
          <h1 className="mb-1 text-gray-900" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.25rem' }}>
            Welcome back 👋
          </h1>
          <p className="text-sm text-gray-400 mb-5">
            {fyndActive ? 'Your vehicle protection is active' : 'Set up your vehicle protection'}
          </p>

          {/* Status Card */}
          <div className="rounded-2xl p-5 mb-3 text-white" style={{ background: '#0a0a0a' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/40">Fynd Status</span>
              <span className={`text-[0.65rem] font-bold px-3 py-1 rounded-full ${fyndActive ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                {fyndActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-extrabold" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', color: 'var(--amber)' }}>
                ₦{balance.toLocaleString()}
              </span>
            </div>
            <p className="text-[0.7rem] text-white/35 mb-4">Security Balance · Refundable</p>

            {!fyndActive && (
              <button
                onClick={handleActivateClick}
                disabled={!canActivate}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  canActivate
                    ? 'text-black cursor-pointer hover:opacity-90'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
                style={canActivate ? { background: 'var(--amber)' } : undefined}
              >
                <ShieldCheck size={16} />
                {canActivate ? 'Activate Fynd' : 'Deposit ₦25,000 to activate'}
              </button>
            )}
          </div>

          {/* Deposit / Withdraw */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => setShowDeposit(true)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-800 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Plus size={16} className="text-green-600" />
              Add Deposit
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-800 cursor-pointer hover:bg-gray-50 transition-colors">
              <ArrowDownToLine size={16} className="text-amber-600" />
              Withdraw
            </button>
          </div>

          {/* Quick Actions */}
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-300 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Quick Actions</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: Wrench, label: 'Find Mechanic', desc: 'Nearby verified' },
              { icon: AlertTriangle, label: 'Report Missing', desc: 'Alert network', action: () => fyndActive && setShowReportMissing(true) },
            ].map(({ icon: Icon, label, desc, action }) => {
              const locked = !fyndActive
              return (
                <button
                  key={label}
                  disabled={locked}
                  onClick={() => action?.()}
                  className={`flex flex-col items-start p-3 rounded-xl text-left transition-all border ${
                    locked
                      ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-40'
                      : 'bg-white border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <Icon size={18} className={`mb-1.5 ${locked ? 'text-gray-300' : 'text-gray-700'}`} />
                  <span className="text-xs font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{label}</span>
                  <span className="text-[0.65rem] text-gray-400">{desc}</span>
                </button>
              )
            })}
          </div>

          {/* Vehicles */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-300" style={{ fontFamily: 'Syne, sans-serif' }}>Vehicles</p>
            <button onClick={() => setShowAddVehicle(true)} className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-transparent border-none cursor-pointer hover:text-amber-700">
              <PlusCircle size={14} /> Add
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
            {vehicles.map(v => {
              const s = STATUS_COLORS[v.status]
              return (
                <button
                  key={v.id}
                  onClick={() => setShowVehicleDetail(v)}
                  className="min-w-[200px] p-4 rounded-xl bg-gray-50 border border-gray-100 text-left cursor-pointer hover:border-gray-200 hover:shadow-sm transition-all shrink-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                  <p className="font-bold text-sm text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{v.name} {v.year}</p>
                  <p className="text-xs text-gray-400">{v.plate} · {v.location}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {showDeposit && (
          <ModalOverlay onClose={() => setShowDeposit(false)}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Add Deposit</h2>
              <CloseBtn onClick={() => setShowDeposit(false)} />
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4 space-y-3">
              {[['Amount', '₦25,000'], ['Bank', 'Wema Bank'], ['Account Number', '8230145679'], ['Account Name', 'Monapp Technologies Ltd']].map(([l, v]) => (
                <div key={l} className="flex justify-between text-sm">
                  <span className="text-gray-400">{l}</span>
                  <span className="font-bold text-gray-900">{v}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mb-5 leading-relaxed">Transfer the exact amount above. Your balance will be updated once the payment is confirmed.</p>
            <AmberBtn onClick={handleMoneySent}>Money Sent</AmberBtn>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showActivateConfirm && (
          <ModalOverlay onClose={() => setShowActivateConfirm(false)}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Activate Fynd</h2>
              <CloseBtn onClick={() => setShowActivateConfirm(false)} />
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4 space-y-3">
              {[
                { icon: Banknote, label: 'Security Deposit', value: '₦25,000' },
                { icon: CalendarDays, label: 'Start Date', value: fmt(TODAY) },
                { icon: Clock, label: 'Maturity Date', value: fmt(MATURITY) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <Icon size={16} className="text-gray-400 shrink-0" />
                  <span className="text-gray-400">{label}</span>
                  <span className="ml-auto font-bold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100 mb-5 cursor-pointer">
              <input type="checkbox" checked={autoRenew} onChange={e => setAutoRenew(e.target.checked)} className="w-4 h-4 rounded accent-amber-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Auto-renew</p>
                <p className="text-xs text-gray-500">Keep Fynd active after maturity without reactivating</p>
              </div>
            </label>
            <p className="text-xs text-gray-400 mb-5 leading-relaxed">₦25,000 will be held as a refundable security deposit for 12 months. You can withdraw after maturity.</p>
            <AmberBtn onClick={confirmActivation} icon={<ShieldCheck size={16} />}>Confirm & Activate</AmberBtn>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReportMissing && (
          <ModalOverlay onClose={() => setShowReportMissing(false)}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Report Missing Vehicle</h2>
              <CloseBtn onClick={() => setShowReportMissing(false)} />
            </div>
            <p className="text-sm text-gray-500 mb-4">Select the vehicle to report as missing:</p>
            <div className="space-y-2">
              {vehicles.filter(v => v.status === 'active').map(v => (
                <button key={v.id} onClick={() => reportMissing(v.id)} className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white text-left cursor-pointer hover:border-red-300 hover:bg-red-50 transition-all">
                  <AlertTriangle size={18} className="text-gray-400 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{v.name} {v.year}</p>
                    <p className="text-xs text-gray-400">{v.plate} · {v.location}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </button>
              ))}
              {vehicles.filter(v => v.status === 'active').length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No active vehicles to report</p>
              )}
            </div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVehicleDetail && (
          <VehicleDetailModal vehicle={showVehicleDetail} onClose={() => setShowVehicleDetail(null)} onChangeStatus={changeVehicleStatus} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddVehicle && (
          <AddVehicleModal onClose={() => setShowAddVehicle(false)} onAdd={addVehicle} />
        )}
      </AnimatePresence>
    </div>
  )
}
