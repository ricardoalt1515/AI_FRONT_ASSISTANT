"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import DropletAvatar from "./droplet-avatar";

interface TypingIndicatorProps {
  mood?: 'default' | 'thinking' | 'happy' | 'explaining' | 'processing';
}

export default function TypingIndicator({ mood = 'thinking' }: TypingIndicatorProps) {
  return (
    <div className="flex items-start gap-3">
      {/* Droplet avatar animado con efecto de resplandor */}
      <div className="flex-shrink-0 relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-400/20 blur-md"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        />
        <div className="relative z-10">
          <DropletAvatar mood={mood} pulse={true} />
        </div>
      </div>

      {/* Burbuja de mensaje mejorada con mejor efecto vidrio */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative bg-white/90 backdrop-blur-md border border-blue-100/80",
          "rounded-2xl rounded-tl-sm px-5 py-3 max-w-fit shadow-md",
          "droplet-message flex items-center overflow-hidden"
        )}
      >
        {/* Gradiente de fondo interior mejorado */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-white/60 -z-10 rounded-2xl"></div>

        {/* Efecto de línea iridiscente en la parte superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>

        {/* Onda animada mejorada dentro del indicador */}
        <motion.div
          className="absolute bottom-0 inset-x-0 h-12 -z-5 rounded-t-full overflow-hidden"
          style={{
            background: 'linear-gradient(to top, rgba(56, 189, 248, 0.1) 0%, transparent 100%)',
          }}
          animate={{
            y: [0, -3, 0],
            scaleY: [1, 1.2, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />

        {/* Contenido del indicador */}
        <div className="flex flex-col z-10">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-blue-700 mr-1 flex items-center gap-1.5">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{getThinkingText(mood)}</span>
            </div>

            {/* Burbujas animadas de agua mejoradas */}
            <div className="flex items-center space-x-1.5">
              <motion.div
                className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-300 to-blue-400"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 rgba(56, 189, 248, 0)",
                    "0 0 3px rgba(56, 189, 248, 0.3)",
                    "0 0 0 rgba(56, 189, 248, 0)"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-500"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 rgba(56, 189, 248, 0)",
                    "0 0 4px rgba(56, 189, 248, 0.4)",
                    "0 0 0 rgba(56, 189, 248, 0)"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 rgba(56, 189, 248, 0)",
                    "0 0 5px rgba(56, 189, 248, 0.5)",
                    "0 0 0 rgba(56, 189, 248, 0)"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              />
            </div>
          </div>

          <div className="text-xs text-gray-600 mt-1 flex items-center gap-1.5">
            <motion.div
              className="h-1 w-1 rounded-full bg-blue-400/60"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            {getSubText(mood)}
          </div>
        </div>

        {/* Pequeñas burbujas decorativas mejoradas */}
        <motion.div
          className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-blue-200/60"
          animate={{
            y: [-1, -3, -1],
            opacity: [0.6, 0.3, 0.6],
            boxShadow: [
              "0 0 0 rgba(56, 189, 248, 0)",
              "0 0 2px rgba(56, 189, 248, 0.3)",
              "0 0 0 rgba(56, 189, 248, 0)"
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-2 right-3 w-2 h-2 rounded-full bg-blue-300/40"
          animate={{
            y: [0, -2, 0],
            opacity: [0.4, 0.2, 0.4],
            boxShadow: [
              "0 0 0 rgba(56, 189, 248, 0)",
              "0 0 2px rgba(56, 189, 248, 0.2)",
              "0 0 0 rgba(56, 189, 248, 0)"
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>
    </div>
  );
}

// Diferentes textos según el modo de pensamiento
function getThinkingText(mood: string): string {
  switch (mood) {
    case 'thinking':
      return 'Analizando consulta';
    case 'processing':
      return 'Procesando datos';
    case 'explaining':
      return 'Elaborando respuesta';
    default:
      return 'Generando solución';
  }
}

// Subtextos más técnicos basados en el tipo de procesamiento
function getSubText(mood: string): string {
  switch (mood) {
    case 'thinking':
      return 'Evaluando requerimientos técnicos...';
    case 'processing':
      return 'Aplicando modelos de ingeniería hídrica...';
    case 'explaining':
      return 'Preparando detalles técnicos...';
    default:
      return 'Optimizando parámetros...';
  }
}
