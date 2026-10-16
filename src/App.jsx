import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import PaymentApprovedPage from './pages/PaymentApprovedPage.jsx'
import PaymentFailedPage from './pages/PaymentFailedPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/pagamento-aprovado" element={<PaymentApprovedPage />} />
      <Route path="/pagamento-nao-concluido" element={<PaymentFailedPage />} />
    </Routes>
  )
}