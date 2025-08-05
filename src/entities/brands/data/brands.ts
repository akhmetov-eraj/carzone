import { Brand } from '../types/brand'

export const BRANDS: Brand[] = [
  {
    name: "Bugatti",
    logo: "/images/brands/bugatti-logo.png?height=80&width=120&text=BUGATTI",
    description:
      "French luxury automotive manufacturer known for producing some of the fastest and most expensive cars in the world. Experience the pinnacle of automotive engineering with unmatched speed and elegance.",
    color: "from-blue-500/20 to-purple-500/20",
    accent: "border-blue-400/50",
  },
  {
    name: "Ferrari",
    logo: "/images/brands/ferrari-logo.svg?height=80&width=120&text=ferrari",
    description:
      "Italian luxury sports car manufacturer renowned for Formula 1 racing heritage and iconic red supercars. Feel the passion of Italian craftsmanship and racing DNA in every curve.",
    color: "from-red-500/20 to-orange-500/20",
    accent: "border-red-400/50",
  },
  {
    name: "lamborghini",
    logo: "/images/brands/lamborghini-logo.png?height=100&width=140&text=LAMBORGHINI",
    featured: true,
    description:
      "No automotive brand is as alluring as Lamborghini. Scissor doors, V10 and V12 engines, howling exhaust notes — their exotic models are the very definition of ostentatious luxury and raw power.",
    color: "from-yellow-500/30 to-orange-500/30",
    accent: "border-yellow-400/70",
  },
  {
    name: "Jaguar",
    logo: "/images/brands/jaguar_logo.svg?height=80&width=120&text=JAGUAR",
    description:
      "British luxury vehicle brand known for elegant design and powerful performance in sedans and sports cars. Embrace the grace and power of British engineering with timeless sophistication.",
    color: "from-green-500/20 to-teal-500/20",
    accent: "border-green-400/50",
  },
  {
    name: "Bentley",
    logo: "/images/brands/bentley_logo.png?height=80&width=120&text=BENTLEY",
    description:
      "British manufacturer of ultra-luxury cars combining traditional craftsmanship with modern technology. Experience unparalleled luxury and refinement in every handcrafted detail.",
    color: "from-gray-500/20 to-slate-500/20",
    accent: "border-gray-400/50",
  },
]