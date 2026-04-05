import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import FyndPage from './pages/FyndPage'
import FyndOtpPage from './pages/FyndOtpPage'
import FyndRegisterPage from './pages/FyndRegisterPage'
import FyndDashboardPage from './pages/FyndDashboardPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import { HelmetProvider } from 'react-helmet-async'

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fynd" element={<FyndPage />} />
          <Route path="/fynd/verify" element={<FyndOtpPage />} />
          <Route path="/fynd/register" element={<ProtectedRoute><FyndRegisterPage /></ProtectedRoute>} />
          <Route path="/fynd/dashboard" element={<ProtectedRoute><FyndDashboardPage /></ProtectedRoute>} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </HelmetProvider>
  )
}
