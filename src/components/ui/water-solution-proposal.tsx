"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SolutionFeature {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface TechnicalParameter {
  name: string;
  before: number;
  after: number;
  unit: string;
  improvement: "up" | "down"; // Si "up" es mejor, o "down" es mejor
}

interface SolutionBenefit {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

interface WaterSolutionProposalProps {
  title: string;
  description?: string;
  features: SolutionFeature[];
  technicalParameters: TechnicalParameter[];
  benefits: SolutionBenefit[];
  roi?: {
    investment: number;
    annualSavings: number;
    paybackPeriodMonths: number;
  };
  className?: string;
  onDownload?: () => void;
}

/**
 * Componente avanzado para mostrar propuestas de soluciones de agua
 * con visualizaciones técnicas elegantes
 */
export default function WaterSolutionProposal({
  title,
  description,
  features,
  technicalParameters,
  benefits,
  roi,
  className,
  onDownload
}: WaterSolutionProposalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'technical' | 'benefits'>('features');

  // Activar animaciones cuando el componente es visible
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Formatear números como moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "rounded-xl overflow-hidden bg-white border border-blue-200 shadow-lg",
        className
      )}
    >
      {/* Header con efecto de agua */}
      <div className="relative p-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
        {/* Ondas decorativas */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <svg
            className="absolute bottom-0 left-0 w-full h-32"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              fillOpacity="0.3"
              d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,149.3C840,149,960,171,1080,165.3C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Burbujas decorativas */}
        <motion.div
          className="absolute top-5 right-5 w-3 h-3 bg-white/20 rounded-full"
          animate={{
            y: [-5, -15, -5],
            opacity: [0.2, 0, 0.2]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-5 left-10 w-2 h-2 bg-white/30 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Contenido del header */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {description && <p className="text-blue-50">{description}</p>}
        </div>
      </div>

      {/* Navegación entre secciones */}
      <div className="flex border-b border-blue-100">
        <button
          onClick={() => setActiveTab('features')}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
            activeTab === 'features'
              ? "text-blue-700 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
          )}
        >
          Características
          {activeTab === 'features' && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              initial={false}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('technical')}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
            activeTab === 'technical'
              ? "text-blue-700 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
          )}
        >
          Parámetros Técnicos
          {activeTab === 'technical' && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              initial={false}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('benefits')}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
            activeTab === 'benefits'
              ? "text-blue-700 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
          )}
        >
          Beneficios
          {activeTab === 'benefits' && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              initial={false}
            />
          )}
        </button>
      </div>

      {/* Contenido principal */}
      <div className="p-5">
        {/* Características de la solución */}
        {activeTab === 'features' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex gap-3 p-3 rounded-lg border border-blue-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">{feature.name}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Parámetros técnicos */}
        {activeTab === 'technical' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {technicalParameters.map((param, index) => {
              const improvement = param.improvement === 'down'
                ? ((param.before - param.after) / param.before) * 100
                : ((param.after - param.before) / param.before) * 100;

              const isPositive =
                (param.improvement === 'down' && param.after < param.before) ||
                (param.improvement === 'up' && param.after > param.before);

              const improvementText = isPositive
                ? `${Math.abs(improvement).toFixed(0)}% de mejora`
                : "Sin cambio significativo";

              const barColorClass = isPositive
                ? "bg-gradient-to-r from-green-300 to-green-500"
                : "bg-gradient-to-r from-blue-300 to-blue-500";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="border border-blue-100 rounded-lg p-4 bg-white"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-blue-800">{param.name}</h3>
                    {isPositive && (
                      <span className="text-sm font-medium text-green-600 flex items-center">
                        <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {param.improvement === 'down' ? (
                            <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          ) : (
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          )}
                        </svg>
                        {improvementText}
                      </span>
                    )}
                  </div>

                  {/* Visualización de antes vs después */}
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1">Antes</div>
                      <div className="text-lg font-semibold text-gray-700">
                        {param.before} {param.unit}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                      <div className="text-sm text-blue-600 mb-1">Después</div>
                      <div className="text-lg font-semibold text-blue-700">
                        {param.after} {param.unit}
                      </div>
                    </div>
                  </div>

                  {/* Barra de comparación */}
                  <div className="mt-3">
                    <div className="relative h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                      {param.improvement === 'down' ? (
                        <>
                          {/* Para parámetros donde menos es mejor */}
                          <div className={`absolute inset-y-0 left-0 ${barColorClass} rounded-full`}
                            style={{ width: `${(param.after / param.before) * 100}%` }}></div>
                          <div className="absolute inset-y-0 left-0 right-0 bg-gray-400/30 rounded-full"></div>
                        </>
                      ) : (
                        <>
                          {/* Para parámetros donde más es mejor */}
                          <div className="absolute inset-y-0 left-0 bg-gray-400/30 rounded-full"
                            style={{ width: `${(param.before / (param.after > param.before ? param.after : param.before)) * 100}%` }}></div>
                          <div className={`absolute inset-y-0 left-0 ${barColorClass} rounded-full`}
                            style={{ width: `${(param.after / (param.after > param.before ? param.after : param.before)) * 100}%` }}></div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Beneficios */}
        {activeTab === 'benefits' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col border border-blue-100 rounded-lg overflow-hidden"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-100 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                      {benefit.icon}
                    </div>
                    <h3 className="font-medium text-blue-800">{benefit.title}</h3>
                  </div>

                  <div className="p-4 flex flex-col items-center text-center">
                    <div className="text-2xl font-bold text-blue-700 mb-2">{benefit.value}</div>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ROI (Retorno de Inversión) */}
            {roi && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 p-4 border border-green-100 bg-gradient-to-r from-green-50 to-white rounded-lg"
              >
                <h3 className="text-lg font-semibold text-green-800 mb-3">Retorno de Inversión</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-white rounded-lg border border-green-100 text-center">
                    <div className="text-sm text-gray-500 mb-1">Inversión Inicial</div>
                    <div className="text-xl font-bold text-gray-800">{formatCurrency(roi.investment)}</div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-green-100 text-center">
                    <div className="text-sm text-gray-500 mb-1">Ahorro Anual</div>
                    <div className="text-xl font-bold text-green-700">{formatCurrency(roi.annualSavings)}</div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-green-100 text-center">
                    <div className="text-sm text-gray-500 mb-1">Período de Recuperación</div>
                    <div className="text-xl font-bold text-blue-700">{roi.paybackPeriodMonths} meses</div>
                  </div>
                </div>

                {/* Visualización de ROI */}
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Progreso de recuperación</span>
                    <span className="text-green-700">{roi.paybackPeriodMonths} de 36 meses</span>
                  </div>

                  <div className="h-3 bg-gray-100 rounded-full w-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (roi.paybackPeriodMonths / 36) * 100)}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-green-300 to-green-500 rounded-full"
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center p-1.5 px-3 rounded-full bg-green-100 text-green-800 text-sm">
                      <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Inversión recomendada
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer con botón de descarga */}
      <div className="border-t border-blue-100 p-4 bg-blue-50/50 flex justify-between items-center">
        <div className="text-sm text-blue-700">
          Propuesta generada por H₂O Allegiant AI
        </div>

        {onDownload && (
          <Button
            onClick={onDownload}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm"
          >
            <svg className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Descargar PDF
          </Button>
        )}
      </div>
    </motion.div>
  );
}
