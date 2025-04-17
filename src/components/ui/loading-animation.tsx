"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoadingAnimationProps {
  message?: string;
  className?: string;
}

export default function LoadingAnimation({
  message = "Inicializando H₂O Allegiant AI...",
  className
}: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);

  // Animación de progreso simulada
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {/* Container del logo con efecto 3D */}
      <div className="relative mb-6">
        {/* Sombra del logo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-hydrous-300 to-hydrous-500 rounded-full opacity-30 blur-xl"></div>

        {/* Logo principal */}
        <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-hydrous-300 to-hydrous-600 
             shadow-[0_10px_40px_-15px_rgba(14,165,233,0.9)] flex items-center justify-center overflow-hidden">

          {/* Animación de olas de agua dentro del logo */}
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/10 rounded-t-full transform-gpu animate-water-sine"></div>
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/15 rounded-t-full transform-gpu animate-water-sine animation-delay-500"></div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-white/5 rounded-t-full transform-gpu animate-water-sine animation-delay-1000"></div>
          </div>

          {/* Ícono de agua central */}
          <svg className="h-16 w-16 text-white relative z-10 drop-shadow-[0_2px_5px_rgba(255,255,255,0.5)]"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>

          {/* Partículas flotantes */}
          <div className="absolute top-1/3 left-1/4 h-2 w-2 bg-white/60 rounded-full animate-water-float"></div>
          <div className="absolute bottom-1/4 right-1/4 h-3 w-3 bg-white/40 rounded-full animate-water-float animation-delay-700"></div>
        </div>

        {/* Anillo de efecto ripple */}
        <div className="absolute inset-0 rounded-full bg-hydrous-400/40 animate-water-ripple"></div>

        {/* Partículas alrededor */}
        <div className="absolute -top-5 -left-3 h-8 w-8 bg-hydrous-200/50 rounded-full animate-water-float blur-sm"></div>
        <div className="absolute bottom-0 -right-6 h-10 w-10 bg-hydrous-300/40 rounded-full animate-water-float animation-delay-1000 blur-sm"></div>
        <div className="absolute top-1/2 left-[-20px] h-6 w-6 bg-hydrous-400/30 rounded-full animate-water-float animation-delay-1500 blur-sm"></div>
      </div>

      {/* Mensaje con efecto de brillo */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-hydrous-200/20 via-hydrous-300/10 to-hydrous-200/20 blur-xl rounded-full"></div>
        <p className="relative text-xl text-hydrous-800 font-medium px-8 py-3 bg-white/80 backdrop-blur-md 
             rounded-full shadow-lg border border-hydrous-200 mb-6">
          {message}
        </p>
      </div>

      {/* Barra de progreso con efecto de agua */}
      <div className="w-64 relative">
        <div className="h-2.5 bg-gradient-to-r from-hydrous-50 to-white rounded-full overflow-hidden 
             shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] border border-hydrous-100">
          <div
            className="h-full bg-gradient-to-r from-hydrous-300 via-hydrous-400 to-hydrous-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Brillo superior */}
          <div className="absolute inset-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full"></div>
        </div>

        {/* Porcentaje numérico */}
        <div className="mt-2 flex justify-between text-xs text-hydrous-600">
          <span>Cargando recursos</span>
          <span className="font-medium">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
