"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CodeParticle {
  id: number
  text: string
  x: number
  y: number
  speed: number
  color: string
  delay: number
  type: "hex" | "asm" | "web"
}

export function CodeRainSystem() {
  const [particles, setParticles] = useState<CodeParticle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hexCodes = ["0xDEADBEEF", "0xCAFEBABE", "0x1337C0DE", "0xFF00FF", "0xABCDEF", "0x123456"]
    const asmCodes = ["MOV AX, BX", "ADD EAX, EBX", "JMP 0x1000", "CALL FUNC", "PUSH EBP", "POP EAX"]
    const webCodes = ["const { data }", "useState<T>", "useEffect(() =>", "async/await", "=> arrow", "</> JSX"]

    const newParticles: CodeParticle[] = []

    // Créer des particules hexadécimales
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: i,
        text: hexCodes[i % hexCodes.length],
        x: Math.random() * 100,
        y: -10,
        speed: 0.5 + Math.random() * 1,
        color: "#00ff41",
        delay: i * 2,
        type: "hex",
      })
    }

    // Créer des particules assembleur
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: i + 8,
        text: asmCodes[i % asmCodes.length],
        x: Math.random() * 100,
        y: -10,
        speed: 0.4 + Math.random() * 0.8,
        color: "#3b82f6",
        delay: i * 2.5,
        type: "asm",
      })
    }

    // Créer des particules web
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: i + 16,
        text: webCodes[i % webCodes.length],
        x: Math.random() * 100,
        y: -10,
        speed: 0.6 + Math.random() * 0.9,
        color: "#8b5cf6",
        delay: i * 1.8,
        type: "web",
      })
    }

    setParticles(newParticles)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <CodeParticle key={particle.id} particle={particle} />
      ))}
    </div>
  )
}

function CodeParticle({ particle }: { particle: CodeParticle }) {
  return (
    <motion.div
      className="absolute font-mono text-sm font-bold select-none whitespace-nowrap"
      style={{
        left: `${particle.x}%`,
        color: particle.color,
        textShadow: `0 0 10px ${particle.color}`,
      }}
      initial={{ y: -50, opacity: 0 }}
      animate={{
        y: window.innerHeight + 50,
        opacity: [0, 1, 1, 0],
        rotateZ: [0, 5, -5, 0],
      }}
      transition={{
        duration: 15 / particle.speed,
        delay: particle.delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        opacity: {
          times: [0, 0.1, 0.9, 1],
          duration: 15 / particle.speed,
        },
      }}
    >
      {particle.text}
    </motion.div>
  )
}
