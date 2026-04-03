import { useEffect, useRef } from 'react'
export default function TheProblem() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) (x.target as HTMLElement).classList.add('in') }), { threshold: 0.08 })
    ref.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  const pts = [
    { n:'01', t:'No money for repairs', d:'A single breakdown can cost ₦30k–₦200k. Most drivers don\'t have that ready.' },
    { n:'02', t:'Lost daily income', d:'Every day your vehicle is down, you earn nothing. Rent, food, family — all on hold.' },
    { n:'03', t:'Delays finding help', d:'Finding a trusted mechanic can take hours in some locations. You\'re stuck and losing money.' },
  ]
  return (
    <section ref={ref} className="sec" style={{ background: 'var(--black)' }}>
      <div className="max-w-5xl mx-auto">
        <span className="overline block mb-3 fade-up">The reality</span>
        <h2 className="h2 mb-10 fade-up" style={{ maxWidth:'24ch' }}>
          When your vehicle stops,<br />
          <span style={{ color:'var(--green-bright)' }}>everything stops.</span>
        </h2>
        <div className="grid-divider grid-cols-1 md:grid-cols-3">
          {pts.map(({ n, t, d }, i) => (
            <div key={n} className="fade-up p-8" style={{ background:'var(--surface)', transitionDelay:`${i*0.1}s` }}>
              <div className="mb-5 font-extrabold leading-none" style={{ fontFamily:'Syne,sans-serif', fontSize:'3rem', opacity:0.055, letterSpacing:'-0.05em' }}>{n}</div>
              <p className="font-bold text-white mb-2 text-[0.95rem]" style={{ fontFamily:'Syne,sans-serif' }}>{t}</p>
              <p className="text-sm text-white/50 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
