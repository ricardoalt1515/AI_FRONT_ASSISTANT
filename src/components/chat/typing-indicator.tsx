"use client";

import React from "react";
import { motion } from "framer-motion";
import DropletAvatar from "./droplet-avatar";
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  mood?: 'default' | 'thinking' | 'happy' | 'explaining' | 'processing' | 'technical';
}

export default function TypingIndicator({ mood = 'thinking' }: TypingIndicatorProps) {
  // Determinar mensaje y variante según el estado de ánimo
  const getMessage = () => {
    switch (mood) {
      case 'processing':
        return 'Analizando datos';
      case 'technical':
        return 'Calculando parámetros';
      case 'thinking':
        return 'Considerando opciones';
      default:
        return 'Escribiendo';
    }
  };

  // Determinar la clase de color de fondo según el estado de ánimo
  const getBackgroundClass = () => {
    switch (mood) {
      case 'processing':
        return 'from-blue-50 to-blue-100/30';
      case 'technical':
        return 'from-blue-50 to-indigo-50/40';
      case 'thinking':
        return 'from-blue-50/80 to-white';
      default:
        return 'from-blue-50/60 to-white/95';
    }
  };

  return (
    <div className="flex items-start gap-3">
      {/* Avatar con estado de ánimo */}
      <div className="flex-shrink-0 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DropletAvatar mood={mood} />
        </motion.div>
      </div>
      
      {/* Burbuja de mensaje con indicador de escritura */}
      <motion.div
        className="relative flex flex-col items-start max-w-[80%] md:max-w-[75%]"
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={cn(
          "droplet-message px-5 py-3 backdrop-blur-sm text-gray-800 rounded-2xl rounded-tl-sm shadow-md border border-blue-100 relative overflow-hidden",
          "bg-gradient-to-r",
          getBackgroundClass()
        )}>
          <div className="flex items-center gap-2.5">
            {/* Patrón técnico de fondo según el modo */}
            {(mood === 'technical' || mood === 'processing') && (
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'repeating-linear-gradient(120deg, #38bdf8, transparent 2px, transparent 12px)',
                backgroundSize: '20px 20px'
              }}></div>
            )}
            
            {/* Etiqueta de estado */}
            <div className="flex items-center gap-1 pr-1 text-sm text-blue-800/90 font-medium">
              <span>{getMessage()}</span>
            </div>
            
            {/* Puntos animados */}
            <div className="flex items-center gap-1.5">
              <motion.div
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                animate={{ 
                  scale: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <motion.div
                className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                animate={{ 
                  scale: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.15
                }}
              />
              <motion.div
                className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                animate={{ 
                  scale: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
            </div>
          </div>

          {/* Efectos adicionales para estados técnicos */}
          {(mood === 'technical' || mood === 'processing') && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              animate={{ 
                scaleX: [0, 1, 0],
                opacity: [0, 0.7, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          )}
        </div>

        {/* Timestamp y acciones - simplificado */}
        <div className="flex items-center text-xs text-gray-500 gap-2 px-1 mt-1">
          <div className="flex items-center gap-1 opacity-70">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
