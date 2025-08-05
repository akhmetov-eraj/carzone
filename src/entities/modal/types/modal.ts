export type ModalType = "rent" | "buy" | "details" | null

export interface RentFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  startDate: string
  endDate: string
  pickupLocation: string
  dropoffLocation: string
  driverLicense: string
  insurance: boolean
  additionalDriver: boolean
}

export interface BuyFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  paymentMethod: "cash" | "financing" | "lease"
  tradeIn: boolean
  tradeInDetails?: string
  financing?: {
    downPayment: number
    loanTerm: number
    creditScore: string
  }
}
