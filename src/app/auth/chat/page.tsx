import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import DropletAvatar from "@/components/chat/droplet-avatar";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white/90 to-white"></div>

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>

        {/* Fluid shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-300/10 to-blue-500/5 filter blur-3xl opacity-30"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "easeInOut"
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/10 to-blue-500/5 filter blur-3xl opacity-20"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut"
          }}
        ></motion.div>

        {/* Flow lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/15 to-transparent"></div>
      </div>

      {/* Header & Navigation */}
      <header className="relative z-10 border-b border-blue-100/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                <div className="absolute inset-0 rounded-full bg-blue-400/20 filter blur-xl scale-150"></div>
                <DropletAvatar size="md" mood="default" className="relative z-10" />
                <div className="ml-3">
                  <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500">
                    H₂O Allegiant
                    <span className="ml-1 font-light text-blue-600 bg-blue-50/80 px-1.5 py-0.5 rounded-sm text-sm">AI</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-sm font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-50"
              >
                Iniciar Sesión
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-500 to-blue-600 
                      hover:from-blue-600 hover:to-blue-700 text-white shadow-md shadow-blue-400/10"
              >
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                  Asistente de Diseño e Ingeniería de Tratamiento de Agua con IA
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Impulsado por H2O Allegiant, Corp. - "Inteligencia Instantánea del Agua."
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 
                        hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 text-lg
                        shadow-lg shadow-blue-400/10 hover:shadow-blue-500/20"
                >
                  Comenzar Ahora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
                >
                  Ver Demostración
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-16 text-blue-50" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,37 C320,83 420,12 640,37 C860,62 980,22 1200,37 C1320,45 1400,57 1440,61 L1440,74 L0,74 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 py-16 md:py-24 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">¿Qué hace?</h3>
            <p className="max-w-2xl mx-auto text-gray-600">Nuestra IA especializada te ofrece soluciones a medida para tus proyectos de tratamiento de agua.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 mb-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Dimensiona y Estima</h4>
              <p className="text-gray-600">Te guía paso a paso para dimensionar y estimar el costo de un sistema de tratamiento o reutilización de aguas residuales en sitio.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 mb-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Recomienda Soluciones</h4>
              <p className="text-gray-600">Recomienda trenes de tratamiento apropiados (DAF, MBR, RO, etc.) y resalta los puntos clave de cumplimiento normativo.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 mb-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Estima Financieramente</h4>
              <p className="text-gray-600">Proporciona estimaciones preliminares de CAPEX, OPEX y ROI para apoyar una toma de decisiones rápida.</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 mb-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Genera Reporte</h4>
              <p className="text-gray-600">Genera un resumen técnico conciso y exportable con los detalles de tu solución personalizada.</p>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm italic text-gray-500">
              Nota: Todos los resultados son indicativos; el diseño final debe ser validado mediante pruebas piloto o por un consultor certificado.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">Para obtener el mejor resultado, ten a la mano:</h3>

              <ul className="space-y-4">
                {[
                  {
                    icon: (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>),
                    text: "Tu factura de agua más reciente (volumen y precio por m³)."
                  },
                  {
                    icon: (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>),
                    text: "Análisis de laboratorio básicos (pH, DQO/DBO, SST, aceites/grasas)."
                  },
                  {
                    icon: (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
                    text: "Tu objetivo de reutilización o descarga."
                  },
                  {
                    icon: (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>),
                    text: "Cualquier restricción del sitio (espacio disponible, energía, presupuesto)."
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg flex-shrink-0 bg-blue-100 text-blue-600 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 rounded-lg p-5 mt-8 border border-blue-100">
                <div className="flex items-center text-blue-700 mb-2">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Opcional</span>
                </div>
                <p className="text-gray-700">
                  Puedes subir archivos PDF o fotos de los análisis de laboratorio; solo pídele al asistente el botón de "Subir archivos" cuando lo necesites.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              {/* Water drops illustration */}
              <div className="relative h-80">
                <motion.div
                  className="absolute top-10 left-1/4 w-32 h-40"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                >
                  <div className="bg-gradient-to-br from-blue-300 to-blue-500 w-32 h-32 rounded-full blur-md opacity-20"></div>
                  <div className="absolute top-4 left-4 bg-gradient-to-br from-blue-300 to-blue-500 w-24 h-24 rounded-tl-full rounded-tr-full rounded-bl-full -rotate-45 opacity-40"></div>
                  <div className="absolute top-6 left-6 bg-white w-2 h-2 rounded-full blur-sm opacity-60"></div>
                </motion.div>

                <motion.div
                  className="absolute top-1/4 right-1/3 w-48 h-48"
                  animate={{
                    y: [0, 10, 0],
                    x: [0, -5, 0],
                    rotate: [0, -3, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-40 h-40 rounded-full blur-md opacity-20"></div>
                  <div className="absolute top-5 left-5 bg-gradient-to-br from-blue-400 to-blue-600 w-30 h-30 rounded-tl-full rounded-tr-full rounded-bl-full -rotate-45 opacity-40"></div>
                  <div className="absolute top-8 left-8 bg-white w-3 h-3 rounded-full blur-sm opacity-60"></div>
                </motion.div>

                <motion.div
                  className="absolute bottom-10 right-1/4 w-36 h-36"
                  animate={{
                    y: [0, -12, 0],
                    x: [0, 8, 0],
                    rotate: [0, 8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <div className="bg-gradient-to-br from-blue-200 to-blue-400 w-36 h-36 rounded-full blur-md opacity-30"></div>
                  <div className="absolute top-4 left-4 bg-gradient-to-br from-blue-200 to-blue-400 w-28 h-28 rounded-tl-full rounded-tr-full rounded-bl-full -rotate-45 opacity-50"></div>
                  <div className="absolute top-7 left-7 bg-white w-2 h-2 rounded-full blur-sm opacity-70"></div>
                </motion.div>

                {/* Sample document */}
                <motion.div
                  className="absolute w-64 h-80 mx-auto bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                  initial={{ rotate: -5 }}
                  animate={{
                    rotate: [-5, 0, -5],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    rotate: {
                      repeat: Infinity,
                      duration: 8,
                      ease: "easeInOut"
                    },
                    y: {
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <div className="h-8 bg-blue-500 flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-white opacity-80 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-60 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-40"></div>
                  </div>

                  <div className="px-4 py-5">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                        <div className="w-32 h-4 bg-blue-100 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                        <div className="w-40 h-4 bg-blue-100 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                        <div className="w-28 h-4 bg-blue-100 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                        <div className="w-36 h-4 bg-blue-100 rounded"></div>
                      </div>
                    </div>

                    <div className="h-32 bg-blue-50 rounded-lg mt-8 border border-blue-100"></div>

                    <div className="flex justify-between mt-8">
                      <div className="w-24 h-8 bg-gray-200 rounded"></div>
                      <div className="w-24 h-8 bg-blue-500 rounded"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confidentiality Notice */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-blue-100 p-6 md:p-8 relative overflow-hidden">
              {/* Glass effect decorations */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-300/30 via-blue-500/50 to-blue-300/30"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-300/30 via-blue-500/20 to-blue-300/30"></div>
              <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-b from-blue-300/30 via-blue-500/20 to-blue-300/30"></div>
              <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-b from-blue-300/30 via-blue-500/20 to-blue-300/30"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">
                    Aviso de Confidencialidad
                  </h3>
                </div>

                <p className="text-gray-700 mb-4">
                  Todos los datos, documentos y resultados de laboratorio que proporciones —ya sea pegándolos en el chat o subiéndolos— se tratan como estrictamente confidenciales y se usan únicamente para generar tu evaluación de tratamiento de agua.
                </p>

                <p className="text-gray-700">
                  No vendemos, compartimos ni publicamos tu información, y se almacena de forma segura conforme a las mejores prácticas del sector.
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center bg-blue-50 rounded-full px-4 py-2 text-sm text-blue-700">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Datos Encriptados</span>
                  </div>

                  <div className="flex items-center bg-blue-50 rounded-full px-4 py-2 text-sm text-blue-700">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Privacidad Garantizada</span>
                  </div>

                  <div className="flex items-center bg-blue-50 rounded-full px-4 py-2 text-sm text-blue-700">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Cumplimiento Normativo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 py-8 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <DropletAvatar size="sm" mood="default" className="mr-2" />
              <div className="text-blue-600/80 font-medium">
                H₂O Allegiant • Advanced Water Treatment Solutions
              </div>
            </div>

            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} H₂O Allegiant Corp. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
