import { useCallback } from "react"

export default function useProductsViewModel() {
  const scrollToSection = useCallback((sectionId) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return { scrollToSection }
}
