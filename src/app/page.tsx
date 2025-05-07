// src/app/page.tsx
import InteractiveHero from "@/components/landing/interactive-hero"
import FeatureTabs from "@/components/landing/feature-tabs"
import PreparationSection from "@/components/landing/preparation-section" // Tu componente original
import ParallaxConfidentiality from "@/components/landing/parallax-confidentiality"
import Header from "@/components/layout/header"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-1">
        <InteractiveHero />
        <FeatureTabs />
        <PreparationSection />
        <ParallaxConfidentiality />
      </main>

      {/* Footer mejorado */}
      <footer className="relative overflow-hidden border-t border-blue-100 py-8 bg-white/80 backdrop-blur-md">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-blue-50/30"></div>

        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full"></div>
              <div className="text-xl font-semibold text-blue-800">H₂O Allegiant</div>
            </div>

            <div className="flex gap-8 text-sm text-blue-600">
              <Link href="#" className="hover:text-blue-800 hover:underline transition-colors">Térms of Service</Link>
              <Link href="#" className="hover:text-blue-800 hover:underline transition-colors">Privacy of Policy</Link>
              <Link href="#" className="hover:text-blue-800 hover:underline transition-colors">Contact</Link>
            </div>

            <div className="text-sm text-blue-600/80">
              © {new Date().getFullYear()} H₂O Allegiant • Advanced Water Treatment Solutions
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
