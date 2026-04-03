import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ShieldCheck, Wrench, AlertTriangle, Car, Wallet, Plus, ArrowDownToLine, X, ChevronRight, Clock, CalendarDays, Banknote } from 'lucide-react'

const TODAY = new Date()
const MATURITY = new Date(TODAY.getFullYear() + 1, TODAY.getMonth(), TODAY.getDate())
const fmt = (d: Date) => d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })

export default function FyndDashboardPage() {
  const [balance, setBalance] = useState(0)
  const [fyndActive, setFyndActive] = useState(false)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showActivate, setShowActivate] = useState(false)
  const [showActivateConfirm, setShowActivateConfirm] = useState(false)

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <img src="/icons/monapp-logo-white.svg" alt="Monapp" className="h-[22px]" style={{ filter: 'invert(1)' }} />
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-amber-50 text-amber-600" style={{ fontFamily: 'Syne, sans-serif' }}>
          JD
        </div>
      </header>

      <div className="flex-1 px-5 py-6">
        <div className="w-full max-w-lg mx-auto">
          {/* Greeting */}
          <h1 className="mb-1 text-gray-900" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.35rem' }}>
            Welcome back 👋
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            {fyndActive ? 'Your vehicle protection is active' : 'Set up your vehicle protection'}
          </p>

          {/* Status Card */}
          <div className="rounded-2xl p-5 mb-4 text-white" style={{ background: '#0a0a0a' }}>
            <div className="flex items-center justify-between mb-4">
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
            <p className="text-[0.7rem] text-white/35 mb-5">Security Balance · Refundable</p>

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
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setShowDeposit(true)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-800 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Plus size={16} className="text-green-600" />
              Add Deposit
            </button>
            <button
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-800 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <ArrowDownToLine size={16} className="text-amber-600" />
              Withdraw
            </button>
          </div>

          {/* Quick Actions */}
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-300 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Quick Actions</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: Wrench, label: 'Find Mechanic', desc: 'Nearby verified mechanics' },
              { icon: AlertTriangle, label: 'Report Missing', desc: 'Alert the network' },
              { icon: Car, label: 'My Vehicle', desc: 'View details' },
              { icon: Wallet, label: 'Transactions', desc: 'View history' },
            ].map(({ icon: Icon, label, desc }) => {
              const locked = !fyndActive && (label === 'Find Mechanic' || label === 'Report Missing')
              return (
                <button
                  key={label}
                  disabled={locked}
                  className={`flex flex-col items-start p-4 rounded-xl text-left transition-all border ${
                    locked
                      ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-40'
                      : 'bg-white border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <Icon size={20} className={`mb-2 ${locked ? 'text-gray-300' : 'text-gray-700'}`} />
                  <span className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>{label}</span>
                  <span className="text-xs text-gray-400">{desc}</span>
                </button>
              )
            })}
          </div>

          {/* Vehicle */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-300 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Registered Vehicle</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Car size={22} className="text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Toyota Camry 2020</p>
                <p className="text-xs text-gray-400">ABC-123-XY · Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="border-t border-gray-100 flex justify-around py-3">
        {[
          { icon: Shield, label: 'Home', active: true },
          { icon: Wrench, label: 'Mechanics', active: false },
          { icon: ShieldCheck, label: 'Fynd', active: false },
          { icon: Car, label: 'Vehicle', active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button key={label} className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer">
            <Icon size={20} className={active ? 'text-amber-500' : 'text-gray-300'} />
            <span className={`text-[0.6rem] font-semibold ${active ? 'text-amber-500' : 'text-gray-300'}`}>{label}</span>
          </button>
        ))}
      </div>

      {/* ── Deposit Modal ── */}
      <AnimatePresence>
        {showDeposit && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-5"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowDeposit(false)}
          >
            <motion.div
              initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
              onClick={e => e.stopPropagation()}
              className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Add Deposit</h2>
                <button onClick={() => setShowDeposit(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-bold text-gray-900">₦25,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Bank</span>
                  <span className="font-bold text-gray-900">Wema Bank</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Account Number</span>
                  <span className="font-bold text-gray-900">8230145679</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Account Name</span>
                  <span className="font-bold text-gray-900">Monapp Technologies Ltd</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                Transfer the exact amount above. Your balance will be updated once the payment is confirmed.
              </p>

              <button
                onClick={handleMoneySent}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-black cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: 'var(--amber)' }}
              >
                Money Sent
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Activate Confirmation Modal ── */}
      <AnimatePresence>
        {showActivateConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-5"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowActivateConfirm(false)}
          >
            <motion.div
              initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
              onClick={e => e.stopPropagation()}
              className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>Activate Fynd</h2>
                <button onClick={() => setShowActivateConfirm(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Banknote size={16} className="text-gray-400 shrink-0" />
                  <span className="text-gray-400">Security Deposit</span>
                  <span className="ml-auto font-bold text-gray-900">₦25,000</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDays size={16} className="text-gray-400 shrink-0" />
                  <span className="text-gray-400">Start Date</span>
                  <span className="ml-auto font-bold text-gray-900">{fmt(TODAY)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={16} className="text-gray-400 shrink-0" />
                  <span className="text-gray-400">Maturity Date</span>
                  <span className="ml-auto font-bold text-gray-900">{fmt(MATURITY)}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                ₦25,000 will be held as a refundable security deposit for 12 months. You can withdraw after maturity.
              </p>

              <button
                onClick={confirmActivation}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-black cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ background: 'var(--amber)' }}
              >
                <ShieldCheck size={16} />
                Confirm & Activate
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
