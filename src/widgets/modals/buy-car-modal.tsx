'use client'

import type React from 'react'

import { CarData } from '@/entities/cars/types/car'
import { BuyFormData } from '@/entities/modal/types/modal'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Modal } from '@/shared/ui/modal'
import { Select } from '@/shared/ui/select'
import { motion } from 'framer-motion'
import { Car, DollarSign, Home } from 'lucide-react'
import { useState } from 'react'

interface BuyCarModalProps {
  isOpen: boolean
  onClose: () => void
  car: CarData | null
}

export function BuyCarModal({ isOpen, onClose, car }: BuyCarModalProps) {
  const [formData, setFormData] = useState<BuyFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cash',
    tradeIn: false,
    tradeInDetails: '',
    financing: {
      downPayment: 0,
      loanTerm: 60,
      creditScore: '',
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Buy form submitted:', { car: car?.fullName, ...formData })
    setIsSubmitting(false)
    onClose()

    alert(`Purchase request submitted for ${car?.fullName}!`)
  }

  const handleInputChange = (
    field: keyof BuyFormData,
    value: string | boolean | BuyFormData['paymentMethod']
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFinancingChange = (
    field: keyof NonNullable<BuyFormData['financing']>,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      financing: { ...prev.financing!, [field]: value },
    }))
  }

  const calculateMonthlyPayment = (): number => {
    if (!car || formData.paymentMethod !== 'financing') return 0

    const price = Number.parseFloat(car.price.replace(/[$,]/g, ''))
    const downPayment = formData.financing?.downPayment || 0
    const loanAmount = price - downPayment
    const monthlyRate = 0.05 / 12 // 5% APR
    const months = formData.financing?.loanTerm || 60

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)

    return Math.round(monthlyPayment)
  }

  if (!car) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Purchase This Car" size="xl">
      <div className="p-6">
        {/* Car Info */}
        <motion.div
          className="mb-6 p-4 bg-background rounded-lg border border-background"
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
              <p className="text-3xl font-bold text-yellow-400">{car.price}</p>
              {formData.paymentMethod === 'financing' && calculateMonthlyPayment() > 0 && (
                <p className="text-sm text-gray-400">
                  ${calculateMonthlyPayment()}/month for {formData.financing?.loanTerm} months
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white">Personal Information</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={e => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={e => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={e => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={e => handleInputChange('zipCode', e.target.value)}
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white">Payment Method</h4>
            </div>
            <div className="space-y-4">
              <Select
                value={formData.paymentMethod}
                onValueChange={(value: string) =>
                  handleInputChange('paymentMethod', value as BuyFormData['paymentMethod'])
                }
              >
                <option value="cash">Cash Payment</option>
                <option value="financing">Financing</option>
                <option value="lease">Lease</option>
              </Select>

              {formData.paymentMethod === 'financing' && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-background rounded-lg">
                  <div>
                    <Label htmlFor="downPayment">Down Payment ($)</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={formData.financing?.downPayment || 0}
                      onChange={e => handleFinancingChange('downPayment', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                    <Select
                      value={formData.financing?.loanTerm?.toString() || '60'}
                      onValueChange={(value: string) =>
                        handleFinancingChange('loanTerm', Number(value))
                      }
                    >
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                      <option value="60">60 months</option>
                      <option value="72">72 months</option>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="creditScore">Credit Score Range</Label>
                    <Select
                      value={formData.financing?.creditScore || ''}
                      onValueChange={(value: string) => handleFinancingChange('creditScore', value)}
                    >
                      <option value="">Select range</option>
                      <option value="excellent">Excellent (750+)</option>
                      <option value="good">Good (700-749)</option>
                      <option value="fair">Fair (650-699)</option>
                      <option value="poor">Poor (Below 650)</option>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Trade-in */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white">Trade-in</h4>
            </div>
            <div className="space-y-4">
              <Checkbox
                id="tradeIn"
                checked={formData.tradeIn}
                onChange={e => handleInputChange('tradeIn', (e.target as HTMLInputElement).checked)}
              />
              <Label htmlFor="tradeIn">I have a vehicle to trade in</Label>
              {formData.tradeIn && (
                <div>
                  <Label htmlFor="tradeInDetails">
                    Vehicle Details (Year, Make, Model, Mileage)
                  </Label>
                  <Input
                    id="tradeInDetails"
                    value={formData.tradeInDetails || ''}
                    onChange={e => handleInputChange('tradeInDetails', e.target.value)}
                    placeholder="e.g., 2020 Honda Civic, 45,000 miles"
                  />
                </div>
              )}
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
              {isSubmitting ? 'Processing...' : 'Submit Purchase Request'}
            </Button>
          </motion.div>
        </form>
      </div>
    </Modal>
  )
}
