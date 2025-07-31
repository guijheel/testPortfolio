"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    "hero.title": "Full-Stack Developer",
    "hero.subtitle": "& UI/UX Designer",
    "hero.description": "Crafting digital experiences with cutting-edge technology and innovative design solutions.",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "about.title": "About Me",
    "about.description":
      "Passionate developer with expertise in modern web technologies, mobile development, and user experience design.",
    "projects.title": "Featured Projects",
    "projects.web": "Web Applications",
    "projects.mobile": "Mobile Apps",
    "projects.design": "UI/UX Design",
    "contact.title": "Let's Connect",
    "contact.description": "Ready to bring your ideas to life? Let's discuss your next project.",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
  },
  fr: {
    "hero.title": "Développeur Full-Stack",
    "hero.subtitle": "& Designer UI/UX",
    "hero.description":
      "Création d'expériences numériques avec des technologies de pointe et des solutions de design innovantes.",
    "nav.about": "À Propos",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "about.title": "À Propos de Moi",
    "about.description":
      "Développeur passionné avec une expertise en technologies web modernes, développement mobile et design d'expérience utilisateur.",
    "projects.title": "Projets Sélectionnés",
    "projects.web": "Applications Web",
    "projects.mobile": "Applications Mobile",
    "projects.design": "Design UI/UX",
    "contact.title": "Connectons-nous",
    "contact.description": "Prêt à donner vie à vos idées ? Discutons de votre prochain projet.",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
  },
  es: {
    "hero.title": "Desarrollador Full-Stack",
    "hero.subtitle": "& Diseñador UI/UX",
    "hero.description":
      "Creando experiencias digitales con tecnología de vanguardia y soluciones de diseño innovadoras.",
    "nav.about": "Acerca de",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "about.title": "Acerca de Mí",
    "about.description":
      "Desarrollador apasionado con experiencia en tecnologías web modernas, desarrollo móvil y diseño de experiencia de usuario.",
    "projects.title": "Proyectos Destacados",
    "projects.web": "Aplicaciones Web",
    "projects.mobile": "Apps Móviles",
    "projects.design": "Diseño UI/UX",
    "contact.title": "Conectemos",
    "contact.description": "¿Listo para dar vida a tus ideas? Hablemos de tu próximo proyecto.",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
