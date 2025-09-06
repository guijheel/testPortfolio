"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      className={cn("backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl", className)}
      whileHover={{
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
        borderColor: "rgba(255, 255, 255, 0.3)",
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
