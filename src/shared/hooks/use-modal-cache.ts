"use client"

import { useRef, useCallback } from "react"
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js"

interface ModelCacheEntry {
  model: GLTF
  lastUsed: number
}

interface UseModelCacheReturn {
  getModel: (url: string) => GLTF | null
  setModel: (url: string, model: GLTF) => void
  clearCache: () => void
}

const MAX_CACHE_SIZE = 10
const CACHE_EXPIRY = 5 * 60 * 1000 // 5 minutes

export function useModelCache(): UseModelCacheReturn {
  const cacheRef = useRef<Map<string, ModelCacheEntry>>(new Map())

  const getModel = useCallback((url: string): GLTF | null => {
    const entry = cacheRef.current.get(url)
    if (entry) {
      entry.lastUsed = Date.now()
      return entry.model
    }
    return null
  }, [])

  const setModel = useCallback((url: string, model: GLTF) => {
    // Clean expired entries
    const now = Date.now()
    for (const [key, entry] of cacheRef.current.entries()) {
      if (now - entry.lastUsed > CACHE_EXPIRY) {
        cacheRef.current.delete(key)
      }
    }

    // Remove oldest entries if cache is full
    if (cacheRef.current.size >= MAX_CACHE_SIZE) {
      let oldestKey = ""
      let oldestTime = Number.POSITIVE_INFINITY
      for (const [key, entry] of cacheRef.current.entries()) {
        if (entry.lastUsed < oldestTime) {
          oldestTime = entry.lastUsed
          oldestKey = key
        }
      }
      if (oldestKey) {
        cacheRef.current.delete(oldestKey)
      }
    }

    cacheRef.current.set(url, { model, lastUsed: now })
  }, [])

  const clearCache = useCallback(() => {
    cacheRef.current.clear()
  }, [])

  return { getModel, setModel, clearCache }
}
