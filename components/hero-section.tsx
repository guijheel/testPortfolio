"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useLanguage } from "./language-provider"
import { GlassCard } from "./glass-card"
import { ScrollReveal, ParallaxText } from "./scroll-animations"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-12 mb-8">
            <h1 className="text-6xl md:text-8xl font-thin mb-4 bg-gradient-to-r from-white via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Full-Stack Developer
            </h1>
            <h2 className="text-4xl md:text-6xl font-thin mb-8 text-blue-300">& UI/UX Designer</h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Crafting digital experiences with cutting-edge technology and innovative design solutions.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return <HeroSectionContent />
}

function HeroSectionContent() {
  const { t } = useLanguage()

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto text-center">
        <ScrollReveal>
          <GlassCard className="p-12 mb-8">
            <ParallaxText speed={0.2}>
              <motion.h1
                className="text-6xl md:text-8xl font-thin mb-4 bg-gradient-to-r from-foreground via-primary to-cyan-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {t("hero.title")}
              </motion.h1>
            </ParallaxText>
            <motion.h2
              className="text-4xl md:text-6xl font-thin mb-8 text-primary"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {t("hero.subtitle")}
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {t("hero.description")}
            </motion.p>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="p-4 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20"
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
