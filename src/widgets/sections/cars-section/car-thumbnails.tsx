"use client"

import { CarData } from '@/entities/cars/data/car'
import { motion, AnimatePresence } from "framer-motion"


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
        <p className="text-sm font-light mb-1">
          <span className="text-3xl font-bold">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="text-white/60"> / {String(totalSlides).padStart(2, "0")}</span>
        </p>
        <div className="w-16 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-yellow-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}

interface CarThumbnailsProps {
  cars: CarData[]
  currentSlide: number
  onSlideChange: (index: number) => void
  isVisible: boolean
}

export function CarThumbnails({ cars, currentSlide, onSlideChange, isVisible }: CarThumbnailsProps) {
  if (!isVisible) return null

  return (
    <motion.div
      className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 1.5 }}
    >
      <div className="flex gap-2 bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-white/10">
        <AnimatePresence>
          {cars.map((car, index) => (
            <motion.button
              key={car.id}
              onClick={() => onSlideChange(index)}
              className={`relative w-16 h-10 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentSlide ? "ring-2 ring-yellow-400 scale-110" : "hover:scale-105"
              }`}
              whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <div
                className="w-full h-full rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${car.color}dd, ${car.color}88)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              <div className="absolute bottom-0.5 left-1 right-1">
                <p className="text-white text-[8px] font-bold truncate">{car.brand}</p>
              </div>
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-yellow-400/20 rounded-lg"
                  layoutId="activeThumbnail"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
