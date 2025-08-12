// src/components/landing/interactive-hero.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import DropletAvatar from "@/components/chat/droplet-avatar"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, memo } from "react"
import { ArrowRight, Sparkles, Brain } from "lucide-react"

// Memoizar el componente DropletAvatar para evitar re-renderizados innecesarios
const MemoizedDropletAvatar = memo(DropletAvatar)

// Optimizar las animaciones usando will-change
const optimizedMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-blue-50/90 via-white/95 to-blue-50/80"
      style={{ willChange: 'transform' }}
    >
      {/* Fondo con efecto de gradiente y patrón */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-blue-50/30"></div>
        
        {/* Patrón de puntos con efecto de profundidad */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            willChange: 'transform'
          }}
        />

        {/* Formas fluidas con efecto de glassmorphism */}
        <div
          className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-300/10 to-blue-500/20 filter blur-3xl opacity-70"
          style={{ willChange: 'opacity' }}
        />

        <div
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/10 to-blue-600/20 filter blur-3xl opacity-60"
          style={{ willChange: 'opacity' }}
        />
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge de novedad */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 mb-8"
            {...optimizedMotion}
          >
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by H₂O Allegiant, Corp.</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-blue-900 mb-6 leading-tight"
            {...optimizedMotion}
          >
            AI Water Design &{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Engineering Assistant
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-blue-700/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            {...optimizedMotion}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            "Instant Water Intelligence" - Your AI-powered solution for wastewater treatment and reuse system design
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            {...optimizedMotion}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              asChild
            >
              <Link href="/onboarding" prefetch={false}>
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
              asChild
            >
              <Link href="#features" prefetch={false}>
                Learn More
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Avatar central con efecto de flotación */}
        <motion.div
          className="relative mt-16 flex justify-center"
          style={{ y, opacity, willChange: 'transform, opacity' }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <MemoizedDropletAvatar
              size="xl"
              mood="technical"
              className="h-48 w-48 md:h-64 md:w-64 relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
