import { useEffect, useRef } from 'react'
import PhoneApp from '../illustrations/PhoneApp'

export default function TheSolution() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) (x.target as HTMLElement).classList.add('in') }), { threshold: 0.08 })
    ref.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  const pts = [
    { t: 'Pay for repairs instantly', d: 'Walk into any partner workshop, swipe your Monapp card, drive out the same day.' },
    { t: 'Repay daily — small amounts', d: 'No lump sum. A small portion comes out daily from your earnings. Always manageable.' },
    { t: 'No delays, no middlemen', d: 'No loan officer to beg. No forms. The card is yours. Use it when you need it.' },
    { t: 'No cash misuse possible', d: "The card is restricted to repairs only. Your credit goes exactly where it's needed." },
  ]
  return (
    <section ref={ref} className="sec" style={{ background: '#0d1a11' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="overline block mb-3 fade-up">The solution</span>
          <h2 className="h2 mb-8 fade-up" style={{ maxWidth: '18ch' }}>One card.<br />Immediate repair access.</h2>
          <div className="flex flex-col gap-4">
            {pts.map(({ t, d }, i) => (
              <div key={t} className="fade-up trust-row" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="trust-dot trust-dot-green">✓</div>
                <div>
                  <p className="font-semibold text-white text-sm" style={{ fontFamily: 'Syne,sans-serif' }}>{t}</p>
                  <p className="text-sm text-white/50 leading-relaxed mt-0.5">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Phone illustration — works on any background */}
        <div className="fade-up flex justify-center lg:justify-end">
          <PhoneApp variant="credit" className="w-full max-w-[260px]" />
        </div>
      </div>
    </section>
  )
}
