"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Parameter {
  name: string;
  value: number;
  unit: string;
  max: number;
  ideal?: [number, number]; // Rango ideal [min, max]
  description?: string;
  color?: "blue" | "green" | "yellow" | "red";
}

interface WaterParameterDisplayProps {
  parameters: Parameter[];
  title?: string;
  className?: string;
  description?: string;
}

/**
 * Componente especializado para mostrar parámetros técnicos de agua
 * con visualizaciones dinámicas
 */
export default function WaterParameterDisplay({
  parameters,
  title = "Parámetros de Calidad del Agua",
  description,
  className
}: WaterParameterDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar animación solo cuando el componente está en la vista
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Determinar el color basado en el valor y los rangos ideales
  const getColorClass = (param: Parameter) => {
    // Si ya viene con un color específico, usarlo
    if (param.color) {
      return {
        bg: `bg-${param.color}-500`,
        from: `from-${param.color}-300`,
        to: `to-${param.color}-500`
      };
    }

    // Calcular el porcentaje respecto al máximo
    const percentage = (param.value / param.max) * 100;

    // Verificar si está dentro del rango ideal
    if (param.ideal) {
      const [min, max] = param.ideal;
      const isIdeal = param.value >= min && param.value <= max;

      if (isIdeal) {
        return {
          bg: "bg-green-500",
          from: "from-green-300",
          to: "to-green-500"
        };
      }
    }

    // Por porcentaje si no hay rango ideal o está fuera de él
    if (percentage <= 30) {
      return {
        bg: "bg-blue-500",
        from: "from-blue-300",
        to: "to-blue-500"
      };
    } else if (percentage <= 60) {
      return {
        bg: "bg-green-500",
        from: "from-green-300",
        to: "to-green-500"
      };
    } else if (percentage <= 85) {
      return {
        bg: "bg-yellow-500",
        from: "from-yellow-300",
        to: "to-yellow-500"
      };
    } else {
      return {
        bg: "bg-red-500",
        from: "from-red-300",
        to: "to-red-500"
      };
    }
  };

  // Obtener etiqueta de estado basada en porcentaje
  const getStatusLabel = (param: Parameter) => {
    const percentage = (param.value / param.max) * 100;

    if (param.ideal) {
      const [min, max] = param.ideal;
      if (param.value >= min && param.value <= max) return "Óptimo";
      if (param.value < min) return "Bajo";
      if (param.value > max) return "Elevado";
    }

    if (percentage <= 30) return "Bajo";
    if (percentage <= 60) return "Moderado";
    if (percentage <= 85) return "Elevado";
    return "Crítico";
  };

  return (
    <div className={cn(
      "p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-hydrous-200",
      "shadow-sm hover:shadow-md transition-shadow duration-300",
      className
    )}>
      {/* Título del panel */}
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-hydrous-400 to-hydrous-600 flex-shrink-0"></div>
          <h3 className="text-base font-medium text-hydrous-800">{title}</h3>
        </div>
      )}

      {/* Descripción opcional */}
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}

      {/* Lista de parámetros */}
      <div className="space-y-4">
        {parameters.map((param, index) => {
          const colorClasses = getColorClass(param);
          const percentValue = Math.min(100, Math.max(0, (param.value / param.max) * 100));

          return (
            <div key={index} className="relative">
              {/* Cabecera del parámetro */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    colorClasses.bg
                  )}></div>
                  <span className="text-sm font-medium text-gray-800">{param.name}</span>

                  {/* Icono de información con tooltip */}
                  {param.description && (
                    <div className="group relative inline-block">
                      <div className="h-4 w-4 rounded-full bg-gray-200 flex items-center justify-center cursor-help">
                        <span className="text-xs text-gray-600">i</span>
                      </div>
                      <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 w-48
                           bg-white rounded-md shadow-lg border border-gray-200
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           transition-all duration-200 text-xs text-gray-600">
                        {param.description}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white"></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-hydrous-800 font-semibold text-sm">{param.value}</span>
                  <span className="text-gray-500 text-xs">{param.unit}</span>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="h-2.5 bg-gray-100 rounded-full w-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: isVisible ? `${percentValue}%` : "0%" }}
                  transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r",
                    colorClasses.from,
                    colorClasses.to
                  )}
                ></motion.div>
              </div>

              {/* Rango ideal (si está definido) */}
              {param.ideal && (
                <div className="mt-1 relative h-0.5">
                  <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                  <div
                    className="absolute h-full bg-green-200 rounded-full"
                    style={{
                      left: `${(param.ideal[0] / param.max) * 100}%`,
                      width: `${((param.ideal[1] - param.ideal[0]) / param.max) * 100}%`
                    }}
                  ></div>

                  {/* Marcador de valor actual */}
                  <div
                    className={cn(
                      "absolute w-1.5 h-3 -mt-0.5 rounded-sm",
                      colorClasses.bg
                    )}
                    style={{ left: `calc(${percentValue}% - 3px)` }}
                  ></div>
                </div>
              )}

              {/* Leyenda inferior */}
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>0</span>
                <span className={cn(
                  "font-medium",
                  colorClasses.bg.replace("bg-", "text-").replace("-500", "-700")
                )}>
                  {getStatusLabel(param)}
                </span>
                <span>{param.max} {param.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pequeñas burbujas decorativas */}
      <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-hydrous-200/60 animate-water-float"></div>
      <div className="absolute bottom-4 right-6 h-1.5 w-1.5 rounded-full bg-hydrous-300/40 animate-water-float animation-delay-500"></div>
      <div className="absolute top-1/2 left-3 h-1.5 w-1.5 rounded-full bg-hydrous-400/30 animate-water-float animation-delay-1000"></div>
    </div>
  );
}
