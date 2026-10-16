import raw from './checkout.body.html?raw'
import '../styles/checkout.css'
import ScaledPage from '../components/ScaledPage.jsx'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { useEffect } from 'react'
import { setupPageInteractions, updateCartCountBadge } from '../lib/pageInteractions.js'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { count, clear } = useCart()

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