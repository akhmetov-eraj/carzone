"use client"

import { useEffect, useState } from "react"

export function usePreloadImages(imagePaths: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (imagePaths.length === 0) {
      setIsLoading(false)
      return
    }

    let loadedCount = 0
    const totalImages = imagePaths.length

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, src]))
          loadedCount++
          if (loadedCount === totalImages) {
            setIsLoading(false)
          }
          resolve()
        }
        img.onerror = reject
        img.src = src
      })
    }

    Promise.allSettled(imagePaths.map(preloadImage))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }, [imagePaths])

  return { loadedImages, isLoading }
}
