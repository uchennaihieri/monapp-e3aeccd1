import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PhoneApp from '../illustrations/PhoneApp'

export default function FyndTeaser() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) (x.target as HTMLElement).classList.add('in') }), { threshold: 0.08 })
    ref.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return (
    <section ref={ref} className="sec relative overflow-hidden" style={{ background: '#0d0b08' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 65% at 90% 50%, rgba(232,160,32,0.09) 0%, transparent 65%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="overline block mb-3 fade-up" style={{ color: 'rgba(232,160,32,0.7)' }}>Also from Monapp</span>
          <h2 className="h2 mb-5 fade-up" style={{ maxWidth: '22ch' }}>
            And when you're stranded,<br />
            <span style={{ color: 'var(--amber)' }}>you're not alone.</span>
          </h2>
          <p className="text-white/55 text-base mb-7 leading-relaxed fade-up" style={{ maxWidth: '40ch' }}>
            Monapp Fynd connects you to nearby mechanics instantly — and a network that helps track your vehicle if it goes missing.
          </p>
          <div className="flex flex-col gap-3 mb-8 fade-up">
            {[
              { t: 'Breakdown?', d: "Fynd finds the nearest verified mechanic to your exact location." },
              { t: 'Car missing?', d: "Report it and Fynd alerts mechanics and community members across the area." },
              { t: 'Free to use.', d: "Just maintain a ₦25,000 refundable security balance — not a fee." },
            ].map(({ t, d }) => (
              <div key={t} className="trust-row">
                <div className="trust-dot trust-dot-amber">✓</div>
                <p className="text-sm text-white/55 leading-relaxed">
                  <span className="font-semibold text-white">{t} </span>{d}
                </p>
              </div>
            ))}
          </div>
          <Link to="/fynd" className="btn btn-amber fade-up inline-flex" style={{ minWidth: 240 }}>
            Protect My Vehicle →
          </Link>
        </div>
        {/* Fynd phone illustration */}
        <div className="fade-up flex justify-center lg:justify-end">
          <PhoneApp variant="fynd" className="w-full max-w-[260px]" />
        </div>
      </div>
    </section>
  )
}
