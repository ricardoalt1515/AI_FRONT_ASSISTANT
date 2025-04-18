"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TechWaterAvatarProps {
  status?: "idle" | "thinking" | "speaking" | "listening";
  size?: "sm" | "md" | "lg";
  className?: string;
  pulseEffect?: boolean;
}

export default function TechWaterAvatar({
  status = "idle",
  size = "md",
  className,
  pulseEffect = false,
}: TechWaterAvatarProps) {
  const [particleCount, setParticleCount] = useState<number>(0);
  const dataParticlesRef = useRef<SVGPathElement[]>([]);
  const dataPointsRef = useRef<SVGCircleElement[]>([]);
  const circuitLinesRef = useRef<SVGPathElement[]>([]);

  // Tamaños basados en la prop size
  const dimensions = {
    sm: { width: 32, height: 32, particleScale: 0.7 },
    md: { width: 48, height: 48, particleScale: 1 },
    lg: { width: 96, height: 96, particleScale: 1.8 },
  };

  const { width, height, particleScale } = dimensions[size];

  // Generar el camino (path) de la gota de agua
  const generateDropPath = (w: number, h: number) => {
    const centerX = w / 2;
    const radius = Math.min(w, h) * 0.45;
    return `M${centerX},${h * 0.05} 
            Q${w * 0.8},${h * 0.3} ${w * 0.8},${h * 0.55} 
            Q${w * 0.8},${h * 0.8} ${centerX},${h * 0.95} 
            Q${w * 0.2},${h * 0.8} ${w * 0.2},${h * 0.55} 
            Q${w * 0.2},${h * 0.3} ${centerX},${h * 0.05}`;
  };

  // Generar caminos para las líneas de circuito
  const generateCircuitPaths = (w: number, h: number) => {
    const centerX = w / 2;
    const radius = Math.min(w, h) * 0.3;

    return [
      // Circuito 1 (horizontal)
      `M${w * 0.3},${h * 0.4} H${w * 0.45} Q${w * 0.5},${h * 0.4} ${w * 0.5},${h * 0.45} V${h * 0.55}`,
      // Circuito 2 (vertical derecho)
      `M${w * 0.7},${h * 0.3} V${h * 0.45} Q${w * 0.7},${h * 0.5} ${w * 0.65},${h * 0.5} H${w * 0.55}`,
      // Circuito 3 (semicírculo inferior)
      `M${w * 0.35},${h * 0.65} Q${w * 0.5},${h * 0.75} ${w * 0.65},${h * 0.65}`,
    ];
  };

  // Puntos de datos (para el núcleo y puntos de conexión)
  const generateDataPoints = (w: number, h: number) => {
    const centerX = w / 2;
    const centerY = h / 2;

    return [
      { x: centerX, y: centerY, r: w * 0.12 }, // Core/nucleus
      { x: w * 0.3, y: h * 0.4, r: w * 0.03 }, // Circuit point 1
      { x: w * 0.7, y: h * 0.3, r: w * 0.03 }, // Circuit point 2
      { x: w * 0.5, y: h * 0.55, r: w * 0.03 }, // Circuit junction 1
      { x: w * 0.55, y: h * 0.5, r: w * 0.03 }, // Circuit junction 2
      { x: w * 0.35, y: h * 0.65, r: w * 0.03 }, // Circuit point 3
      { x: w * 0.65, y: h * 0.65, r: w * 0.03 }, // Circuit point 4
    ];
  };

  // Animación de partículas que fluyen dentro de la gota
  useEffect(() => {
    // Solo crear partículas cuando está en estado "thinking"
    if (status === "thinking") {
      setParticleCount(10 * particleScale);
    } else {
      setParticleCount(0);
    }
  }, [status, particleScale]);

  // Animations para líneas de circuito basadas en estado
  useEffect(() => {
    if (!circuitLinesRef.current.length) return;

    // Animaciones basadas en estado
    const animations = {
      idle: {
        opacity: 0.3,
        dashOffset: 0,
        dashArray: "2 3",
      },
      thinking: {
        opacity: 1,
        dashOffset: 15,
        dashArray: "3 2",
      },
      listening: {
        opacity: 0.7,
        dashOffset: 5,
        dashArray: "4 4",
      },
      speaking: {
        opacity: 0.9,
        dashOffset: -10,
        dashArray: "5 2",
      }
    };

    // Aplicar animaciones
    circuitLinesRef.current.forEach(line => {
      line.style.opacity = animations[status].opacity.toString();
      line.style.strokeDasharray = animations[status].dashArray;
      line.style.strokeDashoffset = animations[status].dashOffset.toString();
    });

    // Animar puntos de datos
    dataPointsRef.current.forEach((point, i) => {
      const delay = i * 150;
      const scale = status === "speaking" ?
        1 + (i % 2 === 0 ? 0.3 : 0.1) :
        status === "thinking" ?
          0.8 + (Math.sin(Date.now() / 1000 + i) + 1) * 0.2 :
          1;

      point.style.transform = `scale(${scale})`;
      point.style.opacity = status === "idle" ? "0.5" : "1";
      point.style.transition = `transform 0.5s ease ${delay}ms, opacity 0.3s ease`;
    });

  }, [status]);

  // Animación para las partículas de datos
  useEffect(() => {
    if (!dataParticlesRef.current.length) return;

    const animateParticles = () => {
      dataParticlesRef.current.forEach((particle, index) => {
        const delay = index * 200;
        const duration = 1500 + Math.random() * 1000;

        // Animación de movimiento basada en el estado
        if (status === "thinking") {
          // Mover a lo largo de las líneas
          setTimeout(() => {
            particle.style.opacity = "1";
            particle.style.strokeDashoffset = "0";

            setTimeout(() => {
              particle.style.opacity = "0";
            }, duration * 0.7);
          }, delay);
        } else {
          particle.style.opacity = "0";
        }
      });
    };

    animateParticles();
    const interval = setInterval(animateParticles, 2000);

    return () => clearInterval(interval);
  }, [status, dataParticlesRef.current.length]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        pulseEffect && "after:absolute after:inset-0 after:rounded-full after:bg-hydrous-400/20 after:animate-pulse-slow",
        className
      )}
      style={{ width, height }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="relative z-10"
      >
        {/* Glow effect background */}
        <defs>
          <radialGradient id="dropGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
          </radialGradient>

          {/* Gradiente para la gota de agua */}
          <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" /> {/* hydrous-300 */}
            <stop offset="50%" stopColor="#38bdf8" /> {/* hydrous-400 */}
            <stop offset="100%" stopColor="#0ea5e9" /> {/* hydrous-500 */}
          </linearGradient>

          {/* Gradiente para el núcleo */}
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%" fx="45%" fy="45%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>

          {/* Filtro para el resplandor */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Filtro para el resplandor del core */}
          <filter id="coreGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Animated line for data particles */}
          <path
            id="circuitPath1"
            d={generateCircuitPaths(width, height)[0]}
            fill="none"
          />
          <path
            id="circuitPath2"
            d={generateCircuitPaths(width, height)[1]}
            fill="none"
          />
          <path
            id="circuitPath3"
            d={generateCircuitPaths(width, height)[2]}
            fill="none"
          />
        </defs>

        {/* Background glow */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={Math.min(width, height) * 0.7}
          fill="url(#dropGlow)"
        />

        {/* Water drop body */}
        <path
          d={generateDropPath(width, height)}
          fill="url(#dropGradient)"
          stroke="#7dd3fc"
          strokeWidth={width * 0.01}
          strokeOpacity="0.5"
          filter="url(#glow)"
          opacity={status === "idle" ? 0.8 : 1}
          className={cn(
            "transition-opacity duration-500",
            status === "speaking" && "animate-water-pulse"
          )}
        />

        {/* Circuit lines */}
        {generateCircuitPaths(width, height).map((path, i) => (
          <path
            key={`circuit-${i}`}
            d={path}
            fill="none"
            stroke="#e0f2fe"
            strokeWidth={width * 0.015}
            strokeLinecap="round"
            strokeDasharray="2 3"
            className="transition-all duration-700"
            ref={el => {
              if (el && !circuitLinesRef.current.includes(el)) {
                circuitLinesRef.current.push(el);
              }
            }}
          />
        ))}

        {/* Circuit connection points & core */}
        {generateDataPoints(width, height).map((point, i) => (
          <circle
            key={`data-point-${i}`}
            cx={point.x}
            cy={point.y}
            r={point.r}
            fill={i === 0 ? "url(#coreGradient)" : "#e0f2fe"}
            opacity={i === 0 ? 1 : 0.7}
            filter={i === 0 ? "url(#coreGlow)" : ""}
            className={cn(
              "transition-transform duration-500",
              i === 0 && status === "thinking" && "animate-water-pulse",
              i === 0 && status === "speaking" && "animate-water-wave"
            )}
            ref={el => {
              if (el && !dataPointsRef.current.includes(el)) {
                dataPointsRef.current.push(el);
              }
            }}
          />
        ))}

        {/* Data flowing particles - created dynamically based on state */}
        {Array.from({ length: particleCount }).map((_, i) => {
          // Randomly choose a circuit path for each particle
          const pathId = `circuitPath${(i % 3) + 1}`;
          return (
            <circle
              key={`particle-${i}`}
              r={width * 0.012}
              fill="#ffffff"
              opacity="0"
              className="transition-opacity duration-500"
            >
              <animateMotion
                path={generateCircuitPaths(width, height)[i % 3]}
                dur={`${1 + Math.random()}s`}
                begin={`${i * 0.2}s`}
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
          );
        })}

        {/* Floating micro particles inside the drop */}
        {status === "thinking" && Array.from({ length: 5 }).map((_, i) => (
          <circle
            key={`microparticle-${i}`}
            cx={width * (0.3 + Math.random() * 0.4)}
            cy={height * (0.3 + Math.random() * 0.4)}
            r={width * 0.01}
            fill="#ffffff"
            opacity="0.6"
          >
            <animate
              attributeName="cy"
              values={`${height * (0.3 + Math.random() * 0.4)};${height * (0.35 + Math.random() * 0.3)};${height * (0.3 + Math.random() * 0.4)}`}
              dur={`${3 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values={`${width * (0.3 + Math.random() * 0.4)};${width * (0.35 + Math.random() * 0.3)};${width * (0.3 + Math.random() * 0.4)}`}
              dur={`${4 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Ripple effect layer (optional, based on prop) */}
      {pulseEffect && (
        <div className="absolute inset-0 rounded-full bg-hydrous-400/10 animate-water-ripple"></div>
      )}
    </div>
  );
}
