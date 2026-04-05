import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { supabase } from '@/util/supabase'

const STATES_NG = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River',
  'Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo','Jigawa','Kaduna','Kano',
  'Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo',
  'Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',
]

type PhotoKey = 'front' | 'side' | 'back' | 'inside'
const PHOTO_LABELS: { key: PhotoKey; label: string; icon: string }[] = [
  { key: 'front', label: 'Front View', icon: '🚗' },
  { key: 'side', label: 'Side View', icon: '🚙' },
  { key: 'back', label: 'Rear View', icon: '🔙' },
  { key: 'inside', label: 'Interior', icon: '🪑' },
]

export default function FyndRegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  

  const [step, setStep] = useState(1)
  const totalSteps = 3

  // Step 1: Personal
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('Nigeria')
  const [state, setState] = useState('')

  // Step 2: Vehicle
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('Male')
 const [dateOfBirth, setDateOfBirth] = useState('')
 

  // Step 3: Photos
  const [photos, setPhotos] = useState<Record<PhotoKey, File | null>>({ front: null, side: null, back: null, inside: null })
  const fileInputs = useRef<Record<PhotoKey, HTMLInputElement | null>>({ front: null, side: null, back: null, inside: null })

  // Step 4: Verification
  const [nin, setNin] = useState('')

  const [loading, setLoading] = useState(false)

  const handlePhoto = (key: PhotoKey, file: File | null) => {
    setPhotos(p => ({ ...p, [key]: file }))
  }

  const canProceed = () => {
    switch (step) {
      case 1: return firstName.trim() && lastName.trim() && phone.trim() && state
      case 2: return address.trim() && gender && dateOfBirth
      // case 3: return photos.front && photos.side && photos.back && photos.inside
      case 3: return  nin.trim().length >= 11
      default: return false
    }
  }

  const next = () => { if (step < totalSteps) setStep(s => s + 1) }
  const prev = () => { if (step > 1) setStep(s => s - 1); else navigate('/fynd') }

 const submit = async () => {
  setLoading(true)

  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      alert('Session expired. Please log in again.')
      navigate('/fynd')
      return
    }

    const { error } = await supabase.from('person').insert([
      {
        user_id: session.user.id,
        first_name: firstName,
        last_name: lastName,
        phoneNumber: phone,
        country: country,
        state: state,
        address: address,
        gender: gender,
        date_of_birth: dateOfBirth,
        nin: nin,
      }
    ])

    if (error) {
      console.error(error)
      alert('Something went wrong')
      return
    }

    navigate('/fynd/dashboard', { replace: true })

  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem', fontSize: '0.9rem',
    border: '1.5px solid #e0e0e0', borderRadius: 12, outline: 'none',
    color: '#0a0a0a', background: '#fafafa', fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.75rem', fontWeight: 600,
    color: '#555', marginBottom: 6, fontFamily: 'Syne, sans-serif',
    textTransform: 'uppercase', letterSpacing: '0.06em',
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
      {/* Header */}
      <header className="flex items-center px-5 py-4 border-b" style={{ borderColor: '#eee' }}>
        <button onClick={prev} className="text-sm font-semibold flex items-center gap-2 bg-transparent border-none cursor-pointer" style={{ color: '#0a0a0a', fontFamily: 'Syne, sans-serif' }}>
          ← Back
        </button>
        <div className="flex-1 flex justify-center">
          <img src="/icons/monapp-logo-white.svg" alt="Monapp" style={{ height: 22, filter: 'invert(1)' }} />
        </div>
        <span className="text-xs font-semibold" style={{ color: '#bbb', width: 48, textAlign: 'right' }}>{step}/{totalSteps}</span>
      </header>

      {/* Progress bar */}
      <div style={{ height: 3, background: '#f0f0f0' }}>
        <div style={{ height: '100%', width: `${(step / totalSteps) * 100}%`, background: 'var(--amber)', transition: 'width 0.3s ease' }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-8">
        <div className="w-full max-w-md mx-auto">

          {step === 1 && (
            <>
              <h2 className="mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.35rem', color: '#0a0a0a' }}>Personal Information</h2>
              <p className="text-sm mb-6" style={{ color: '#888' }}>Let's get to know you</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input style={inputStyle} value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input style={inputStyle} value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input style={inputStyle} type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07012345678" />
                </div>
                <div>
                  <label style={labelStyle}>Country</label>
                  <select style={{ ...inputStyle, appearance: 'none' as any }} value={country} onChange={e => setCountry(e.target.value)}>
                    <option>Nigeria</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>State</label>
                  <select style={{ ...inputStyle, appearance: 'none' as any, color: state ? '#0a0a0a' : '#999' }} value={state} onChange={e => setState(e.target.value)}>
                    <option value="">Select state</option>
                    {STATES_NG.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.35rem', color: '#0a0a0a' }}>More Details</h2>
              <p className="text-sm mb-6" style={{ color: '#888' }}>Tell us more about you</p>
              <div className="space-y-4">
                <div>
                  <label style={labelStyle}>Address</label>
                  <input style={inputStyle} value={address} onChange={e => setAddress(e.target.value)} placeholder="Home address" />
                </div>
                 <div>
                  <label style={labelStyle}>Gender</label>
                  <select style={{ ...inputStyle, appearance: 'none' as any }} value={gender} onChange={e => setGender(e.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
             <div>
  <label style={labelStyle}>Date of Birth</label>
  <input
    style={inputStyle}
    type="date"
    value={dateOfBirth}
    onChange={e => setDateOfBirth(e.target.value)}
  />
</div>
    
              </div>
            </>
          )}

          {/* {step === 3 && (
            <>
              <h2 className="mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.35rem', color: '#0a0a0a' }}>Vehicle Photos</h2>
              <p className="text-sm mb-6" style={{ color: '#888' }}>Upload clear photos of your vehicle</p>
              <div className="grid grid-cols-2 gap-3">
                {PHOTO_LABELS.map(({ key, label, icon }) => (
                  <div key={key}>
                    <input
                      ref={el => { fileInputs.current[key] = el }}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={e => handlePhoto(key, e.target.files?.[0] || null)}
                    />
                    <button
                      onClick={() => fileInputs.current[key]?.click()}
                      className="w-full flex flex-col items-center justify-center gap-2 rounded-xl cursor-pointer transition-all"
                      style={{
                        height: 130,
                        border: `2px dashed ${photos[key] ? 'var(--amber)' : '#ddd'}`,
                        background: photos[key] ? 'rgba(232,160,32,0.04)' : '#fafafa',
                      }}
                    >
                      {photos[key] ? (
                        <img
                          src={URL.createObjectURL(photos[key]!)}
                          alt={label}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <>
                          <span className="text-2xl">{icon}</span>
                          <span className="text-xs font-semibold" style={{ color: '#999' }}>{label}</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )} */}

          {step === 3 && (
            <>
              <h2 className="mb-1" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.35rem', color: '#0a0a0a' }}>Identity Verification</h2>
              <p className="text-sm mb-6" style={{ color: '#888' }}>Required for vehicle protection</p>
              <div className="space-y-4">
                {/* <div>
                  <label style={labelStyle}>BVN (Bank Verification Number)</label>
                  <input style={inputStyle} type="text" inputMode="numeric" maxLength={11} value={bvn} onChange={e => setBvn(e.target.value.replace(/\D/g, ''))} placeholder="22XXXXXXXXX" />
                  <p className="text-xs mt-1.5" style={{ color: '#bbb' }}>11 digits · Kept secure and encrypted</p>
                </div> */}
                <div>
                  <label style={labelStyle}>NIN (National Identification Number)</label>
                  <input style={inputStyle} type="text" inputMode="numeric" maxLength={11} value={nin} onChange={e => setNin(e.target.value.replace(/\D/g, ''))} placeholder="XXXXXXXXXXX" />
                  <p className="text-xs mt-1.5" style={{ color: '#bbb' }}>11 digits · Used for vehicle ownership verification</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(232,160,32,0.06)', border: '1px solid rgba(232,160,32,0.15)' }}>
                <p className="text-xs leading-relaxed" style={{ color: '#888' }}>
                  🔒 Your NIN is only used for identity verification. We never share your data.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-5 py-4 border-t" style={{ borderColor: '#eee' }}>
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={step === totalSteps ? submit : next}
            disabled={!canProceed() || loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm border-none cursor-pointer transition-all"
            style={{
              fontFamily: 'Syne, sans-serif',
              background: canProceed() ? 'var(--amber)' : '#e0e0e0',
              color: canProceed() ? '#0a0a0a' : '#999',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Submitting…' : step === totalSteps ? 'Complete Registration' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  )
}
