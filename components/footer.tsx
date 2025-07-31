"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"
import { useLanguage } from "./language-provider"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-animations"

export function Footer() {
  const { t } = useLanguage()

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Web Development", href: "#" },
        { name: "Mobile Apps", href: "#" },
        { name: "UI/UX Design", href: "#" },
        { name: "Consulting", href: "#" },
      ],
    },
    {
      title: "Technologies",
      links: [
        { name: "React & Next.js", href: "#" },
        { name: "React Native", href: "#" },
        { name: "Node.js", href: "#" },
        { name: "TypeScript", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Open Source", href: "#" },
        { name: "Documentation", href: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "About", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Resume", href: "#" },
        { name: "Portfolio", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@developer.com", label: "Email" },
  ]

  return (
    <footer className="relative py-20 px-6 mt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Developer
              </span>
            </motion.div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crafting digital experiences with passion, precision, and cutting-edge technology.
            </p>
          </div>
        </ScrollReveal>

        {/* Footer Links */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {footerSections.map((section) => (
            <StaggerItem key={section.title}>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Social Links */}
        <ScrollReveal>
          <div className="flex justify-center gap-6 mb-12">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom Section */}
        <ScrollReveal>
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span>using Next.js, Three.js & Framer Motion</span>
              </div>
              <div className="text-sm text-muted-foreground">© 2024 Developer Portfolio. All rights reserved.</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
