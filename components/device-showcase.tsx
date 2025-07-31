"use client"

import { motion } from "framer-motion"
import { Monitor, Smartphone, Watch, Tablet } from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-animations"

export function DeviceShowcase() {
  const devices = [
    {
      icon: Monitor,
      name: "MacBook Pro",
      description: "Professional laptop for development",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Smartphone,
      name: "iPhone 15 Pro",
      description: "Latest mobile technology",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Watch,
      name: "Apple Watch",
      description: "Wearable technology",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Tablet,
      name: "iPad Pro",
      description: "Tablet for creative work",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <section className="py-20 px-6 relative z-20">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-thin mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Interactive Device Gallery
          </h3>
          <p className="text-muted-foreground text-lg">Click on any floating device to explore its features</p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {devices.map((device, index) => (
            <StaggerItem key={device.name}>
              <motion.div
                className={`p-6 rounded-xl ${device.bgColor} backdrop-blur-sm border border-white/10 text-center`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <device.icon className={`w-8 h-8 ${device.color} mx-auto mb-3`} />
                <h4 className="font-semibold text-foreground mb-2">{device.name}</h4>
                <p className="text-sm text-muted-foreground">{device.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
