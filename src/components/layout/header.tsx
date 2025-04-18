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

  // Detectar scroll para efectos visuales
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 backdrop-blur-lg border-b",
        scrolled
          ? "bg-white/95 border-blue-200/50 shadow-sm"
          : "bg-gradient-to-r from-white/90 via-white/95 to-white/90 border-blue-100/40"
      )}
    >
      {/* Ondas sutiles animadas en el fondo */}
      <div className="absolute inset-0 overflow-hidden -z-10 opacity-60">
        <svg
          className="absolute bottom-0 left-0 w-full h-8 text-blue-100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="0.2"
            d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,133.3C672,107,768,85,864,96C960,107,1056,149,1152,149.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,133.3C672,107,768,85,864,96C960,107,1056,149,1152,149.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,192C672,213,768,203,864,192C960,181,1056,171,1152,165.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,133.3C672,107,768,85,864,96C960,107,1056,149,1152,149.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              "
            />
          </path>
        </svg>
      </div>

      <div className="container py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo y título con DropletAvatar integrado */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center"
            >
              <DropletAvatar
                size={scrolled ? "sm" : "md"}
                mood="default"
                pulse={false}
                className={cn(
                  "transition-all duration-300",
                  scrolled ? "h-10 w-10" : "h-12 w-12"
                )}
              />

              <div className="ml-3">
                <h1
                  className={cn(
                    "font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-300",
                    scrolled ? "text-2xl" : "text-3xl"
                  )}
                >
                  <span className="relative">
                    H₂O Allegiant
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent"></span>
                  </span>
                  <span className="ml-1 font-light text-blue-600">AI</span>
                </h1>

                <div className="flex items-center flex-wrap gap-3 mt-0.5">
                  <p className="text-sm font-medium text-blue-600">
                    <span className="inline-block">Ingeniero Hidráulico Virtual</span>
                  </p>

                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 px-2 py-0.5 
                      text-blue-700 text-xs rounded-md font-medium shadow-inner border border-blue-200/50">
                    Expert
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Métricas y botones de acción */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Métricas animadas */}
            <div className="hidden md:flex items-center gap-5">
              <div className="group relative p-1 rounded-lg hover:bg-blue-50 transition-colors hover-ripple">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full 
                       flex items-center justify-center shadow-sm
                       border border-blue-200/50 transition-all duration-300">
                    <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></div>
              </div>

              <div className="group relative p-1 rounded-lg hover:bg-blue-50 transition-colors hover-ripple">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full 
                       flex items-center justify-center shadow-sm
                       border border-blue-200/50 transition-all duration-300">
                    <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></div>
              </div>
            </div>

            {/* Versión para móvil de las métricas */}
            <div className="md:hidden flex items-center gap-2 text-xs">
              <span className="text-blue-700 font-medium">{efficacyCounter}%</span>
              <span className="text-gray-500">eficacia</span>
            </div>

            {/* Botón de nueva consulta */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="text-sm bg-gradient-to-r from-blue-500 to-blue-600 
                      hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 
                      rounded-lg shadow-md shadow-blue-400/10 hover:shadow-blue-500/20 
                      transition-all flex items-center gap-2 font-medium"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="12" y1="6" x2="12" y2="14" />
                </svg>
                Nueva consulta
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
