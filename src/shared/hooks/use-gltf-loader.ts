"use client"

import { useEffect, useState, useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js"

// Setup DRACO loader for compressed models
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/draco/")

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

interface UseGLTFLoaderReturn {
  model: GLTF | null
  loading: boolean
  error: Error | null
}

export function useGLTFLoader(url: string | undefined): UseGLTFLoaderReturn {
  const [model, setModel] = useState<GLTF | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!url) {
      setModel(null)
      setLoading(false)
      setError(null)
      return
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    setLoading(true)
    setError(null)

    const loadModel = async () => {
      try {
        const gltf = await new Promise<GLTF>((resolve, reject) => {
          gltfLoader.load(
            url,
            resolve,
            (progress: ProgressEvent<EventTarget>) => {
              // Optional: handle loading progress
              if (progress.lengthComputable) {
                console.log(`Loading ${url}: ${(progress.loaded / progress.total) * 100}%`)
              }
            },
            reject,
          )
        })

        if (!abortControllerRef.current?.signal.aborted) {
          setModel(gltf)
          setLoading(false)
        }
      } catch (err) {
        if (!abortControllerRef.current?.signal.aborted) {
          setError(err as Error)
          setLoading(false)
        }
      }
    }

    loadModel()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [url])

  return { model, loading, error }
}
