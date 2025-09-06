"use client"

import { Suspense, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls, RoundedBox } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

// Fallback simple
function SimpleFallback() {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Étoiles 3D
function MovingStars3D() {
  const ref = useRef<THREE.Points>(null)

  const positions = new Float32Array(200 * 3)
  for (let i = 0; i < 200; i++) {
    const i3 = i * 3
    const radius = 30 + Math.random() * 50
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.0005
      ref.current.rotation.y = state.clock.elapsedTime * 0.001
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={200} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={1.5} color="#ffffff" transparent opacity={0.8} />
    </points>
  )
}

// MacBook simplifié
function SimpleMacBook({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        <RoundedBox args={[2.2, 0.08, 1.5]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <group position={[0, 0.7, -0.7]} rotation={[-0.2, 0, 0]}>
          <RoundedBox args={[2, 1.3, 0.08]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#1a202c" metalness={0.9} roughness={0.1} />
          </RoundedBox>
          <mesh position={[0, 0, 0.045]}>
            <RoundedBox args={[1.85, 1.15, 0.005]} radius={0.03} smoothness={4}>
              <meshStandardMaterial color="#1e3a8a" emissive="#1e40af" emissiveIntensity={0.4} />
            </RoundedBox>
          </mesh>
        </group>
      </group>
    </Float>
  )
}

// iPhone simplifié
function SimpleiPhone({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      ref.current.position.x = position[0] + Math.cos(time * 0.4) * 1.5
      ref.current.position.z = position[2] + Math.sin(time * 0.4) * 1.5
      ref.current.rotation.y = time * 0.5
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <RoundedBox args={[0.42, 0.85, 0.08]} radius={0.08} smoothness={8}>
          <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <RoundedBox args={[0.38, 0.81, 0.005]} radius={0.06} smoothness={8}>
            <meshStandardMaterial color="#007AFF" emissive="#0056CC" emissiveIntensity={0.5} />
          </RoundedBox>
        </mesh>
      </group>
    </Float>
  )
}

export function AppleDevices3D() {
  const [mounted, setMounted] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    setMounted(true)

    // Test WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  if (!mounted || !webglSupported) {
    return <SimpleFallback />
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 75 }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
    >
      <Suspense fallback={null}>
        <MovingStars3D />
        <SimpleMacBook position={[-5, 0, -8]} />
        <SimpleiPhone position={[5, 1, -6]} />

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  )
}
