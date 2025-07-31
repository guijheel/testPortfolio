"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, Send } from "lucide-react"
import { useLanguage } from "./language-provider"
import { GlassCard } from "./glass-card"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-animations"

export function ContactSection() {
  const { t } = useLanguage()

  const contacts = [
    { icon: Mail, label: t("contact.email"), value: "hello@developer.com", href: "mailto:hello@developer.com" },
    { icon: Linkedin, label: t("contact.linkedin"), value: "/in/developer", href: "https://linkedin.com/in/developer" },
    { icon: Github, label: t("contact.github"), value: "@developer", href: "https://github.com/developer" },
  ]

  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-thin mb-8 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact.description")}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.2}>
            <GlassCard className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Get in Touch</h3>
              <StaggerContainer className="space-y-4">
                {contacts.map((contact, index) => (
                  <StaggerItem key={contact.label}>
                    <motion.a
                      href={contact.href}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
                    >
                      <contact.icon className="w-6 h-6 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">{contact.label}</p>
                        <p className="text-foreground font-medium">{contact.value}</p>
                      </div>
                    </motion.a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <GlassCard className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Send Message</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full p-4 rounded-lg bg-gradient-to-r from-primary to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-primary/90 hover:to-cyan-600 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
