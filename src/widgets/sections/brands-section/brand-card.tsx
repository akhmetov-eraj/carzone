'use client'

import { Brand } from '@/entities/brands/types/brand'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface BrandCardProps {
  brand: Brand
  position: number // -2, -1, 0, 1, 2 (где 0 - центр)
  isCenter: boolean
}

export function BrandCard({ brand, position, isCenter }: BrandCardProps) {
  // Вычисляем стили в зависимости от позиции
  const getCardStyles = () => {
    const baseScale = 0.6
    const centerScale = 1.2
    const sideScale = 0.8
    
    let scale = baseScale
    let opacity = 0.3
    let zIndex = 1
    let x = position * 180
    
    if (position === 0) {
      // Центральный элемент
      scale = centerScale
      opacity = 1
      zIndex = 10
      x = 0
    } else if (Math.abs(position) === 1) {
      // Соседние элементы
      scale = sideScale
      opacity = 0.7
      zIndex = 5
      x = position * 160
    } else {
      // Крайние элементы
      scale = baseScale
      opacity = 0.4
      zIndex = 1
      x = position * 140
    }
    
    return { scale, opacity, zIndex, x }
  }

  const { scale, opacity, zIndex, x } = getCardStyles()

  return (
    <motion.div
      className="absolute"
      animate={{
        scale,
        opacity,
        x,
        zIndex,
        rotateY: position * 15, // Небольшой 3D эффект
      }}
      transition={{
        duration: 0.8,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
      style={{ zIndex }}
    >
      {/* Glow effect для центрального элемента */}
      {isCenter && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <motion.div
        className={`
          relative bg-[#1E1E1E] border rounded-2xl p-8
          transition-all duration-500 overflow-hidden
          flex items-center justify-center min-h-[250px] w-[200px]
          ${isCenter ? 'border-white/30 shadow-2xl' : 'border-[#1E1E1E]'}
        `}
        animate={{
          borderColor: isCenter ? 'rgba(255,255,255,0.3)' : 'rgb(31 41 55)',
          boxShadow: isCenter 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255,255,255,0.1)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
        }}
        transition={{ duration: 0.8 }}
      >
        {/* Shine effect для центрального элемента */}
        {isCenter && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        )}

        <motion.div
          className="relative z-10 w-[100px] h-[100px] flex items-center justify-center"
          animate={{
            scale: isCenter ? 1.3 : 1,
            rotateY: isCenter ? [0, 5, 0] : 0,
          }}
          transition={{
            duration: isCenter ? 2 : 0.8,
            repeat: isCenter ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <Image
            src={brand.logo || '/placeholder.svg'}
            alt={brand.name}
            fill
            className={`
              object-contain transition-all duration-500
              ${isCenter 
                ? 'filter-none brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]' 
                : 'filter grayscale brightness-75'
              }
            `}
          />
        </motion.div>

        {/* Brand name для центрального элемента */}
        {isCenter && (
          <motion.div
            className="absolute bottom-4 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-sm font-medium text-white/90">
              {brand.name}
            </p>
          </motion.div>
        )}

        {/* Gradient overlay для центрального элемента */}
        {isCenter && (
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${brand.color} opacity-20`}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
