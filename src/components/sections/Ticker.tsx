const items = ['Vehicle Repair Credit','0.5% Daily Interest','Only for Your Vehicle','Find Mechanics Fast','₦25k Refundable Balance','No Cash Misuse','Built for Drivers']
const doubled = [...items,...items]
export default function Ticker() {
  return (
    <div className="overflow-hidden py-3" style={{ background: 'var(--green)', whiteSpace: 'nowrap' }}>
      <div className="ticker-track gap-14 inline-flex">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 text-[0.72rem] tracking-[0.14em] uppercase font-bold text-white/90">
            {item}
            <span style={{ color: 'var(--green-bright)', fontSize: '0.4rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
