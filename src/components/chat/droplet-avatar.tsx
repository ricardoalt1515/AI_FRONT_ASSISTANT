import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type DropletMood = 'default' | 'thinking' | 'happy' | 'explaining' | 'processing' | 'listening' | 'technical';

interface EnhancedDropletAvatarProps {
  mood?: DropletMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
  speakingIntensity?: number;
}

export default function EnhancedDropletAvatar({
  mood = 'default',
  size = 'md',
  className,
  animate = true,
  pulse = false,
  speakingIntensity = 0
}: EnhancedDropletAvatarProps) {
  const [rippleActive, setRippleActive] = useState(false);
  const [waveAmplitude, setWaveAmplitude] = useState(0);
  const [techPulse, setTechPulse] = useState(false);

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

    // Pulso técnico para modos técnicos
    const techInterval = setInterval(() => {
      if (mood === 'technical' || mood === 'processing') {
        setTechPulse(prev => !prev);
      }
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(techInterval);
    };
  }, [animate, mood]);

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
      case 'technical':
        return (
          <g>
            {/* Ojos técnicos (hexagonales) */}
            <motion.path
              d="M8,8.5 L9,7.5 L10,7.5 L11,8.5 L10,9.5 L9,9.5 Z"
              fill="white"
              animate={{
                scale: techPulse ? [1, 1.1, 1] : 1,
                fillOpacity: techPulse ? [1, 0.8, 1] : 1
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M14,8.5 L15,7.5 L16,7.5 L17,8.5 L16,9.5 L15,9.5 Z"
              fill="white"
              animate={{
                scale: techPulse ? [1, 1.1, 1] : 1,
                fillOpacity: techPulse ? [1, 0.8, 1] : 1
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                delay: 0.3
              }}
            />

            {/* Boca técnica como display digital */}
            <motion.rect
              x={9.5}
              y={14.5}
              width={5}
              height={1.2}
              rx={0.2}
              fill="white"
              animate={{
                width: techPulse ? [5, 3.5, 5] : 5,
                x: techPulse ? [9.5, 10.25, 9.5] : 9.5
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            />

            {/* Elementos técnicos adicionales */}
            <motion.circle
              cx={6.5}
              cy={5.5}
              r={0.8}
              fill="white"
              fillOpacity={0.6}
              animate={{
                fillOpacity: [0.6, 0.9, 0.6]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx={17.5}
              cy={5.5}
              r={0.8}
              fill="white"
              fillOpacity={0.6}
              animate={{
                fillOpacity: [0.6, 0.9, 0.6]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: 1.5
              }}
            />

            {/* Líneas de circuito */}
            <motion.path
              d="M5,11 H7 M17,11 H19"
              stroke="white"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray="0.5,0.5"
              animate={{
                strokeDashoffset: [0, 2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear"
              }}
            />
            <motion.path
              d="M3.5,16 C3.5,16 4.5,17 6,17 C7.5,17 8.5,16 8.5,16 M15.5,16 C15.5,16 16.5,17 18,17 C19.5,17 20.5,16 20.5,16"
              stroke="white"
              strokeWidth="0.5"
              strokeLinecap="round"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
            />

            {/* Símbolo H₂O en la frente */}
            <motion.text
              x="12"
              y="5"
              fontSize="1.8"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
              opacity={0.7}
              animate={{
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
              }}
            >
              H₂O
            </motion.text>
          </g>
        );

      case 'thinking':
        return (
          <g>
            {/* Ojos pensativos con forma técnica */}
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

            {/* Boca pensativa con estilo técnico */}
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

            {/* Pequeñas fórmulas químicas flotantes */}
            <motion.text
              x={18.5}
              y={6.5}
              fontSize="2"
              fill="white"
              fillOpacity="0.8"
              animate={{
                y: [-2, -4, -2],
                opacity: [0.8, 0.4, 0.8],
                scale: [1, 1.2, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            >
              H⁺
            </motion.text>
            <motion.text
              x={19.5}
              y={3.5}
              fontSize="2"
              fill="white"
              fillOpacity="0.6"
              animate={{
                y: [-1, -3, -1],
                opacity: [0.6, 0.2, 0.6],
                scale: [1, 1.3, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              O²⁻
            </motion.text>

            {/* Cejas pensativas con estilo técnico */}
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

      case 'processing':
        return (
          <g>
            {/* Ojos de procesamiento con forma hexagonal */}
            <motion.path
              d="M8,8.5 L9,7.5 L10,7.5 L11,8.5 L10,9.5 L9,9.5 Z"
              fill="white"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "linear",
              }}
            />
            <motion.path
              d="M14,8.5 L15,7.5 L16,7.5 L17,8.5 L16,9.5 L15,9.5 Z"
              fill="white"
              animate={{
                rotate: [0, -180, -360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "linear",
              }}
            />

            {/* Barra de progreso animada */}
            <motion.rect
              x={8.5}
              y={15}
              height={1.5}
              rx={0.75}
              fill="white"
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

            {/* Indicadores de datos alrededor */}
            <motion.g
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.path
                  key={`tech-indicator-${i}`}
                  d={`M${4 + (i % 3) * 8},${5 + Math.floor(i / 3) * 10} h1 v1 h-1 z`}
                  fill="white"
                  fillOpacity="0.7"
                  animate={{
                    scale: [1, 1.3, 1],
                    fillOpacity: [0.7, 1, 0.7]
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

            {/* Líneas de circuito animadas */}
            <motion.path
              d="M4 12 H7 M17 12 H20"
              stroke="white"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="1,1"
              animate={{
                strokeDashoffset: [0, 4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear"
              }}
            />

            {/* Diagrama de flujo del agua */}
            <motion.path
              d="M12,18 C10,18 8,16 8,14 C8,12 10,12 12,12 C14,12 16,12 16,14 C16,16 14,18 12,18 Z"
              stroke="white"
              strokeWidth="0.4"
              strokeOpacity="0.5"
              fill="none"
              animate={{
                strokeOpacity: [0.5, 0.8, 0.5],
                pathLength: [0, 1, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "linear"
              }}
            />
          </g>
        );

      case 'explaining':
      case 'speaking':
        const mouthHeight = 1.5 + (waveAmplitude / 2);

        return (
          <g>
            {/* Ojos expresivos con detalle técnico */}
            <motion.path
              d="M8,8.5 L9,7.5 L10,7.5 L11,8.5 L10,9.5 L9,9.5 Z"
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
            <motion.path
              d="M14,8.5 L15,7.5 L16,7.5 L17,8.5 L16,9.5 L15,9.5 Z"
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

            {/* Símbolo H₂O en la frente más pequeño */}
            <motion.text
              x="12"
              y="5"
              fontSize="1.5"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
              opacity={0.6}
              animate={{
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
              }}
            >
              H₂O
            </motion.text>

            {/* Boca animada con forma técnica */}
            <motion.rect
              x={9}
              y={14.5}
              width={6}
              height={mouthHeight}
              rx={1}
              fill="white"
              animate={{
                height: waveAmplitude
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

            {/* Ondas sonoras técnicas cuando habla */}
            {(waveAmplitude > 0) && (
              <>
                <motion.path
                  d="M19 11C20 10 20.5 12 19 11.5"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  fill="none"
                  animate={{
                    opacity: [1, 0.3, 1],
                    x: [0, 0.5, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
                <motion.path
                  d="M5 11C4 10 3.5 12 5 11.5"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  fill="none"
                  animate={{
                    opacity: [1, 0.3, 1],
                    x: [0, -0.5, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />
              </>
            )}
          </g>
        );

      case 'default':
      default:
        return (
          <g>
            {/* Ojos normales con aspecto técnico */}
            <motion.path
              d="M8,9 m-1.8,0 a1.8,1.8 0 1,0 3.6,0 a1.8,1.8 0 1,0 -3.6,0"
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
            <motion.path
              d="M14,9 m-1.8,0 a1.8,1.8 0 1,0 3.6,0 a1.8,1.8 0 1,0 -3.6,0"
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

            {/* Boca ligeramente técnica */}
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

            {/* Pequeño símbolo H₂O */}
            <motion.text
              x="12"
              y="5"
              fontSize="1.5"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
              opacity={0.4}
              animate={{
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
            >
              H₂O
            </motion.text>
          </g>
        );
    }
  };

  // Generar olas internas con aspecto más técnico
  const generateInternalWaves = () => {
    const pixelSize = sizePx[size];
    const baseWaveHeight = pixelSize * 0.4;
    const waveOffset = mood === 'processing' ? 0.2 : 0;

    const waveParams = {
      baseHeight: baseWaveHeight,
      amplitude: mood === 'processing' ? 8 : 5,
      frequency: mood === 'processing' ? 0.8 : 0.5,
      speed: mood === 'processing' ? 5 : 8
    };

    // Para estados técnicos, hacer olas más estructuradas
    if ((mood === 'technical' || mood === 'processing') && animate) {
      waveParams.amplitude = 6;
      waveParams.frequency = 2;
      waveParams.speed = 6;
    }

    // Para el estado "speaking", hacer olas más dinámicas
    if (mood === 'explaining' && waveAmplitude > 0) {
      waveParams.amplitude = waveAmplitude + 3;
      waveParams.frequency = 1.2;
      waveParams.speed = 3;
    }

    // Ola principal con patrones hexagonales
    const mainWave = (
      <div className="absolute inset-x-0 bottom-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 w-full rounded-t-full bg-white/10"
          style={{
            height: `${baseWaveHeight}px`,
            transformOrigin: 'bottom',
            backgroundImage: (mood === 'technical' || mood === 'processing') ?
              'repeating-linear-gradient(30deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.1) 4px)' :
              'none'
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
      </div>
    );

    // Ola secundaria con patrones técnicos
    const secondWave = (
      <motion.div
        className="absolute bottom-0 w-full rounded-t-full bg-white/15"
        style={{
          height: `${baseWaveHeight * 0.7}px`,
          transformOrigin: 'bottom',
          backgroundImage: (mood === 'technical' || mood === 'processing') ?
            'repeating-linear-gradient(150deg, rgba(255,255,255,0), rgba(255,255,255,0.1) 3px, rgba(255,255,255,0) 6px)' :
            'none'
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

    // Ola terciaria con aspecto más "digital"
    const thirdWave = (
      <motion.div
        className="absolute bottom-0 w-full rounded-t-full bg-white/10"
        style={{
          height: `${baseWaveHeight * 0.5}px`,
          transformOrigin: 'bottom',
          backgroundImage: (mood === 'technical' || mood === 'processing') ?
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)' :
            'none'
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

    // Partículas de datos para estados técnicos
    const dataBits = (mood === 'technical' || mood === 'processing') && (
      <>
        {Array.from({ length: 8 }).map((_, i) => {
          const size = Math.max(2, Math.min(4, Math.random() * 4));
          // Distribuir en forma más estructurada para el estado técnico
          const xPos = 20 + Math.sin((i / 8) * Math.PI * 2) * 60;
          const yPos = 60 - Math.cos((i / 8) * Math.PI * 2) * 30;

          return (
            <motion.div
              key={`data-bit-${i}`}
              className="absolute bg-white/40"
              style={{
                width: `${pixelSize * 0.03}px`,
                height: `${pixelSize * 0.03}px`,
                left: `${xPos}%`,
                top: `${yPos}%`,
                borderRadius: mood === 'technical' ? '1px' : '50%'
              }}
              animate={{
                y: [-pixelSize * 0.08, pixelSize * 0.08, -pixelSize * 0.08],
                x: [pixelSize * 0.04, -pixelSize * 0.04, pixelSize * 0.04],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + i,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          );
        })}
      </>
    );

    return (
      <>
        {mainWave}
        {secondWave}
        {thirdWave}
        {dataBits}
      </>
    );
  };

  // Color de fondo basado en el estado con variantes técnicas
  const getBackgroundGradient = () => {
    switch (mood) {
      case 'technical':
        return "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700";
      case 'processing':
        return "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800";
      case 'thinking':
        return "bg-gradient-to-br from-blue-500 to-blue-700";
      case 'explaining':
        return "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700";
      case 'happy':
        return "bg-gradient-to-br from-blue-400 to-blue-600";
      default:
        return "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600";
    }
  };

  return (
    <div className={cn(
      "relative group",
      sizeClasses[size],
      className
    )}>
      {/* Resplandor externo técnico */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-radial from-blue-400/30 to-transparent"
        )}
        animate={{
          scale: pulse ? [1, 1.4, 1] : 1,
          opacity: pulse ? [0.4, 0, 0.4] : 0.4
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut"
        }}
      />

      {/* Contenedor hexagonal para estética técnica (para modos technical/processing) */}
      {(mood === 'technical' || mood === 'processing') && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full absolute">
            <polygon
              points="50,3 97,25 97,75 50,97 3,75 3,25"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          </svg>
        </motion.div>
      )}

      {/* Contenedor principal con gradiente y efectos */}
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
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
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

          {/* Reflejo/Resplandor interno */}
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

          {/* Patrones hexágonales (solo para modos técnicos) */}
          {(mood === 'technical' || mood === 'processing') && (
            <motion.g
              animate={{
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            >
              <path d="M12,8 L14,10 L12,12 L10,10 Z" fill="white" fillOpacity="0.2" />
              <path d="M8,12 L10,14 L8,16 L6,14 Z" fill="white" fillOpacity="0.15" />
              <path d="M16,12 L18,14 L16,16 L14,14 Z" fill="white" fillOpacity="0.15" />
            </motion.g>
          )}

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

      {/* Partículas técnicas a su alrededor */}
      <motion.div
        className={`absolute -top-1 -left-1 h-2 w-2 ${mood === 'technical' ? 'bg-blue-300' : 'bg-blue-200'} ${mood === 'technical' ? 'rounded-sm' : 'rounded-full'}`}
        animate={{
          y: animate ? [-2, -6, -2] : 0,
          x: animate ? [-2, 1, -2] : 0,
          opacity: animate ? [0.8, 0.4, 0.8] : 0.8,
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className={`absolute bottom-0 -right-1 h-2.5 w-2.5 ${mood === 'technical' ? 'bg-blue-400/80' : 'bg-blue-300/80'} ${mood === 'technical' ? 'rounded-sm' : 'rounded-full'}`}
        animate={{
          y: animate ? [0, -4, 0] : 0,
          x: animate ? [0, 2, 0] : 0,
          opacity: animate ? [0.8, 0.5, 0.8] : 0.8,
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {mood === 'technical' && (
        <motion.div
          className="absolute top-0 right-0 h-1.5 w-1.5 bg-blue-300/80 rounded-sm"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}
