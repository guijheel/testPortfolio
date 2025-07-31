"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

interface StarsProps {
  count?: number
}

// Version optimisée des étoiles
export function Stars({ count = 1500 }: StarsProps) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
    }

    return positions
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.0001
      ref.current.rotation.y = state.clock.elapsedTime * 0.0002
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={2} sizeAttenuation={true} depthWrite={false} />
    </Points>
  )
}

// Étoiles filantes simples
export function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null)

  const shootingStars = useMemo(() => {
    const stars = []
    for (let i = 0; i < 3; i++) {
      stars.push({
        id: i,
        startPosition: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100] as [
          number,
          number,
          number,
        ],
        direction: [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2] as [
          number,
          number,
          number,
        ],
        speed: 0.5 + Math.random() * 1.5,
        delay: Math.random() * 10,
      })
    }
    return stars
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const star = shootingStars[index]
        const time = state.clock.elapsedTime - star.delay

        if (time > 0) {
          const progress = (time * star.speed) % 20

          child.position.x = star.startPosition[0] + star.direction[0] * progress
          child.position.y = star.startPosition[1] + star.direction[1] * progress
          child.position.z = star.startPosition[2] + star.direction[2] * progress

          // Fade in/out
          const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
          if (material) {
            const fadeIn = Math.min(progress / 2, 1)
            const fadeOut = Math.max(0, 1 - (progress - 15) / 5)
            material.opacity = fadeIn * fadeOut * 0.8
          }
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {shootingStars.map((star) => (
        <mesh key={star.id}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} emissive="#87ceeb" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}
