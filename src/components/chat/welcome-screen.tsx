"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface WelcomeScreenProps {
  onStartConversation: (message: string) => void;
}

export default function WelcomeScreen({ onStartConversation }: WelcomeScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [counters, setCounters] = useState({ reduction: 0, savings: 0, compliance: 0 });

  // Animación para contadores
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCounters(prev => ({
        ...prev,
        reduction: prev.reduction >= 85 ? 85 : prev.reduction + 1
      }));
    }, 30);

    const interval2 = setInterval(() => {
      setCounters(prev => ({
        ...prev,
        savings: prev.savings >= 36 ? 36 : prev.savings + 1
      }));
    }, 60);

    const interval3 = setInterval(() => {
      setCounters(prev => ({
        ...prev,
        compliance: prev.compliance >= 100 ? 100 : prev.compliance + 2
      }));
    }, 25);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  // Animación para iniciar cuando está listo
  const handleBeginConsultation = () => {
    if (selectedOption) {
      onStartConversation(selectedOption);
    } else {
      onStartConversation("Hola, necesito ayuda con un proyecto de tratamiento de agua.");
    }
  };

  return (
    <div className="relative h-full flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      {/* Fondos y elementos decorativos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-blue-50/80 via-hydrous-50/30 to-white"></div>

        {/* Círculos decorativos con blur */}
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full 
             bg-gradient-to-br from-blue-100/30 to-hydrous-200/20 
             filter blur-3xl opacity-80"></div>
        <div className="absolute bottom-40 right-10 w-[500px] h-[500px] rounded-full 
             bg-gradient-to-br from-hydrous-200/20 to-hydrous-400/10 
             filter blur-3xl opacity-70"></div>

        {/* Partículas de agua decorativas */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-hydrous-300/70 rounded-full animate-water-float"></div>
        <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-hydrous-200/60 rounded-full animate-water-float animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-hydrous-400/50 rounded-full animate-water-float animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl w-full space-y-10 z-10">
        {/* Logo y título con animaciones mejoradas */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-hydrous-300 to-hydrous-600 
                   flex items-center justify-center shadow-2xl shadow-hydrous-400/30 overflow-hidden">
                {/* Efecto de agua dentro del logo */}
                <div className="absolute inset-0 h-full w-full overflow-hidden">
                  <div className="absolute bottom-0 w-full h-20 bg-white/10 rounded-t-full transform-gpu animate-water-sine"></div>
                  <div className="absolute bottom-0 w-full h-12 bg-white/10 rounded-t-full transform-gpu animate-water-sine animation-delay-500"></div>
                </div>
                <svg className="h-16 w-16 text-white relative z-10 drop-shadow-md" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-blue-500/40 animate-water-ripple"></div>

              {/* Partículas pequeñas de agua alrededor */}
              <div className="absolute -top-4 -left-4 h-6 w-6 bg-hydrous-200 rounded-full 
                   opacity-60 animate-water-float"></div>
              <div className="absolute -bottom-2 -right-2 h-4 w-4 bg-hydrous-300 rounded-full 
                   opacity-70 animate-water-float animation-delay-1000"></div>
              <div className="absolute top-1/2 right-0 h-3 w-3 bg-hydrous-400 rounded-full 
                   opacity-50 animate-water-float animation-delay-2000"></div>
            </div>
          </div>

          <h1 className="mt-8 text-4xl font-bold tracking-tight bg-clip-text text-transparent 
               bg-gradient-to-r from-hydrous-800 via-hydrous-700 to-hydrous-600 drop-shadow-sm">
            Tu ingeniero experto en soluciones hídricas y tratamiento de agua
          </h1>

          <p className="mt-4 text-lg text-hydrous-600 max-w-3xl mx-auto leading-relaxed">
            Diseñamos sistemas personalizados de tratamiento y reciclaje para empresas industriales,
            comerciales y municipios, optimizando costos y asegurando cumplimiento normativo.
          </p>
        </div>

        {/* Estadísticas impactantes con animaciones y gráficos mejorados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <StatCard
            value={counters.reduction}
            label="Reducción promedio de consumo hídrico"
            icon={<WaterDropIcon />}
            color="blue"
          />
          <StatCard
            value={counters.savings}
            label="Ahorro en costos operativos"
            icon={<ChartIcon />}
            color="teal"
          />
          <StatCard
            value={counters.compliance}
            label="Cumplimiento normativo garantizado"
            icon={<ShieldIcon />}
            color="emerald"
          />
        </div>

        {/* Selector de industria - Nueva adición */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-7 border border-hydrous-200 shadow-lg shadow-hydrous-100/30">
          <h3 className="text-xl font-medium text-hydrous-800 mb-5">¿Cuál es tu sector?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRY_OPTIONS.map((option) => (
              <IndustryOption
                key={option.id}
                option={option}
                isSelected={selectedOption === option.message}
                onSelect={() => setSelectedOption(option.message)}
              />
            ))}
          </div>
        </div>

        {/* Botón para comenzar directamente con efectos mejorados */}
        <div className="text-center mt-10">
          <Button
            onClick={handleBeginConsultation}
            className="px-10 py-6 text-lg bg-gradient-to-r from-hydrous-500 to-hydrous-600 
                 hover:from-hydrous-600 hover:to-hydrous-700 text-white rounded-xl
                 shadow-lg shadow-hydrous-400/30 hover:shadow-xl hover:shadow-hydrous-500/40 transition-all duration-300 
                 hover:-translate-y-1 font-medium"
          >
            <div className="flex items-center gap-3">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {selectedOption
                ? "Comenzar Consulta Personalizada"
                : "Comenzar Consulta General"}
            </div>
          </Button>
        </div>

        {/* Footer con información adicional */}
        <div className="bg-gradient-to-r from-blue-50 to-hydrous-50 px-7 py-6 rounded-xl 
             border border-hydrous-200 shadow-lg mt-8">
          <div className="flex items-start gap-5">
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center 
                 shrink-0 shadow-md border border-hydrous-200">
              <svg className="h-7 w-7 text-hydrous-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-hydrous-800">Cómo funciona</h3>
              <p className="text-base text-gray-600 mt-2 leading-relaxed">
                Comparte tus requerimientos técnicos y H<sub>2</sub>O Allegiant generará análisis personalizados
                y propuestas profesionales para tu proyecto de tratamiento de agua.
                Puedes subir archivos de análisis para resultados más precisos.
              </p>

              {/* Paso a paso con iconos mejorados */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-sm text-hydrous-700 bg-white/70 rounded-lg p-3 border border-hydrous-100">
                  <div className="h-8 w-8 bg-gradient-to-br from-hydrous-100 to-hydrous-200 rounded-full flex items-center 
                       justify-center text-sm font-bold text-hydrous-700 shadow-sm">1</div>
                  <span>Responde preguntas sobre tu proyecto</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-hydrous-700 bg-white/70 rounded-lg p-3 border border-hydrous-100">
                  <div className="h-8 w-8 bg-gradient-to-br from-hydrous-100 to-hydrous-200 rounded-full flex items-center 
                       justify-center text-sm font-bold text-hydrous-700 shadow-sm">2</div>
                  <span>Recibe análisis técnico personalizado</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-hydrous-700 bg-white/70 rounded-lg p-3 border border-hydrous-100">
                  <div className="h-8 w-8 bg-gradient-to-br from-hydrous-100 to-hydrous-200 rounded-full flex items-center 
                       justify-center text-sm font-bold text-hydrous-700 shadow-sm">3</div>
                  <span>Obtén propuesta detallada en PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Opciones de industria
const INDUSTRY_OPTIONS = [
  { id: 'textile', name: 'Textil', icon: '🧵', message: 'Necesito ayuda con un proyecto de tratamiento de agua para mi planta textil.' },
  { id: 'food', name: 'Alimentos', icon: '🍲', message: 'Necesito ayuda con un proyecto de tratamiento de agua para mi planta de alimentos.' },
  { id: 'pharma', name: 'Farmacéutica', icon: '💊', message: 'Necesito ayuda con un proyecto de tratamiento de agua para mi planta farmacéutica.' },
  { id: 'manufacturing', name: 'Manufactura', icon: '🏭', message: 'Necesito ayuda con un proyecto de tratamiento de agua para mi planta de manufactura.' },
  { id: 'hospitality', name: 'Hotelería', icon: '🏨', message: 'Necesito ayuda con un proyecto de tratamiento de agua para mi hotel o restaurante.' },
  { id: 'municipal', name: 'Municipal', icon: '🏛️', message: 'Necesito ayuda con un proyecto de tratamiento de agua municipal.' },
];

// Componente de opción de industria
function IndustryOption({
  option,
  isSelected,
  onSelect
}: {
  option: typeof INDUSTRY_OPTIONS[0],
  isSelected: boolean,
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 border ${isSelected
          ? 'bg-gradient-to-b from-hydrous-100 to-hydrous-200 border-hydrous-300 shadow-lg shadow-hydrous-200/20'
          : 'bg-white hover:bg-hydrous-50 border-hydrous-100 hover:border-hydrous-200 shadow-sm hover:shadow-md'
        }`}
    >
      <span className="text-3xl mb-2">{option.icon}</span>
      <span className={`text-sm font-medium ${isSelected ? 'text-hydrous-800' : 'text-gray-700'}`}>
        {option.name}
      </span>
    </button>
  );
}

// Componentes auxiliares necesarios
function StatCard({
  icon,
  value,
  label,
  color
}: {
  icon: React.ReactNode,
  value: number,
  label: string,
  color: 'blue' | 'teal' | 'emerald'
}) {
  const bgFrom = color === 'blue' ? 'from-blue-500' : color === 'teal' ? 'from-teal-500' : 'from-emerald-500';
  const bgTo = color === 'blue' ? 'to-blue-600' : color === 'teal' ? 'to-teal-600' : 'to-emerald-600';
  const lightBg = color === 'blue' ? 'bg-blue-50' : color === 'teal' ? 'bg-teal-50' : 'bg-emerald-50';
  const borderColor = color === 'blue' ? 'border-blue-100' : color === 'teal' ? 'border-teal-100' : 'border-emerald-100';
  const textColor = color === 'blue' ? 'text-blue-700' : color === 'teal' ? 'text-teal-700' : 'text-emerald-700';
  const iconColor = color === 'blue' ? 'text-blue-500' : color === 'teal' ? 'text-teal-500' : 'text-emerald-500';

  return (
    <Card className={`p-6 bg-white border-${color}-100 hover:border-${color}-200 backdrop-blur-md
         transition-all duration-300 overflow-hidden group relative shadow-lg shadow-${color}-100/20
         hover:shadow-xl hover:shadow-${color}-200/30`}>
      <div className="flex items-center gap-5">
        <div className={`flex-shrink-0 h-14 w-14 ${lightBg} rounded-full flex 
             items-center justify-center border ${borderColor} group-hover:scale-110 
             transition-transform duration-300 shadow-sm`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <div>
          <h3 className={`text-4xl font-bold ${textColor} group-hover:text-${color}-800
               transition-colors`}>
            {value}%
          </h3>
          <p className="text-sm text-gray-600 mt-1">{label}</p>

          {/* Barra de progreso para valor estadístico */}
          <div className="mt-2.5 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div className={`h-full bg-gradient-to-r ${bgFrom} ${bgTo} rounded-full transition-all duration-1000`}
              style={{ width: `${value}%` }}></div>
          </div>
        </div>
      </div>

      {/* Elemento de agua decorativo */}
      <div className={`absolute -bottom-6 -right-6 h-20 w-20 rounded-full ${lightBg}/50 
           opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-water-pulse`}></div>
    </Card>
  );
}

// Íconos necesarios
function WaterDropIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
