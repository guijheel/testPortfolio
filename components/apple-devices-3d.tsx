"use client"

import { Suspense, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls, RoundedBox } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

// Étoiles 3D mobiles
function MovingStars3D() {
  const ref = useRef<THREE.Points>(null)
  const groupRef = useRef<THREE.Group>(null)

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
      ref.current.rotation.x = state.clock.elapsedTime * 0.0005
      ref.current.rotation.y = state.clock.elapsedTime * 0.001
    }

    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2
      groupRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 1.5
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={800} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={1.5} color="#ffffff" transparent opacity={0.8} />
      </points>
    </group>
  )
}

// MacBook Pro réaliste
function RealisticMacBook({ position }: { position: [number, number, number] }) {
  const macbookRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (macbookRef.current) {
      macbookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      macbookRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={macbookRef} position={position}>
        {/* Base du MacBook - plus réaliste */}
        <RoundedBox args={[2.2, 0.08, 1.5]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Clavier */}
        <mesh position={[0, 0.045, 0.1]}>
          <RoundedBox args={[1.8, 0.01, 1.1]} radius={0.02} smoothness={4}>
            <meshStandardMaterial color="#1a202c" />
          </RoundedBox>
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, 0.05, 0.4]}>
          <RoundedBox args={[0.6, 0.005, 0.4]} radius={0.02} smoothness={4}>
            <meshStandardMaterial color="#4a5568" metalness={0.3} roughness={0.1} />
          </RoundedBox>
        </mesh>

        {/* Écran - position ouverte */}
        <group position={[0, 0.7, -0.7]} rotation={[-0.2, 0, 0]}>
          <RoundedBox args={[2, 1.3, 0.08]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#1a202c" metalness={0.9} roughness={0.1} />
          </RoundedBox>

          {/* Écran actif */}
          <mesh position={[0, 0, 0.045]}>
            <RoundedBox args={[1.85, 1.15, 0.005]} radius={0.03} smoothness={4}>
              <meshStandardMaterial
                color="#1e3a8a"
                emissive="#1e40af"
                emissiveIntensity={0.4}
                metalness={0.1}
                roughness={0.9}
              />
            </RoundedBox>
          </mesh>

          {/* Logo Apple */}
          <mesh position={[0, 0.4, 0.05]}>
            <sphereGeometry args={[0.04]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.6}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

// iPhone 15 Pro réaliste
function RealisticiPhone({ position }: { position: [number, number, number] }) {
  const phoneRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (phoneRef.current) {
      const time = state.clock.elapsedTime
      phoneRef.current.position.x = position[0] + Math.cos(time * 0.4) * 1.5
      phoneRef.current.position.z = position[2] + Math.sin(time * 0.4) * 1.5
      phoneRef.current.rotation.y = time * 0.5
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={phoneRef} position={position}>
        {/* Corps en titane */}
        <RoundedBox args={[0.42, 0.85, 0.08]} radius={0.08} smoothness={8}>
          <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
        </RoundedBox>

        {/* Écran */}
        <mesh position={[0, 0, 0.045]}>
          <RoundedBox args={[0.38, 0.81, 0.005]} radius={0.06} smoothness={8}>
            <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.9} />
          </RoundedBox>
        </mesh>

        {/* Écran actif */}
        <mesh position={[0, 0, 0.048]}>
          <RoundedBox args={[0.36, 0.79, 0.002]} radius={0.05} smoothness={8}>
            <meshStandardMaterial color="#007AFF" emissive="#0056CC" emissiveIntensity={0.5} />
          </RoundedBox>
        </mesh>

        {/* Dynamic Island */}
        <mesh position={[0, 0.28, 0.05]}>
          <RoundedBox args={[0.08, 0.025, 0.003]} radius={0.012} smoothness={4}>
            <meshStandardMaterial color="#000000" />
          </RoundedBox>
        </mesh>

        {/* Système de caméras Pro */}
        <group position={[-0.12, 0.25, -0.045]}>
          {/* Module caméra principal */}
          <mesh>
            <RoundedBox args={[0.15, 0.15, 0.02]} radius={0.02} smoothness={4}>
              <meshStandardMaterial color="#1a202c" metalness={0.8} roughness={0.2} />
            </RoundedBox>
          </mesh>

          {/* Caméra principale */}
          <mesh position={[-0.03, 0.03, 0.015]}>
            <cylinderGeometry args={[0.025, 0.025, 0.01]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Caméra ultra grand-angle */}
          <mesh position={[0.03, -0.03, 0.015]}>
            <cylinderGeometry args={[0.02, 0.02, 0.008]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Téléobjectif */}
          <mesh position={[-0.03, -0.03, 0.015]}>
            <cylinderGeometry args={[0.02, 0.02, 0.008]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

// Apple Watch Ultra réaliste
function RealisticAppleWatch({ position }: { position: [number, number, number] }) {
  const watchRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (watchRef.current) {
      const time = state.clock.elapsedTime
      watchRef.current.rotation.x = Math.sin(time * 0.6) * 0.3
      watchRef.current.rotation.z = Math.cos(time * 0.8) * 0.2
      watchRef.current.position.y = position[1] + Math.sin(time * 0.7) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={watchRef} position={position}>
        {/* Boîtier en titane */}
        <RoundedBox args={[0.35, 0.4, 0.12]} radius={0.08} smoothness={6}>
          <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} envMapIntensity={2} />
        </RoundedBox>

        {/* Écran Retina */}
        <mesh position={[0, 0, 0.065]}>
          <RoundedBox args={[0.3, 0.35, 0.008]} radius={0.06} smoothness={6}>
            <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.9} />
          </RoundedBox>
        </mesh>

        {/* Interface active */}
        <mesh position={[0, 0, 0.07]}>
          <RoundedBox args={[0.28, 0.33, 0.002]} radius={0.05} smoothness={6}>
            <meshStandardMaterial color="#00ff88" emissive="#00cc66" emissiveIntensity={0.6} />
          </RoundedBox>
        </mesh>

        {/* Couronne digitale */}
        <mesh position={[0.2, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.08]} />
          <meshStandardMaterial color="#a0a0a0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Bouton latéral */}
        <mesh position={[0.2, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.06]} />
          <meshStandardMaterial color="#a0a0a0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Bracelet Sport */}
        <group>
          <mesh position={[0, 0.25, 0]} rotation={[0.3, 0, 0]}>
            <RoundedBox args={[0.15, 0.15, 0.05]} radius={0.02} smoothness={4}>
              <meshStandardMaterial color="#ff6b35" roughness={0.8} />
            </RoundedBox>
          </mesh>
          <mesh position={[0, -0.25, 0]} rotation={[-0.3, 0, 0]}>
            <RoundedBox args={[0.15, 0.15, 0.05]} radius={0.02} smoothness={4}>
              <meshStandardMaterial color="#ff6b35" roughness={0.8} />
            </RoundedBox>
          </mesh>
        </group>
      </group>
    </Float>
  )
}

// iPad Pro réaliste
function RealisticiPad({ position }: { position: [number, number, number] }) {
  const ipadRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ipadRef.current) {
      const time = state.clock.elapsedTime * 0.3
      ipadRef.current.position.x = position[0] + Math.sin(time * 2) * 2
      ipadRef.current.position.y = position[1] + Math.sin(time) * 1
      ipadRef.current.rotation.y = time
    }
  })

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={ipadRef} position={position}>
        {/* Corps en aluminium */}
        <RoundedBox args={[0.65, 0.85, 0.06]} radius={0.05} smoothness={6}>
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} envMapIntensity={1.2} />
        </RoundedBox>

        {/* Écran Liquid Retina XDR */}
        <mesh position={[0, 0, 0.035]}>
          <RoundedBox args={[0.6, 0.8, 0.005]} radius={0.03} smoothness={6}>
            <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.9} />
          </RoundedBox>
        </mesh>

        {/* Interface active */}
        <mesh position={[0, 0, 0.038]}>
          <RoundedBox args={[0.58, 0.78, 0.002]} radius={0.025} smoothness={6}>
            <meshStandardMaterial color="#FF6B35" emissive="#FF4500" emissiveIntensity={0.4} />
          </RoundedBox>
        </mesh>

        {/* Caméra TrueDepth */}
        <mesh position={[0, 0.35, 0.04]}>
          <cylinderGeometry args={[0.008, 0.008, 0.01]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Système de caméras Pro arrière */}
        <group position={[-0.2, 0.25, -0.035]}>
          <mesh>
            <RoundedBox args={[0.08, 0.08, 0.015]} radius={0.01} smoothness={4}>
              <meshStandardMaterial color="#1a202c" metalness={0.8} roughness={0.2} />
            </RoundedBox>
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <cylinderGeometry args={[0.015, 0.015, 0.008]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>

        {/* Connecteur magnétique */}
        <mesh position={[0.35, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.02]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0} />
        </mesh>
      </group>
    </Float>
  )
}

export function AppleDevices3D() {
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) setWebglSupported(false)
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 100 }).map((_, i) => (
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

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 75 }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <MovingStars3D />
        <RealisticMacBook position={[-5, 0, -8]} />
        <RealisticiPhone position={[5, 1, -6]} />
        <RealisticAppleWatch position={[-3, 3, -5]} />
        <RealisticiPad position={[3, -2, -9]} />

        {/* Éclairage amélioré pour le réalisme */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[0, 10, 5]} intensity={0.4} color="#ffffff" />

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
