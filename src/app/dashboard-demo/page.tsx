"use client"

import React from 'react'
import { DashboardProvider } from '@/contexts/dashboard-context'
import ModularDashboard from '@/components/dashboard/modular-dashboard'
import {
  AnimatedContainer,
  StaggeredGrid,
  FloatingActionButton,
  InteractiveButton,
  WaterBackground
} from '@/components/ui/animated-components'
import { 
  ContextCard,
  ContextCardHeader,
  ContextCardTitle,
  ContextCardContent
} from '@/components/ui/context-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { 
  Plus, 
  Sparkles, 
  Palette, 
  Zap,
  ArrowRight
} from 'lucide-react'

/**
 * Dashboard Demo Page - Showcase of modular architecture
 * Demonstrates all implemented features:
 * - Context-aware theming
 * - Progressive disclosure
 * - Performance optimizations
 * - Modern animations
 * - shadcn/ui compound patterns
 */

const DemoPage = () => {
  const [selectedContext, setSelectedContext] = React.useState<"executive" | "project" | "technical" | "client">("executive")

  const contextDescriptions = {
    executive: {
      title: "Dashboard Ejecutivo",
      description: "Vista estratégica con métricas de alto nivel, análisis financiero y KPIs empresariales",
      color: "from-context-executive-500 to-context-executive-600"
    },
    project: {
      title: "Gestión de Proyectos", 
      description: "Seguimiento operacional, coordinación de equipos y gestión de recursos",
      color: "from-context-project-500 to-context-project-600"
    },
    technical: {
      title: "Panel Técnico",
      description: "Monitoreo de sistemas, especificaciones técnicas y métricas de rendimiento",
      color: "from-context-technical-500 to-context-technical-600"
    },
    client: {
      title: "Portal de Cliente",
      description: "Vista simplificada para seguimiento de proyectos y comunicación",
      color: "from-context-client-500 to-context-client-600"
    }
  }

  const features = [
    {
      title: "Context-Aware Theming",
      description: "Cada contexto tiene su propia paleta de colores usando OKLCH para máxima precisión",
      icon: <Palette className="h-5 w-5" />
    },
    {
      title: "Progressive Disclosure",
      description: "Información por capas: hover cards, collapsibles, y drill-down sheets",
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: "Performance Optimized",
      description: "Lazy loading, virtual scrolling, y tree-shaking para máximo rendimiento",
      icon: <Sparkles className="h-5 w-5" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-water-50 to-background relative">
      {/* Animated water background */}
      <WaterBackground />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-6 py-4">
            <AnimatedContainer animation="slide-up" className="flex items-center justify-between">
              <div>
                <h1 className="text-display-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  H₂O Allegiant Dashboard System
                </h1>
                <p className="text-body text-muted-foreground mt-2">
                  Arquitectura modular con shadcn/ui + Tailwind CSS + CVA
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-background/50">
                  Demo Interactivo
                </Badge>
                <InteractiveButton
                  effect="glow"
                  context={selectedContext}
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Explorar Features
                </InteractiveButton>
              </div>
            </AnimatedContainer>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="container mx-auto px-6 py-12">
          <AnimatedContainer animation="fade-in" delay={200}>
            <div className="text-center mb-12">
              <h2 className="text-display-md font-bold mb-4">
                Características Principales
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Un sistema completo que aprovecha lo mejor de shadcn/ui, Tailwind CSS, 
                y patrones modernos de React para crear interfaces excepcionales
              </p>
            </div>
          </AnimatedContainer>

          <StaggeredGrid staggerDelay={150} className="mb-16">
            {features.map((feature, index) => (
              <ContextCard
                key={index}
                context="executive"
                elevation="medium"
                interactive="hover"
                className="h-full"
              >
                <ContextCardHeader icon={feature.icon}>
                  <div>
                    <ContextCardTitle className="text-heading-xl">
                      {feature.title}
                    </ContextCardTitle>
                  </div>
                </ContextCardHeader>
                <ContextCardContent>
                  <p className="text-body-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </ContextCardContent>
              </ContextCard>
            ))}
          </StaggeredGrid>
        </div>

        {/* Interactive Dashboard Demo */}
        <div className="container mx-auto px-6 pb-12">
          <AnimatedContainer animation="fade-in" delay={400}>
            <div className="text-center mb-8">
              <h2 className="text-display-md font-bold mb-4">
                Dashboard Interactivo
              </h2>
              <p className="text-body text-muted-foreground">
                Selecciona diferentes contextos para ver como el sistema se adapta automáticamente
              </p>
            </div>
          </AnimatedContainer>

          {/* Context Selector */}
          <AnimatedContainer animation="slide-up" delay={500}>
            <Tabs value={selectedContext} onValueChange={(value) => setSelectedContext(value as any)}>
              <TabsList className="grid w-full grid-cols-4 mb-8">
                {Object.entries(contextDescriptions).map(([key, config]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-primary/5"
                  >
                    {config.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Context Description Card */}
              <AnimatedContainer animation="fade-in" delay={100}>
                <ContextCard 
                  context={selectedContext} 
                  elevation="floating"
                  className="mb-8"
                >
                  <ContextCardHeader>
                    <div>
                      <ContextCardTitle className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${contextDescriptions[selectedContext].color}`} />
                        {contextDescriptions[selectedContext].title}
                      </ContextCardTitle>
                    </div>
                  </ContextCardHeader>
                  <ContextCardContent>
                    <p className="text-body-sm text-muted-foreground">
                      {contextDescriptions[selectedContext].description}
                    </p>
                  </ContextCardContent>
                </ContextCard>
              </AnimatedContainer>

              {/* Dashboard Content */}
              {Object.keys(contextDescriptions).map((context) => (
                <TabsContent key={context} value={context} className="mt-0">
                  <DashboardProvider dashboardType={context as any}>
                    <AnimatedContainer animation="fade-in" delay={200}>
                      <ModularDashboard 
                        context={context as any}
                        density="comfortable"
                        className="border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm p-8"
                      />
                    </AnimatedContainer>
                  </DashboardProvider>
                </TabsContent>
              ))}
            </Tabs>
          </AnimatedContainer>
        </div>

        {/* Technical Implementation Details */}
        <div className="container mx-auto px-6 pb-16">
          <AnimatedContainer animation="fade-in" delay={600}>
            <ContextCard elevation="high" className="bg-muted/30">
              <ContextCardHeader>
                <div>
                  <ContextCardTitle>Implementación Técnica</ContextCardTitle>
                </div>
              </ContextCardHeader>
              <ContextCardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Tailwind CSS Avanzado</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Colores OKLCH para precisión</li>
                      <li>• CSS custom properties</li>
                      <li>• Plugin personalizado para contextos</li>
                      <li>• Animaciones optimizadas</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">shadcn/ui Patterns</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Compound components</li>
                      <li>• Variants con CVA</li>
                      <li>• Collapsible + Sheet disclosure</li>
                      <li>• Composabilidad total</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Performance</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Lazy loading components</li>
                      <li>• Virtual scrolling</li>
                      <li>• Memoization strategies</li>
                      <li>• Tree-shaking optimizado</li>
                    </ul>
                  </div>
                </div>
              </ContextCardContent>
            </ContextCard>
          </AnimatedContainer>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        context={selectedContext}
        icon={<Plus className="h-6 w-6" />}
        label="Nuevo Proyecto"
        hideOnScroll
        onClick={() => console.log('FAB clicked with context:', selectedContext)}
      />
    </div>
  )
}

export default DemoPage