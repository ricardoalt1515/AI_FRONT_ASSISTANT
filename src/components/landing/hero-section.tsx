// src/components/landing/hero-section.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import DropletAvatar from "@/components/chat/droplet-avatar"

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/80 via-white to-blue-50/80"></div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-900">
              Inteligencia Instantánea del Agua
            </h1>

            <p className="text-xl text-blue-700/80 leading-relaxed">
              Soluciones avanzadas de ingeniería y diseño de tratamiento de agua potenciadas por IA.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                asChild
              >
                <Link href="/auth/register">
                  Iniciar Ahora
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                asChild
              >
                <Link href="/chat">
                  Probar Demo
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative h-80 w-80">
              <div className="absolute inset-0 bg-blue-100/30 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <DropletAvatar
                  size="xl"
                  mood="technical"
                  animate={true}
                  className="h-80 w-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
