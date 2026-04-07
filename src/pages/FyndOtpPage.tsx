import { supabase } from '@/util/supabase'
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function FyndOtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as any)?.email || new URLSearchParams(location.search).get('email') || ''
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(59)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!email) { navigate('/fynd'); return }
    inputs.current[0]?.focus()
  }, [email, navigate])

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const handleChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    setError('')
    if (val && idx < 5) inputs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = [...otp]
    text.split('').forEach((c, i) => { next[i] = c })
    setOtp(next)
    inputs.current[Math.min(text.length, 5)]?.focus()
  }

  const verify = async () => {
    const code = otp.join('')
    if (code.length < 6) { setError('Please enter the full 6-digit code'); return }
    setLoading(true)
    try {

      const {
        data: { session },
        error: verifyError,
      } = await supabase.auth.verifyOtp({
        email: email,
        token: code,
        type: 'email',
      })

      if (verifyError) {
        setError(verifyError.message || 'Invalid code. Please try again.')
        return
      }

      if (session) {
        // Check if user exists in person table
        const { data: person } = await supabase
          .from('person')
          .select('user_id')
          .eq('user_id', session.user.id)
          .maybeSingle()

console.log(person)

        if (person) {
          navigate('/fynd/dashboard', { replace: true })
        } else {
          navigate('/fynd/register', { state: { email }, replace: true })
        }
      }
      
    } catch {
      setError('Invalid code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    if (resendTimer > 0) return
    setResendTimer(59)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
      <header className="flex items-center px-5 py-4 border-b" style={{ borderColor: '#eee' }}>
        <button onClick={() => navigate('/fynd')} className="text-sm font-semibold flex items-center gap-2 bg-transparent border-none cursor-pointer" style={{ color: '#0a0a0a', fontFamily: 'Syne, sans-serif' }}>
          ← Back
        </button>
        <div className="flex-1 flex justify-center">
          <img src="/icons/monapp-logo-white.svg" alt="Monapp" style={{ height: 22, filter: 'invert(1)' }} />
        </div>
        <div style={{ width: 48 }} />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(232,160,32,0.1)' }}>
            <span className="text-3xl">🛡️</span>
          </div>

          <h1 className="mb-2" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#0a0a0a', letterSpacing: '-0.02em' }}>
            Verify your email
          </h1>
          <p className="text-sm mb-8" style={{ color: '#666', lineHeight: 1.6 }}>
            We sent a 6-digit code to <strong style={{ color: '#0a0a0a' }}>{email}</strong>
          </p>

          <div className="flex gap-2.5 justify-center mb-4" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl outline-none transition-all"
                style={{
                  border: `2px solid ${error ? '#e74c3c' : digit ? 'var(--amber)' : '#e0e0e0'}`,
                  color: '#0a0a0a',
                  fontFamily: 'Syne, sans-serif',
                  background: digit ? 'rgba(232,160,32,0.04)' : '#fafafa',
                }}
              />
            ))}
          </div>

          {error && <p className="text-xs mb-4" style={{ color: '#e74c3c' }}>{error}</p>}

          <button
            onClick={verify}
            disabled={loading || otp.join('').length < 6}
            className="w-full py-3.5 rounded-xl font-bold text-sm border-none cursor-pointer transition-all mb-5"
            style={{
              fontFamily: 'Syne, sans-serif',
              background: otp.join('').length === 6 ? 'var(--amber)' : '#e0e0e0',
              color: otp.join('').length === 6 ? '#0a0a0a' : '#999',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Verifying…' : 'Verify & Continue'}
          </button>

          <p className="text-xs" style={{ color: '#999' }}>
            Didn't get the code?{' '}
            {resendTimer > 0 ? (
              <span>Resend in <strong style={{ color: 'var(--amber)' }}>{resendTimer}s</strong></span>
            ) : (
              <button onClick={resend} className="bg-transparent border-none cursor-pointer font-semibold underline" style={{ color: 'var(--amber)', fontSize: 'inherit' }}>
                Resend Code
              </button>
            )}
          </p>
        </div>
      </div>

      <div className="text-center py-5 px-5">
        <p className="text-xs" style={{ color: '#bbb' }}>
          Protected by <strong style={{ color: '#888' }}>Monapp Fynd</strong>
        </p>
      </div>
    </div>
  )
}
