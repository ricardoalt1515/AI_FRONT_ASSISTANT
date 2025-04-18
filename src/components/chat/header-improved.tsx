"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TechWaterAvatar from "../ui/tech-water-avatar";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function HeaderImproved() {
  const [scrolled, setScrolled] = useState(false);
  const [efficiency, setEfficiency] = useState(0);
  const [savedWater, setSavedWater] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

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
      setEfficiency(prev => {
        if (prev >= 99.5) {
          clearInterval(interval1);
          return 99.5;
        }
        return prev + (Math.random() * 1.5);
      });
    }, 100);

    const interval2 = setInterval(() => {
      setSavedWater(prev => {
        if (prev >= 2.5) {
          clearInterval(interval2);
          return 2.5;
        }
        return prev + 0.05;
      });
    }, 80);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div className="relative overflow-hidden z-20">
      {/* Fondo tecnológico con elementos de agua */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid de fondo futurista */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzM4YmRmOCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIwLjUiPjxwYXRoIGQ9Ik0wIDBoNDBNMCA0MGg0ME0wIDFoNDBNMCAyaDQwTTAgM2g0ME0wIDRoNDBNMCA1aDQwTTAgNmg0ME0wIDdoNDBNMCA4aDQwTTAgOWg0ME0wIDEwaDQwTTAgMTFoNDBNMCAxMmg0ME0wIDEzaDQwTTAgMTRoNDBNMCAxNWg0ME0wIDE2aDQwTTAgMTdoNDBNMCAxOGg0ME0wIDE5aDQwTTAgMjBoNDBNMCAyMWg0ME0wIDIyaDQwTTAgMjNoNDBNMCAyNGg0ME0wIDI1aDQwTTAgMjZoNDBNMCAyN2g0ME0wIDI4aDQwTTAgMjloNDBNMCAzMGg0ME0wIDMxaDQwTTAgMzJoNDBNMCAzM2g0ME0wIDM0aDQwTTAgMzVoNDBNMCAzNmg0ME0wIDM3aDQwTTAgMzhoNDBNMCAzOWg0MCIvPjxwYXRoIGQ9Ik0wIDBWNDBNMSAwdjQwTTIgMHY0ME0zIDB2NDBNNCAwdjQwTTUgMHY0ME02IDB2NDBNNyAwdjQwTTggMHY0ME05IDB2NDBNMTAgMHY0ME0xMSAwdjQwTTEyIDB2NDBNMTMgMHY0ME0xNCAwdjQwTTE1IDB2NDBNMTYgMHY0ME0xNyAwdjQwTTE4IDB2NDBNMTkgMHY0ME0yMCAwdjQwTTIxIDB2NDBNMjIgMHY0ME0yMyAwdjQwTTI0IDB2NDBNMjUgMHY0ME0yNiAwdjQwTTI3IDB2NDBNMjggMHY0ME0yOSAwdjQwTTMwIDB2NDBNMzEgMHY0ME0zMiAwdjQwTTMzIDB2NDBNMzQgMHY0ME0zNSAwdjQwTTM2IDB2NDBNMzcgMHY0ME0zOCAwdjQwTTM5IDB2NDAiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-b from-hydrous-50/95 to-white/90"></div>

        {/* Elementos fluidos de fondo */}
        <div className="absolute -top-10 left-1/3 w-64 h-64 rounded-full 
             bg-gradient-to-br from-hydrous-200/10 to-hydrous-300/5 
             filter blur-3xl opacity-70"></div>

        <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full 
             bg-gradient-to-br from-hydrous-300/10 to-hydrous-400/5 
             filter blur-3xl opacity-60"></div>

        {/* Líneas de flujo de datos */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-px 
             bg-gradient-to-r from-transparent via-hydrous-300/30 to-transparent"></div>

        <div className="absolute inset-y-0 left-1/4 w-px 
             bg-gradient-to-b from-transparent via-hydrous-300/20 to-transparent"></div>

        <div className="absolute inset-y-0 right-1/4 w-px 
             bg-gradient-to-b from-transparent via-hydrous-300/20 to-transparent"></div>
      </div>

      <header className={cn(
        "relative transition-all duration-500",
        scrolled
          ? "border-b border-hydrous-200 bg-white/95 backdrop-blur-lg shadow-lg shadow-hydrous-200/5"
          : "bg-transparent"
      )}>
        <div className="container py-3 px-4 sm:px-6 lg:px-8 transition-all duration-500">
          <div className="flex items-center justify-between">
            {/* Logo y título con diseño futurista */}
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className={cn(
                  "transition-all duration-500 flex items-center justify-center rounded-lg overflow-hidden",
                  scrolled ? "h-10 w-10" : "h-12 w-12"
                )}>
                  <TechWaterAvatar
                    size={scrolled ? "sm" : "md"}
                    status="idle"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center">
                  <h1 className={cn(
                    "font-bold bg-clip-text text-transparent bg-gradient-to-r from-hydrous-700 to-hydrous-500 tracking-tight transition-all duration-500",
                    scrolled ? "text-xl" : "text-2xl"
                  )}>
                    H<sub>2</sub>O Allegiant
                  </h1>

                  {/* Etiqueta AI con efecto digital */}
                  <div className={cn(
                    "ml-2 font-mono text-xs font-medium bg-gradient-to-r from-hydrous-600 to-hydrous-500 text-white px-1.5 py-0.5 rounded overflow-hidden relative transition-all duration-500",
                    scrolled ? "text-[10px] py-0.5" : "text-xs py-1"
                  )}>
                    <span className="relative z-10">AI</span>
                    <div className="absolute inset-0 opacity-25">
                      <div className="absolute top-0 left-0 right-0 h-px bg-white/50"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20"></div>

                      {/* Grid tecnológico */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="border-r border-t border-white/10"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción y métricas técnicas */}
                <div className="flex items-center flex-wrap gap-3 mt-0.5">
                  <p className={cn(
                    "text-sm font-medium text-hydrous-600 transition-all duration-300",
                    scrolled ? "text-xs" : "text-sm"
                  )}>
                    <span className="inline-block">Tecnología Avanzada en Tratamiento de Agua</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Métricas de rendimiento y eficiencia con visualizaciones */}
            <div className={cn(
              "hidden md:flex items-center gap-3 transition-all duration-500 overflow-hidden",
              scrolled ? "h-10" : "h-14"
            )}>
              {/* Métrica de eficiencia */}
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg border border-hydrous-100 px-3 py-1 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-hydrous-50 to-hydrous-100 flex items-center justify-center">
                    <EfficiencyIcon className="h-4 w-4 text-hydrous-600" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Eficiencia</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-hydrous-700 font-semibold tabular-nums">{efficiency.toFixed(1)}%</span>
                      <span className="text-[10px] text-green-600">+2.3%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separador vertical */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-hydrous-200 to-transparent"></div>

              {/* Métrica de ahorro de agua */}
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg border border-hydrous-100 px-3 py-1 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-hydrous-50 to-hydrous-100 flex items-center justify-center">
                    <SavedWaterIcon className="h-4 w-4 text-hydrous-600" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Agua Ahorrada</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-hydrous-700 font-semibold tabular-nums">{savedWater.toFixed(1)}M</span>
                      <span className="text-[10px] text-gray-600">m³/día</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel técnico adicional (expandible) */}
              <div className={cn(
                "bg-white/90 backdrop-blur-sm border border-hydrous-100 rounded-lg overflow-hidden transition-all duration-300 flex items-center",
                isExpanded ? "w-56" : "w-10"
              )}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(prev => !prev)}
                  className="h-10 w-10 p-0 rounded-lg text-hydrous-600 flex-shrink-0"
                >
                  <span className="sr-only">{isExpanded ? "Contraer" : "Expandir"} panel</span>
                  {isExpanded ? (
                    <ChevronLeftIcon className="h-5 w-5" />
                  ) : (
                    <MeterIcon className="h-5 w-5" />
                  )}
                </Button>

                {/* Contenido expandible */}
                <div className={cn(
                  "flex items-center gap-3 px-2",
                  isExpanded ? "opacity-100" : "opacity-0"
                )}>
                  <div className="text-xs font-mono">
                    <div className="text-gray-500">Status</div>
                    <div className="text-green-600 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-green-500 rounded-full"></span>
                      Operativo
                    </div>
                  </div>

                  <div className="text-xs font-mono">
                    <div className="text-gray-500">Carga</div>
                    <div className="text-hydrous-600">42%</div>
                  </div>

                  <div className="text-xs font-mono">
                    <div className="text-gray-500">Latencia</div>
                    <div className="text-hydrous-600">126ms</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción principales */}
            <div className="flex items-center gap-2">
              {/* Botón de documentación */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg text-hydrous-700 hover:text-hydrous-800 hover:bg-hydrous-50"
                  >
                    <DocsIcon className="h-5 w-5" />
                    <span className="sr-only">Documentación</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Documentación</p>
                </TooltipContent>
              </Tooltip>

              {/* Botón de ayuda */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg text-hydrous-700 hover:text-hydrous-800 hover:bg-hydrous-50"
                  >
                    <HelpIcon className="h-5 w-5" />
                    <span className="sr-only">Ayuda</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Centro de ayuda</p>
                </TooltipContent>
              </Tooltip>

              {/* Botón de contacto */}
              <Button
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-hydrous-500 to-hydrous-600 
                     hover:from-hydrous-600 hover:to-hydrous-700 text-white rounded-lg 
                     shadow-sm hover:shadow-md transition-all"
              >
                <ContactIcon className="h-4 w-4" />
                <span>Contactar experto</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

// Iconos para el header
function EfficiencyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  );
}

function SavedWaterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M8 15l4-4 4 4" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function MeterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2M12 14l4-4M12 22v-2M6 12H4M20 12h-2M16.95 7.05L15.5 8.5M7.05 7.05l1.45 1.45" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function DocsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
