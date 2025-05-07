// src/components/landing/feature-tabs.tsx
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeatureCard from "./feature-card"
import { motion } from "framer-motion"

export default function FeatureTabs() {
  const categories = [
    {
      id: "design",
      label: "Design",
      features: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10H3M21 6H3M21 14H3M21 18H3" />
            </svg>
          ),
          title: "Size and Cost Estimation",
          description: "Step-by-step guidance to dimension and estimate the cost of wastewater treatment systems."
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m12 16 4-4-4-4" />
              <path d="M8 12h8" />
            </svg>
          ),
          title: "Reuse Objective",
          description: "Determine the best uses for your treated water based on your project parameters."
        },
      ]
    },
    {
      id: "analysis",
      label: "Analysis",
      features: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <circle cx="10" cy="14" r="2" />
              <path d="m18 20-3-3" />
            </svg>
          ),
          title: "Solution Recommendations",
          description: "Recommendations for appropriate treatment trains (DAF, MBR, RO, etc.) and key regulatory points."
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
              <path d="M8.5,2 L15.5,2" />
              <path d="M8,22 L16,22" />
            </svg>
          ),
          title: "Laboratory Analysis",
          description: "Interpret test results to identify critical parameters for treatment."
        },
      ]
    },
    {
      id: "financial",
      label: "Financial",
      features: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          ),
          title: "Financial Analysis",
          description: "Preliminary CAPEX, OPEX, and ROI estimates to support quick decision-making."
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
          ),
          title: "Exportable Summary",
          description: "Generate a concise technical summary with the results of your analysis."
        },
      ]
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/30 to-white"></div>

      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-blue-900 mb-4">
            What Our Assistant Does
          </h2>

          <p className="text-lg text-blue-700/80 max-w-2xl mx-auto">
            The most advanced AI assistant for water treatment, designed for hydraulic engineering professionals
          </p>
        </motion.div>

        <Tabs defaultValue="design" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-blue-50/70 backdrop-blur-sm p-1 rounded-lg border border-blue-100">
              {categories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md data-[state=active]:font-medium px-6 py-2 rounded-md transition-all"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(category => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {category.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <FeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
