"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, User, CreditCard } from "lucide-react"
import { Modal } from "@/shared/ui/modal"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Select } from "@/shared/ui/select"
import { Checkbox } from "@/shared/ui/checkbox"
import { CarData } from '@/entities/cars/data/car'
import { RentFormData } from '@/entities/modal/types/modal'

interface RentCarModalProps {
  isOpen: boolean
  onClose: () => void
  car: CarData | null
}

export function RentCarModal({ isOpen, onClose, car }: RentCarModalProps) {
  const [formData, setFormData] = useState<RentFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    driverLicense: "",
    insurance: false,
    additionalDriver: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Rent form submitted:", { car: car?.fullName, ...formData })
    setIsSubmitting(false)
    onClose()

    // Show success message (you can implement toast notifications)
    alert(`Rental request submitted for ${car?.fullName}!`)
  }

  const handleInputChange = (field: keyof RentFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateDays = (): number => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return 0
  }

  const dailyRate = 299
  const totalCost = calculateDays() * dailyRate

  if (!car) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rent This Car" size="lg">
      <div className="p-6">
        {/* Car Info */}
        <motion.div
          className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-10 rounded-lg" style={{ backgroundColor: car.color }} />
            <div>
              <h3 className="text-lg font-bold text-white">{car.fullName}</h3>
              <p className="text-gray-400">
                {car.year} • {car.power} • {car.category}
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl font-bold text-yellow-400">${dailyRate}/day</p>
              {totalCost > 0 && (
                <p className="text-sm text-gray-400">
                  Total: ${totalCost} ({calculateDays()} days)
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white">Personal Information</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* Rental Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white">Rental Details</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="pickupLocation">Pickup Location</Label>
                <Select
                  id="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                  required
                >
                  <option value="">Select location</option>
                  <option value="downtown">Downtown Showroom</option>
                  <option value="airport">Airport Location</option>
                  <option value="mall">Shopping Mall</option>
                  <option value="hotel">Hotel Delivery</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="dropoffLocation">Dropoff Location</Label>
                <Select
                  id="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={(e) => handleInputChange("dropoffLocation", e.target.value)}
                  required
                >
                  <option value="">Select location</option>
                  <option value="downtown">Downtown Showroom</option>
                  <option value="airport">Airport Location</option>
                  <option value="mall">Shopping Mall</option>
                  <option value="hotel">Hotel Pickup</option>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Driver Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white">Driver Information</h4>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="driverLicense">Driver License Number</Label>
                <Input
                  id="driverLicense"
                  value={formData.driverLicense}
                  onChange={(e) => handleInputChange("driverLicense", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-3">
                <Checkbox
                  id="insurance"
                  checked={formData.insurance}
                  onChange={(e) => handleInputChange("insurance", e.target.checked)}
                  label="Add comprehensive insurance (+$29/day)"
                />
                <Checkbox
                  id="additionalDriver"
                  checked={formData.additionalDriver}
                  onChange={(e) => handleInputChange("additionalDriver", e.target.checked)}
                  label="Add additional driver (+$15/day)"
                />
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500"
            >
              {isSubmitting ? "Processing..." : `Rent for $${totalCost || dailyRate}`}
            </Button>
          </motion.div>
        </form>
      </div>
    </Modal>
  )
}
