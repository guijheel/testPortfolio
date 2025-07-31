"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface DeviceMockupProps {
  type: "laptop" | "phone"
  image: string
}

export function DeviceMockup({ type, image }: DeviceMockupProps) {
  if (type === "laptop") {
    return (
      <motion.div
        className="relative"
        whileHover={{ rotateY: 5, rotateX: 5 }}
        transition={{ duration: 0.3 }}
        style={{ perspective: "1000px" }}
      >
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-xl p-2 shadow-2xl">
          <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
            {image ? (
              <Image
                src={image || "/placeholder.svg"}
                alt="Project preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Project Preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-b-xl shadow-lg" />
      </motion.div>
    )
  }

  return (
    <motion.div
      className="relative mx-auto w-48"
      whileHover={{ rotateY: 10, rotateX: 5 }}
      transition={{ duration: 0.3 }}
      style={{ perspective: "1000px" }}
    >
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-3 shadow-2xl">
        <div className="bg-black rounded-2xl overflow-hidden aspect-[9/16] relative">
          {image ? (
            <Image
              src={image || "/placeholder.svg"}
              alt="Project preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-xs font-medium">Mobile App</p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full" />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full" />
      </div>
    </motion.div>
  )
}
