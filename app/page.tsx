"use client"

import { useState, useEffect } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { PerformanceProvider } from "@/components/performance-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { DeviceShowcase } from "@/components/device-showcase"

// Composant de code flottant simple
function SimpleCodeBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const hexCodes = ["0xDEADBEEF", "0xCAFEBABE", "0x1337C0DE", "0xFF00FF", "0xABCDEF"]
  const asmCodes = ["MOV AX, BX", "ADD EAX, EBX", "JMP 0x1000", "CALL FUNC", "PUSH EBP"]
  const webCodes = ["const { data }", "useState<T>", "useEffect(() =>", "</> JSX", "async/await"]

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Code hexadécimal */}
      {hexCodes.map((code, i) => (
        <div
          key={`hex-${i}`}
          className="absolute font-mono text-lg font-bold text-green-400 animate-pulse"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            textShadow: "0 0 10px #00ff41",
            animationDelay: `${i * 0.5}s`,
            animationDuration: "3s",
          }}
        >
          {code}
        </div>
      ))}

      {/* Code assembleur */}
      {asmCodes.map((code, i) => (
        <div
          key={`asm-${i}`}
          className="absolute font-mono text-base font-bold text-blue-400 animate-pulse"
          style={{
            left: `${60 + i * 8}%`,
            top: `${30 + i * 12}%`,
            textShadow: "0 0 10px #3b82f6",
            animationDelay: `${i * 0.7}s`,
            animationDuration: "4s",
          }}
        >
          {code}
        </div>
      ))}

      {/* Code web */}
      {webCodes.map((code, i) => (
        <div
          key={`web-${i}`}
          className="absolute font-mono text-sm font-bold text-purple-400 animate-pulse"
          style={{
            left: `${5 + i * 18}%`,
            top: `${60 + i * 8}%`,
            textShadow: "0 0 10px #8b5cf6",
            animationDelay: `${i * 0.3}s`,
            animationDuration: "2.5s",
          }}
        >
          {code}
        </div>
      ))}

      {/* Étoiles CSS */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Portfolio() {
  return (
    <PerformanceProvider>
      <ThemeProvider>
        <LanguageProvider>
          <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
            {/* Background simple avec code */}
            <SimpleCodeBackground />

            {/* Controls */}
            <nav className="fixed top-6 right-6 z-50 flex gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </nav>

            {/* Main Content */}
            <article className="relative z-20">
              <HeroSection />
              <AboutSection />
              <DeviceShowcase />
              <ProjectsSection />
              <ContactSection />
              <Footer />
            </article>

            {/* Ambient Lighting Effects */}
            <aside className="fixed inset-0 pointer-events-none z-5">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </aside>
          </main>
        </LanguageProvider>
      </ThemeProvider>
    </PerformanceProvider>
  )
}
