export interface CarData {
  id: string
  brand: string
  model: string
  fullName: string
  description: string
  year: number
  power: string
  maxSpeed: string
  acceleration: string
  mileage: string
  color: string
  brandColor: string
  typeLabel: string
  category: string
  price: string
  modelPath?: string // Path to GLB model
  modelScale?: number
  modelPosition?: [number, number, number]
  modelRotation?: [number, number, number]
  logo:string
}
