import { Link } from 'react-router-dom'

export default function FyndDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#eee' }}>
        <img src="/icons/monapp-logo-white.svg" alt="Monapp" style={{ height: 22, filter: 'invert(1)' }} />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(232,160,32,0.12)', color: 'var(--amber)', fontFamily: 'Syne, sans-serif' }}>
            JD
          </div>
        </div>
      </header>

      <div className="flex-1 px-5 py-8">
        <div className="w-full max-w-lg mx-auto">
          {/* Greeting */}
          <h1 className="mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#0a0a0a' }}>
            Welcome back 👋
          </h1>
          <p className="text-sm mb-8" style={{ color: '#888' }}>Your vehicle protection is active</p>

          {/* Status card */}
          <div className="p-5 rounded-2xl mb-4" style={{ background: '#0a0a0a' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>Fynd Status</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(46,204,95,0.15)', color: '#2ecc5f' }}>Active</span>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-extrabold" style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', color: 'var(--amber)' }}>₦25,000</span>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Security Balance · Refundable</p>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: '🔧', label: 'Find Mechanic', desc: 'Nearby verified mechanics' },
              { icon: '🚨', label: 'Report Missing', desc: 'Alert the network' },
              { icon: '📋', label: 'My Vehicle', desc: 'View details' },
              { icon: '💰', label: 'Withdraw', desc: 'Request balance' },
            ].map(({ icon, label, desc }) => (
              <button key={label} className="flex flex-col items-start p-4 rounded-xl text-left cursor-pointer transition-all"
                style={{ background: '#fafafa', border: '1.5px solid #eee' }}
              >
                <span className="text-xl mb-2">{icon}</span>
                <span className="text-sm font-bold" style={{ color: '#0a0a0a', fontFamily: 'Syne, sans-serif' }}>{label}</span>
                <span className="text-xs" style={{ color: '#999' }}>{desc}</span>
              </button>
            ))}
          </div>

          {/* Vehicle info */}
          <div className="p-5 rounded-2xl" style={{ background: '#fafafa', border: '1.5px solid #eee' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#bbb', fontFamily: 'Syne, sans-serif' }}>Registered Vehicle</p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,160,32,0.08)' }}>
                <span className="text-2xl">🚗</span>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#0a0a0a', fontFamily: 'Syne, sans-serif' }}>Toyota Camry 2020</p>
                <p className="text-xs" style={{ color: '#999' }}>ABC-123-XY · Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t flex justify-around py-3" style={{ borderColor: '#eee' }}>
        {[
          { icon: '🏠', label: 'Home', active: true },
          { icon: '🔧', label: 'Mechanics', active: false },
          { icon: '🛡️', label: 'Fynd', active: false },
          { icon: '👤', label: 'Profile', active: false },
        ].map(({ icon, label, active }) => (
          <button key={label} className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer">
            <span className="text-lg">{icon}</span>
            <span className="text-[0.6rem] font-semibold" style={{ color: active ? 'var(--amber)' : '#bbb' }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
