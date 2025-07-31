"use client"

// Codes hexadécimaux
const hexCodes = [
  "0xDEADBEEF",
  "0xCAFEBABE",
  "0x1337C0DE",
  "0xFF00FF",
  "0xABCDEF",
  "0x123456",
  "0xFEEDFACE",
  "0xBAADF00D",
]

// Codes React
const reactCodes = [
  "const { data }",
  "useState<T>",
  "useEffect(() =>",
  "</> JSX",
  "async/await",
  "=> arrow",
  "props.children",
  "React.memo()",
  "useCallback",
  "useMemo",
]

// Codes assembleur
const asmCodes = [
  "MOV AX, BX",
  "ADD EAX, EBX",
  "JMP 0x1000",
  "CALL FUNC",
  "PUSH EBP",
  "POP EAX",
  "INT 21h",
  "CMP AL, 0",
]

// Fonction pour créer les codes hexadécimaux
function createHexCodes() {
  const container = document.getElementById("hexContainer")

  hexCodes.forEach((code, index) => {
    const element = document.createElement("div")
    element.className = "hex-code"
    element.textContent = code
    element.style.left = Math.random() * 90 + "%"
    element.style.animationDelay = `${index * 1.2}s, ${index * 0.3}s`
    container.appendChild(element)

    // Recréer l'élément après l'animation
    setTimeout(
      () => {
        element.style.left = Math.random() * 90 + "%"
      },
      8000 + index * 1200,
    )
  })
}

// Fonction pour créer les codes React
function createReactCodes() {
  const container = document.getElementById("reactContainer")

  reactCodes.forEach((code, index) => {
    const element = document.createElement("div")
    element.className = "react-code"
    element.textContent = code
    element.style.left = Math.random() * 85 + "%"
    element.style.top = Math.random() * 80 + "%"
    element.style.animationDelay = `${index * 0.8}s, ${index * 0.5}s`
    container.appendChild(element)
  })
}

// Fonction pour créer les codes assembleur
function createAsmCodes() {
  const container = document.getElementById("asmContainer")

  asmCodes.forEach((code, index) => {
    const element = document.createElement("div")
    element.className = "asm-code"
    element.textContent = code
    element.style.top = Math.random() * 80 + 10 + "%"
    element.style.animationDelay = `${index * 2.5}s, ${index * 0.4}s`
    container.appendChild(element)

    // Recréer l'élément après l'animation
    setTimeout(
      () => {
        element.style.top = Math.random() * 80 + 10 + "%"
      },
      10000 + index * 2500,
    )
  })
}

// Fonction pour créer les étoiles
function createStars() {
  const container = document.getElementById("starsContainer")

  // Étoiles normales
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div")
    star.className = "star"
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.animationDelay = `${Math.random() * 3}s, ${Math.random() * 8}s`
    container.appendChild(star)
  }

  // Étoiles filantes
  for (let i = 0; i < 5; i++) {
    const shootingStar = document.createElement("div")
    shootingStar.className = "shooting-star"
    shootingStar.style.top = Math.random() * 50 + "%"
    shootingStar.style.animationDelay = `${i * 3}s`
    container.appendChild(shootingStar)
  }
}

// Fonction pour recréer périodiquement les éléments
function recreateElements() {
  setInterval(() => {
    // Recréer les codes hex
    const hexContainer = document.getElementById("hexContainer")
    hexContainer.innerHTML = ""
    createHexCodes()
  }, 12000)

  setInterval(() => {
    // Recréer les codes asm
    const asmContainer = document.getElementById("asmContainer")
    asmContainer.innerHTML = ""
    createAsmCodes()
  }, 15000)
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  createHexCodes()
  createReactCodes()
  createAsmCodes()
  createStars()
  recreateElements()

  // Effet de parallaxe au scroll
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hexElements = document.querySelectorAll(".hex-code")
    const reactElements = document.querySelectorAll(".react-code")

    hexElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px)`
    })

    reactElements.forEach((element, index) => {
      const speed = 0.3 + index * 0.05
      element.style.transform = `translateY(${scrolled * speed}px) translateX(${Math.sin(scrolled * 0.01) * 10}px)`
    })
  })

  // Effet de souris
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    const lights = document.querySelectorAll(".ambient-light")
    lights.forEach((light, index) => {
      const speed = (index + 1) * 0.02
      light.style.transform = `translate(${mouseX * 50 * speed}px, ${mouseY * 50 * speed}px)`
    })
  })
})

// Fonction pour ajouter des effets interactifs
function addInteractiveEffects() {
  const glassCard = document.querySelector(".glass-card")

  glassCard.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
    this.style.boxShadow = "0 40px 80px -12px rgba(59, 130, 246, 0.4)"
  })

  glassCard.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
    this.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  })
}

// Ajouter les effets interactifs après le chargement
document.addEventListener("DOMContentLoaded", addInteractiveEffects)
