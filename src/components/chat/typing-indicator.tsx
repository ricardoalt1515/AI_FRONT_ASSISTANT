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

      {/* Burbuja de mensaje estilizada */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className={cn(
          "relative bg-white/95 backdrop-blur-sm border border-blue-100",
          "rounded-2xl rounded-tl-sm px-5 py-3 max-w-fit shadow-sm",
          "droplet-message flex items-center overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/80 before:to-white/90 before:-z-10"
        )}
      >
        {/* Onda animada sutil dentro del indicador */}
        <motion.div
          className="absolute bottom-0 inset-x-0 h-10 bg-blue-100/20 -z-5 rounded-t-full"
          animate={{
            y: [0, -2, 0],
            scaleY: [1, 1.1, 1]
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
            <div className="text-sm text-blue-700 font-medium mr-1">
              {getThinkingText(mood)}
            </div>

            {/* Burbujas animadas de agua */}
            <div className="flex items-center space-x-1.5">
              <motion.div
                className="h-2 w-2 rounded-full bg-blue-300"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-blue-400"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-blue-500"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.1, 1]
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

          <div className="text-xs text-gray-500 mt-1">
            {getSubText(mood)}
          </div>
        </div>

        {/* Pequeñas burbujas decorativas */}
        <motion.div
          className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-blue-200/60"
          animate={{
            y: [-1, -3, -1],
            opacity: [0.6, 0.3, 0.6]
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
            opacity: [0.4, 0.2, 0.4]
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
      return 'Analyzing consultation';
    case 'processing':
      return 'processing technical data';
    case 'explaining':
      return 'Elaborating answer';
    default:
      return 'Generating solution';
  }
}

// Subtextos más técnicos basados en el tipo de procesamiento
function getSubText(mood: string): string {
  switch (mood) {
    case 'thinking':
      return 'Evaluating technical requirements';
    case 'processing':
      return 'Applying water engineering models';
    case 'explaining':
      return 'Preparing technical details';
    default:
      return 'Optimizing parameters';
  }
}
