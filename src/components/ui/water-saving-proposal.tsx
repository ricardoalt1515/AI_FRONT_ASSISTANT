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
      {/* Droplet avatar animado */}
      <div className="flex-shrink-0">
        <DropletAvatar mood={mood} pulse={true} />
      </div>

      {/* Burbuja de mensaje de tipo "gota" con animación de olas */}
      <div className={cn(
        "relative bg-white/90 backdrop-blur-sm border border-hydrous-100",
        "rounded-2xl rounded-tl-sm px-5 py-3 max-w-fit shadow-sm",
        "droplet-message flex items-center overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-hydrous-50/50 before:to-white/90 before:-z-10"
      )}>
        {/* Onda animada sutil dentro del indicador */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-hydrous-100/20 -z-5 rounded-t-full"
          style={{
            animation: "water-indicator-wave 3s infinite ease-in-out",
            transformOrigin: "50% 100%",
          }}>
        </div>

        {/* Contenido del indicador */}
        <div className="flex flex-col z-10">
          <div className="flex items-center gap-3">
            <div className="text-sm text-hydrous-700 font-medium mr-1">
              {getThinkingText(mood)}
            </div>

            {/* Burbujas animadas de agua */}
            <div className="flex items-center space-x-1.5">
              <motion.div
                className="h-2 w-2 rounded-full bg-hydrous-300"
                animate={{
                  y: ["0%", "-50%", "0%"],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-hydrous-400"
                animate={{
                  y: ["0%", "-50%", "0%"],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-hydrous-500"
                animate={{
                  y: ["0%", "-50%", "0%"],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              />
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-1">
            {getSubText(mood)}
          </div>
        </div>

        {/* Pequeñas burbujas decorativas */}
        <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-hydrous-200/60 animate-water-float"
          style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-2 right-3 w-2 h-2 rounded-full bg-hydrous-300/40 animate-water-float animation-delay-1000"
          style={{ animationDuration: '8s' }}></div>
      </div>

      {/* Estilos específicos para la animación de onda */}
      <style jsx global>{`
        @keyframes water-indicator-wave {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.2) translateY(-2px); }
        }
        
        .droplet-message {
          clip-path: path('M92.5,8c0-2.8-1.2-5-3.7-6.5c-1.4-0.8-2.9-1.2-4.5-1.2H12.3c-4.6,0-7.7,2.1-8.1,5.7c0,0.2,0,0.4,0,0.6v73.5c0,2.3,0.9,4.3,2.8,5.9c1.5,1.2,3.2,1.7,5.1,1.7h72.4c4.6,0,7.7-2.1,8.1-5.7c0-0.2,0-0.4,0-0.6V8z');
          clip-path: initial;
          border-radius: 18px;
          border-top-left-radius: 0;
        }
      `}</style>
    </div>
  );
}

// Diferentes textos para diferentes estados de pensamiento
function getThinkingText(mood: string): string {
  switch (mood) {
    case 'thinking':
      return 'Analizando tu consulta';
    case 'processing':
      return 'Procesando datos técnicos';
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
      return 'Evaluando requerimientos técnicos';
    case 'processing':
      return 'Aplicando modelos de ingeniería hídrica';
    case 'explaining':
      return 'Preparando detalles técnicos';
    default:
      return 'Optimizando parámetros';
  }
}
