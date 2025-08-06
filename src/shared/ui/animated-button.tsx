"use client"

import { motion } from "framer-motion"
import { Button } from "@/shared/ui/button"
import type { ReactNode } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "default" | "outline"
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export function AnimatedButton({
  children,
  onClick,
  variant = "default",
  className = "",
  size = "default",
}: AnimatedButtonProps) {
  const baseClasses =
    variant === "default"
      ? "bg-gradient-to-r bg-primary hover:from-yellow-500 hover:to-orange-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:shadow-2xl"
      : "border-gray-600 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full px-6 bg-transparent"

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
      <Button variant={variant} size={size} className={`${baseClasses} ${className}`} onClick={onClick}>
        {children}
      </Button>
    </motion.div>
  )
}
