"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DropletAvatar from "../chat/droplet-avatar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [efficacyCounter, setEfficacyCounter] = useState(0);
  const [savingsCounter, setSavingsCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Detectar scroll para efectos visuales
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Configurar visibilidad para animaciones
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animación de contadores
  useEffect(() => {
    const interval1 = setInterval(() => {
      setEfficacyCounter(prev => {
        if (prev >= 99) {
          clearInterval(interval1);
          return 99;
        }
        return prev + 1;
      });
    }, 25);

    const interval2 = setInterval(() => {
      setSavingsCounter(prev => {
        if (prev >= 45) {
          clearInterval(interval2);
          return 45;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  // Variantes de animación para elementos del header
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-blue-200/50 shadow-md"
          : "bg-transparent border-b border-blue-100/20"
      )}
    >
      {/* Efecto de ondas de agua bajo el header con mejor animación */}
      <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <motion.div
          className="absolute inset-x-0 h-full"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(56, 189, 248, 0.5), transparent)'
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Fondo de agua sutil mejorado */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(56, 189, 248, 0.05) 0%, transparent 50%), 
                            radial-gradient(circle at 70% 50%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)`
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />

        {/* Patrón de ondas sutiles con mejor animación */}
        <motion.div
          className="absolute bottom-0 w-full overflow-hidden"
          style={{ height: scrolled ? '6px' : '12px' }}
        >
          <motion.svg
            className="absolute bottom-0 left-0 w-full text-blue-400 opacity-[0.03]"
            preserveAspectRatio="none"
            viewBox="0 0 1440 74"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              y: [0, -3, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
          >
            <path
              d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z"
              fill="currentColor"
            />
          </motion.svg>
        </motion.div>
      </div>

      <div className="container py-3 px-4 sm:px-6 lg:px-8 transition-all duration-500">
        <div className="flex items-center justify-between">
          {/* Logo mejorado y título */}
          <motion.div
            className="flex items-center gap-3"
            variants={itemVariants}
          >
            <div className="relative flex items-center">
              {/* Resplandor detrás del avatar */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400/20 filter blur-xl scale-150"
                animate={{
                  scale: [1.5, 1.8, 1.5],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
              />

              <DropletAvatar
                size={scrolled ? "sm" : "md"}
                mood="default"
                pulse={false}
                className={cn(
                  "transition-all duration-300 relative z-10",
                  scrolled ? "h-10 w-10" : "h-12 w-12"
                )}
              />

              <div className="ml-3 relative">
                {/* Efecto de brillo detrás del título */}
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-50 to-transparent opacity-50 filter blur-sm"></div>

                <motion.h1
                  className={cn(
                    "relative z-10 font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 transition-all duration-300",
                    scrolled ? "text-2xl" : "text-3xl"
                  )}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "easeInOut"
                  }}
                >
                  H₂O Allegiant
                  <span className="ml-1 font-normal text-blue-600 bg-blue-50/80 px-1.5 py-0.5 rounded-sm text-sm">AI</span>
                </motion.h1>

                <div className="flex items-center flex-wrap gap-3 mt-0.5 relative z-10">
                  <p className="text-sm font-medium text-blue-600 opacity-90">
                    <span className="inline-block">Ingeniería de Soluciones Hídricas</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Métricas y botones de acción mejorados */}
          <motion.div
            className="flex items-center gap-4"
            variants={itemVariants}
          >
            {/* Métricas animadas */}
            <div className="hidden md:flex items-center gap-5">
              <div className="group relative p-1.5 rounded-lg hover:bg-blue-50/70 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full 
                       flex items-center justify-center shadow-sm
                       border border-blue-200/50 transition-all duration-300 overflow-hidden">
                    {/* Pequeña animación de agua */}
                    <motion.div
                      className="absolute bottom-0 w-full h-3 bg-blue-200/30 rounded-t-full"
                      animate={{
                        y: [0, -1, 0],
                        scaleY: [1, 1.2, 1]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                      }}
                    />

                    <svg className="h-4 w-4 text-blue-500 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Eficacia</span>
                    <motion.span
                      className="font-semibold text-blue-700 group-hover:text-blue-800 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {efficacyCounter}%
                    </motion.span>
                  </div>
                </div>

                {/* Indicador animado en hover */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear"
                    }}
                  />
                </div>
              </div>

              <div className="group relative p-1.5 rounded-lg hover:bg-blue-50/70 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full 
                       flex items-center justify-center shadow-sm
                       border border-blue-200/50 transition-all duration-300 overflow-hidden">
                    {/* Pequeña animación de agua */}
                    <motion.div
                      className="absolute bottom-0 w-full h-3 bg-blue-200/30 rounded-t-full"
                      animate={{
                        y: [0, -1, 0],
                        scaleY: [1, 1.2, 1]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />

                    <svg className="h-4 w-4 text-blue-500 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
                      <path d="M20.19 8.84l-4.17-1.39-.84-4.17c-.09-.44-.5-.78-.95-.78s-.86.34-.95.78l-.84 4.17-4.17 1.39c-.44.15-.72.56-.72 1.02s.28.87.72 1.02l4.17 1.39.84 4.17c.09.44.5.78.95.78s.86-.34.95-.78l.84-4.17 4.17-1.39c.44-.15.72-.56.72-1.02s-.28-.87-.72-1.02z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Ahorro</span>
                    <motion.span
                      className="font-semibold text-blue-700 group-hover:text-blue-800 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {savingsCounter}%
                    </motion.span>
                  </div>
                </div>

                {/* Indicador animado en hover */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Versión para móvil de las métricas con mejor diseño */}
            <div className="md:hidden flex items-center px-2 py-1 rounded-full bg-blue-50/80 border border-blue-100 gap-2 text-xs">
              <motion.span
                className="text-blue-700 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {efficacyCounter}%
              </motion.span>
              <span className="text-gray-500">eficacia</span>
            </div>

            {/* Botón de nueva consulta mejorado */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="text-sm bg-gradient-to-r from-blue-500 to-blue-600 
                     hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 
                     rounded-lg shadow-md shadow-blue-400/10 hover:shadow-blue-500/20 
                     transition-all flex items-center gap-2 font-medium relative group overflow-hidden"
              >
                {/* Efecto de ondulación en hover */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <svg className="h-4 w-4 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="12" y1="6" x2="12" y2="14" />
                </svg>
                <span className="relative z-10">Nueva consulta</span>

                {/* Borde sutil */}
                <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none"></div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
