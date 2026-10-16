import raw from './sales.body.html?raw'
import '../styles/sales.css'
import ScaledPage from '../components/ScaledPage.jsx'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { useEffect } from 'react'
import { setupPageInteractions, updateCartCountBadge } from '../lib/pageInteractions.js'

export default function HomePage() {
  const navigate = useNavigate()
  const { count, addItem } = useCart()

  useEffect(() => {
    const root = document.querySelector('.scaled-page')
    if (!root) return
    return setupPageInteractions(root, { navigate, addItem })
  }, [navigate, addItem])

  useEffect(() => {
    updateCartCountBadge(count)
  }, [count])

  return <ScaledPage html={raw} />
}