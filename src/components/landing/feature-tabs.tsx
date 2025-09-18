// src/components/landing/feature-tabs.tsx
"use client"

import { useState, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Brain, LineChart, Zap, FileText, Calculator, Shield } from "lucide-react"

// Memoizar los componentes de características
const FeatureCard = memo(({ feature }: { feature: typeof features[0] }) => (
  <Card className="p-8 bg-white/80 backdrop-blur-sm border-blue-100 hover:border-blue-200 transition-all duration-300 group">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-shrink-0">
        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
          {feature.icon}
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">
          {feature.title}
        </h3>
        <p className="text-blue-700/80 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  </Card>
))

FeatureCard.displayName = 'FeatureCard'

const features = [
  {
    id: "design",
    title: "Smart System Design",
    description: "Step-by-step guidance to size and cost on-site wastewater-treatment or reuse systems, with appropriate treatment train recommendations (DAF, MBR, RO, etc.).",
    icon: <Brain className="w-8 h-8" />
  },
  {
    id: "analysis",
    title: "Financial Analysis",
    description: "Preliminary estimates of CAPEX, OPEX, and ROI to support quick decision-making, with comprehensive cost breakdowns and financial projections.",
    icon: <Calculator className="w-8 h-8" />
  },
  {
    id: "documentation",
    title: "Technical Documentation",
    description: "Generate concise, exportable technical briefs with detailed specifications, compliance points, and system requirements.",
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: "compliance",
    title: "Compliance & Validation",
    description: "All outputs are indicative and must be validated through pilot testing or a certified consultant for final engineering approval.",
    icon: <Shield className="w-8 h-8" />
  }
]

// Optimizar las animaciones
const optimizedMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState("design")

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-blue-900 mb-6"
            {...optimizedMotion}
            viewport={{ once: true }}
          >
            What It Does
          </motion.h2>

          <motion.p
            className="text-xl text-blue-700/80 max-w-2xl mx-auto"
            {...optimizedMotion}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Discover how our AI transforms water treatment system design with cutting-edge technology
          </motion.p>
        </div>

        <Tabs defaultValue="design" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 p-1 bg-blue-50/50 rounded-xl">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-300"
              >
                {feature.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {features.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                <motion.div {...optimizedMotion}>
                  <FeatureCard feature={feature} />
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}
