"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface PerformanceContextType {
  isLowPerformance: boolean
  reducedMotion: boolean
  devicePixelRatio: number
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined)

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    // Check device capabilities
    const checkPerformance = () => {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

      if (!gl) {
        setIsLowPerformance(true)
        return
      }

      // Check for mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      // Check memory (if available)
      const memory = (navigator as any).deviceMemory
      const isLowMemory = memory && memory < 4

      // Check CPU cores
      const cores = navigator.hardwareConcurrency
      const isLowCPU = cores && cores < 4

      setIsLowPerformance(isMobile || isLowMemory || isLowCPU)
      setDevicePixelRatio(Math.min(window.devicePixelRatio, 2)) // Cap at 2x for performance
    }

    checkPerformance()

    // Listen for changes
    mediaQuery.addEventListener("change", (e) => setReducedMotion(e.matches))

    return () => {
      mediaQuery.removeEventListener("change", (e) => setReducedMotion(e.matches))
    }
  }, [])

  return (
    <PerformanceContext.Provider value={{ isLowPerformance, reducedMotion, devicePixelRatio }}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error("usePerformance must be used within a PerformanceProvider")
  }
  return context
}
