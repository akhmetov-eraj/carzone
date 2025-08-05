"use client"

import { useCallback, useRef } from "react"

export function useOptimizedAnimation() {
  const rafRef = useRef<number>()

  const animate = useCallback((callback: () => void) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    rafRef.current = requestAnimationFrame(callback)
  }, [])

  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { animate, cleanup }
}
