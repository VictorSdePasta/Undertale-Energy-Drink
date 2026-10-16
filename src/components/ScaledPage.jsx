import { useRef, useEffect } from 'react'

const BASE_WIDTH = 1440

export default function ScaledPage({ html }) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const content = root.firstElementChild
    if (!content) return

    const apply = () => {
      content.style.position = 'absolute'
      content.style.top = '0'
      content.style.left = '0'
      content.style.transform = 'none'
      const baseHeight = content.offsetHeight
      const scale = window.innerWidth / BASE_WIDTH

      content.style.transform = `scale(${scale})`
      content.style.transformOrigin = 'top left'
      root.style.height = `${baseHeight * scale}px`
      root.style.overflow = 'hidden'
    }

    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  return (
    <div
      ref={ref}
      className="scaled-page"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}