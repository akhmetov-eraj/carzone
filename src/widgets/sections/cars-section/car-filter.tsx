"use client"

import { motion } from "framer-motion"
import { Button } from "@/shared/ui/button"
import { carCategories, CarCategory } from '@/entities/cars/data/cars'

interface CarFilterProps {
  selectedCategory: CarCategory
  onCategoryChange: (category: CarCategory) => void
  isVisible: boolean
}

export function CarFilter({ selectedCategory, onCategoryChange, isVisible }: CarFilterProps) {
  if (!isVisible) return null

  return (
    <motion.div
      className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-2 bg-black/50 backdrop-blur-md rounded-full p-2 border border-white/10">
        {carCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-4 py-2 text-xs transition-all duration-300 ${
              selectedCategory === category
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "text-white hover:bg-white/10"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </motion.div>
  )
}
