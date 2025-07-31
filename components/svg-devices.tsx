"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Info } from "lucide-react"
import { useState, useEffect } from "react"

interface DeviceModalProps {
  device: {
    name: string
    description: string
    specs: string[]
    image: string
  }
  isOpen: boolean
  onClose: () => void
}

function DeviceModal({ device, isOpen, onClose }: DeviceModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-2xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-white mb-2">{device.name}</h3>
              <p className="text-gray-300 text-lg">{device.description}</p>
            </div>

            <div className="mb-6">
              <img
                src={device.image || "/placeholder.svg"}
                alt={device.name}
                className="w-full h-64 object-contain rounded-lg"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                <Info className="w-5 h-5" />
                Key Features
              </h4>
              <ul className="space-y-2">
                {device.specs.map((spec, index) => (
                  <li key={index} className="text-gray-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              View Project Details
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function MacBookSVG({ position, onClick }: { position: [number, number, number]; onClick: () => void }) {
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        left: `${50 + position[0] * 3}%`,
        top: `${50 + position[1] * 3}%`,
        transform: "translate(-50%, -50%)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={{
        y: [0, -10, 0],
        rotateY: [0, 5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <svg width="120" height="80" viewBox="0 0 120 80" className="drop-shadow-2xl">
        {/* MacBook Base */}
        <rect x="10" y="45" width="100" height="30" rx="3" fill="url(#macbookGradient)" />

        {/* MacBook Screen */}
        <rect x="15" y="10" width="90" height="60" rx="5" fill="url(#screenGradient)" />

        {/* Screen Content */}
        <rect x="20" y="15" width="80" height="50" rx="3" fill="#1e40af" opacity="0.8" />

        {/* Apple Logo */}
        <circle cx="60" cy="25" r="3" fill="white" opacity="0.9" />

        {/* Keyboard */}
        <rect x="25" y="50" width="70" height="15" rx="2" fill="#1a1a1a" />

        {/* Trackpad */}
        <rect x="50" y="58" width="20" height="12" rx="2" fill="#2a2a2a" />

        <defs>
          <linearGradient id="macbookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export function IPhoneSVG({ position, onClick }: { position: [number, number, number]; onClick: () => void }) {
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        left: `${50 + position[0] * 3}%`,
        top: `${50 + position[1] * 3}%`,
        transform: "translate(-50%, -50%)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={{
        y: [0, -8, 0],
        rotateZ: [0, 3, -3, 0],
      }}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <svg width="60" height="100" viewBox="0 0 60 100" className="drop-shadow-2xl">
        {/* iPhone Body */}
        <rect x="5" y="5" width="50" height="90" rx="12" fill="url(#iphoneGradient)" stroke="#333" strokeWidth="1" />

        {/* iPhone Screen */}
        <rect x="8" y="12" width="44" height="76" rx="8" fill="#000" />

        {/* Screen Content */}
        <rect x="10" y="14" width="40" height="72" rx="6" fill="#007AFF" opacity="0.9" />

        {/* Dynamic Island */}
        <rect x="22" y="18" width="16" height="4" rx="2" fill="#000" />

        {/* Camera System */}
        <rect x="12" y="25" width="12" height="12" rx="3" fill="#2a2a2a" />
        <circle cx="15" cy="28" r="2" fill="#000" />
        <circle cx="21" cy="31" r="2" fill="#000" />

        {/* Home Indicator */}
        <rect x="25" y="85" width="10" height="2" rx="1" fill="white" opacity="0.6" />

        <defs>
          <linearGradient id="iphoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export function AppleWatchSVG({ position, onClick }: { position: [number, number, number]; onClick: () => void }) {
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        left: `${50 + position[0] * 3}%`,
        top: `${50 + position[1] * 3}%`,
        transform: "translate(-50%, -50%)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={{
        y: [0, -6, 0],
        rotateY: [0, 10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <svg width="70" height="80" viewBox="0 0 70 80" className="drop-shadow-2xl">
        {/* Watch Band Top */}
        <rect x="30" y="5" width="10" height="20" rx="5" fill="#1a1a1a" />

        {/* Watch Case */}
        <rect x="15" y="25" width="40" height="45" rx="12" fill="url(#watchGradient)" stroke="#999" strokeWidth="1" />

        {/* Watch Screen */}
        <rect x="18" y="28" width="34" height="39" rx="9" fill="#000" />

        {/* Screen Content */}
        <rect x="20" y="30" width="30" height="35" rx="7" fill="#00ff88" opacity="0.8" />

        {/* Digital Crown */}
        <circle cx="58" cy="40" r="3" fill="#c0c0c0" />

        {/* Watch Band Bottom */}
        <rect x="30" y="75" width="10" height="20" rx="5" fill="#1a1a1a" />

        <defs>
          <linearGradient id="watchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5e5e5" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export function IPadSVG({ position, onClick }: { position: [number, number, number]; onClick: () => void }) {
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        left: `${50 + position[0] * 3}%`,
        top: `${50 + position[1] * 3}%`,
        transform: "translate(-50%, -50%)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={{
        y: [0, -12, 0],
        rotateX: [0, 2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <svg width="90" height="120" viewBox="0 0 90 120" className="drop-shadow-2xl">
        {/* iPad Body */}
        <rect x="5" y="5" width="80" height="110" rx="8" fill="url(#ipadGradient)" stroke="#ccc" strokeWidth="1" />

        {/* iPad Screen */}
        <rect x="8" y="8" width="74" height="104" rx="5" fill="#000" />

        {/* Screen Content */}
        <rect x="10" y="10" width="70" height="100" rx="3" fill="#FF6B35" opacity="0.9" />

        {/* Home Indicator */}
        <rect x="37" y="105" width="16" height="2" rx="1" fill="white" opacity="0.6" />

        {/* Camera */}
        <circle cx="45" cy="15" r="2" fill="#333" />

        <defs>
          <linearGradient id="ipadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f5f5" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export function InteractiveDevices() {
  const [selectedDevice, setSelectedDevice] = useState<any>(null)

  const devices = {
    macbook: {
      name: "MacBook Pro",
      description: "Supercharged by M3 Pro and M3 Max chips",
      specs: [
        "Up to 22-hour battery life",
        "Liquid Retina XDR display",
        "Advanced camera and audio",
        "Extensive connectivity",
      ],
      image: "/placeholder.svg?height=300&width=500&text=MacBook+Pro",
    },
    iphone: {
      name: "iPhone 15 Pro",
      description: "Titanium. So strong. So light. So Pro.",
      specs: ["A17 Pro chip with 6-core GPU", "Pro camera system", "Action Button", "USB-C connectivity"],
      image: "/placeholder.svg?height=400&width=200&text=iPhone+15+Pro",
    },
    watch: {
      name: "Apple Watch Series 9",
      description: "Your essential companion for a healthy life",
      specs: [
        "S9 SiP with Neural Engine",
        "Double Tap gesture",
        "Precision Finding for iPhone",
        "Carbon neutral combinations",
      ],
      image: "/placeholder.svg?height=300&width=300&text=Apple+Watch+Series+9",
    },
    ipad: {
      name: "iPad Pro",
      description: "Supercharged by the Apple M2 chip",
      specs: [
        "M2 chip with 8-core CPU",
        "Liquid Retina XDR display",
        "Pro cameras with LiDAR Scanner",
        "Works with Apple Pencil",
      ],
      image: "/placeholder.svg?height=400&width=300&text=iPad+Pro",
    },
  }

  return (
    <>
      <MacBookSVG position={[-8, 0, -8]} onClick={() => setSelectedDevice(devices.macbook)} />
      <IPhoneSVG position={[8, 3, -6]} onClick={() => setSelectedDevice(devices.iphone)} />
      <AppleWatchSVG position={[-5, 4, -5]} onClick={() => setSelectedDevice(devices.watch)} />
      <IPadSVG position={[6, -4, -7]} onClick={() => setSelectedDevice(devices.ipad)} />

      <DeviceModal device={selectedDevice} isOpen={!!selectedDevice} onClose={() => setSelectedDevice(null)} />
    </>
  )
}
