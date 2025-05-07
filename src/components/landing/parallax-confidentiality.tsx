// src/components/landing/parallax-confidentiality.tsx
"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxConfidentiality() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.8])

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl shadow-xl p-8 md:p-10 text-white relative overflow-hidden"
          style={{ y, opacity }}
        >
          {/* Partículas de fondo con animación */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  width: Math.random() * 50 + 10,
                  height: Math.random() * 50 + 10,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * -30],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + i % 4,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 bg-blue-200/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium">Confidentiality Notice</h2>
            </div>

            <p className="text-blue-100/90 mb-8 leading-relaxed max-w-3xl">
              All data, documents, and laboratory results you provide — whether by pasting them in the chat or uploading them — are treated as strictly confidential and are used only to generate your water treatment assessment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m4.93 4.93 14.14 14.14" />
                    </svg>
                  ),
                  title: "We Don't Sell Your Information",
                  description: "Your information will never be commercialized to third parties."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ),
                  title: "Secure Storage",
                  description: "Data encrypted following industry best practices."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  ),
                  title: "Limited Use",
                  description: "Only used to generate your personalized assessment."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/50 rounded-lg p-5 hover:bg-blue-800/40 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon}
                    <span className="text-blue-100 font-medium">{item.title}</span>
                  </div>
                  <p className="text-blue-200/80 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
