"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function AnimatedCodeBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Pluie de code hexadécimal */}
      {["0xDEADBEEF", "0xCAFEBABE", "0x1337C0DE", "0xFF00FF", "0xABCDEF", "0x123456"].map((code, i) => (
        <motion.div
          key={`hex-rain-${i}`}
          className="absolute font-mono text-lg font-bold text-green-400"
          style={{
            left: `${10 + i * 12}%`,
            textShadow: "0 0 15px #00ff41",
          }}
          initial={{ y: -50, x: 0, opacity: 0 }}
          animate={{
            y: [0, window.innerHeight + 50],
            x: [0, 30, -20, 10, 0],
            opacity: [0, 1, 1, 0.5, 0],
            rotateZ: [0, 10, -5, 15, 0],
          }}
          transition={{
            duration: 8 + i,
            delay: i * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {code}
        </motion.div>
      ))}

      {/* Code assembleur */}
      {["MOV AX, BX", "ADD EAX, EBX", "JMP 0x1000", "CALL FUNC", "PUSH EBP", "POP EAX"].map((code, i) => (
        <motion.div
          key={`asm-float-${i}`}
          className="absolute font-mono text-base font-bold text-blue-400"
          style={{
            left: `${60 + i * 8}%`,
            top: `${20 + i * 15}%`,
            textShadow: "0 0 15px #3b82f6",
          }}
          animate={{
            y: [0, -30, 20, -15, 0],
            x: [0, 25, -15, 30, 0],
            opacity: [0.6, 1, 0.8, 1, 0.7],
            rotateZ: [0, 8, -12, 5, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 7 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {code}
        </motion.div>
      ))}

      {/* Syntaxe web */}
      {["const { data }", "useState<T>", "useEffect(() =>", "</> JSX", "async/await", "=> arrow"].map((code, i) => (
        <motion.div
          key={`web-syntax-${i}`}
          className="absolute font-mono text-sm font-bold text-purple-400"
          style={{
            left: `${5 + i * 15}%`,
            top: `${50 + i * 10}%`,
            textShadow: "0 0 15px #8b5cf6",
          }}
          animate={{
            x: [0, 40, 0, -30, 0],
            y: [0, -25, 0, 15, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            opacity: [0.5, 1, 0.7, 1, 0.6],
            rotateZ: [0, 15, -10, 20, 0],
          }}
          transition={{
            duration: 6 + i * 0.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {code}
        </motion.div>
      ))}

      {/* Étoiles mobiles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`moving-star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 50 * Math.cos(i), 0, -50 * Math.cos(i), 0],
            y: [0, 50 * Math.sin(i), 0, -50 * Math.sin(i), 0],
            opacity: [0.3, 1, 0.5, 1, 0.3],
            scale: [0.5, 2, 1, 1.5, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
