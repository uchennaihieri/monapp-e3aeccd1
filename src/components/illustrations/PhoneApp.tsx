export default function PhoneApp({ className = '', variant = 'credit' }: { className?: string; variant?: 'credit' | 'fynd' }) {
  const isFynd = variant === 'fynd'
  return (
    <svg viewBox="0 0 280 520" xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', maxWidth: 280 }}
      aria-label={isFynd ? 'Monapp Fynd app' : 'Monapp app'}>
      <defs>
        <linearGradient id="pg1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#080808"/>
        </linearGradient>
        <linearGradient id="pcard" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1c2e1e"/>
          <stop offset="100%" stopColor="#0a120b"/>
        </linearGradient>
        <linearGradient id="pcardf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#221c10"/>
          <stop offset="100%" stopColor="#100e06"/>
        </linearGradient>
        <filter id="psh">
          <feDropShadow dx="0" dy="24" stdDeviation="28" floodColor="#000" floodOpacity="0.8"/>
        </filter>
        <clipPath id="pclip">
          <rect width="240" height="480" rx="32" x="20" y="20"/>
        </clipPath>
      </defs>

      {/* Phone body */}
      <g filter="url(#psh)">
        {/* Outer shell */}
        <rect x="18" y="18" width="244" height="484" rx="36" fill="#111" stroke="#2a2a2a" strokeWidth="1.5"/>
        {/* Screen area */}
        <rect x="22" y="22" width="236" height="476" rx="32" fill="#0d0d0d"/>
        {/* Camera notch */}
        <rect x="105" y="28" width="70" height="18" rx="9" fill="#080808"/>
        <circle cx="140" cy="37" r="4.5" fill="#111" stroke="#1a1a1a" strokeWidth="0.5"/>
        <circle cx="140" cy="37" r="2" fill="#0d0d0d"/>
        {/* Side buttons */}
        <rect x="14" y="130" width="4" height="40" rx="2" fill="#1a1a1a"/>
        <rect x="14" y="182" width="4" height="64" rx="2" fill="#1a1a1a"/>
        <rect x="262" y="150" width="4" height="52" rx="2" fill="#1a1a1a"/>

        {/* Screen content */}
        <g clipPath="url(#pclip)">
          {isFynd ? (
            <>
              {/* Fynd UI */}
              {/* Header */}
              <rect x="22" y="22" width="236" height="80" fill={`url(#pcardf)`}/>
              <text x="38" y="64" fill="#fff" fillOpacity="0.5" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5">Welcome back</text>
              <text x="38" y="78" fill="#fff" fontFamily="Inter,system-ui,sans-serif" fontSize="12" fontWeight="700">Monapp Fynd</text>
              <circle cx="222" cy="70" r="14" fill="rgba(232,160,32,0.15)" stroke="rgba(232,160,32,0.4)" strokeWidth="1"/>
              <circle cx="222" cy="70" r="4" fill="#e8a020"/>
              {/* Status card */}
              <rect x="32" y="112" width="216" height="88" rx="12" fill="rgba(232,160,32,0.08)" stroke="rgba(232,160,32,0.2)" strokeWidth="0.8"/>
              <circle cx="56" cy="142" r="10" fill="rgba(232,160,32,0.2)"/>
              <circle cx="56" cy="142" r="4" fill="#e8a020" className="pulse"/>
              <text x="72" y="138" fill="#e8a020" fontFamily="Inter,system-ui,sans-serif" fontSize="8" fontWeight="600">Fynd Active</text>
              <text x="72" y="149" fill="#fff" fillOpacity="0.5" fontFamily="Inter,system-ui,sans-serif" fontSize="7">Monitoring your vehicle</text>
              <text x="38" y="173" fill="#fff" fillOpacity="0.7" fontFamily="Inter,system-ui,sans-serif" fontSize="9" fontWeight="600">Balance: ₦10,000</text>
              <text x="38" y="185" fill="#2ecc5f" fontFamily="Inter,system-ui,sans-serif" fontSize="8">Refundable · Active</text>
              {/* Mechanic cards */}
              <text x="38" y="220" fill="#fff" fillOpacity="0.4" fontFamily="Inter,system-ui,sans-serif" fontSize="8" letterSpacing="0.8">MECHANICS NEAR YOU</text>
              {[
                { y: 234, name: 'Chukwudi Auto', dist: '0.8 km', spec: 'Engine Specialist' },
                { y: 278, name: 'Lagos Roadside', dist: '1.2 km', spec: 'All-round repairs' },
                { y: 322, name: 'Femi Repairs', dist: '2.1 km', spec: 'Electrical systems' },
              ].map(({ y, name, dist, spec }) => (
                <g key={y}>
                  <rect x="32" y={y} width="216" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
                  <circle cx="54" cy={y + 18} r="10" fill="rgba(46,204,95,0.12)" stroke="rgba(46,204,95,0.25)" strokeWidth="0.8"/>
                  <text x="54" y={y + 22} textAnchor="middle" fill="#2ecc5f" fontFamily="Inter,sans-serif" fontSize="9">🔧</text>
                  <text x="72" y={y + 15} fill="#fff" fillOpacity="0.85" fontFamily="Inter,system-ui,sans-serif" fontSize="9" fontWeight="600">{name}</text>
                  <text x="72" y={y + 26} fill="#fff" fillOpacity="0.4" fontFamily="Inter,system-ui,sans-serif" fontSize="7.5">{dist} · {spec}</text>
                  <text x="238" y={y + 22} textAnchor="end" fill="#2ecc5f" fontFamily="Inter,system-ui,sans-serif" fontSize="7" fontWeight="600">Available</text>
                </g>
              ))}
              {/* Bottom nav */}
              <rect x="22" y="450" width="236" height="52" fill="#0d0d0d" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
              {[
                { x: 60, icon: '⊙', label: 'Home' },
                { x: 110, icon: '📍', label: 'Fynd' },
                { x: 160, icon: '⊕', label: 'Report' },
                { x: 210, icon: '☰', label: 'Menu' },
              ].map(({ x, icon, label }) => (
                <g key={x}>
                  <text x={x} y="468" textAnchor="middle" fill="#fff" fillOpacity={label === 'Fynd' ? 0.9 : 0.3} fontFamily="Inter,sans-serif" fontSize="13">{icon}</text>
                  <text x={x} y="480" textAnchor="middle" fill="#fff" fillOpacity={label === 'Fynd' ? 0.8 : 0.25} fontFamily="Inter,system-ui,sans-serif" fontSize="7">{label}</text>
                </g>
              ))}
            </>
          ) : (
            <>
              {/* Credit card UI */}
              {/* Header */}
              <rect x="22" y="22" width="236" height="80" fill="url(#pcard)"/>
              <text x="38" y="64" fill="#fff" fillOpacity="0.5" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5">Welcome back</text>
              <text x="38" y="78" fill="#fff" fontFamily="Inter,system-ui,sans-serif" fontSize="12" fontWeight="700">Phillip Chatham A.</text>
              {/* Balance card */}
              <rect x="32" y="112" width="216" height="88" rx="12" fill="rgba(0,0,0,0.5)" stroke="rgba(46,204,95,0.2)" strokeWidth="0.8"/>
              <text x="44" y="136" fill="#fff" fillOpacity="0.45" fontFamily="Inter,system-ui,sans-serif" fontSize="7.5" letterSpacing="0.5">AVAILABLE BALANCE</text>
              <text x="44" y="158" fill="#fff" fontFamily="Inter,system-ui,sans-serif" fontSize="20" fontWeight="800">₦ 3,041,730</text>
              <text x="44" y="172" fill="#2ecc5f" fontFamily="Inter,system-ui,sans-serif" fontSize="8">MonApp No. · 3204795897</text>
              {/* Quick actions */}
              <text x="38" y="220" fill="#fff" fillOpacity="0.4" fontFamily="Inter,system-ui,sans-serif" fontSize="8" letterSpacing="0.8">QUICK ACTION</text>
              <rect x="32" y="228" width="100" height="52" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
              <rect x="146" y="228" width="102" height="52" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
              <text x="82" y="250" textAnchor="middle" fill="#fff" fillOpacity="0.6" fontFamily="Inter,sans-serif" fontSize="14">↓</text>
              <text x="82" y="263" textAnchor="middle" fill="#fff" fillOpacity="0.7" fontFamily="Inter,system-ui,sans-serif" fontSize="7" fontWeight="600">Receive Payment</text>
              <text x="82" y="272" textAnchor="middle" fill="#fff" fillOpacity="0.35" fontFamily="Inter,system-ui,sans-serif" fontSize="6.5">Request funds</text>
              <text x="197" y="250" textAnchor="middle" fill="#fff" fillOpacity="0.6" fontFamily="Inter,sans-serif" fontSize="14">⊞</text>
              <text x="197" y="263" textAnchor="middle" fill="#fff" fillOpacity="0.7" fontFamily="Inter,system-ui,sans-serif" fontSize="7" fontWeight="600">Make Payment</text>
              <text x="197" y="272" textAnchor="middle" fill="#fff" fillOpacity="0.35" fontFamily="Inter,system-ui,sans-serif" fontSize="6.5">Scan QR to pay</text>
              {/* Transactions */}
              <text x="38" y="302" fill="#fff" fillOpacity="0.4" fontFamily="Inter,system-ui,sans-serif" fontSize="8" letterSpacing="0.8">RECENT TRANSACTIONS</text>
              <text x="218" y="302" textAnchor="end" fill="#2ecc5f" fontFamily="Inter,system-ui,sans-serif" fontSize="8">See all</text>
              {[
                { y: 316, label: 'Vehicle Repair', amt: '−₦45,000', plus: false },
                { y: 348, label: 'Card Repayment', amt: '+₦45,000', plus: true },
                { y: 380, label: 'Workshop Payment', amt: '−₦32,500', plus: false },
                { y: 412, label: 'Card Repayment', amt: '+₦45,000', plus: true },
              ].map(({ y, label, amt, plus }) => (
                <g key={y}>
                  <circle cx="50" cy={y + 16} r="13" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                  <text x="50" y={y + 20} textAnchor="middle" fill="#fff" fillOpacity="0.5" fontFamily="Inter,sans-serif" fontSize="11">⊙</text>
                  <text x="70" y={y + 14} fill="#fff" fillOpacity="0.75" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5" fontWeight="600">{label}</text>
                  <text x="70" y={y + 25} fill="#fff" fillOpacity="0.35" fontFamily="Inter,system-ui,sans-serif" fontSize="7.5">Jan 24, 2024</text>
                  <text x="232" y={y + 20} textAnchor="end" fill={plus ? '#2ecc5f' : '#ff6b6b'} fontFamily="Inter,system-ui,sans-serif" fontSize="9" fontWeight="700">{amt}</text>
                  <line x1="32" y1={y + 34} x2="248" y2={y + 34} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                </g>
              ))}
              {/* Bottom nav */}
              <rect x="22" y="450" width="236" height="52" fill="#0d0d0d" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
              {[
                { x: 60, icon: '⊙', label: 'Home' },
                { x: 110, icon: '↕', label: 'Transfer' },
                { x: 160, icon: '⊞', label: 'Cards' },
                { x: 210, icon: '☰', label: 'Menu' },
              ].map(({ x, icon, label }) => (
                <g key={x}>
                  <text x={x} y="468" textAnchor="middle" fill="#fff" fillOpacity={label === 'Home' ? 0.9 : 0.3} fontFamily="Inter,sans-serif" fontSize="13">{icon}</text>
                  <text x={x} y="480" textAnchor="middle" fill="#fff" fillOpacity={label === 'Home' ? 0.8 : 0.25} fontFamily="Inter,system-ui,sans-serif" fontSize="7">{label}</text>
                </g>
              ))}
            </>
          )}
        </g>
      </g>
    </svg>
  )
}
