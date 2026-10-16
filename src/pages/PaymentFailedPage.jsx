import raw from './payment-failed.body.html?raw'
import '../styles/payment-failed.css'
import ScaledPage from '../components/ScaledPage.jsx'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { useEffect } from 'react'
import { setupPageInteractions, updateCartCountBadge } from '../lib/pageInteractions.js'

export default function PaymentFailedPage() {
  const navigate = useNavigate()
  const { count } = useCart()

  useEffect(() => {
    const root = document.querySelector('.scaled-page')
    if (!root) return
    return setupPageInteractions(root, { navigate, addItem: () => {} })
  }, [navigate])

  useEffect(() => {
    updateCartCountBadge(count)
  }, [count])

  return <ScaledPage html={raw} />
}