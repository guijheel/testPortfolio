"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Rendu par défaut pendant le chargement
  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
        <Moon className="w-5 h-5 text-blue-300" />
      </div>
    )
  }

  return <ThemeToggleContent />
}

function ThemeToggleContent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? <Moon className="w-5 h-5 text-blue-300" /> : <Sun className="w-5 h-5 text-yellow-500" />}
      </motion.div>
    </motion.button>
  )
}
