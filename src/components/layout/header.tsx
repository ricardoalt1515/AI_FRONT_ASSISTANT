"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

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
      setCounter1(prev => {
        if (prev >= 97) {
          clearInterval(interval1);
          return 97;
        }
        return prev + 1;
      });
    }, 20);

    const interval2 = setInterval(() => {
      setCounter2(prev => {
        if (prev >= 36) {
          clearInterval(interval2);
          return 36;
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
    <div className="relative overflow-hidden">
      {/* Fondo dinámico con animación de agua */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r 
             from-hydrous-50/90 via-white/90 to-hydrous-50/90 backdrop-filter backdrop-blur-sm"></div>

        {/* Elementos flotantes de agua */}
        <div className="absolute top-1/2 -translate-y-1/2 left-10 w-96 h-96 
             bg-gradient-to-br from-hydrous-300/10 to-hydrous-400/5 
             rounded-full mix-blend-multiply filter blur-3xl opacity-70 
             animate-water-float"></div>

        <div className="absolute top-0 right-20 w-80 h-80 
             bg-gradient-to-br from-hydrous-500/10 to-hydrous-600/5 
             rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

        {/* Patrón de burbujas pequeñas de agua */}
        <div className="hidden lg:block absolute inset-0">
          <div className="absolute top-[15%] left-[10%] w-3 h-3 
               bg-hydrous-300/20 rounded-full animate-water-float blur-sm"></div>
          <div className="absolute top-[45%] left-[35%] w-2 h-2 
               bg-hydrous-400/30 rounded-full animate-water-float 
               animation-delay-1000 blur-sm"></div>
          <div className="absolute top-[30%] right-[15%] w-4 h-4 
               bg-hydrous-200/20 rounded-full animate-water-float 
               animation-delay-2000 blur-sm"></div>
        </div>
      </div>

      <header className={cn(
        "relative z-10 border-b transition-all duration-500",
        scrolled
          ? "border-hydrous-200 bg-white/90 backdrop-blur-lg shadow-lg shadow-hydrous-200/5"
          : "border-hydrous-100/70 bg-gradient-to-r from-white/80 via-white/90 to-white/80 backdrop-blur-md"
      )}>
        <div className="container py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Logo y título mejorados con animación de agua */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className={cn(
                  "transition-all duration-500 flex items-center justify-center shadow-xl rounded-full overflow-hidden bg-gradient-to-br",
                  scrolled
                    ? "h-12 w-12 from-hydrous-400 to-hydrous-600 shadow-hydrous-400/20"
                    : "h-14 w-14 from-hydrous-300 to-hydrous-500 shadow-hydrous-300/30"
                )}>
                  {/* Animación de olas dentro del logo */}
                  <div className="absolute inset-0 h-full w-full">
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-white/10 rounded-t-full transform-gpu animate-water-sine"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-white/5 rounded-t-full transform-gpu animate-water-sine animation-delay-500"></div>
                  </div>

                  <WaterIcon className={cn(
                    "text-white relative z-10 transition-all duration-500",
                    scrolled ? "h-7 w-7" : "h-8 w-8"
                  )} />
                </div>

                {/* Efecto ripple */}
                <div className="absolute inset-0 rounded-full bg-hydrous-500/20 animate-water-ripple"></div>

                {/* Partículas de agua alrededor del logo */}
                <div className="absolute -top-1 -left-1 h-3 w-3 bg-hydrous-200 
                     rounded-full animate-water-float opacity-60 blur-sm"></div>
                <div className="absolute bottom-0 -right-1 h-2 w-2 bg-hydrous-300 
                     rounded-full animate-water-float animation-delay-1000 opacity-70 blur-sm"></div>
              </div>

              <div>
                <h1 className={cn(
                  "font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-hydrous-700 to-hydrous-500 transition-all duration-500",
                  scrolled ? "text-2xl" : "text-3xl"
                )}>
                  <span className="relative">
                    H<sub>2</sub>O Allegiant
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-hydrous-500/50 to-transparent"></span>
                  </span>
                  <span className="ml-1 font-light text-hydrous-600">AI</span>
                </h1>

                <div className="flex items-center flex-wrap gap-3 mt-1">
                  <p className="text-sm font-medium text-hydrous-600">
                    <span className="inline-block">Water Solution Designer</span>
                  </p>

                  <div className="bg-gradient-to-r from-hydrous-100 to-hydrous-200 px-2 py-0.5 
                       text-hydrous-700 text-xs rounded-md font-medium shadow-inner shadow-hydrous-300/10">
                    Expert
                  </div>

                  {/* Métricas de credibilidad con animación de conteo */}
                  <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500">
                    <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                    <div className="flex items-center gap-1 hover:text-hydrous-700 transition-colors group">
                      <span className="text-hydrous-700 font-medium">{counter1}%</span>
                      <span className="group-hover:underline">precisión técnica</span>
                    </div>

                    <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                    <div className="flex items-center gap-1 hover:text-hydrous-700 transition-colors group">
                      <span className="text-hydrous-700 font-medium">{counter2}%</span>
                      <span className="group-hover:underline">ahorro promedio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Métricas de confianza para desktop con efectos de hover */}
            <div className="hidden md:flex items-center gap-5 mt-2 sm:mt-0">
              <div className="flex items-center gap-3 text-sm group">
                <div className="h-10 w-10 bg-gradient-to-br from-hydrous-50 to-hydrous-100 rounded-full 
                      flex items-center justify-center shadow-md group-hover:shadow-hydrous-200/30
                      border border-hydrous-200/50 group-hover:border-hydrous-300/70 transition-all">
                  <CertificateIcon className="h-5 w-5 text-hydrous-600 group-hover:text-hydrous-700 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs group-hover:text-gray-600 transition-colors">Certificado</span>
                  <span className="font-semibold text-gray-700 group-hover:text-hydrous-800 transition-colors">
                    ISO 14001
                  </span>
                </div>
              </div>

              <div className="h-10 w-px bg-gradient-to-b from-transparent via-hydrous-200/50 to-transparent"></div>

              <div className="flex items-center gap-3 text-sm group">
                <div className="h-10 w-10 bg-gradient-to-br from-hydrous-50 to-hydrous-100 rounded-full 
                      flex items-center justify-center shadow-md group-hover:shadow-hydrous-200/30
                      border border-hydrous-200/50 group-hover:border-hydrous-300/70 transition-all">
                  <ProjectIcon className="h-5 w-5 text-hydrous-600 group-hover:text-hydrous-700 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs group-hover:text-gray-600 transition-colors">Proyectos</span>
                  <span className="font-semibold text-gray-700 group-hover:text-hydrous-800 transition-colors">
                    500+
                  </span>
                </div>
              </div>

              {/* Botón de contacto con efecto de brillo */}
              <div className="ml-3 hidden lg:block">
                <button className="text-sm bg-gradient-to-r from-hydrous-500 to-hydrous-600 
                       hover:from-hydrous-600 hover:to-hydrous-700 text-white px-4 py-2.5 
                       rounded-lg shadow-lg shadow-hydrous-400/10 hover:shadow-hydrous-500/20 transition-all 
                       flex items-center gap-2 font-medium">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  Contactar experto
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

// Íconos para el header
function CertificateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function ProjectIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function WaterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}
