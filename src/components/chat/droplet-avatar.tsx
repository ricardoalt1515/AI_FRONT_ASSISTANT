"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type DropletMood = 'default' | 'thinking' | 'happy' | 'explaining' | 'processing' | 'technical';

interface DropletAvatarProps {
  mood?: DropletMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
}

export default function DropletAvatar({
  mood = 'default',
  size = 'md',
  className,
  animate = true,
  pulse = false
}: DropletAvatarProps) {
  const [rippleActive, setRippleActive] = useState(false);
  const [waveAmplitude, setWaveAmplitude] = useState(0);
  const [techPulse, setTechPulse] = useState(false);

  // Size classes for different options
  const sizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
    xl: 'h-32 w-32'
  };

  // Randomly trigger ripple effect
  useEffect(() => {
    if (!animate) return;

    const interval = setInterval(() => {
      // Only activate ripple occasionally
      if (Math.random() > 0.7) {
        setRippleActive(true);
        setTimeout(() => setRippleActive(false), 2000);
      }
    }, 3000);

    // Technical pulse for technical modes
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

  // Control wave amplitude when speaking
  useEffect(() => {
    if (mood === 'explaining') {
      // Create a rippling effect based on "speech intensity"
      const intensity = Math.random() * 0.5 + 0.5;
      const baseAmplitude = 2 + (intensity * 5);

      const interval = setInterval(() => {
        setWaveAmplitude(baseAmplitude * (0.7 + Math.random() * 0.6));
      }, 150);

      return () => clearInterval(interval);
    } else {
      setWaveAmplitude(0);
    }
  }, [mood]);

  // Get facial expression based on mood
  const getFacialExpression = () => {
    // ViewBox coordinates
    const vb = { width: 24, height: 24 };

    // Eye positions
    const leftEyePos = { x: 9, y: 9 };
    const rightEyePos = { x: 15, y: 9 };

    // Mood variants
    switch (mood) {
      case 'technical':
        return (
          <g>
            {/* Technical hexagonal eyes */}
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

            {/* Technical mouth like a digital display */}
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

            {/* Technical additional elements */}
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

            {/* Circuit lines */}
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

            {/* H₂O symbol on forehead */}
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
            {/* Thoughtful eyes with slight technical shape */}
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

            {/* Thoughtful mouth with technical style */}
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

            {/* Small floating formulas */}
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
          </g>
        );

      case 'processing':
        return (
          <g>
            {/* Processing eyes with hexagonal shape */}
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

            {/* Animated progress bar */}
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

            {/* Data indicators */}
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

            {/* Circuit lines */}
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
          </g>
        );

      case 'explaining':
        const mouthHeight = 1.5 + (waveAmplitude / 2);

        return (
          <g>
            {/* Expressive eyes with technical detail */}
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

            {/* Small H₂O symbol on forehead */}
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

            {/* Animated mouth with technical shape */}
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

            {/* Sound waves when speaking */}
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

      case 'happy':
        return (
          <g>
            {/* Happy curved eyes */}
            <motion.path
              d="M8,8 C8,10 10,10 10,8"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <motion.path
              d="M14,8 C14,10 16,10 16,8"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Wide smile */}
            <motion.path
              d="M9,14 C12,17 15,17 15,14"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M9,14 C12,17 15,17 15,14",
                  "M9,14.2 C12,17.5 15,17.5 15,14.2",
                  "M9,14 C12,17 15,17 15,14"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            />

            {/* Small floating particles */}
            <motion.circle
              cx={7}
              cy={5}
              r={0.8}
              fill="white"
              opacity={0.6}
              animate={{
                y: [-1, -2, -1],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx={17}
              cy={6}
              r={0.6}
              fill="white"
              opacity={0.6}
              animate={{
                y: [-0.5, -1.5, -0.5],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                delay: 0.7
              }}
            />
          </g>
        );

      case 'default':
      default:
        return (
          <g>
            {/* Default eyes with technical aspect */}
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

            {/* Default slightly technical mouth */}
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

            {/* Small H₂O symbol */}
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

  // Generate internal waves
  const generateInternalWaves = () => {
    return (
      <>
        {/* Main wave */}
        <div className="absolute inset-x-0 bottom-0 overflow-hidden">
          <motion.div
            className="absolute bottom-0 w-full rounded-t-full bg-white/10"
            style={{
              height: '40%',
              transformOrigin: 'bottom',
              backgroundImage: (mood === 'technical' || mood === 'processing') ?
                'repeating-linear-gradient(30deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.1) 4px)' :
                'none'
            }}
            animate={{
              scaleY: animate ? [
                1,
                1.1,
                1
              ] : 1,
              y: animate ? [
                0,
                -3,
                0
              ] : 0
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        </div>

        {/* Secondary wave */}
        <motion.div
          className="absolute bottom-0 w-full rounded-t-full bg-white/15"
          style={{
            height: '30%',
            transformOrigin: 'bottom',
            backgroundImage: (mood === 'technical' || mood === 'processing') ?
              'repeating-linear-gradient(150deg, rgba(255,255,255,0), rgba(255,255,255,0.1) 3px, rgba(255,255,255,0) 6px)' :
              'none'
          }}
          animate={{
            scaleY: animate ? [
              1,
              1.15,
              1
            ] : 1,
            y: animate ? [
              0,
              -2,
              0
            ] : 0
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: 0.3
          }}
        />

        {/* Data bits for technical states */}
        {(mood === 'technical' || mood === 'processing') && (
          <>
            {Array.from({ length: 4 }).map((_, i) => {
              // Distribute in a more structured pattern for technical state
              const xPos = 20 + Math.sin((i / 4) * Math.PI * 2) * 60;
              const yPos = 60 - Math.cos((i / 4) * Math.PI * 2) * 30;

              return (
                <motion.div
                  key={`data-bit-${i}`}
                  className="absolute bg-white/40"
                  style={{
                    width: '3px',
                    height: '3px',
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    borderRadius: mood === 'technical' ? '1px' : '50%'
                  }}
                  animate={{
                    y: [-3, 3, -3],
                    x: [2, -2, 2],
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
        )}
      </>
    );
  };

  // Get background gradient based on mood
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
      {/* External technical glow */}
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

      {/* Hexagonal container for technical aesthetic */}
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

      {/* Main container with gradient and effects */}
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
        {/* Internal animated waves */}
        <div className="absolute inset-0 overflow-hidden">
          {generateInternalWaves()}
        </div>

        {/* Main avatar body */}
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Transparent droplet shape */}
          <path
            d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
            fill="none"
            strokeOpacity="0"
          />

          {/* Internal highlight */}
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

          {/* Hexagonal patterns (only for technical modes) */}
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

          {/* Facial expression based on mood */}
          {getFacialExpression()}
        </svg>
      </motion.div>

      {/* Water ripple effect */}
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

      {/* Technical particles around avatar */}
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
