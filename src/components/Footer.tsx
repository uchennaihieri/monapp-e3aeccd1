import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 flex-wrap"
      style={{ background: '#060606', borderTop: '1px solid var(--border)' }}>
      <img src="/icons/monapp-logo-white.svg" alt="Monapp" style={{ height: 22, width: 'auto' }} />
      <div className="flex flex-wrap gap-6">
        {[
          { l: 'How it works', h: '/#how' },
          { l: 'Fynd', t: '/fynd' },
          { l: 'Privacy', t: '/privacy' },
          { l: 'Terms', t: '/terms' },
        ].map(({ l, h, t }) => t
          ? <Link key={l} to={t} className="text-[0.7rem] tracking-[0.08em] uppercase text-white/30 hover:text-white/60 no-underline transition-colors">{l}</Link>
          : <a key={l} href={h!} className="text-[0.7rem] tracking-[0.08em] uppercase text-white/30 hover:text-white/60 no-underline transition-colors">{l}</a>
        )}
      </div>
      <p className="text-[0.62rem] text-white/20">© Creatorh Technologies Ltd 2024</p>
    </footer>
  )
}
