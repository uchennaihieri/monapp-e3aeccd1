import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import SuccessModal from '../SuccessModal'
import ProspectModal from '../ProspectModal'
import CardHero from '../illustrations/CardHero'

export default function Hero() {
  const [phone, setPhone] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleClick = () => {
    if (phone.trim().length < 10) return
    setShowModal(true)
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(150deg,#0a1a0f 0%,#0a0a0a 55%)', paddingTop: '5.5rem' }}>
      <Navbar />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
        backgroundSize: '52px 52px'
      }} />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-0 max-w-6xl mx-auto w-full px-5 md:px-10 py-10">
        <div className="flex-1 w-full">
          <span className="overline block mb-5" style={{ color: 'var(--green-bright)' }}>
            Monapp Vehicle Maintenance Card
          </span>
          <h1 className="h1 mb-5">
            Fix your vehicle now.<br />
            <span style={{ color: 'var(--green-bright)' }}>Pay back as you earn.</span>
          </h1>
          <p className="text-white/60 text-lg mb-8 leading-relaxed" style={{ maxWidth: '44ch' }}>
            Get a credit card designed for commercial drivers — instant access to repair funding, usable only for your vehicle.
          </p>
          <div className="flex flex-col gap-3 max-w-[420px]">
            <div className="phone-row">
              <div className="flag-prefix">
                <img src="/icons/naija-flag.svg" alt="NG" style={{ width: 18, height: 18 }} />
                +234
              </div>
              <input type="number" value={phone} maxLength={11}
                onChange={e => setPhone(e.target.value)}
                placeholder="Your phone number" />
            </div>
            <button onClick={handleClick} className="btn btn-green btn-full text-[1rem]">
              Get My Monapp Card →
            </button>
            <p className="text-[0.7rem] text-white/30 text-center">No commitment. We'll call you.</p>
          </div>
          <div className="mt-6">
            <Link to="/fynd" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/65 no-underline transition-colors">
              Also protect your vehicle with Fynd →
            </Link>
          </div>
        </div>

        {/* Illustration — no photo background issues */}
        {/* <div className="flex-1 flex justify-center lg:justify-end w-full">
          <CardHero className="w-full max-w-[460px] lg:max-w-[520px]" />
        </div> */}
      </div>

      <SuccessModal isOpen={success} onClose={() => setSuccess(false)} />
    </section>
  )
}
