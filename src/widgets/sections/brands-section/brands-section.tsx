"use client"

import { motion, AnimatePresence } from "framer-motion"
import { BrandCard } from './brand-card'
import { AnimatedButton } from '@/shared/ui/animated-button'
import { BRANDS } from '@/entities/brands/data/brands'
import { useEffect, useState } from 'react'

export function BrandsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  // const [direction, setDirection] = useState(1)

  // Автоматическое переключение каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % BRANDS.length
        return next
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Получаем видимые бренды (центральный + соседние)
  const getVisibleBrands = () => {
    const visible = []
    const totalBrands = BRANDS.length
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalBrands) % totalBrands
      visible.push({
        brand: BRANDS[index],
        position: i,
        index: index
      })
    }
    
    return visible
  }

  const visibleBrands = getVisibleBrands()
  const currentBrand = BRANDS[currentIndex]

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-16 h-px bg-gradient-to-r bg-primary"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <h2 className="text-lg font-medium tracking-wider uppercase">
              Popular Exotic & Luxury Rental Makes
            </h2>
          </div>
          <p className="text-[#747474] text-lg max-w-md w-[25%]">
            The finest purveyors of supercars, sports cars, and limos
          </p>
        </motion.div>

        {/* Dynamic Description */}
        <div className="text-right mb-12 min-h-[100px] flex items-end justify-end">
          <div className="max-w-md">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentBrand.name}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="text-[#747474] text-sm leading-relaxed"
              >
                {currentBrand.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Brand Cards Slider */}
        <div className="relative mb-12 h-[300px] flex items-center justify-center">
          <div className="flex items-center justify-center gap-4">
            {visibleBrands.map(({ brand, position, index }) => (
              <BrandCard
                key={`${brand.name}-${index}`}
                brand={brand}
                position={position}
                isCenter={position === 0}
              />
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {BRANDS.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-8' : 'bg-gray-600 w-2'
              }`}
              animate={{
                backgroundColor: index === currentIndex ? '#ffffff' : '#4b5563',
                width: index === currentIndex ? 32 : 8
              }}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <AnimatedButton>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentBrand.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                Buy a {currentBrand.name}
              </motion.span>
            </AnimatePresence>
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  )
}
