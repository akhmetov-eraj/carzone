"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Zap, Gauge, Calendar, Settings, Fuel, Users, Shield, Award, Star, MapPin } from "lucide-react"
import { Modal } from "@/shared/ui/modal"
import { Button } from "@/shared/ui/button"
import { CarData } from '@/entities/cars/data/car'

interface CarDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  car: CarData | null
  onRent: () => void
  onBuy: () => void
}

interface Specification {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

interface Review {
  name: string
  rating: number
  comment: string
  date: string
}

export function CarDetailsModal({ isOpen, onClose, car, onRent, onBuy }: CarDetailsModalProps) {
  if (!car) return null

  const specifications: Specification[] = [
    { icon: Zap, label: "Power", value: car.power },
    { icon: Gauge, label: "Max Speed", value: `${car.maxSpeed} km/h` },
    { icon: Settings, label: "Acceleration", value: `0-100 km/h in ${car.acceleration}` },
    { icon: Fuel, label: "Range", value: `${car.mileage} km` },
    { icon: Calendar, label: "Year", value: car.year.toString() },
    { icon: Users, label: "Seats", value: "2+2" },
    { icon: Shield, label: "Safety Rating", value: "5 Stars" },
    { icon: Award, label: "Warranty", value: "3 Years" },
  ]

  const features: string[] = [
    "Premium Leather Interior",
    "Advanced Driver Assistance",
    "Adaptive Cruise Control",
    "Premium Sound System",
    "Climate Control",
    "Navigation System",
    "Wireless Charging",
    "Panoramic Sunroof",
    "LED Headlights",
    "Sport Suspension",
    "Performance Brakes",
    "Carbon Fiber Accents",
  ]

  const reviews: Review[] = [
    {
      name: "Alex Johnson",
      rating: 5,
      comment: "Absolutely incredible driving experience. The power and handling are phenomenal!",
      date: "2 weeks ago",
    },
    {
      name: "Sarah Chen",
      rating: 5,
      comment: "Beautiful car with amazing attention to detail. Worth every penny.",
      date: "1 month ago",
    },
    {
      name: "Mike Rodriguez",
      rating: 4,
      comment: "Great performance car, though fuel economy could be better for daily driving.",
      date: "2 months ago",
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Car Details" size="xl">
      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <motion.div
          className="relative h-64 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at center, ${car.color}40, transparent 70%)`,
            }}
          />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{car.fullName}</h2>
                <p className="text-gray-300">{car.description}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-yellow-400">{car.price}</p>
                <p className="text-gray-300">{car.category}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-yellow-400/50 transition-colors"
              >
                <spec.icon className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-sm text-gray-400 mb-1">{spec.label}</p>
                <p className="text-white font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-xl font-bold text-white mb-4">Features & Equipment</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-xl font-bold text-white mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">{review.name.charAt(0)}</span>
                    </div>
                    <span className="text-white font-medium">{review.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Location & Availability */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-xl font-bold text-white mb-4">Location & Availability</h3>
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Downtown Showroom</span>
            </div>
            <p className="text-gray-400 mb-3">123 Luxury Car Boulevard, City Center</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-green-400 text-sm">Available Now</span>
              </div>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">Test drives available</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-4 pt-4 border-t border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onRent}
            variant="outline"
            className="flex-1 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent"
          >
            Rent This Car
          </Button>
          <Button onClick={onBuy} className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500">
            Buy This Car
          </Button>
        </motion.div>
      </div>
    </Modal>
  )
}
