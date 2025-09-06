"use client"

import { Code, Smartphone, Palette, Database } from "lucide-react"
import { GlassCard } from "./glass-card"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-animations"
import { useState, useEffect } from "react"

const translations = {
  en: {
    title: "About Me",
    description:
      "Passionate developer with expertise in modern web technologies, mobile development, and user experience design.",
  },
  fr: {
    title: "À Propos de Moi",
    description:
      "Développeur passionné avec une expertise en technologies web modernes, développement mobile et design d'expérience utilisateur.",
  },
  es: {
    title: "Acerca de Mí",
    description:
      "Desarrollador apasionado con experiencia en tecnologías web modernas, desarrollo móvil y diseño de experiencia de usuario.",
  },
}

export function AboutSection() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState<"en" | "fr" | "es">("en")

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "es" | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const t = translations[language]

  const skills = [
    { icon: Code, label: "Frontend Development", color: "text-blue-400" },
    { icon: Database, label: "Backend Development", color: "text-green-400" },
    { icon: Smartphone, label: "Mobile Development", color: "text-purple-400" },
    { icon: Palette, label: "UI/UX Design", color: "text-pink-400" },
  ]

  if (!mounted) {
    return (
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-thin mb-8 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-thin mb-8 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            {t.title}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <ScrollReveal delay={0.2}>
            <GlassCard className="p-8">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {t.description} Explore the floating Apple devices in the background - each one is interactive and
                showcases different aspects of modern technology.
              </p>
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <StaggerItem key={skill.label}>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                      <skill.icon className={`w-6 h-6 ${skill.color}`} />
                      <span className="text-sm font-medium text-gray-300">{skill.label}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 rounded-2xl" />
              <div className="absolute inset-4 bg-gradient-to-br from-slate-900/50 to-slate-800/80 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Code className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-300 text-lg">Creative Developer</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
