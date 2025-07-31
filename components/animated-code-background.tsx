"use client"

import { useEffect, useState } from "react"

export function AnimatedCodeBackground() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Pluie de code hexadécimal */}
      <div className="absolute inset-0">
        {["0xDEADBEEF", "0xCAFEBABE", "0x1337C0DE", "0xFF00FF", "0xABCDEF", "0x123456"].map((code, i) => (
          <div
            key={`hex-rain-${i}`}
            className="absolute font-mono text-lg font-bold text-green-400"
            style={{
              left: `${10 + i * 12}%`,
              top: "-50px",
              textShadow: "0 0 15px #00ff41",
              animation: `fall-${i} ${8 + i}s linear infinite`,
            }}
          >
            {code}
          </div>
        ))}
      </div>

      {/* Code assembleur flottant */}
      <div className="absolute inset-0">
        {["MOV AX, BX", "ADD EAX, EBX", "JMP 0x1000", "CALL FUNC", "PUSH EBP", "POP EAX"].map((code, i) => (
          <div
            key={`asm-float-${i}`}
            className="absolute font-mono text-base font-bold text-blue-400"
            style={{
              left: `${60 + i * 8}%`,
              top: `${20 + i * 15}%`,
              textShadow: "0 0 15px #3b82f6",
              animation: `float-${i} ${6 + i * 0.5}s ease-in-out infinite`,
            }}
          >
            {code}
          </div>
        ))}
      </div>

      {/* Syntaxe web */}
      <div className="absolute inset-0">
        {["const { data }", "useState<T>", "useEffect(() =>", "</> JSX", "async/await", "=> arrow"].map((code, i) => (
          <div
            key={`web-syntax-${i}`}
            className="absolute font-mono text-sm font-bold text-purple-400"
            style={{
              left: `${5 + i * 15}%`,
              top: `${50 + i * 10}%`,
              textShadow: "0 0 15px #8b5cf6",
              animation: `glow-${i} ${4 + i * 0.3}s ease-in-out infinite`,
            }}
          >
            {code}
          </div>
        ))}
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes fall-0 { from { transform: translateY(-50px); } to { transform: translateY(100vh); } }
        @keyframes fall-1 { from { transform: translateY(-50px); } to { transform: translateY(100vh); } }
        @keyframes fall-2 { from { transform: translateY(-50px); } to { transform: translateY(100vh); } }
        @keyframes fall-3 { from { transform: translateY(-50px); } to { transform: translateY(100vh); } }
        @keyframes fall-4 { from { transform: translateY(-50px); } to { transform: translateY(100vh); } }
        @keyframes fall-5 { from { transform: translateY(-50px); } to { transform: translateY(100vh); } }

        @keyframes float-0 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-25px); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-22px); } }
        @keyframes float-5 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }

        @keyframes glow-0 { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
        @keyframes glow-1 { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes glow-2 { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
        @keyframes glow-3 { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
        @keyframes glow-4 { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.12); } }
        @keyframes glow-5 { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
      `}</style>
    </div>
  )
}
