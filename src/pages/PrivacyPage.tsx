import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const items = [
  ['Lawful basis', 'We process your data to perform our contract with you, based on your consent, or for our legitimate business interests.'],
  ['What we collect', 'Sign-up info (name, phone, NIN, BVN, face photo, ID), transaction data, and device/location info when you use the app.'],
  ['How we use it', 'To provide the card service, manage risk and fraud, comply with regulations, and (with consent) send you updates.'],
  ['How we share it', 'With partner mechanics, payment processors, and regulators where required by law. We do not sell your data.'],
  ['Data retention', 'We keep your data as long as necessary to provide the service and meet our legal obligations.'],
  ['Cookies', 'We use session cookies only. They expire when you close the browser and collect no personal data from your device.'],
  ['Your rights', 'You can request access, correction, deletion, or portability of your data. Contact us at support@monapp.ng.'],
  ['Security', 'Firewalls, encryption, and access controls protect your data. We notify you of any breach that may affect your rights.'],
  ['Changes', 'We may update this policy periodically. Material changes will be communicated via the app and our website.'],
]
export default function PrivacyPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#f5f2ec', minHeight: '100vh' }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-5 md:px-10 pt-36 pb-24">
        <span className="label-sm block mb-4">Legal</span>
        <h1 className="heading-lg mb-2">Privacy Policy</h1>
        <p className="text-sm text-white/35 mb-12">Effective: 1 June 2024 · Creatorh Technologies Limited</p>
        <p className="text-white/60 text-base leading-relaxed mb-10">
          At Monapp, your privacy matters. This policy explains how we collect, use, and protect your data when you use the Monapp card or Fynd service.
        </p>
        <div className="space-y-8">
          {items.map(([title, body]) => (
            <div key={title} className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <h2 className="font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem' }}>{title}</h2>
              <p className="text-sm text-white/55 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-sm text-white/50">Contact: <a href="mailto:support@monapp.ng" className="text-white/70 hover:text-white">support@monapp.ng</a> · 222 Obinaocha Avenue, Orji Owerri, Imo State.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
