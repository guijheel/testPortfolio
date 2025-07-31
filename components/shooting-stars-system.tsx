"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Trail, Text } from "@react-three/drei"
import * as THREE from "three"

// Système d'étoiles filantes avec traînées
export function ShootingStarsSystem() {
  const groupRef = useRef<THREE.Group>(null)

  const shootingStars = useMemo(() => {
    const stars = []
    for (let i = 0; i < 8; i++) {
      stars.push({
        id: i,
        startPosition: [(Math.random() - 0.5) * 150, 50 + Math.random() * 30, (Math.random() - 0.5) * 150] as [
          number,
          number,
          number,
        ],
        endPosition: [(Math.random() - 0.5) * 150, -50 - Math.random() * 30, (Math.random() - 0.5) * 150] as [
          number,
          number,
          number,
        ],
        speed: 0.8 + Math.random() * 1.2,
        delay: Math.random() * 15,
        color: new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.8, 0.7),
        size: 0.1 + Math.random() * 0.15,
        trailLength: 15 + Math.random() * 10,
      })
    }
    return stars
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const star = shootingStars[index]
        const time = (state.clock.elapsedTime - star.delay) * star.speed

        if (time > 0) {
          const progress = (time % 25) / 25 // Cycle de 25 secondes

          if (progress < 0.8) {
            // Phase de vol
            const t = progress / 0.8
            const easedT = 1 - Math.pow(1 - t, 3) // Easing out cubic

            child.position.lerpVectors(
              new THREE.Vector3(...star.startPosition),
              new THREE.Vector3(...star.endPosition),
              easedT,
            )

            // Intensité lumineuse variable
            const intensity = Math.sin(t * Math.PI) * 0.8 + 0.2
            const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
            if (material) {
              material.opacity = intensity
              material.emissiveIntensity = intensity * 2
            }

            child.visible = true
          } else {
            // Phase de repos
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
      {shootingStars.map((star) => (
        <Trail
          key={star.id}
          width={star.size * 3}
          length={star.trailLength}
          color={star.color}
          attenuation={(t) => t * t}
        >
          <mesh>
            <sphereGeometry args={[star.size]} />
            <meshBasicMaterial
              color={star.color}
              emissive={star.color}
              emissiveIntensity={1.5}
              transparent
              opacity={0}
            />
          </mesh>
        </Trail>
      ))}
    </group>
  )
}

// Étoiles filantes avec particules de code
export function CodeShootingStars() {
  const groupRef = useRef<THREE.Group>(null)

  const codeStars = useMemo(() => {
    const codeSnippets = [
      "const",
      "function",
      "=>",
      "useState",
      "useEffect",
      "return",
      "import",
      "export",
      "async",
      "await",
      "{}",
      "[]",
      "console.log",
      "React",
      "Next.js",
      "TypeScript",
    ]

    const stars = []
    for (let i = 0; i < 12; i++) {
      stars.push({
        id: i,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        startPosition: [(Math.random() - 0.5) * 120, 40 + Math.random() * 20, (Math.random() - 0.5) * 120] as [
          number,
          number,
          number,
        ],
        direction: [(Math.random() - 0.5) * 3, -2 - Math.random() * 2, (Math.random() - 0.5) * 3] as [
          number,
          number,
          number,
        ],
        speed: 0.6 + Math.random() * 0.8,
        delay: Math.random() * 20,
        color: ["#00ff88", "#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b"][Math.floor(Math.random() * 5)],
        size: 0.3 + Math.random() * 0.2,
      })
    }
    return stars
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const star = codeStars[index]
        const time = (state.clock.elapsedTime - star.delay) * star.speed

        if (time > 0) {
          const progress = (time % 30) / 30 // Cycle de 30 secondes

          if (progress < 0.7) {
            const t = progress / 0.7
            const distance = t * 60

            child.position.x = star.startPosition[0] + star.direction[0] * distance
            child.position.y = star.startPosition[1] + star.direction[1] * distance
            child.position.z = star.startPosition[2] + star.direction[2] * distance

            // Rotation du texte
            child.rotation.z = time * 2
            child.rotation.y = time * 1.5

            // Effet de fade
            const fadeIn = Math.min(t * 5, 1)
            const fadeOut = Math.max(0, 1 - (t - 0.5) * 2)
            const opacity = fadeIn * fadeOut

            child.traverse((obj) => {
              if (obj.material) {
                obj.material.opacity = opacity * 0.8
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
      {codeStars.map((star) => (
        <Text
          key={star.id}
          fontSize={star.size}
          color={star.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/GeistMono-Bold.ttf"
          material-transparent
          material-opacity={0}
        >
          {star.text}
        </Text>
      ))}
    </group>
  )
}

// Pluie de particules binaires
export function BinaryRain() {
  const groupRef = useRef<THREE.Group>(null)

  const binaryDrops = useMemo(() => {
    const drops = []
    for (let i = 0; i < 50; i++) {
      drops.push({
        id: i,
        startX: (Math.random() - 0.5) * 200,
        startZ: (Math.random() - 0.5) * 200,
        speed: 0.5 + Math.random() * 1.5,
        delay: Math.random() * 10,
        binary: Array.from({ length: 8 }, () => (Math.random() > 0.5 ? "1" : "0")).join(""),
        color: Math.random() > 0.5 ? "#00ff88" : "#ffffff",
      })
    }
    return drops
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const drop = binaryDrops[index]
        const time = (state.clock.elapsedTime - drop.delay) * drop.speed

        if (time > 0) {
          const progress = (time % 20) / 20
          const y = 60 - progress * 120

          child.position.set(drop.startX, y, drop.startZ)

          // Effet de fade basé sur la position
          const fadeTop = Math.min((60 - y) / 20, 1)
          const fadeBottom = Math.min((y + 60) / 20, 1)
          const opacity = Math.min(fadeTop, fadeBottom) * 0.6

          child.traverse((obj) => {
            if (obj.material) {
              obj.material.opacity = opacity
            }
          })

          child.visible = y > -60 && y < 60
        } else {
          child.visible = false
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {binaryDrops.map((drop) => (
        <Text
          key={drop.id}
          fontSize={0.8}
          color={drop.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/GeistMono-Regular.ttf"
          material-transparent
          material-opacity={0}
        >
          {drop.binary}
        </Text>
      ))}
    </group>
  )
}

// Étoiles filantes avec explosion de particules
export function ExplodingStars() {
  const groupRef = useRef<THREE.Group>(null)

  const explodingStars = useMemo(() => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      const particles = []
      for (let j = 0; j < 20; j++) {
        particles.push({
          direction: new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
          ).normalize(),
          speed: 0.5 + Math.random() * 1.5,
          life: 2 + Math.random() * 3,
        })
      }

      stars.push({
        id: i,
        startPosition: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100] as [
          number,
          number,
          number,
        ],
        endPosition: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100] as [
          number,
          number,
          number,
        ],
        speed: 1 + Math.random() * 0.5,
        delay: Math.random() * 25,
        color: new THREE.Color().setHSL(0.1 + Math.random() * 0.8, 0.8, 0.6),
        particles,
        explosionTime: 3 + Math.random() * 2,
      })
    }
    return stars
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      explodingStars.forEach((star, starIndex) => {
        const time = (state.clock.elapsedTime - star.delay) * star.speed
        const starGroup = groupRef.current?.children[starIndex] as THREE.Group

        if (time > 0 && starGroup) {
          const progress = (time % 35) / 35

          if (progress < 0.2) {
            // Phase de vol de l'étoile principale
            const t = progress / 0.2
            const mainStar = starGroup.children[0] as THREE.Mesh

            mainStar.position.lerpVectors(
              new THREE.Vector3(...star.startPosition),
              new THREE.Vector3(...star.endPosition),
              t,
            )

            const material = mainStar.material as THREE.MeshBasicMaterial
            material.opacity = 1
            mainStar.visible = true

            // Cacher les particules
            for (let i = 1; i < starGroup.children.length; i++) {
              starGroup.children[i].visible = false
            }
          } else if (progress < 0.4) {
            // Phase d'explosion
            const explosionProgress = (progress - 0.2) / 0.2
            const mainStar = starGroup.children[0] as THREE.Mesh
            mainStar.visible = false

            star.particles.forEach((particle, particleIndex) => {
              const particleMesh = starGroup.children[particleIndex + 1] as THREE.Mesh
              if (particleMesh) {
                const distance = explosionProgress * particle.speed * 10

                particleMesh.position.copy(new THREE.Vector3(...star.endPosition))
                particleMesh.position.add(particle.direction.clone().multiplyScalar(distance))

                const material = particleMesh.material as THREE.MeshBasicMaterial
                material.opacity = 1 - explosionProgress
                particleMesh.visible = true
              }
            })
          } else {
            // Phase de repos
            starGroup.children.forEach((child) => {
              child.visible = false
            })
          }
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {explodingStars.map((star) => (
        <group key={star.id}>
          {/* Étoile principale */}
          <mesh>
            <sphereGeometry args={[0.2]} />
            <meshBasicMaterial color={star.color} emissive={star.color} emissiveIntensity={2} transparent opacity={0} />
          </mesh>
          {/* Particules d'explosion */}
          {star.particles.map((_, particleIndex) => (
            <mesh key={particleIndex}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial
                color={star.color}
                emissive={star.color}
                emissiveIntensity={1}
                transparent
                opacity={0}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
