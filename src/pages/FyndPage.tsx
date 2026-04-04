import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CardHero from '../components/illustrations/CardHero'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SuccessModal from '../components/SuccessModal'

function useFade(ref: React.RefObject<HTMLElement | HTMLDivElement | null>) {
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) (x.target as HTMLElement).classList.add('in') }), { threshold: 0.08 })
    ref.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

function EmailForm({ btnLabel, btnClass = 'btn-dark' }: { btnLabel: string; btnClass?: string }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const base = import.meta.env.VITE_BASE_URL
  const submit = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setLoading(true)
    try {
      await axios.post(`${base}/broker/brokerForm`, { FULL_NAME:'fynd prospect', PHONE_NUMBER:'', EMAIL_ADDRESS:email, STATE:'' })
    } catch { /* continue to OTP regardless */ }
    setLoading(false)
    navigate('/fynd/verify', { state: { email } })
  }
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full px-4 py-3.5 rounded-xl text-[1rem] outline-none transition-all"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
        }}
        onKeyDown={e => e.key === 'Enter' && submit()}
      />
      <button onClick={submit} disabled={loading} className={`btn ${btnClass} btn-full text-[1rem]`}>
        {loading ? 'Sending…' : btnLabel}
      </button>
      <p className="text-[0.7rem] text-white/35 text-center">Refundable ₦25,000 balance · Not a fee</p>
    </div>
  )
}

