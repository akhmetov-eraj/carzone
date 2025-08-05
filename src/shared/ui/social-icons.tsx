"use client"

import { motion } from "framer-motion"
import type { SocialIcon } from "@/types"

interface SocialIconsProps {
  icons: SocialIcon[]
  className?: string
}

export function SocialIcons({ icons, className = "" }: SocialIconsProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {icons.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
          whileHover={{ scale: 1.2, y: -3 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
        >
          <social.icon className="h-4 w-4" />
        </motion.a>
      ))}
    </div>
  )
}
