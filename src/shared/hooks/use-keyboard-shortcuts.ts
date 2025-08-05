"use client"

import { useEffect } from "react"

interface KeyboardShortcutsProps {
  onPrevious: () => void
  onNext: () => void
  onToggleAutoplay: () => void
  onGoToSlide: (index: number) => void
  isTransitioning: boolean
  totalSlides: number
}

export function useKeyboardShortcuts({
  onPrevious,
  onNext,
  onToggleAutoplay,
  onGoToSlide,
  isTransitioning,
  totalSlides,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (isTransitioning) return

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          onPrevious()
          break
        case "ArrowRight":
          e.preventDefault()
          onNext()
          break
        case " ":
          e.preventDefault()
          onToggleAutoplay()
          break
        case "Home":
          e.preventDefault()
          onGoToSlide(0)
          break
        case "End":
          e.preventDefault()
          onGoToSlide(totalSlides - 1)
          break
        default:
          // Handle number keys 1-8 for direct slide navigation
          const num = Number.parseInt(e.key)
          if (num >= 1 && num <= totalSlides) {
            e.preventDefault()
            onGoToSlide(num - 1)
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onPrevious, onNext, onToggleAutoplay, onGoToSlide, isTransitioning, totalSlides])
}