export default function FyndPage() {
  const secCore = useRef<HTMLDivElement>(null)
  const secMoney = useRef<HTMLDivElement>(null)
  const secHow = useRef<HTMLDivElement>(null)
  const secObj = useRef<HTMLDivElement>(null)
  useFade(secCore); useFade(secMoney); useFade(secHow); useFade(secObj)

  return (
    <div style={{ background:'#0d0b08', color:'var(--off-white)', minHeight:'100vh' }}>
      <Navbar theme="amber" />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background:'linear-gradient(150deg,#1a1108 0%,#0d0b08 60%)', paddingTop:'5.5rem' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse 55% 65% at 80% 40%, rgba(232,160,32,0.12) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
          backgroundSize:'52px 52px'
        }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-10 py-12 items-center">
          <div>
            <span className="overline block mb-5" style={{ color:'rgba(232,160,32,0.75)' }}>Monapp Fynd</span>
            <h1 className="h1 mb-5">
              If your car breaks down<br />or goes missing,<br />
              <span style={{ color:'var(--amber)' }}>you're on your own.</span>
            </h1>
            <p className="text-white/55 text-lg mb-8 leading-relaxed" style={{ maxWidth:'44ch' }}>
              Monapp Fynd connects you to nearby mechanics instantly — and a network that helps track your vehicle if it goes missing.
            </p>
            <PhoneForm btnLabel="Protect My Vehicle →" btnClass="btn-amber" />
            <div className="mt-6">
              <Link to="/" className="text-sm text-white/35 hover:text-white/60 no-underline transition-colors">
                ← Also get the Monapp Credit Card
              </Link>
            </div>
          </div>

          {/* card mockup on dark bg — both faces visible */}
          {/* <div className="flex justify-center lg:justify-end">
            <CardHero className="w-full max-w-[400px]" />
          </div> */}
        </div>
      </section>

      {/* ── CORE VALUE ── */}
      <div ref={secCore}>
        <section className="sec" style={{ background:'var(--surface)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="overline block mb-3 fade-up" style={{ color:'rgba(232,160,32,0.65)' }}>What Fynd does</span>
            <h2 className="h2 mb-10 fade-up" style={{ maxWidth:'22ch' }}>
              Two things. Both free.<br />
              <span style={{ color:'var(--amber)' }}>Always on.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon:'🔧', title:'Breakdown? Find mechanics fast.', desc:"Broken down anywhere in Nigeria? Fynd shows you verified mechanics within your vicinity in real time. No calls to friends. No waiting.", c:'rgba(232,160,32,0.07)', b:'rgba(232,160,32,0.16)' },
                { icon:'🚗', title:'Missing vehicle? Your network activates.', desc:"Report a missing vehicle and Fynd immediately alerts mechanics and community members in the area to help with recovery.", c:'rgba(192,57,43,0.07)', b:'rgba(192,57,43,0.18)' },
              ].map(({ icon, title, desc, c, b }, i) => (
                <div key={title} className="fade-up p-7 rounded-2xl"
                  style={{ background:c, border:`1px solid ${b}`, transitionDelay:`${i*0.1}s` }}>
                  <span className="text-3xl block mb-4">{icon}</span>
                  <p className="font-bold text-white mb-2 text-[1rem]" style={{ fontFamily:'Syne,sans-serif' }}>{title}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── ₦25K EXPLANATION ── */}
      <div ref={secMoney}>
        <section className="sec" style={{ background:'var(--black)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="overline block mb-3 fade-up" style={{ color:'rgba(232,160,32,0.65)' }}>About the balance</span>
              <h2 className="h2 mb-5 fade-up">Your money stays yours.</h2>
              <p className="text-white/55 text-base leading-relaxed mb-4 fade-up">
                Maintain a <strong className="text-white">₦25,000 refundable security balance</strong> to access Fynd. It is not a fee. It is not a charge. It is your money — sitting safely, giving you access to Fynd.
              </p>
              <p className="text-white/55 text-base leading-relaxed mb-8 fade-up">
                You can withdraw it at any time after your cycle. Your balance is yours.
              </p>
              <div className="flex flex-col gap-4 fade-up">
                {[
                  { t:'Not a subscription', d:'One balance. No recurring fees.' },
                  { t:'Fully refundable', d:'Withdraw after your cycle — no questions asked.' },
                  { t:'Instant activation', d:'Once your balance is confirmed, Fynd is live immediately.' },
                ].map(({ t, d }) => (
                  <div key={t} className="trust-row">
                    <div className="trust-dot trust-dot-amber">✓</div>
                    <p className="text-sm text-white/55"><span className="font-semibold text-white">{t}. </span>{d}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* balance card visual */}
            <div className="fade-up flex justify-center">
              <div className="w-full max-w-[280px] p-7 rounded-2xl text-center"
                style={{ background:'var(--surface)', border:'1px solid rgba(232,160,32,0.14)' }}>
                <p className="text-[0.6rem] tracking-widest uppercase text-white/35 mb-2">Security Balance</p>
                <p className="font-extrabold mb-1" style={{ fontFamily:'Syne,sans-serif', fontSize:'2.5rem', color:'var(--amber)' }}>₦25,000</p>
                <p className="text-xs text-white/35 mb-7">Refundable · Your Money</p>
                <div className="space-y-3 text-left">
                  {[
                    { l:'Fynd access', v:'✓ Active', ok:true },
                    { l:'Mechanic finder', v:'Free', ok:true },
                    { l:'Car recovery', v:'Free', ok:true },
                    { l:'Withdrawal', v:'Anytime', ok:true },
                  ].map(({ l, v, ok }) => (
                    <div key={l} className="flex justify-between items-center py-1.5 text-sm"
                      style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                      <span className="text-white/45">{l}</span>
                      <span className="font-semibold" style={{ color: ok ? 'var(--green-bright)' : 'var(--amber)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW YOUR MONEY WORKS ── */}
        <section className="sec" style={{ background:'var(--surface)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="overline block mb-3 fade-up" style={{ color:'rgba(232,160,32,0.65)' }}>Capital engine</span>
              <h2 className="h2 mb-5 fade-up">How your money works</h2>
              <p className="text-white/55 text-base leading-relaxed mb-4 fade-up">
                Your security balance helps power repair support for commercial drivers on Monapp. As more drivers are supported, the network of mechanics and responders grows — making Fynd stronger for everyone.
              </p>
              <p className="text-white/55 text-base leading-relaxed mb-0 fade-up">
                Your balance remains yours and is available for withdrawal after your cycle.
              </p>
            </div>
            <div className="fade-up flex justify-center">
              {/* simple visual */}
              <div className="w-full max-w-[300px] space-y-3">
                {[
                  { icon:'👤', label:'You maintain ₦25,000', color:'var(--amber)' },
                  { icon:'🔧', label:'Supports driver repair access', color:'var(--green-bright)' },
                  { icon:'📍', label:'Grows the mechanic network', color:'var(--green-bright)' },
                  { icon:'🔄', label:'Your balance stays yours', color:'var(--amber)' },
                ].map(({ icon, label, color }, i) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background:'var(--surface-2)', border:'1px solid var(--border)' }}>
                    {i > 0 && <div className="absolute ml-[1.35rem] -mt-8 h-5 w-px" style={{ background:'var(--border)' }} />}
                    <span className="text-xl w-8 text-center">{icon}</span>
                    <span className="text-sm font-semibold" style={{ color }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div ref={secHow}>
        <section className="sec" style={{ background:'var(--black)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="overline block mb-3 fade-up" style={{ color:'rgba(232,160,32,0.65)' }}>Step by step</span>
            <h2 className="h2 mb-10 fade-up" style={{ maxWidth:'18ch' }}>How Fynd works</h2>
            <div className="grid-divider grid-cols-1 sm:grid-cols-3">
              {[
                { n:'01', t:'Register your vehicle', d:'Sign up with your phone, add your vehicle make, model, and plate number.' },
                { n:'02', t:'Maintain ₦25k balance', d:'Fund your Monapp wallet with ₦25,000. Fynd activates immediately. The money stays yours.' },
                { n:'03', t:'Get help anytime', d:"Breakdown? Tap Fynd. Missing car? Report it. The network activates within seconds." },
              ].map(({ n, t, d }, i) => (
                <div key={n} className="fade-up p-8" style={{ background:'var(--surface)', transitionDelay:`${i*0.1}s` }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-5"
                    style={{ background:'rgba(232,160,32,0.15)', border:'1.5px solid var(--amber)', color:'var(--amber)', fontFamily:'Syne,sans-serif' }}>
                    {parseInt(n)}
                  </div>
                  <p className="font-bold text-white mb-2 text-[0.95rem]" style={{ fontFamily:'Syne,sans-serif' }}>{t}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── OBJECTIONS ── */}
      <div ref={secObj}>
        <section className="sec" style={{ background:'var(--surface)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="overline block mb-3 fade-up" style={{ color:'rgba(232,160,32,0.65)' }}>Common questions</span>
            <h2 className="h2 mb-10 fade-up" style={{ maxWidth:'20ch' }}>Everything up front. No surprises.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { q:'No hidden charges?', a:'None. Fynd is free to use. The ₦25k is a security balance — not a charge.' },
                { q:'Can I get my money back?', a:'Yes. Your ₦25,000 balance is fully refundable. Withdraw after your cycle, anytime.' },
                { q:'Is help always available?', a:'24/7. Expressway at midnight or quiet suburb — Fynd is always on.' },
              ].map(({ q, a }, i) => (
                <div key={q} className="fade-up p-6 rounded-2xl"
                  style={{ background:'var(--surface-2)', border:'1px solid rgba(232,160,32,0.1)', transitionDelay:`${i*0.08}s` }}>
                  <p className="font-bold mb-2 text-[0.95rem]" style={{ fontFamily:'Syne,sans-serif', color:'var(--amber)' }}>{q}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── FINAL CTA ── */}
      <section className="sec relative overflow-hidden text-center" style={{ background:'var(--amber)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,0,0,0.18) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="h2 mb-4" style={{ color:'#0a0a0a', maxWidth:'22ch', margin:'0 auto 1rem' }}>
            Don't wait until something happens.
          </h2>
          <p className="text-black/60 text-base mb-8 leading-relaxed">
            Activate Fynd with a refundable ₦25,000 balance. Free mechanic access. Free car recovery.
          </p>
          <PhoneForm btnLabel="Protect My Vehicle Now →" btnClass="btn-dark" />
          <div className="mt-8 pt-6 flex justify-center" style={{ borderTop:'1px solid rgba(0,0,0,0.1)' }}>
            <Link to="/" className="text-sm text-black/40 hover:text-black/70 no-underline transition-colors">
              ← Also get the Monapp Credit Card for vehicle repairs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
