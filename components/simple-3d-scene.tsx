"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

// Étoiles statiques simples (pas filantes)
function StaticStars() {
  const ref = useRef<THREE.Points>(null)

  const positions = new Float32Array(800 * 3)
  for (let i = 0; i < 800; i++) {
    const i3 = i * 3
    const radius = 30 + Math.random() * 70
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.0001
      ref.current.rotation.y = state.clock.elapsedTime * 0.0002
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={800} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={1.5} color="#ffffff" transparent opacity={0.6} />
    </points>
  )
}

// Appareils 3D simplifiés
function SimpleDevices() {
  return (
    <group>
      {/* MacBook */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[-4, 0, -6]}>
          <mesh>
            <boxGeometry args={[2, 0.05, 1.4]} />
            <meshStandardMaterial color="#5d5d5d" />
          </mesh>
          <mesh position={[0, 0.6, -0.6]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[1.8, 1.2, 0.05]} />
            <meshStandardMaterial color="#1e3a8a" emissive="#1e40af" emissiveIntensity={0.2} />
          </mesh>
        </group>
      </Float>

      {/* iPhone */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[4, 1, -5]}>
          <mesh>
            <boxGeometry args={[0.4, 0.8, 0.06]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <boxGeometry args={[0.35, 0.75, 0.005]} />
            <meshStandardMaterial color="#007AFF" emissive="#0056CC" emissiveIntensity={0.3} />
          </mesh>
        </group>
      </Float>

      {/* Formes géométriques */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[-3, 1, -2]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.3} />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh position={[3, -1, -3]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  )
}

// Composant principal de la scène (sans météores problématiques)
export function Simple3DScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <>
      {/* Étoiles statiques seulement */}
      <StaticStars />

      {/* Groupe principal avec rotation */}
      <group ref={groupRef}>
        {/* Appareils seulement */}
        <SimpleDevices />
      </group>

      {/* Éclairage */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
    </>
  )
}
