import React from 'react';
import { motion } from 'framer-motion';

interface Option {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface OptionButtonsProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

export default function OptionButtons({ options, onSelect }: OptionButtonsProps) {
  return (
    <motion.div
      className="options-container flex flex-col gap-3 my-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          className="option-card relative bg-gradient-to-r from-blue-50 to-white p-3 border border-blue-100 rounded-lg flex items-center gap-3 hover:shadow-md transition-all group hover:border-blue-200 overflow-hidden text-left"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(7, 89, 133, 0.12)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option)}
        >
          {/* Indicador numérico con estilo técnico */}
          <div className="option-indicator relative bg-gradient-to-br from-blue-400 to-blue-600 text-white h-8 w-8 rounded-lg flex items-center justify-center shadow-sm overflow-hidden">
            {/* Patrón de circuito en el indicador */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
              backgroundSize: '4px 4px'
            }} />

            <span className="text-sm font-medium relative z-10">{index + 1}</span>

            {/* Efecto de brillo al hacer hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="font-medium text-gray-800">{option.label}</div>
            {option.description && (
              <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
            )}
          </div>

          {/* Icono técnico de flecha */}
          <svg className="h-5 w-5 text-blue-500 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>

          {/* Línea técnica decorativa */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200/0 via-blue-300/30 to-blue-200/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      ))}
    </motion.div>
  );
}
