import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FyndPage from './pages/FyndPage'
import FyndOtpPage from './pages/FyndOtpPage'
import FyndRegisterPage from './pages/FyndRegisterPage'
import FyndDashboardPage from './pages/FyndDashboardPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fynd" element={<FyndPage />} />
        <Route path="/fynd/verify" element={<FyndOtpPage />} />
        <Route path="/fynd/register" element={<FyndRegisterPage />} />
        <Route path="/fynd/dashboard" element={<FyndDashboardPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
