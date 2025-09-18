// src/components/landing/feature-card.tsx
"use client"

import { motion } from "framer-motion"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  tooltip?: string
  details?: {
    title: string
    content: string
  }
}

export default function FeatureCard({
  icon,
  title,
  description,
  tooltip = "Haz clic para más información",
  details = {
    title: "Información detallada",
    content: "Esta característica te permite optimizar tus procesos de tratamiento de agua con precisión y eficiencia."
  }
}: FeatureCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(14, 165, 233, 0.15), 0 8px 10px -6px rgba(14, 165, 233, 0.1)"
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Banda decorativa con efecto hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform origin-left transition-all duration-300 group-hover:scale-x-100 scale-x-0"></div>

      <div className="relative z-10">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="mb-4 cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-blue-300/20 transition-all duration-300">
                      {icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-blue-500 text-white">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm border border-blue-100 shadow-lg p-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-blue-800">{details.title}</h4>
              <p className="text-sm text-blue-600/80">{details.content}</p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <h3 className="mb-2 text-lg font-medium text-blue-800">{title}</h3>
        <p className="text-blue-600/80 group-hover:text-blue-700/90 transition-colors duration-300">{description}</p>

        {/* Indicador de hover */}
        <div className="mt-4 flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Más información</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>

      {/* Efecto de brillos en las esquinas al hacer hover */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full opacity-0 group-hover:opacity-50 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-all duration-700 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-50 rounded-full opacity-0 group-hover:opacity-50 transform translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-all duration-700 blur-xl"></div>
    </motion.div>
  )
}
