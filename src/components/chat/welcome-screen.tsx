"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStartConversation: (message: string) => void;
}

export default function WelcomeScreen({ onStartConversation }: WelcomeScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [counters, setCounters] = useState({ reduction: 0, savings: 0, compliance: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Configurar visibilidad para animaciones escalonadas
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      {/* Fondos y elementos decorativos mejorados */}
      <div className="absolute inset-0 -z-10">
        {/* Gradiente base con profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white/60 to-white/90"></div>

        {/* Malla de puntos sutiles para textura */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>

        {/* Forma ondulada sutil */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 text-blue-100 opacity-10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,224C960,213,1056,139,1152,128C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        {/* Círculos decorativos con blur */}
        <motion.div
          className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full 
               bg-gradient-to-br from-blue-100/30 to-blue-200/20 
               filter blur-3xl opacity-60"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.7, 0.6]
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-40 right-10 w-[500px] h-[500px] rounded-full 
               bg-gradient-to-br from-blue-200/20 to-blue-400/10 
               filter blur-3xl opacity-50"
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.5, 0.65, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Efecto de luz ambiental */}
        <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-blue-50/50 to-transparent opacity-70"></div>

        {/* Partículas flotantes mejoradas */}
        <motion.div
          className="absolute top-1/4 left-1/3 h-3 w-3 bg-blue-200/30 rounded-full"
          animate={{
            y: [-20, 20, -20],
            x: [10, -10, 10],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 h-5 w-5 bg-blue-200/20 rounded-full"
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/2 h-4 w-4 bg-blue-300/10 rounded-full"
          animate={{
            y: [20, -20, 20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div
        className="max-w-4xl w-full space-y-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo y título con animaciones mejoradas */}
        <div className="text-center relative">
          {/* Aura de luz detrás del logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-radial from-blue-300/30 to-transparent rounded-full blur-xl"></div>

          {/* Logo contenedor */}
          <motion.div
            className="relative inline-block mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Reflejo/brillo del logo */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-200/20 to-blue-400/5 rounded-full blur-xl opacity-70"></div>

            {/* Logo principal */}
            <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/20 overflow-hidden">
              {/* Animaciones de ola dentro del logo */}
              <motion.div
                className="absolute bottom-0 w-full h-20 bg-white/10 rounded-t-full"
                animate={{
                  y: [0, -5, 0],
                  scaleY: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                className="absolute bottom-0 w-full h-12 bg-white/10 rounded-t-full"
                animate={{
                  y: [0, -3, 0],
                  scaleY: [1, 1.2, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />

              {/* Ícono de gota */}
              <svg className="h-16 w-16 text-white relative z-10 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>

            {/* Anillo de resplandor */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-300/30"
              animate={{
                scale: [1.1, 1.3, 1.1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Título principal con gradiente de texto */}
          <motion.h1
            className="mt-8 text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Tu ingeniero experto en soluciones hídricas
          </motion.h1>

          {/* Subtítulo con efecto glassmorphism */}
          <motion.div
            className="inline-block px-6 py-3 rounded-full bg-white/70 backdrop-filter backdrop-blur-md border border-blue-100 shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-blue-700 text-lg">
              Diseño personalizado de sistemas de tratamiento y reciclaje de agua con IA avanzada
            </p>
          </motion.div>
        </div>

        {/* Estadísticas impactantes con animaciones y gráficos mejorados */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
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
        </motion.div>

        {/* Selector de industria - Con diseño mejorado */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl p-7 border border-blue-200 shadow-lg shadow-blue-100/30"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21V12m0 0V5.2c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C14.28 0 15.12 0 16.8 0h.2M12 12h7M5 12h3" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-blue-800">¿Cuál es tu sector?</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRY_OPTIONS.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
              >
                <IndustryOption
                  option={option}
                  isSelected={selectedOption === option.message}
                  onSelect={() => setSelectedOption(option.message)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botón para comenzar directamente con efectos mejorados */}
        <motion.div
          className="text-center mt-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-block"
          >
            {/* Efecto de brillo en hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>

            <Button
              onClick={handleBeginConsultation}
              className="relative px-10 py-6 text-lg bg-gradient-to-r from-blue-500 to-blue-600 
                   hover:from-blue-600 hover:to-blue-700 text-white rounded-xl
                   shadow-lg shadow-blue-400/30 font-medium"
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

              {/* Borde interno sutil */}
              <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none"></div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer con información adicional mejorado */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-white px-7 py-6 rounded-xl 
             border border-blue-200 shadow-lg mt-8"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          <div className="flex flex-col md:flex-row items-start gap-5">
            <div className="h-14 w-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center 
                 shrink-0 shadow-md border border-blue-200">
              <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-800">Cómo funciona</h3>
              <p className="text-base text-gray-600 mt-2 leading-relaxed">
                Comparte tus requerimientos técnicos y H<sub>2</sub>O Allegiant generará análisis personalizados
                y propuestas profesionales para tu proyecto de tratamiento de agua.
                Puedes subir archivos de análisis para resultados más precisos.
              </p>

              {/* Paso a paso mejorado con iconos */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center 
                     justify-center text-sm font-bold text-blue-700 shadow-sm">1</div>
                  <span className="text-sm text-blue-700">Responde preguntas sobre tu proyecto</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center 
                     justify-center text-sm font-bold text-blue-700 shadow-sm">2</div>
                  <span className="text-sm text-blue-700">Recibe análisis técnico personalizado</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center 
                     justify-center text-sm font-bold text-blue-700 shadow-sm">3</div>
                  <span className="text-sm text-blue-700">Obtén propuesta detallada en PDF</span>
                </div>
              </div>

              {/* Línea decorativa */}
              <div className="blue-divider mt-5 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-50"></div>

              {/* Sello de garantía */}
              <div className="flex justify-center mt-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-100">
                  <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-blue-700 font-medium">Tecnología certificada de última generación</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
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

// Componente de opción de industria mejorado
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
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 border ${isSelected
          ? 'bg-gradient-to-b from-blue-100 to-blue-200 border-blue-300 shadow-lg shadow-blue-200/20'
          : 'bg-white hover:bg-blue-50 border-blue-100 hover:border-blue-200 shadow-sm hover:shadow-md'
        }`}
    >
      <span className="text-3xl mb-2 transform transition-transform duration-300 hover:scale-110">{option.icon}</span>
      <span className={`text-sm font-medium ${isSelected ? 'text-blue-800' : 'text-gray-700'}`}>
        {option.name}
      </span>

      {/* Indicador visual de selección */}
      {isSelected && (
        <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
          <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </motion.button>
  );
}

// Componentes auxiliares necesarios mejorados
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
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 bg-white border-${color}-100 hover:border-${color}-200 backdrop-blur-sm
           transition-all duration-300 overflow-hidden group relative shadow-lg shadow-${color}-100/20
           hover:shadow-xl hover:shadow-${color}-200/30 rounded-xl border`}
    >
      <div className="flex items-center gap-5">
        <div className={`flex-shrink-0 h-14 w-14 ${lightBg} rounded-full flex 
             items-center justify-center border ${borderColor} group-hover:scale-110 
             transition-transform duration-300 shadow-sm`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <div className="flex-1">
          <motion.h3
            className={`text-4xl font-bold ${textColor} group-hover:text-${color}-800
                 transition-colors`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {value}%
          </motion.h3>
          <p className="text-sm text-gray-600 mt-1">{label}</p>

          {/* Barra de progreso para valor estadístico mejorada */}
          <div className="mt-2.5 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className={`h-full bg-gradient-to-r ${bgFrom} ${bgTo} rounded-full transition-all duration-1000`}
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ delay: 1.3, duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Elemento de agua decorativo */}
      <motion.div
        className={`absolute -bottom-6 -right-6 h-20 w-20 rounded-full ${lightBg}/50 
           opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}

// Íconos necesarios mejorados
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
