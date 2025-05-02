// src/components/landing/interactive-hero.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import DropletAvatar from "@/components/chat/droplet-avatar"
import { motion } from "framer-motion"

export default function InteractiveHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Fondo con elementos interactivos */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/95 to-blue-50/80"></div>

        {/* Patrón interactivo - responde sutilmente al scroll */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
          animate={{
            backgroundPosition: ["0% 0%", "10% 10%"],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Formas fluidas reactivas */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-300/5 to-blue-500/10 filter blur-3xl opacity-70"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5 }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/5 to-blue-600/10 filter blur-3xl opacity-60"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>

      {/* Contenido con animaciones escalonadas */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-blue-700 text-sm font-medium shadow-sm border border-blue-100/60 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Potenciado por IA</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Inteligencia <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Instantánea</span> del Agua
            </motion.h1>

            <motion.p
              className="text-xl text-blue-700/80 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Soluciones avanzadas de ingeniería y diseño de tratamiento de agua potenciadas por IA para optimizar tus proyectos.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/auth/register">
                  Iniciar Ahora
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-300"
                asChild
              >
                <Link href="/chat">
                  Probar Demo
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Lado derecho con avatar interactivo */}
          <motion.div
            className="relative lg:h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Anillos concéntricos animados */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-200/30 scale-90"
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-300/20 scale-75"
              animate={{ scale: [0.75, 1, 0.75], opacity: [0.2, 0.4, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                delay: 1,
                ease: "easeInOut"
              }}
            />

            {/* Avatar central con animación */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <DropletAvatar
                size="xl"
                mood="technical"
                animate={true}
                className="h-96 w-96"
              />
            </motion.div>

            {/* Partículas de datos flotantes */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-3 w-3 rounded-full bg-blue-400/60"
                initial={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + i * 2,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
