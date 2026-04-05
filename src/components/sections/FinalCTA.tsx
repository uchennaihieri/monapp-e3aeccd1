import { useState } from 'react'
import SuccessModal from '../SuccessModal'
import ProspectModal from '../ProspectModal'
export default function FinalCTA() {
  const [phone, setPhone] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleClick = () => {
    if (phone.trim().length < 10) return
    setShowModal(true)
  }
  return (
    <section className="sec relative overflow-hidden text-center" style={{ background:'var(--green)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,0,0,0.22) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-lg mx-auto">
        <h2 className="h2 mb-4" style={{ maxWidth:'22ch', margin:'0 auto 1rem' }}>
          Don't wait until your vehicle stops.
        </h2>
        <p className="text-white/70 text-base mb-8 leading-relaxed">
          Get your Monapp card now. Repairs funded instantly, repaid daily.
        </p>
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          <div className="phone-row">
            <div className="flag-prefix">
              <img src="/icons/naija-flag.svg" alt="NG" style={{ width:18, height:18 }} />+234
            </div>
            <input type="number" value={phone} maxLength={11} onChange={e => setPhone(e.target.value)} placeholder="Your phone number" />
          </div>
          <button onClick={handleClick} className="btn btn-dark btn-full text-[1rem]">
            Get My Monapp Card →
          </button>
          <p className="text-[0.7rem] text-white/45">No commitment. We'll call you to get started.</p>
        </div>
      </div>
      <ProspectModal isOpen={showModal} phone={phone} onClose={() => setShowModal(false)} onSuccess={() => { setShowModal(false); setPhone(''); setSuccess(true) }} />
      <SuccessModal isOpen={success} onClose={() => setSuccess(false)} />
    </section>
  )
}
