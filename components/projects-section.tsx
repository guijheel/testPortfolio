"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { useLanguage } from "./language-provider"
import { GlassCard } from "./glass-card"
import { DeviceMockup } from "./device-mockup"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-animations"

export function ProjectsSection() {
  const { t } = useLanguage()

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      description: "Modern e-commerce solution with React, Node.js, and Stripe integration",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      type: "laptop",
    },
    {
      id: 2,
      title: "Fitness Tracking App",
      category: "mobile",
      description: "Cross-platform mobile app for fitness tracking and workout planning",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop&crop=center",
      tech: ["React Native", "Firebase", "Redux"],
      type: "phone",
    },
    {
      id: 3,
      title: "Design System",
      category: "design",
      description: "Comprehensive design system for enterprise applications",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center",
      tech: ["Figma", "Storybook", "CSS"],
      type: "laptop",
    },
  ]

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-thin mb-8 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {t("projects.title")}
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <StaggerItem key={project.id}>
              <GlassCard className="p-6 h-full group hover:scale-105 transition-transform duration-300">
                <div className="mb-6">
                  <DeviceMockup type={project.type as "laptop" | "phone"} image={project.image} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-foreground">{project.title}</h3>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Github className="w-4 h-4 text-foreground" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-foreground" />
                      </motion.button>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
