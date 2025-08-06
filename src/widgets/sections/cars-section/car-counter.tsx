"use client"

import { motion } from "framer-motion"

interface CarCounterProps {
  currentSlide: number
  totalSlides: number
  isVisible: boolean
}

export function CarCounter({ currentSlide, totalSlides, isVisible }: CarCounterProps) {
  if (!isVisible) return null

  return (
    <motion.div
      className="absolute top-4 md:top-8 left-4 md:left-8 z-20 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex flex-col">
        {/* <p className="text-sm font-light mb-1">
          <span className="text-3xl font-bold">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="text-white/60"> / {String(totalSlides).padStart(2, "0")}</span>
        </p> */}
        {/* <div className="w-16 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-yellow-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div> */}
      </div>
    </motion.div>
  )
}
