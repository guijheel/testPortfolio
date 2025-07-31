import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ScrollProgress } from "@/components/scroll-animations"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Developer Portfolio - Full-Stack & UI/UX",
  description: "Futuristic 3D portfolio showcasing full-stack development and UI/UX design expertise",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
