"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

// Système de météores de code hexadécimal
export function HexCodeMeteors() {
  const groupRef = useRef<THREE.Group>(null)

  const hexMeteors = useMemo(() => {
    const hexSnippets = ["0x1A2B3C", "0xFF00FF", "0xDEADBEEF", "0xCAFEBABE", "0x1337C0DE", "0xABCDEF"]

    const meteors = []
    for (let i = 0; i < 6; i++) {
      meteors.push({
        id: i,
        text: hexSnippets[i],
        startPosition: [(Math.random() - 0.5) * 80, 40 + Math.random() * 10, (Math.random() - 0.5) * 80] as [
          number,
          number,
          number,
        ],
        direction: [(Math.random() - 0.5) * 1.5, -2, (Math.random() - 0.5) * 1.5] as [number, number, number],
        speed: 0.8 + Math.random() * 0.4,
        delay: i * 3,
        color: ["#00ff41", "#3b82f6", "#8b5cf6"][i % 3],
        size: 0.4,
      })
    }
    return meteors
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const meteor = hexMeteors[index]
        const time = (state.clock.elapsedTime - meteor.delay) * meteor.speed

        if (time > 0) {
          const progress = (time % 20) / 20

          if (progress < 0.8) {
            const t = progress / 0.8
            const distance = t * 60

            child.position.x = meteor.startPosition[0] + meteor.direction[0] * distance
            child.position.y = meteor.startPosition[1] + meteor.direction[1] * distance
            child.position.z = meteor.startPosition[2] + meteor.direction[2] * distance

            child.rotation.z = time * 2

            const opacity = Math.sin(t * Math.PI) * 0.8 + 0.2

            child.traverse((obj) => {
              if (obj.material && "opacity" in obj.material) {
                obj.material.opacity = opacity
              }
            })

            child.visible = true
          } else {
            child.visible = false
          }
        } else {
          child.visible = false
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {hexMeteors.map((meteor) => (
        <Text
          key={meteor.id}
          fontSize={meteor.size}
          color={meteor.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/GeistMono-Bold.ttf"
          material-transparent
          material-opacity={0}
        >
          {meteor.text}
        </Text>
      ))}
    </group>
  )
}

// Système de météores assembleur
export function AssemblyMeteors() {
  const groupRef = useRef<THREE.Group>(null)

  const asmMeteors = useMemo(() => {
    const asmInstructions = ["MOV AX, BX", "ADD EAX, EBX", "JMP 0x1000", "CALL FUNC", "PUSH EBP", "POP EAX"]

    const meteors = []
    for (let i = 0; i < 6; i++) {
      meteors.push({
        id: i,
        text: asmInstructions[i],
        startPosition: [(Math.random() - 0.5) * 80, 35 + Math.random() * 15, (Math.random() - 0.5) * 80] as [
          number,
          number,
          number,
        ],
        direction: [(Math.random() - 0.5) * 1.5, -1.8, (Math.random() - 0.5) * 1.5] as [number, number, number],
        speed: 0.6 + Math.random() * 0.4,
        delay: i * 4,
        color: ["#ff6b6b", "#4ecdc4", "#45b7d1"][i % 3],
        size: 0.35,
      })
    }
    return meteors
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const meteor = asmMeteors[index]
        const time = (state.clock.elapsedTime - meteor.delay) * meteor.speed

        if (time > 0) {
          const progress = (time % 22) / 22

          if (progress < 0.75) {
            const t = progress / 0.75
            const distance = t * 50

            child.position.x = meteor.startPosition[0] + meteor.direction[0] * distance
            child.position.y = meteor.startPosition[1] + meteor.direction[1] * distance
            child.position.z = meteor.startPosition[2] + meteor.direction[2] * distance

            child.rotation.y = time * 1.5

            const opacity = Math.sin(t * Math.PI) * 0.7 + 0.3

            child.traverse((obj) => {
              if (obj.material && "opacity" in obj.material) {
                obj.material.opacity = opacity
              }
            })

            child.visible = true
          } else {
            child.visible = false
          }
        } else {
          child.visible = false
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {asmMeteors.map((meteor) => (
        <Text
          key={meteor.id}
          fontSize={meteor.size}
          color={meteor.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/GeistMono-Regular.ttf"
          material-transparent
          material-opacity={0}
        >
          {meteor.text}
        </Text>
      ))}
    </group>
  )
}

// Système de météores syntaxe web
export function WebSyntaxMeteors() {
  const groupRef = useRef<THREE.Group>(null)

  const webMeteors = useMemo(() => {
    const webSyntax = ["const { data }", "useEffect(() =>", "useState<T>", "async/await", "=> arrow", "...spread"]

    const meteors = []
    for (let i = 0; i < 6; i++) {
      meteors.push({
        id: i,
        text: webSyntax[i],
        startPosition: [(Math.random() - 0.5) * 80, 45 + Math.random() * 10, (Math.random() - 0.5) * 80] as [
          number,
          number,
          number,
        ],
        direction: [(Math.random() - 0.5) * 2, -2.5, (Math.random() - 0.5) * 2] as [number, number, number],
        speed: 0.7 + Math.random() * 0.3,
        delay: i * 3.5,
        color: ["#61dafb", "#f7df1e", "#e34c26"][i % 3],
        size: 0.3,
      })
    }
    return meteors
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const meteor = webMeteors[index]
        const time = (state.clock.elapsedTime - meteor.delay) * meteor.speed

        if (time > 0) {
          const progress = (time % 25) / 25

          if (progress < 0.8) {
            const t = progress / 0.8
            const distance = t * 70

            child.position.x = meteor.startPosition[0] + meteor.direction[0] * distance
            child.position.y = meteor.startPosition[1] + meteor.direction[1] * distance
            child.position.z = meteor.startPosition[2] + meteor.direction[2] * distance

            child.rotation.y = time * 1.2

            const opacity = Math.sin(t * Math.PI) * 0.6 + 0.4

            child.traverse((obj) => {
              if (obj.material && "opacity" in obj.material) {
                obj.material.opacity = opacity
              }
            })

            child.visible = true
          } else {
            child.visible = false
          }
        } else {
          child.visible = false
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {webMeteors.map((meteor) => (
        <Text
          key={meteor.id}
          fontSize={meteor.size}
          color={meteor.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.ttf"
          material-transparent
          material-opacity={0}
        >
          {meteor.text}
        </Text>
      ))}
    </group>
  )
}
