"use client"

import { useState, useCallback } from "react"

export const useBrandHover = () => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleBrandHover = useCallback(
    (brandName: string | null) => {
      if (brandName !== hoveredBrand) {
        setIsTransitioning(true)
        setTimeout(() => {
          setHoveredBrand(brandName)
          setIsTransitioning(false)
        }, 150)
      }
    },
    [hoveredBrand],
  )

  return {
    hoveredBrand,
    isTransitioning,
    handleBrandHover,
  }
}
