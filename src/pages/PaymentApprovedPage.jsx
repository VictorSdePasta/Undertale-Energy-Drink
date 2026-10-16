import raw from './payment-approved.body.html?raw'
import '../styles/payment-approved.css'
import ScaledPage from '../components/ScaledPage.jsx'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { useEffect } from 'react'
import { setupPageInteractions, updateCartCountBadge } from '../lib/pageInteractions.js'

export default function PaymentApprovedPage() {
  const navigate = useNavigate()
  const { count, clear } = useCart()

  useEffect(() => {
    clear()
  }, [clear])

  useEffect(() => {
    const root = document.querySelector('.scaled-page')
    if (!root) return
    return setupPageInteractions(root, { navigate, addItem: () => {} })
  }, [navigate])

  useEffect(() => {
    updateCartCountBadge(0)
  }, [])

  return <ScaledPage html={raw} />
}