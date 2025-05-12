"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Componente de carga optimizado
const LoadingPlaceholder = ({ height = "h-96" }: { height?: string }) => (
  <div className={`${height} bg-gradient-to-b from-blue-50 to-white animate-pulse`} />
)

// Lazy load components con Suspense
const InteractiveHero = dynamic(() => import("@/components/landing/interactive-hero"), {
  loading: () => <LoadingPlaceholder height="h-screen" />,
  ssr: false // Deshabilitar SSR para componentes pesados
})

const FeatureTabs = dynamic(() => import("@/components/landing/feature-tabs"), {
  loading: () => <LoadingPlaceholder />,
  ssr: true
})

const PreparationSection = dynamic(() => import("@/components/landing/preparation-section"), {
  loading: () => <LoadingPlaceholder />,
  ssr: true
})

const ParallaxConfidentiality = dynamic(() => import("@/components/landing/parallax-confidentiality"), {
  loading: () => <LoadingPlaceholder />,
  ssr: true
})

export default function DynamicComponents() {
  return (
    <>
      <Suspense fallback={<LoadingPlaceholder height="h-screen" />}>
        <InteractiveHero />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <FeatureTabs />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <PreparationSection />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <ParallaxConfidentiality />
      </Suspense>
    </>
  )
} 