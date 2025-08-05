import { Instagram, Twitter, Facebook, Send, SnailIcon as Snapchat } from "lucide-react"

export interface SocialIcon {
  icon: any
  href: string
  label: string
}

export const SOCIAL_ICONS: SocialIcon[] = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Send, href: "#", label: "Telegram" },
  { icon: Snapchat, href: "#", label: "Snapchat" },
]

export const FOOTER_LINKS = ["Reservations", "Vehicles", "Promotions", "Businesses", "Customer Service"]
