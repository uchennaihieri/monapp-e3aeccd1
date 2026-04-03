import { useEffect, useRef } from 'react'
import CardFlat from '../illustrations/MonappCard.png'

const items = [
  { icon: '💳', title: 'Works like a credit card', desc: 'Swipe at any partner mechanic exactly like a normal card. No cash, no middleman.' },
  { icon: '🔒', title: 'Only usable for repairs', desc: 'The card is locked to vehicle maintenance. Your credit is safe from misuse.' },
  { icon: '📅', title: 'Repay daily as you earn', desc: 'Small automatic deductions from your earnings daily — not a lump sum at month end.' },
  { icon: '🚌', title: 'Built for drivers, not banks', desc: 'No salary slips. No long forms. Designed around how commercial drivers actually work.' },
]

export default function WhatItIs() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) (x.target as HTMLElement).classList.add('in') }), { threshold: 0.08 })
    ref.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="sec" style={{ background: 'var(--surface)' }}>
      <div className="max-w-5xl mx-auto">
        <span className="overline block mb-3 fade-up">What this is</span>
        <h2 className="h2 mb-10 fade-up" style={{ maxWidth: '22ch' }}>
          This is not a loan.<br />It's a card built for your vehicle.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {items.map(({ icon, title, desc }, i) => (
            <div key={title} className="fade-up p-6 rounded-2xl flex gap-4"
              style={{ background: 'var(--surface-2)', transitionDelay: `${i * 0.08}s` }}>
              <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
              <div>
                <p className="font-bold text-white mb-1 text-[0.95rem]" style={{ fontFamily: 'Syne,sans-serif' }}>{title}</p>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Illustration — both card faces, transparent bg */}
        <div className="fade-up flex justify-center">
   <img 
  src={CardFlat}
  alt="Monapp card illustration"
  className="w-full max-w-2xl h-auto"
/>
        </div>
      </div>
    </section>
  )
}
