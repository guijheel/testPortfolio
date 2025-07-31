"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingCode {
  id: number
  text: string
  x: number
  y: number
  color: string
  size: string
  duration: number
}

export function FloatingCodeElements() {
  const [codeElements, setCodeElements] = useState<FloatingCode[]>([])

  useEffect(() => {
    const codes = [
      // Hexadécimal
      { text: "0xDEADBEEF", color: "#00ff41", type: "hex" },
      { text: "0xCAFEBABE", color: "#00ff41", type: "hex" },
      { text: "0x1337C0DE", color: "#00ff41", type: "hex" },
      { text: "0xFF00FF", color: "#00ff41", type: "hex" },

      // Assembleur
      { text: "MOV AX, BX", color: "#3b82f6", type: "asm" },
      { text: "ADD EAX, EBX", color: "#3b82f6", type: "asm" },
      { text: "JMP 0x1000", color: "#3b82f6", type: "asm" },
      { text: "CALL FUNC", color: "#3b82f6", type: "asm" },

      // Web/React
      { text: "const { data }", color: "#8b5cf6", type: "web" },
      { text: "useState<T>", color: "#8b5cf6", type: "web" },
      { text: "useEffect(() =>", color: "#8b5cf6", type: "web" },
      { text: "</> JSX", color: "#8b5cf6", type: "web" },
      { text: "async/await", color: "#8b5cf6", type: "web" },
      { text: "=> arrow", color: "#8b5cf6", type: "web" },
    ]

    const elements = codes.map((code, index) => ({
      id: index,
      text: code.text,
      x: 10 + (index % 4) * 20 + Math.random() * 10,
      y: 20 + Math.floor(index / 4) * 15 + Math.random() * 10,
      color: code.color,
      size: code.type === "hex" ? "text-lg" : code.type === "asm" ? "text-base" : "text-sm",
      duration: 8 + Math.random() * 4,
    }))

    setCodeElements(elements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {codeElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute font-mono font-bold select-none ${element.size}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            color: element.color,
            textShadow: `0 0 20px ${element.color}`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            opacity: [0.3, 1, 0.7, 1],
            scale: [0.8, 1.1, 0.9, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {element.text}
        </motion.div>
      ))}
    </div>
  )
}
