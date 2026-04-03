import { useEffect, useRef } from 'react'
export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) (x.target as HTMLElement).classList.add('in') }), { threshold: 0.08 })
    ref.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  const steps = [
    { n:'01', t:'Apply for your card', d:'Enter your phone. We call you, collect your details in 5 minutes.' },
    { n:'02', t:'Get approved', d:'Verify your NIN and vehicle. Your credit limit is assigned immediately.' },
    { n:'03', t:'Use at mechanics', d:'Take your vehicle to any partner workshop. Swipe your Monapp card.' },
    { n:'04', t:'Repay daily', d:'Automatic daily deductions from your earnings. No surprise bills.' },
  ]
  return (
    <section id="how" ref={ref} className="sec" style={{ background:'var(--black)' }}>
      <div className="max-w-5xl mx-auto">
        <span className="overline block mb-3 fade-up">Step by step</span>
        <h2 className="h2 mb-10 fade-up" style={{ maxWidth:'18ch' }}>How to get your Monapp Card</h2>
        <div className="grid-divider grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ n, t, d }, i) => (
            <div key={n} className="fade-up p-8 relative" style={{ background:'var(--surface)', transitionDelay:`${i*0.09}s` }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-5"
                style={{ background:'var(--green)', color:'#fff', fontFamily:'Syne,sans-serif' }}>{parseInt(n)}</div>
              <p className="font-bold text-white mb-1.5 text-[0.95rem]" style={{ fontFamily:'Syne,sans-serif' }}>{t}</p>
              <p className="text-sm text-white/50 leading-relaxed">{d}</p>
              {i < 3 && <span className="absolute top-9 right-4 text-white/12 text-base hidden lg:block">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
