"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Globe } from "lucide-react"

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState<"en" | "fr" | "es">("en")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Récupérer la langue depuis localStorage
    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "es" | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const languages = [
    { code: "en", name: "EN", flag: "🇺🇸" },
    { code: "fr", name: "FR", flag: "🇫🇷" },
    { code: "es", name: "ES", flag: "🇪🇸" },
  ]

  const currentLang = languages.find((lang) => lang.code === language)

  const handleLanguageChange = (newLanguage: "en" | "fr" | "es") => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
    setIsOpen(false)
  }

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
        <Globe className="w-4 h-4" />
        <span className="font-medium">EN</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    )
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{currentLang?.name}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as "en" | "fr" | "es")}
                className="flex items-center gap-3 px-4 py-3 w-full text-left text-white hover:bg-white/20 transition-colors duration-200"
                whileHover={{ x: 4 }}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
