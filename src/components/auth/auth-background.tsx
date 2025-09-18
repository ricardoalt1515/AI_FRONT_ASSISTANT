"use client"

import { motion } from "framer-motion"

export default function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/95 to-blue-50/80"></div>

      {/* Patrón técnico sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      ></div>

      {/* Formas fluidas */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-300/10 to-blue-500/5 filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.05, 1],
          x: [0, -10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/10 to-blue-500/5 filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
          delay: 5
        }}
      />

      {/* Líneas fluidas */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent"></div>
      <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/15 to-transparent"></div>
    </div>
  )
}
