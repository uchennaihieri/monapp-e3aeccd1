import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const items = [
  ['This is a contract.', 'These Terms form a contract between you and Monapp. Using the service means you accept these Terms. You must be 18+.'],
  ['Eligibility.', 'You must provide a valid Nigerian phone number, complete KYC, and submit accurate information. You are responsible for your PIN.'],
  ['Card use.', 'The Monapp credit card is for vehicle repairs and maintenance only. Using it for anything else is a breach of these Terms.'],
  ['Repayment.', 'You agree to daily repayment deductions at the rate set at onboarding. Failure to repay may suspend your card.'],
  ['Fynd balance.', 'The ₦25,000 Fynd security balance is refundable after your cycle. Monapp may withhold it if outstanding amounts are owed.'],
  ['Third parties.', 'Workshops and mechanics are independent. Monapp is not responsible for their services or any disputes with them.'],
  ['Prohibited use.', 'You may not use the service for illegal activities. Suspected fraud will result in immediate suspension and reporting to authorities.'],
  ['Liability.', 'Monapp is not liable for indirect, incidental, or consequential damages arising from use of the service.'],
  ['Disputes.', 'Disputes are governed by Nigerian law and submitted to arbitration in Lagos under the Chartered Institute of Arbitrators rules.'],
  ['Changes.', 'These Terms may be updated at any time. Continued use of the service means you accept the updated Terms.'],
]
export default function TermsPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#f5f2ec', minHeight: '100vh' }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-5 md:px-10 pt-36 pb-24">
        <span className="label-sm block mb-4">Legal</span>
        <h1 className="heading-lg mb-2">Terms of Use</h1>
        <p className="text-sm text-white/35 mb-12">Effective: 30 March 2023 · Creatorh Technologies Limited</p>
        <p className="text-white/60 text-base leading-relaxed mb-10">
          These Terms govern your use of Monapp's credit card service and Fynd platform. Please read them carefully.
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
          <p className="text-sm text-white/50">Questions? <a href="mailto:support@monapp.ng" className="text-white/70 hover:text-white">support@monapp.ng</a></p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
