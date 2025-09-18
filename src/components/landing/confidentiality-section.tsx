"use client"

import { motion } from "framer-motion"

export default function ConfidentialitySection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50/50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl shadow-xl p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Elementos decorativos técnicos */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 bg-blue-200/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-white">Aviso de Confidencialidad</h2>
            </div>

            <p className="text-blue-100/90 mb-6 leading-relaxed max-w-3xl">
              Todos los datos, documentos y resultados de laboratorio que proporciones —ya sea pegándolos en el chat o subiéndolos— se tratan como estrictamente confidenciales y se usan únicamente para generar tu evaluación de tratamiento de agua.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.93 4.93 14.14 14.14" />
                  </svg>
                  <span className="text-blue-100 font-medium">No vendemos tu información</span>
                </div>
                <p className="text-blue-200/80 text-sm">
                  Tu información jamás será comercializada a terceros.
                </p>
              </div>

              <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-blue-100 font-medium">Almacenamiento seguro</span>
                </div>
                <p className="text-blue-200/80 text-sm">
                  Datos cifrados siguiendo mejores prácticas del sector.
                </p>
              </div>

              <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span className="text-blue-100 font-medium">Uso limitado</span>
                </div>
                <p className="text-blue-200/80 text-sm">
                  Solo para generar tu evaluación personalizada.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
