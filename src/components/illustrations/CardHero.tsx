export default function CardHero({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 380" xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', maxWidth: 560, overflow: 'visible' }}
      aria-label="Monapp Vehicle Maintenance Card">
      <defs>
        <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1c1c1c"/>
          <stop offset="55%" stopColor="#080808"/>
          <stop offset="100%" stopColor="#141414"/>
        </linearGradient>
        <linearGradient id="cg2" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#181818"/>
          <stop offset="100%" stopColor="#050505"/>
        </linearGradient>
        <linearGradient id="cs1g" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
        </linearGradient>
        <filter id="ds1" x="-25%" y="-25%" width="150%" height="175%">
          <feDropShadow dx="0" dy="22" stdDeviation="22" floodColor="#000" floodOpacity="0.75"/>
        </filter>
        <filter id="ds2" x="-25%" y="-25%" width="150%" height="175%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* Back card — front face */}
      <g filter="url(#ds2)" transform="translate(196,138) rotate(-5) skewX(1.5)">
        <rect width="310" height="196" rx="15" fill="url(#cg2)" stroke="#252525" strokeWidth="0.8"/>
        <rect width="310" height="196" rx="15" fill="url(#cs1g)"/>
        <g transform="translate(18,15)">
          <circle cx="7" cy="7" r="6" fill="none" stroke="#2ecc5f" strokeWidth="1.5"/>
          <path d="M4 7 L7 4 L10 7 L7 10 Z" fill="#2ecc5f"/>
          <text x="18" y="11" fill="#fff" fillOpacity="0.9" fontFamily="Inter,system-ui,sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.5">monapp</text>
        </g>
        <rect x="18" y="48" width="274" height="28" rx="4" fill="#131313"/>
        <text x="155" y="67" textAnchor="middle" fill="#fff" fillOpacity="0.82" fontFamily="'Space Mono',monospace" fontSize="13" letterSpacing="4">5061  3233  4778</text>
        <text x="18" y="100" fill="#fff" fillOpacity="0.42" fontFamily="Inter,system-ui,sans-serif" fontSize="7.5" letterSpacing="1.2">VEHICLE MAINTENANCE CARD</text>
        <text x="18" y="115" fill="#fff" fillOpacity="0.28" fontFamily="Inter,system-ui,sans-serif" fontSize="7">This Card is issued by Monapp and may be used by the holder in</text>
        <text x="18" y="126" fill="#fff" fillOpacity="0.28" fontFamily="Inter,system-ui,sans-serif" fontSize="7">accordance with the Monapp Terms and Conditions.</text>
        <text x="18" y="143" fill="#fff" fillOpacity="0.22" fontFamily="Inter,system-ui,sans-serif" fontSize="7">For enquiries, contact 07038230744</text>
        <text x="18" y="174" fill="#fff" fillOpacity="0.35" fontFamily="Inter,system-ui,sans-serif" fontSize="7.5">cards.monapp.ng</text>
        <text x="292" y="168" textAnchor="end" fill="#fff" fillOpacity="0.26" fontFamily="Inter,system-ui,sans-serif" fontSize="6.5">Powered by</text>
        <text x="292" y="181" textAnchor="end" fill="#fff" fillOpacity="0.6" fontFamily="'Space Mono',monospace" fontSize="10" fontWeight="700">_$udo</text>
      </g>

      {/* Front card — back face with QR */}
      <g filter="url(#ds1)" transform="translate(48,48) rotate(-12) skewX(2)">
        <rect width="310" height="196" rx="15" fill="url(#cg1)" stroke="#222" strokeWidth="0.8"/>
        <rect width="310" height="196" rx="15" fill="url(#cs1g)"/>
        {/* Watermark */}
        <text x="30" y="40" fill="#fff" fillOpacity="0.04" fontFamily="Inter,system-ui,sans-serif" fontSize="60" fontWeight="800" transform="rotate(-90 30 130)">monapp</text>
        <text x="68" y="40" fill="#fff" fillOpacity="0.025" fontFamily="Inter,system-ui,sans-serif" fontSize="60" fontWeight="800" transform="rotate(-90 68 130)">monapp</text>
        {/* QR border */}
        <rect x="90" y="38" width="130" height="130" rx="8" fill="#fff"/>
        <rect x="95" y="43" width="120" height="120" rx="5" fill="#000"/>
        {/* TL corner */}
        <rect x="100" y="48" width="26" height="26" rx="3" fill="#fff"/>
        <rect x="104" y="52" width="18" height="18" rx="2" fill="#000"/>
        <rect x="108" y="56" width="10" height="10" fill="#fff"/>
        {/* TR corner */}
        <rect x="184" y="48" width="26" height="26" rx="3" fill="#fff"/>
        <rect x="188" y="52" width="18" height="18" rx="2" fill="#000"/>
        <rect x="192" y="56" width="10" height="10" fill="#fff"/>
        {/* BL corner */}
        <rect x="100" y="132" width="26" height="26" rx="3" fill="#fff"/>
        <rect x="104" y="136" width="18" height="18" rx="2" fill="#000"/>
        <rect x="108" y="140" width="10" height="10" fill="#fff"/>
        {/* Data dots */}
        {[132,140,148,156,164,172,180].flatMap(x =>
          [82,90,98,106,114,122,130,138,146,154].map(y => {
            const on = ((x * 3 + y * 7 + x * y) % 11) < 6
            return on ? <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" fill="#fff"/> : null
          })
        )}
        {/* Logo bottom */}
        <g transform="translate(18,160)">
          <circle cx="7" cy="9" r="7" fill="none" stroke="#2ecc5f" strokeWidth="1.5"/>
          <path d="M4 9 L7 5 L10 9 L7 13 Z" fill="#2ecc5f"/>
          <text x="20" y="13" fill="#fff" fillOpacity="0.9" fontFamily="Inter,system-ui,sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.5">monapp</text>
        </g>
      </g>
    </svg>
  )
}
