export default function CardFlat({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', maxWidth: 600 }}
      aria-label="Monapp card front and back">
      <defs>
        <linearGradient id="cfg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1c1c1c"/>
          <stop offset="100%" stopColor="#080808"/>
        </linearGradient>
        <linearGradient id="cfg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#161616"/>
          <stop offset="100%" stopColor="#050505"/>
        </linearGradient>
        <linearGradient id="cfsh" x1="0%" y1="0%" x2="40%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.055"/>
          <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
        </linearGradient>
        <filter id="cfs1">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000" floodOpacity="0.6"/>
        </filter>
      </defs>

      {/* Back of card — QR side */}
      <g filter="url(#cfs1)" transform="translate(16,18)">
        <rect width="265" height="168" rx="13" fill="url(#cfg1)" stroke="#222" strokeWidth="0.8"/>
        <rect width="265" height="168" rx="13" fill="url(#cfsh)"/>
        {/* Vertical watermark */}
        <text x="28" y="30" fill="#fff" fillOpacity="0.04" fontFamily="Inter,system-ui,sans-serif" fontSize="52" fontWeight="800" transform="rotate(-90 28 110)">monapp</text>
        <text x="58" y="30" fill="#fff" fillOpacity="0.025" fontFamily="Inter,system-ui,sans-serif" fontSize="52" fontWeight="800" transform="rotate(-90 58 110)">monapp</text>
        {/* QR */}
        <rect x="78" y="24" width="108" height="108" rx="7" fill="#fff"/>
        <rect x="83" y="29" width="98" height="98" rx="4" fill="#000"/>
        {/* TL */}
        <rect x="88" y="34" width="22" height="22" rx="3" fill="#fff"/>
        <rect x="92" y="38" width="14" height="14" rx="2" fill="#000"/>
        <rect x="95" y="41" width="8" height="8" fill="#fff"/>
        {/* TR */}
        <rect x="154" y="34" width="22" height="22" rx="3" fill="#fff"/>
        <rect x="158" y="38" width="14" height="14" rx="2" fill="#000"/>
        <rect x="161" y="41" width="8" height="8" fill="#fff"/>
        {/* BL */}
        <rect x="88" y="100" width="22" height="22" rx="3" fill="#fff"/>
        <rect x="92" y="104" width="14" height="14" rx="2" fill="#000"/>
        <rect x="95" y="107" width="8" height="8" fill="#fff"/>
        {/* dots */}
        {[112,118,124,130,136,142,148].flatMap(x =>
          [68,74,80,86,92,98,104].map(y => {
            const on = ((x * 5 + y * 3) % 9) < 5
            return on ? <rect key={`f${x}-${y}`} x={x} y={y} width="4" height="4" fill="#fff"/> : null
          })
        )}
        {/* Logo */}
        <g transform="translate(14,140)">
          <circle cx="6" cy="7" r="5.5" fill="none" stroke="#2ecc5f" strokeWidth="1.3"/>
          <path d="M3.5 7 L6 4 L8.5 7 L6 10 Z" fill="#2ecc5f"/>
          <text x="15" y="11" fill="#fff" fillOpacity="0.88" fontFamily="Inter,system-ui,sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.4">monapp</text>
        </g>
      </g>

      {/* Front of card */}
      <g filter="url(#cfs1)" transform="translate(306,18)">
        <rect width="265" height="168" rx="13" fill="url(#cfg2)" stroke="#222" strokeWidth="0.8"/>
        <rect width="265" height="168" rx="13" fill="url(#cfsh)"/>
        {/* Logo top left */}
        <g transform="translate(14,12)">
          <circle cx="6" cy="7" r="5.5" fill="none" stroke="#2ecc5f" strokeWidth="1.3"/>
          <path d="M3.5 7 L6 4 L8.5 7 L6 10 Z" fill="#2ecc5f"/>
          <text x="15" y="11" fill="#fff" fillOpacity="0.88" fontFamily="Inter,system-ui,sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.4">monapp</text>
        </g>
        {/* Number band */}
        <rect x="14" y="42" width="236" height="24" rx="4" fill="#111"/>
        <text x="132" y="58" textAnchor="middle" fill="#fff" fillOpacity="0.8" fontFamily="'Space Mono',monospace" fontSize="11.5" letterSpacing="3.5">5061  3233  4778</text>
        {/* Details */}
        <text x="14" y="85" fill="#fff" fillOpacity="0.4" fontFamily="Inter,system-ui,sans-serif" fontSize="6.5" letterSpacing="1">VEHICLE MAINTENANCE CARD</text>
        <text x="14" y="98" fill="#fff" fillOpacity="0.24" fontFamily="Inter,system-ui,sans-serif" fontSize="6.2">This Card is issued by Monapp and may be used by the holder</text>
        <text x="14" y="108" fill="#fff" fillOpacity="0.24" fontFamily="Inter,system-ui,sans-serif" fontSize="6.2">in accordance with the Monapp Terms and Conditions.</text>
        <text x="14" y="122" fill="#fff" fillOpacity="0.2" fontFamily="Inter,system-ui,sans-serif" fontSize="6.2">For enquiries, contact 07038230744</text>
        {/* Bottom */}
        <text x="14" y="150" fill="#fff" fillOpacity="0.32" fontFamily="Inter,system-ui,sans-serif" fontSize="6.5">cards.monapp.ng</text>
        <text x="251" y="144" textAnchor="end" fill="#fff" fillOpacity="0.22" fontFamily="Inter,system-ui,sans-serif" fontSize="5.8">Powered by</text>
        <text x="251" y="155" textAnchor="end" fill="#fff" fillOpacity="0.55" fontFamily="'Space Mono',monospace" fontSize="8.5" fontWeight="700">_$udo</text>
      </g>
    </svg>
  )
}
