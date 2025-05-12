"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle2, FileText, AlertCircle, Shield, Lock, Upload, EyeOff } from "lucide-react"

const requirements = [
  {
    title: "Required Information",
    items: [
      "Your latest water bill (volume and price per m³)",
      "Basic lab analytics (pH, COD/BOD, TSS, oils/grease)",
      "Your reuse or discharge target",
      "Any site constraints (footprint, power, budget)"
    ],
    icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />,
    description: "Essential data needed for accurate system design and cost estimation"
  },
  {
    title: "Optional Information",
    items: [
      "Upload PDFs or photos of lab reports",
      "Just ask the assistant for the 'Upload files' button when needed"
    ],
    icon: <Upload className="w-6 h-6 text-blue-600" />,
    description: "Additional information that can enhance the accuracy of your assessment"
  }
]

const confidentialityFeatures = [
  {
    title: "End-to-End Encryption",
    description: "Your data is encrypted at rest and in transit using industry-standard protocols",
    icon: <Lock className="w-5 h-5 text-blue-500" />
  },
  {
    title: "Zero Data Sharing",
    description: "We never share, sell, or publish your information without explicit consent",
    icon: <EyeOff className="w-5 h-5 text-blue-500" />
  },
  {
    title: "Secure Processing",
    description: "All data processing complies with international security standards",
    icon: <Shield className="w-5 h-5 text-blue-500" />
  }
]

const optimizedMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function RequirementsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Sección de Requisitos */}
          <div className="mb-24">
            <motion.div
              className="text-center mb-16"
              {...optimizedMotion}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                To Get the Best Results
              </h2>
              <p className="text-xl text-blue-700/80 max-w-2xl mx-auto">
                Prepare the following information to ensure accurate and comprehensive water treatment system design
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {requirements.map((req, index) => (
                <motion.div
                  key={req.title}
                  {...optimizedMotion}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 bg-white/80 backdrop-blur-sm border-blue-100 hover:border-blue-200 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        {req.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-blue-900">{req.title}</h3>
                        <p className="text-blue-600/80 mt-1">{req.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {req.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-blue-700/80">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sección de Confidencialidad */}
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            {...optimizedMotion}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Fondo con efecto de gradiente y patrón */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/50 via-transparent to-transparent"></div>
            
            <div className="relative p-12 border border-blue-100 bg-white/80 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-blue-900 mb-6">Your Data is Protected</h3>
                  <p className="text-blue-700/80 leading-relaxed mb-8 text-lg">
                    All data, documents, and lab results you provide—whether pasted in the chat or uploaded—are treated as strictly confidential and are used only to generate your water-treatment assessment. We do not sell, share, or publish your information, and it is stored securely in accordance with industry best practices.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {confidentialityFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="p-2 bg-blue-50 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">{feature.title}</h4>
                          <p className="text-sm text-blue-700/80">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 