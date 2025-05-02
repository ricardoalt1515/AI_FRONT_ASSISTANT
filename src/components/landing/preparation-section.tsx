"use client"

import { motion } from "framer-motion"

export default function PreparationSection() {
  const prepItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: "Factura de Agua",
      description: "Tu factura más reciente con volumen y precio por m³"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
          <path d="M8.5,2 L15.5,2" />
          <path d="M8,22 L16,22" />
        </svg>
      ),
      title: "Análisis de Laboratorio",
      description: "Análisis básicos: pH, DQO/DBO, SST, aceites/grasas"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m12 16 4-4-4-4" />
          <path d="M8 12h8" />
        </svg>
      ),
      title: "Objetivo de Reutilización",
      description: "Tu objetivo de reutilización o descarga del agua tratada"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7h-9" />
          <path d="M14 17H5" />
          <circle cx="17" cy="17" r="3" />
          <circle cx="7" cy="7" r="3" />
        </svg>
      ),
      title: "Restricciones del Sitio",
      description: "Espacio disponible, energía, presupuesto"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50/30 to-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-medium text-blue-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Para Obtener el Mejor Resultado
          </motion.h2>

          <motion.p
            className="text-lg text-blue-700/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ten a la mano esta información para obtener recomendaciones más precisas
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {prepItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex gap-5 items-start bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-blue-300/20 transition-all">
                {item.icon}
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-800 mb-1">{item.title}</h3>
                <p className="text-blue-600/80">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-blue-800">Opcional: Subir Archivos</h3>
          </div>

          <p className="text-blue-600/80 ml-12">
            Puedes subir archivos PDF o fotos de los análisis de laboratorio; solo pídele al asistente el botón de "Subir archivos" cuando lo necesites.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
