"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface TechInfoPanelProps {
  className?: string;
}

export default function TechInfoPanel({ className }: TechInfoPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'capabilities' | 'specs' | 'stats'>('capabilities');
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  // Simulación de métricas en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.min(100, Math.max(10, cpuUsage + (Math.random() * 10 - 5))));
      setMemoryUsage(Math.min(100, Math.max(20, memoryUsage + (Math.random() * 8 - 4))));
      setRequestCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, [cpuUsage, memoryUsage]);

  // Inicialización de valores
  useEffect(() => {
    setCpuUsage(35 + Math.random() * 10);
    setMemoryUsage(45 + Math.random() * 15);
    setRequestCount(1024 + Math.floor(Math.random() * 200));
  }, []);

  return (
    <div className={cn(
      "fixed right-0 top-1/2 -translate-y-1/2 z-30 transition-all duration-500 ease-in-out",
      isOpen ? "translate-x-0" : "translate-x-[calc(100%-40px)]",
      className
    )}>
      {/* Botón para abrir/cerrar el panel */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(prev => !prev)}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 -left-10 h-20 w-10 rounded-l-xl rounded-r-none",
          "bg-gradient-to-b from-hydrous-500 to-hydrous-600 text-white",
          "border-l border-y border-hydrous-600/50 shadow-lg shadow-hydrous-400/10",
          "hover:from-hydrous-600 hover:to-hydrous-700 transition-all duration-300"
        )}
      >
        <span className="sr-only">{isOpen ? "Cerrar" : "Abrir"} panel de información</span>
        <div className="flex flex-col items-center justify-center h-full">
          {isOpen ? (
            <>
              <ChevronRightIcon className="h-5 w-5 mb-1" />
              <div className="text-[10px] font-mono rotate-90 origin-center translate-y-3">CERRAR</div>
            </>
          ) : (
            <>
              <InfoIcon className="h-5 w-5 mb-1" />
              <div className="text-[10px] font-mono rotate-90 origin-center translate-y-1">INFO</div>
            </>
          )}
        </div>
      </Button>

      {/* Panel principal */}
      <div className={cn(
        "w-80 rounded-l-xl border-l border-t border-b border-hydrous-200 shadow-lg",
        "bg-white/90 backdrop-blur-md overflow-hidden transition-all duration-500",
        "flex flex-col h-[600px] max-h-[80vh]"
      )}>
        {/* Header del panel */}
        <div className="bg-gradient-to-r from-hydrous-500 to-hydrous-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <WaterIcon className="h-5 w-5" />
              <span>H<sub>2</sub>O Allegiant AI</span>
            </h3>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 bg-green-400 rounded-full"></span>
              <span className="text-xs">En línea</span>
            </div>
          </div>
          <div className="text-xs mt-1 text-hydrous-100">
            Sistema de Inteligencia para Soluciones Hídricas
          </div>

          {/* Tabs de navegación */}
          <div className="flex mt-4 border-b border-hydrous-400">
            <button
              className={cn(
                "px-3 py-1.5 text-sm transition-colors",
                activeTab === 'capabilities'
                  ? "border-b-2 border-white text-white font-medium"
                  : "text-hydrous-100 hover:text-white"
              )}
              onClick={() => setActiveTab('capabilities')}
            >
              Capacidades
            </button>
            <button
              className={cn(
                "px-3 py-1.5 text-sm transition-colors",
                activeTab === 'specs'
                  ? "border-b-2 border-white text-white font-medium"
                  : "text-hydrous-100 hover:text-white"
              )}
              onClick={() => setActiveTab('specs')}
            >
              Specs
            </button>
            <button
              className={cn(
                "px-3 py-1.5 text-sm transition-colors",
                activeTab === 'stats'
                  ? "border-b-2 border-white text-white font-medium"
                  : "text-hydrous-100 hover:text-white"
              )}
              onClick={() => setActiveTab('stats')}
            >
              Estadísticas
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'capabilities' && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-hydrous-700 border-b border-hydrous-100 pb-1">
                Capacidades del Sistema
              </h4>

              <div className="space-y-3">
                {capabilities.map((capability, i) => (
                  <CapabilityItem key={i} {...capability} />
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-hydrous-700 border-b border-hydrous-100 pb-1 mb-3">
                  Integraciones
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  {integrations.map((integration, i) => (
                    <IntegrationIcon key={i} {...integration} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-hydrous-700 border-b border-hydrous-100 pb-1">
                Especificaciones Técnicas
              </h4>

              <div className="space-y-3">
                <SpecItem
                  icon={<ModelIcon />}
                  name="Modelo"
                  value="H2O-AquaLogic 3.5"
                  detail="Base GPT-4o Turbo"
                />
                <SpecItem
                  icon={<ContextIcon />}
                  name="Contexto"
                  value="128K tokens"
                  detail="Extensible a documentos"
                />
                <SpecItem
                  icon={<LanguageIcon />}
                  name="Idiomas"
                  value="Multilingüe"
                  detail="26 idiomas soportados"
                />
                <SpecItem
                  icon={<DataIcon />}
                  name="Base técnica"
                  value="2024.1"
                  detail="Normativas actualizadas"
                />
                <SpecItem
                  icon={<CalculationIcon />}
                  name="Análisis técnico"
                  value="Avanzado"
                  detail="Cálculos hidráulicos precisos"
                />
                <SpecItem
                  icon={<SecurityIcon />}
                  name="Seguridad"
                  value="Nivel empresarial"
                  detail="ISO 27001 certificado"
                />
              </div>

              <div className="mt-4 rounded-lg border border-hydrous-100 p-3 bg-hydrous-50/50">
                <div className="text-xs text-hydrous-700 font-medium mb-1">Status de operación:</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Tiempo activo:</span>
                  <span className="font-mono text-hydrous-700">182d 14h 23m</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Ciclo de actualización:</span>
                  <span className="font-mono text-hydrous-700">3d 7h 45m</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Región:</span>
                  <span className="font-mono text-hydrous-700">EU-West-01</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-hydrous-700 border-b border-hydrous-100 pb-1">
                Estadísticas en Tiempo Real
              </h4>

              <div className="space-y-3">
                {/* CPU Usage */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600 flex items-center gap-1">
                      <CpuIcon className="h-3 w-3" />
                      CPU
                    </span>
                    <span className="font-mono text-hydrous-700">{cpuUsage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700",
                        cpuUsage < 50 ? "bg-green-500" :
                          cpuUsage < 80 ? "bg-yellow-500" : "bg-red-500"
                      )}
                      style={{ width: `${cpuUsage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Memory Usage */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600 flex items-center gap-1">
                      <MemoryIcon className="h-3 w-3" />
                      Memoria
                    </span>
                    <span className="font-mono text-hydrous-700">{memoryUsage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-hydrous-500 rounded-full transition-all duration-700"
                      style={{ width: `${memoryUsage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Request counter with timeline */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Solicitudes procesadas</span>
                    <span className="font-mono text-hydrous-700">{requestCount.toLocaleString()}</span>
                  </div>

                  <div className="border border-hydrous-100 rounded-lg p-3 bg-hydrous-50/50 mt-2">
                    <div className="text-xs font-medium text-hydrous-700 mb-2">Actividad reciente</div>

                    {/* Mini timeline */}
                    <div className="relative h-16">
                      {/* Timeline line */}
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-hydrous-200/70"></div>

                      {/* Timeline events */}
                      {timelineEvents.map((event, i) => (
                        <div key={i} className="absolute left-0 flex items-center gap-2" style={{ top: `${i * 25}%` }}>
                          <div className="h-2 w-2 rounded-full bg-hydrous-500 border-2 border-white"></div>
                          <div className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-hydrous-100 shadow-sm">
                            <span className="font-mono text-gray-500">{event.time}</span>
                            <span className="mx-1.5 text-gray-300">|</span>
                            <span className="text-hydrous-700">{event.action}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer del panel */}
        <div className="p-3 border-t border-hydrous-100 bg-hydrous-50/80 text-xs text-gray-500 flex justify-between items-center">
          <div className="font-mono flex items-center gap-1">
            <span className="h-1.5 w-1.5 bg-green-400 rounded-full"></span>
            <span>v3.5.2</span>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0 text-gray-500 hover:text-hydrous-700 hover:bg-white">
                  <RefreshIcon className="h-3.5 w-3.5" />
                  <span className="sr-only">Actualizar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Actualizar información</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0 text-gray-500 hover:text-hydrous-700 hover:bg-white">
                  <SettingsIcon className="h-3.5 w-3.5" />
                  <span className="sr-only">Configuración</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configuración del panel</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

// Elemento para cada capacidad del sistema
function CapabilityItem({
  icon,
  name,
  description,
  level
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  level: number;  // 1-5
}) {
  return (
    <div className="flex gap-3">
      <div className="h-8 w-8 bg-gradient-to-br from-hydrous-100 to-hydrous-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium text-hydrous-800">{name}</h5>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 w-3 rounded-full mx-0.5",
                  i < level ? "bg-hydrous-500" : "bg-gray-200"
                )}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

// Elemento para cada especificación técnica
function SpecItem({
  icon,
  name,
  value,
  detail
}: {
  icon: React.ReactNode;
  name: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg border border-hydrous-100 p-2.5 shadow-sm">
      <div className="h-8 w-8 bg-gradient-to-br from-hydrous-50 to-hydrous-100 rounded-lg flex items-center justify-center text-hydrous-600">
        {icon}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h5 className="text-sm font-medium text-gray-700">{name}</h5>
          <span className="bg-hydrous-100/50 text-hydrous-700 text-[10px] px-1.5 py-0.5 rounded font-mono">
            {value}
          </span>
        </div>
        <p className="text-xs text-gray-500">{detail}</p>
      </div>
    </div>
  );
}

// Elemento para cada integración
function IntegrationIcon({
  icon,
  name
}: {
  icon: React.ReactNode;
  name: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-hydrous-50 transition-colors">
          <div className="h-8 w-8 bg-white rounded-lg border border-hydrous-100 flex items-center justify-center shadow-sm text-hydrous-700">
            {icon}
          </div>
          <span className="text-[10px] text-gray-600 mt-1 truncate w-full text-center">{name}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Integración con {name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

// Datos de ejemplo
const capabilities = [
  {
    icon: <AnalysisIcon className="h-4 w-4 text-hydrous-600" />,
    name: "Análisis Técnico",
    description: "Evaluación de parámetros de agua y necesidades",
    level: 5
  },
  {
    icon: <SolutionIcon className="h-4 w-4 text-hydrous-600" />,
    name: "Diseño de Soluciones",
    description: "Propuesta de sistemas personalizados",
    level: 5
  },
  {
    icon: <BudgetIcon className="h-4 w-4 text-hydrous-600" />,
    name: "Presupuestos",
    description: "Estimación precisa de costos y ROI",
    level: 4
  },
  {
    icon: <ComplianceIcon className="h-4 w-4 text-hydrous-600" />,
    name: "Cumplimiento Normativo",
    description: "Validación según normativas actuales",
    level: 5
  },
  {
    icon: <DocumentIcon className="h-4 w-4 text-hydrous-600" />,
    name: "Documentación",
    description: "Generación de propuestas técnicas en PDF",
    level: 4
  }
];

const integrations = [
  { icon: <FileIcon className="h-4 w-4" />, name: "Excel" },
  { icon: <PdfIcon className="h-4 w-4" />, name: "PDF" },
  { icon: <DatabaseIcon className="h-4 w-4" />, name: "SQL" },
  { icon: <ChartIcon className="h-4 w-4" />, name: "Gráficas" },
  { icon: <CalendarIcon className="h-4 w-4" />, name: "Calendario" },
  { icon: <MapIcon className="h-4 w-4" />, name: "GIS" }
];

const timelineEvents = [
  { time: "12:45:22", action: "Consulta procesada" },
  { time: "12:42:17", action: "Archivo analizado" },
  { time: "12:35:08", action: "Conversación iniciada" },
  { time: "12:30:51", action: "Sistema actualizado" }
];

// Iconos
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function WaterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// Iconos de capacidades
function AnalysisIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

function SolutionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10M12 20V4M6 20v-6" />
      <path d="M6 9l6-6 6 6" />
    </svg>
  );
}

function BudgetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function ComplianceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4" />
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
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

// Iconos de especificaciones
function ModelIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function ContextIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function LanguageIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function DataIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5c0-1.66-4-3-9-3s-9 1.34-9 3z" />
      <path d="M3 12v7c0 1.66 4 3 9 3s9-1.34 9-3v-7" />
    </svg>
  );
}

function CalculationIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}

function SecurityIcon({ className }: { className?: string }) {
  return (
    <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// Iconos de integración
function FileIcon({ className }: { className?: string }) {
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

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15h6M9 11h6M9 19h6" />
    </svg>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

// Iconos de estadísticas
function CpuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function MemoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
      <path d="M22 10H2M22 14H2M6 6v12M10 6v12M14 6v12M18 6v12" />
    </svg>
  );
}
