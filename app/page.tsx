"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedCodeBackground } from "@/components/animated-code-background"
import { AppleDevices3D } from "@/components/apple-devices-3d"

export default function Portfolio() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
          {/* Scène 3D optimisée */}
          <section className="fixed inset-0 z-0">
            <AppleDevices3D />
          </section>

          {/* Code animé mobile */}
          <AnimatedCodeBackground />

          {/* Navigation */}
          <nav className="fixed top-6 right-6 z-50 flex gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </nav>

          {/* Contenu principal */}
          <article className="relative z-20">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
          </article>

          {/* Effets d'ambiance */}
          <aside className="fixed inset-0 pointer-events-none z-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </aside>
        </main>
      </LanguageProvider>
    </ThemeProvider>
  )
}
