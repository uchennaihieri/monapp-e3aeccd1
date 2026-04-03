import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ theme = 'green' }: { theme?: 'green' | 'amber' }) {
  const [open, setOpen] = useState(false)
  const accent = theme === 'amber' ? 'var(--amber)' : 'var(--green-bright)'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-4"
      style={{ backdropFilter: 'blur(16px)', background: 'rgba(10,10,10,0.82)', borderBottom: '1px solid var(--border)' }}>

      {/* ONE logo — always */}
      <Link to="/" className="flex-shrink-0">
        <img src="/icons/monapp-logo-white.svg" alt="Monapp" style={{ height: 26, width: 'auto' }} />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        <a href="/#how" className="text-[0.72rem] tracking-[0.12em] uppercase text-white/50 hover:text-white no-underline transition-colors">How it works</a>
        <Link to="/fynd" className="text-[0.72rem] tracking-[0.12em] uppercase text-white/50 hover:text-white no-underline transition-colors">Fynd</Link>
        <Link to="/fynd" className="btn btn-ghost text-[0.72rem] tracking-[0.1em] uppercase !px-5 !py-2" style={{ borderColor: accent, color: accent }}>
          Protect My Vehicle
        </Link>
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setOpen(o => !o)}
        className="md:hidden bg-transparent border-none text-white/60 hover:text-white cursor-pointer text-xl p-1">
        {open ? '✕' : '☰'}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute top-full left-0 right-0 flex flex-col"
          style={{ background: '#111', borderBottom: '1px solid var(--border)' }}>
          <a href="/#how" onClick={() => setOpen(false)} className="px-6 py-4 text-sm text-white/55 hover:text-white no-underline" style={{ borderBottom: '1px solid var(--border)' }}>How it works</a>
          <Link to="/fynd" onClick={() => setOpen(false)} className="px-6 py-4 text-sm text-white/55 hover:text-white no-underline" style={{ borderBottom: '1px solid var(--border)' }}>Fynd</Link>
          <div className="p-5">
            <Link to="/fynd" onClick={() => setOpen(false)} className="btn btn-full text-sm" style={{ background: accent, color: '#0a0a0a' }}>
              Protect My Vehicle →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
