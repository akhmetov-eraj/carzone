"use client"

import { motion, AnimatePresence } from "framer-motion"
import { BrandCard } from './brand-card'
import { AnimatedButton } from '@/shared/ui/animated-button'
import { useBrandHover } from '@/shared/hooks/use-brand-hover'
import { BRANDS } from '@/entities/brands/data/brands'


export function BrandsSection() {
  const { hoveredBrand, handleBrandHover } = useBrandHover()

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 "></div>

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
              className="w-16 h-px bg-gradient-to-r from-yellow-400 to-orange-400"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <h2 className="text-sm font-medium tracking-wider text-gray-400 uppercase">
              Popular Exotic & Luxury Rental Makes
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-md">The finest purveyors of supercars, sports cars, and limos</p>
        </motion.div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {BRANDS.map((brand, index) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              index={index}
              isHovered={hoveredBrand === brand.name}
              isAnyHovered={hoveredBrand !== null}
              onHover={handleBrandHover}
            />
          ))}
        </div>

        {/* Dynamic Description */}
        <div className="text-right mb-12 min-h-[100px] flex items-end justify-end">
          <div className="max-w-md">
            <AnimatePresence mode="wait">
              <motion.p
                key={hoveredBrand || "default"}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="text-gray-400 text-sm leading-relaxed"
              >
                {hoveredBrand
                  ? BRANDS.find((brand) => brand.name === hoveredBrand)?.description
                  : "Hover over any brand to discover the unique heritage and craftsmanship that defines each luxury automotive manufacturer."}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <AnimatedButton>Buy a Lamborghini</AnimatedButton>
        </motion.div>
      </div>
    </section>
  )
}
