import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type DropletMood = 'default' | 'thinking' | 'happy' | 'explaining' | 'processing' | 'listening';

interface EnhancedDropletAvatarProps {
  mood?: DropletMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
  speakingIntensity?: number; // 0-1 para simulación de onda de voz
}

/**
 * EnhancedDropletAvatar - Versión mejorada del avatar con físicas más realistas y expresiones
 * más definidas para representar a H2O Allegiant AI
 */
export default function DropletAvatar({
  mood = 'default',
  size = 'md',
  className,
  animate = true,
  pulse = false,
  speakingIntensity = 0
}: EnhancedDropletAvatarProps) {
  const [rippleActive, setRippleActive] = useState(false);
  const [waveAmplitude, setWaveAmplitude] = useState(0);

  // Tamaños para diferentes opciones
  const sizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
    xl: 'h-32 w-32'
  };

  const sizePx = {
    sm: 36,
    md: 48,
    lg: 80,
    xl: 128
  };

  // Disparar efecto ripple aleatorio
  useEffect(() => {
    if (!animate) return;

    const interval = setInterval(() => {
      // Solo activar ripple ocasionalmente
      if (Math.random() > 0.7) {
        setRippleActive(true);
        setTimeout(() => setRippleActive(false), 2000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [animate]);

  // Controlar amplitud de onda cuando está hablando
  useEffect(() => {
    if (mood === 'explaining' || speakingIntensity > 0) {
      // Crear un efecto de ondulación basado en la "intensidad de habla"
      const intensity = speakingIntensity || (Math.random() * 0.5 + 0.5);
      const baseAmplitude = 2 + (intensity * 5);

      const interval = setInterval(() => {
        setWaveAmplitude(baseAmplitude * (0.7 + Math.random() * 0.6));
      }, 150);

      return () => clearInterval(interval);
    } else {
      setWaveAmplitude(0);
    }
  }, [mood, speakingIntensity]);

  // Obtener expresiones faciales según el estado de ánimo
  const getFacialExpression = () => {
    // Coordenadas del viewBox
    const vb = { width: 24, height: 24 };

    // Posiciones de los ojos
    const leftEyePos = { x: 9, y: 9 };
    const rightEyePos = { x: 15, y: 9 };

    // Variantes para los estados de ánimo
    switch (mood) {
      case 'thinking':
        return (
          <g>
            {/* Ojos pensativos (ligeramente entrecerrados) */}
            <motion.ellipse
              cx={leftEyePos.x}
              cy={leftEyePos.y}
              rx={1.8}
              initial={{ ry: 1.8 }}
              animate={{
                ry: [1.8, 1.2, 1.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              fill="white"
            />
            <motion.ellipse
              cx={rightEyePos.x}
              cy={rightEyePos.y}
              rx={1.8}
              initial={{ ry: 1.8 }}
              animate={{
                ry: [1.8, 1.2, 1.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.2
              }}
              fill="white"
            />

            {/* Boca pensativa */}
            <motion.path
              d="M10 15.5C11.5 17 13.5 17 15 15.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M10 15.5C11.5 17 13.5 17 15 15.5",
                  "M10 15.8C11.5 17.2 13.5 17.2 15 15.8",
                  "M10 15.5C11.5 17 13.5 17 15 15.5"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />

            {/* Burbujas de pensamiento flotantes */}
            <motion.circle
              cx={18} cy={6} r={1}
              fill="white" fillOpacity="0.8"
              animate={{
                y: [-2, -6, -2],
                opacity: [0.8, 0.4, 0.8],
                scale: [1, 1.2, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx={20} cy={3} r={1.5}
              fill="white" fillOpacity="0.6"
              animate={{
                y: [-1, -5, -1],
                opacity: [0.6, 0.2, 0.6],
                scale: [1, 1.3, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            {/* Cejas pensativas */}
            <motion.path
              d="M7.5 6.5C8.3 6 9.7 6.2 10.5 6.8"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M7.5 6.5C8.3 6 9.7 6.2 10.5 6.8",
                  "M7.5 6.2C8.3 5.7 9.7 5.9 10.5 6.5",
                  "M7.5 6.5C8.3 6 9.7 6.2 10.5 6.8"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M13.5 6.5C14.3 6 15.7 6.2 16.5 6.8"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M13.5 6.5C14.3 6 15.7 6.2 16.5 6.8",
                  "M13.5 6.2C14.3 5.7 15.7 5.9 16.5 6.5",
                  "M13.5 6.5C14.3 6 15.7 6.2 16.5 6.8"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.2
              }}
            />
          </g>
        );

      case 'happy':
        return (
          <g>
            {/* Ojos felices (forma de media luna) */}
            <motion.path
              d="M7.5 8.5C8.5 7.2 10 7.2 10 9"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              d="M14 8.5C15 7.2 16.5 7.2 16.5 9"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Boca sonriente amplia */}
            <motion.path
              d="M8 14C10 17.5 14 17.5 16 14"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M8 14C10 17.5 14 17.5 16 14",
                  "M8 13.5C10 17.7 14 17.7 16 13.5",
                  "M8 14C10 17.5 14 17.5 16 14"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />

            {/* Destellos de alegría */}
            <motion.path
              d="M19 6L20 7M19 7L20 6"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M4 6L5 7M4 7L5 6"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            {/* Mejillas alegres */}
            <motion.circle
              cx={6} cy={11} r={1.5}
              fill="rgba(255, 255, 255, 0.3)"
              animate={{
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx={18} cy={11} r={1.5}
              fill="rgba(255, 255, 255, 0.3)"
              animate={{
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </g>
        );

      case 'explaining':
      case 'speaking':
        const mouthHeight = 1.5 + (waveAmplitude / 2);

        return (
          <g>
            {/* Ojos expresivos */}
            <motion.circle
              cx={leftEyePos.x}
              cy={leftEyePos.y}
              r={2}
              fill="white"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
            <motion.circle
              cx={rightEyePos.x}
              cy={rightEyePos.y}
              r={2}
              fill="white"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.2
              }}
            />

            {/* Cejas expresivas */}
            <motion.path
              d="M7 6.8C8 6 10 6 11 6.8"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M7 6.8C8 6 10 6 11 6.8",
                  "M7 6.5C8 5.7 10 5.7 11 6.5",
                  "M7 6.8C8 6 10 6 11 6.8"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M13 6.8C14 6 16 6 17 6.8"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M13 6.8C14 6 16 6 17 6.8",
                  "M13 6.5C14 5.7 16 5.7 17 6.5",
                  "M13 6.8C14 6 16 6 17 6.8"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: 0.15
              }}
            />

            {/* Boca animada que habla con mejor visualización de ondas */}
            <motion.ellipse
              cx={12}
              cy={15}
              rx={3}
              ry={mouthHeight}
              fill="white"
              animate={{
                ry: waveAmplitude
                  ? [mouthHeight, mouthHeight * 0.6, mouthHeight, mouthHeight * 1.2, mouthHeight]
                  : [2, 1.5, 2]
              }}
              transition={{
                repeat: Infinity,
                duration: waveAmplitude ? 0.8 : 3,
                ease: waveAmplitude ? "linear" : "easeInOut",
                times: waveAmplitude ? [0, 0.25, 0.5, 0.75, 1] : [0, 0.5, 1]
              }}
            />

            {/* Pequeñas ondas sonoras cuando habla - Mejoradas */}
            {(waveAmplitude > 0) && (
              <>
                <motion.path
                  d="M19.5 10C21.5 8 21.5 12 19.5 11"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                  animate={{
                    opacity: [1, 0.3, 1],
                    x: [0, 0.5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
                <motion.path
                  d="M4.5 10C2.5 8 2.5 12 4.5 11"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                  animate={{
                    opacity: [1, 0.3, 1],
                    x: [0, -0.5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />
                <motion.path
                  d="M21 9.5C23 7.5 23 12.5 21 11"
                  stroke="white"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeDasharray="1,1"
                  fill="none"
                  animate={{
                    opacity: [0.7, 0.2, 0.7],
                    x: [0, 1, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                />
                <motion.path
                  d="M3 9.5C1 7.5 1 12.5 3 11"
                  stroke="white"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeDasharray="1,1"
                  fill="none"
                  animate={{
                    opacity: [0.7, 0.2, 0.7],
                    x: [0, -1, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.9
                  }}
                />
              </>
            )}
          </g>
        );

      case 'processing':
        return (
          <g>
            {/* Ojos girando con efecto más fluido */}
            <motion.circle
              cx={leftEyePos.x}
              cy={leftEyePos.y}
              r={1.5}
              fill="white"
              animate={{
                cx: [leftEyePos.x, leftEyePos.x + 0.8, leftEyePos.x, leftEyePos.x - 0.8, leftEyePos.x],
                cy: [leftEyePos.y, leftEyePos.y - 0.8, leftEyePos.y, leftEyePos.y + 0.8, leftEyePos.y]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
            <motion.circle
              cx={rightEyePos.x}
              cy={rightEyePos.y}
              r={1.5}
              fill="white"
              animate={{
                cx: [rightEyePos.x, rightEyePos.x - 0.8, rightEyePos.x, rightEyePos.x + 0.8, rightEyePos.x],
                cy: [rightEyePos.y, rightEyePos.y - 0.8, rightEyePos.y, rightEyePos.y + 0.8, rightEyePos.y]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />

            {/* Boca procesando con animación de progreso */}
            <motion.rect
              x={8.5}
              y={15}
              rx={0.75}
              height={1.5}
              fill="white"
              initial={{ width: 3, x: 10.5 }}
              animate={{
                width: [3, 7, 3],
                x: [10.5, 8.5, 10.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />

            {/* Partículas de datos mejoradas con efecto de resplandor */}
            <motion.g
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.circle
                  key={`particle-${i}`}
                  cx={4 + (i % 3) * 8}
                  cy={5 + Math.floor(i / 3) * 10}
                  r={0.8}
                  fill="white"
                  fillOpacity="0.7"
                  animate={{
                    scale: [1, 1.3, 1],
                    filter: [
                      "drop-shadow(0 0 0px rgba(255,255,255,0))",
                      "drop-shadow(0 0 1.5px rgba(255,255,255,0.5))",
                      "drop-shadow(0 0 0px rgba(255,255,255,0))"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.g>

            {/* Líneas de circuito con un efecto de pulso de datos */}
            <motion.path
              d="M4 12 H7 M17 12 H20"
              stroke="white"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="1,1"
              animate={{
                strokeDashoffset: [0, 4, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear"
              }}
            />

            {/* Circuito adicional para más complejidad */}
            <motion.path
              d="M4 8 V11 M20 8 V11"
              stroke="white"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="1,1"
              animate={{
                strokeDashoffset: [0, -4, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear"
              }}
            />
          </g>
        );

      case 'listening':
        return (
          <g>
            {/* Ojos atentos y ligeramente más abiertos */}
            <motion.circle
              cx={leftEyePos.x}
              cy={leftEyePos.y}
              r={2.2}
              fill="white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
            <motion.circle
              cx={rightEyePos.x}
              cy={rightEyePos.y}
              r={2.2}
              fill="white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.2
              }}
            />

            {/* Boca atenta (ligeramente abierta) */}
            <motion.path
              d="M9 15C10.5 16.5 13.5 16.5 15 15"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M9 15C10.5 16.5 13.5 16.5 15 15",
                  "M9 15.2C10.5 16.8 13.5 16.8 15 15.2",
                  "M9 15C10.5 16.5 13.5 16.5 15 15"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />

            {/* Ondas sonoras entrantes mejoradas */}
            <motion.path
              d="M3 9 Q4.5 12 3 15"
              stroke="white"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
              animate={{
                opacity: [0, 1, 0],
                pathLength: [0, 1, 0],
                x: [0, 2, 4]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
            <motion.path
              d="M21 9 Q19.5 12 21 15"
              stroke="white"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
              animate={{
                opacity: [0, 1, 0],
                pathLength: [0, 1, 0],
                x: [0, -2, -4]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.5
              }}
            />

            {/* Ondas secundarias más sutiles */}
            <motion.path
              d="M2 8 Q4 12 2 16"
              stroke="white"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray="1,1.5"
              fill="none"
              animate={{
                opacity: [0, 0.7, 0],
                pathLength: [0, 1, 0],
                x: [0, 2.5, 5]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.25
              }}
            />
            <motion.path
              d="M22 8 Q20 12 22 16"
              stroke="white"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray="1,1.5"
              fill="none"
              animate={{
                opacity: [0, 0.7, 0],
                pathLength: [0, 1, 0],
                x: [0, -2.5, -5]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.75
              }}
            />
          </g>
        );

      case 'default':
      default:
        return (
          <g>
            {/* Ojos normales con parpadeo ocasional */}
            <motion.circle
              cx={leftEyePos.x}
              cy={leftEyePos.y}
              r={1.8}
              fill="white"
              animate={{
                scaleY: [1, 0.2, 1],
                y: [0, 0.2, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                times: [0, 0.02, 0.04],
                repeatDelay: 4.96
              }}
            />
            <motion.circle
              cx={rightEyePos.x}
              cy={rightEyePos.y}
              r={1.8}
              fill="white"
              animate={{
                scaleY: [1, 0.2, 1],
                y: [0, 0.2, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                times: [0, 0.02, 0.04],
                repeatDelay: 4.96,
                delay: 0.1
              }}
            />

            {/* Boca ligeramente sonriente con mejor animación */}
            <motion.path
              d="M9 14.5C10.5 16 13.5 16 15 14.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M9 14.5C10.5 16 13.5 16 15 14.5",
                  "M9 14.7C10.5 16.3 13.5 16.3 15 14.7",
                  "M9 14.5C10.5 16 13.5 16 15 14.5"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />

            {/* Líneas de expresión sutiles para más personalidad */}
            <motion.path
              d="M7.5 7C8 6.5 9 6.5 9.5 7"
              stroke="white"
              strokeWidth="0.5"
              strokeLinecap="round"
              opacity="0.5"
              animate={{ opacity: [0.5, 0.2, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M14.5 7C15 6.5 16 6.5 16.5 7"
              stroke="white"
              strokeWidth="0.5"
              strokeLinecap="round"
              opacity="0.5"
              animate={{ opacity: [0.5, 0.2, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </g>
        );
    }
  };

  // Generar olas internas y partículas según el estado
  const generateInternalWaves = () => {
    const pixelSize = sizePx[size];
    const baseWaveHeight = pixelSize * 0.4; // 40% del tamaño para la ola base
    const waveOffset = mood === 'processing' ? 0.2 : 0;

    const waveParams = {
      baseHeight: baseWaveHeight,
      amplitude: mood === 'processing' ? 8 : 5,
      frequency: mood === 'processing' ? 0.8 : 0.5,
      speed: mood === 'processing' ? 5 : 8
    };

    // Para el estado "speaking", hacer olas más dinámicas
    if (mood === 'explaining' && waveAmplitude > 0) {
      waveParams.amplitude = waveAmplitude + 3;
      waveParams.frequency = 1.2;
      waveParams.speed = 3;
    }

    // Ola principal con mejor efecto de fluido
    const mainWave = (
      <motion.div
        className="absolute bottom-0 w-full rounded-t-full bg-white/10"
        style={{
          height: `${baseWaveHeight}px`,
          transformOrigin: 'bottom'
        }}
        animate={{
          scaleY: animate ? [
            1,
            1 + (waveParams.amplitude / 100),
            1
          ] : 1,
          y: animate ? [
            0,
            -waveParams.amplitude / 3,
            0
          ] : 0
        }}
        transition={{
          repeat: Infinity,
          duration: waveParams.speed,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
      />
    );

    // Ola secundaria más pequeña con reflejos
    const secondWave = (
      <motion.div
        className="absolute bottom-0 w-full rounded-t-full bg-gradient-to-t from-white/15 to-white/10"
        style={{
          height: `${baseWaveHeight * 0.7}px`,
          transformOrigin: 'bottom'
        }}
        animate={{
          scaleY: animate ? [
            1,
            1 + (waveParams.amplitude / 80),
            1
          ] : 1,
          y: animate ? [
            0,
            -waveParams.amplitude / 4,
            0
          ] : 0
        }}
        transition={{
          repeat: Infinity,
          duration: waveParams.speed * 0.8,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          delay: 0.3
        }}
      />
    );

    // Ola terciaria más pequeña con sutil movimiento lateral
    const thirdWave = (
      <motion.div
        className="absolute bottom-0 w-full rounded-t-full bg-gradient-to-t from-white/10 to-transparent"
        style={{
          height: `${baseWaveHeight * 0.5}px`,
          transformOrigin: 'bottom'
        }}
        animate={{
          scaleY: animate ? [
            1,
            1 + (waveParams.amplitude / 60),
            1
          ] : 1,
          y: animate ? [
            0,
            -waveParams.amplitude / 5,
            0
          ] : 0,
          x: animate ? [
            0,
            waveParams.amplitude / 10,
            0
          ] : 0
        }}
        transition={{
          repeat: Infinity,
          duration: waveParams.speed * 0.6,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          delay: 0.6
        }}
      />
    );

    // Línea de brillo en la parte superior de las olas
    const waveShineLine = (
      <motion.div
        className="absolute bottom-0 w-full h-px bg-white/40 z-10"
        style={{
          bottom: `${baseWaveHeight - 2}px`,
        }}
        animate={{
          opacity: animate ? [0.4, 0.7, 0.4] : 0.4,
          y: animate ? [
            0,
            -waveParams.amplitude / 6,
            0
          ] : 0
        }}
        transition={{
          repeat: Infinity,
          duration: waveParams.speed * 0.7,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          delay: 0.2
        }}
      />
    );

    // Generar partículas internas para modo de procesamiento
    const particles = Array.from({ length: 5 }).map((_, i) => {
      // Distribuir partículas uniformemente
      const xPos = 20 + Math.sin(i / 5 * Math.PI * 2) * 60;
      const yPos = 60 - Math.cos(i / 5 * Math.PI * 2) * 30;

      return (
        <motion.div
          key={`particle-${i}`}
          className="absolute bg-white/30 rounded-full"
          style={{
            width: `${pixelSize * 0.03}px`,
            height: `${pixelSize * 0.03}px`,
            left: `${xPos}%`,
            top: `${yPos}%`
          }}
          animate={{
            y: [-pixelSize * 0.08, pixelSize * 0.08, -pixelSize * 0.08],
            x: [pixelSize * 0.04, -pixelSize * 0.04, pixelSize * 0.04],
            opacity: [0.3, 0.6, 0.3],
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 2px rgba(255,255,255,0.3)",
              "0 0 0px rgba(255,255,255,0)"
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + i,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      );
    });

    return (
      <>
        {mainWave}
        {secondWave}
        {thirdWave}
        {waveShineLine}
        {mood === 'processing' && particles}
      </>
    );
  };

  // Color de fondo basado en el estado
  const getBackgroundGradient = () => {
    switch (mood) {
      case 'happy':
        return "bg-gradient-to-br from-blue-400 to-blue-600";
      case 'processing':
        return "bg-gradient-to-br from-blue-600 to-blue-800";
      case 'thinking':
        return "bg-gradient-to-br from-blue-500 to-blue-700";
      case 'explaining':
        return "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700";
      case 'listening':
        return "bg-gradient-to-br from-blue-400 to-blue-700";
      default:
        return "bg-gradient-to-br from-blue-400 to-blue-600";
    }
  };

  return (
    <div className={cn(
      "relative group",
      sizeClasses[size],
      className
    )}>
      {/* Resplandor externo mejorado */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-radial from-blue-400/20 to-transparent"
        )}
        animate={{
          scale: pulse ? [1, 1.4, 1] : [1, 1.2, 1],
          opacity: pulse ? [0.3, 0, 0.3] : [0.3, 0.2, 0.3]
        }}
        transition={{
          repeat: Infinity,
          duration: pulse ? 2.5 : 4,
          ease: "easeInOut"
        }}
      />

      {/* Contenedor principal con gradiente y efectos mejorados */}
      <motion.div
        className={cn(
          "relative h-full w-full",
          "flex items-center justify-center",
          "rounded-full overflow-hidden",
          "shadow-lg border-2 border-white/30",
          getBackgroundGradient()
        )}
        animate={{
          scale: rippleActive ? [1, 1.05, 1] : 1,
          boxShadow: rippleActive ?
            [
              "0 4px 6px rgba(56, 189, 248, 0.1)",
              "0 6px 15px rgba(56, 189, 248, 0.2)",
              "0 4px 6px rgba(56, 189, 248, 0.1)"
            ] :
            "0 4px 6px rgba(56, 189, 248, 0.1)"
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
        {/* Efecto de iluminación desde arriba */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>

        {/* Olas internas animadas */}
        <div className="absolute inset-0 overflow-hidden">
          {generateInternalWaves()}
        </div>

        {/* Cuerpo principal del avatar */}
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Forma de gota transparente para centrar el SVG */}
          <path
            d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
            fill="none"
            strokeOpacity="0"
          />

          {/* Reflejo/Resplandor interno mejorado */}
          <motion.path
            d="M12 5.5l3.5 3.5a5 5 0 1 1-7 0z"
            fill="white"
            fillOpacity="0.15"
            animate={{
              fillOpacity: [0.15, 0.25, 0.15],
              d: animate ? [
                "M12 5.5l3.5 3.5a5 5 0 1 1-7 0z",
                "M12 5l3.7 3.7a5.2 5.2 0 1 1-7.4 0z",
                "M12 5.5l3.5 3.5a5 5 0 1 1-7 0z"
              ] : "M12 5.5l3.5 3.5a5 5 0 1 1-7 0z"
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          />

          {/* Expresión facial basada en el estado */}
          {getFacialExpression()}
        </svg>
      </motion.div>

      {/* Efecto de ondulación en agua */}
      <AnimatePresence>
        {rippleActive && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-blue-400/30"
          />
        )}
      </AnimatePresence>

      {/* Partículas decorativas a su alrededor */}
      <motion.div
        className="absolute -top-1 -left-1 h-2 w-2 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full"
        animate={{
          y: animate ? [-2, -6, -2] : 0,
          x: animate ? [-2, 1, -2] : 0,
          opacity: animate ? [0.8, 0.4, 0.8] : 0.8,
          boxShadow: animate ? [
            "0 0 0px rgba(56, 189, 248, 0)",
            "0 0 3px rgba(56, 189, 248, 0.3)",
            "0 0 0px rgba(56, 189, 248, 0)"
          ] : "none"
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-0 -right-1 h-2.5 w-2.5 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full"
        animate={{
          y: animate ? [0, -4, 0] : 0,
          x: animate ? [0, 2, 0] : 0,
          opacity: animate ? [0.8, 0.5, 0.8] : 0.8,
          boxShadow: animate ? [
            "0 0 0px rgba(56, 189, 248, 0)",
            "0 0 4px rgba(56, 189, 248, 0.4)",
            "0 0 0px rgba(56, 189, 248, 0)"
          ] : "none"
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute top-1/3 -right-2 h-1.5 w-1.5 bg-gradient-to-br from-blue-100 to-blue-300 rounded-full"
        animate={{
          y: animate ? [-5, -12, -5] : 0,
          opacity: animate ? [0.5, 0.1, 0.5] : 0.5,
          boxShadow: animate ? [
            "0 0 0px rgba(56, 189, 248, 0)",
            "0 0 2px rgba(56, 189, 248, 0.2)",
            "0 0 0px rgba(56, 189, 248, 0)"
          ] : "none"
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}
