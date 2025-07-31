"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"
import { Stars, ShootingStars } from "./stars-background"
import { HexCodeMeteors, AssemblyMeteors, WebSyntaxMeteors } from "./code-meteor-system"

// MacBook 3D simplifié
function MacBook3D({ position }: { position: [number, number, number] }) {
  const macbookRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (macbookRef.current) {
      macbookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={macbookRef} position={position}>
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
  )
}

// iPhone 3D simplifié
function IPhone3D({ position }: { position: [number, number, number] }) {
  const phoneRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.15
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={phoneRef} position={position}>
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
  )
}

// Formes géométriques simplifiées
function SimpleShapes() {
  return (
    <>
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
    </>
  )
}

// Composant principal Scene3D optimisé
export function Scene3D() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <>
      {/* Étoiles de base */}
      <Stars count={1200} />

      {/* Étoiles filantes simples */}
      <ShootingStars />

      {/* Météores de code */}
      <HexCodeMeteors />
      <AssemblyMeteors />
      <WebSyntaxMeteors />

      <group ref={groupRef}>
        {/* Appareils simplifiés */}
        <MacBook3D position={[-4, 0, -6]} />
        <IPhone3D position={[4, 1, -5]} />

        {/* Formes simplifiées */}
        <SimpleShapes />
      </group>

      {/* Éclairage simplifié */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#06b6d4" />
    </>
  )
}
