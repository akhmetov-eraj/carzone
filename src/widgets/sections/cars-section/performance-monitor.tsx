"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [showMonitor, setShowMonitor] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const updateFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(updateFPS)
    }

    updateFPS()

    // Show monitor on key press
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        setShowMonitor((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  return (
    <AnimatePresence>
      {showMonitor && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center gap-4 text-sm">
            <span>FPS: {fps}</span>
            <span className={fps >= 60 ? "text-green-400" : fps >= 30 ? "text-yellow-400" : "text-red-400"}>
              {fps >= 60 ? "Excellent" : fps >= 30 ? "Good" : "Poor"}
            </span>
            <span className="text-gray-400">Press F1 to toggle</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
