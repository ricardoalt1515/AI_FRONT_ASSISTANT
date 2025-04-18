"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TechWaterAvatar from "../ui/tech-water-avatar";

interface TypingIndicatorProps {
  avatar?: React.ReactNode;
}

export default function TypingIndicator({ avatar }: TypingIndicatorProps) {
  return (
    <Card className="inline-flex items-center px-4 py-3 max-w-md 
         bg-white/80 border-hydrous-100 rounded-2xl rounded-tl-sm shadow-sm
         backdrop-blur-sm relative overflow-hidden group">
      {/* Efecto de fondo tecnológico animado */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-hydrous-200/30 via-transparent to-hydrous-200/30"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hydrous-400/30 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hydrous-400/30 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-hydrous-400/30 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-hydrous-400/30 to-transparent"></div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        {/* Avatar tecnológico con estado "thinking" */}
        {avatar || (
          <div className="relative h-8 w-8">
            <TechWaterAvatar status="thinking" size="sm" />
          </div>
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm text-hydrous-700 font-medium">Analizando datos</span>

            {/* Indicador técnico de procesamiento */}
            <div className="bg-hydrous-100/80 text-hydrous-600 text-[10px] px-1.5 py-0.5 rounded font-mono">
              RUN
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            {/* Barras de progreso con "flujo de datos" */}
            <div className="flex space-x-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 w-6 rounded-sm bg-gradient-to-r from-hydrous-300 to-hydrous-400 opacity-0",
                    "animate-pulse-subtle",
                  )}
                  style={{
                    animationDelay: `${i * 150}ms`,
                    animationDuration: "1.5s"
                  }}
                ></div>
              ))}
            </div>

            {/* Contador de procesamiento */}
            <div className="text-xs text-hydrous-500 font-mono ml-1 opacity-70">
              <span className="inline-block w-7 text-right tabular-nums">
                {Math.floor(Date.now() / 1000) % 100}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Partículas tecnológicas (simulando procesamiento) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-0.5 bg-hydrous-400 rounded-full opacity-0 animate-water-float"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s"
            }}
          ></div>
        ))}
      </div>
    </Card>
  );
}
