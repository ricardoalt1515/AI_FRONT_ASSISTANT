"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DropletAvatar from "@/components/chat/droplet-avatar";
import { apiService } from "@/lib/api-client";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const isAuth = apiService.isAuthenticated();
    setIsAuthenticated(isAuth);

    if (isAuth) {
      const userDataStr = localStorage.getItem("userData");
      if (userDataStr) {
        setUserData(JSON.parse(userDataStr));
      }
    }
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/80 via-white to-blue-50/80"></div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {isAuthenticated && userData ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                    bg-blue-50 text-blue-700 border border-blue-200"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Bienvenido de vuelta, {userData.first_name}
                  </span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-900">
                  Tu Asistente de Ingeniería de Agua está listo
                </h1>

                <p className="text-xl text-blue-700/80 leading-relaxed">
                  Continúa optimizando tus soluciones de tratamiento de agua con
                  IA avanzada.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg group"
                    asChild
                  >
                    <Link href="/chat">
                      Continuar al Asistente
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/proposals">Ver Propuestas</Link>
                  </Button>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="bg-white/80 p-4 rounded-lg border border-blue-100">
                    <p className="text-2xl font-bold text-blue-800">
                      {userData.consultations_count || 0}
                    </p>
                    <p className="text-sm text-blue-600">
                      Consultas realizadas
                    </p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg border border-blue-100">
                    <p className="text-2xl font-bold text-blue-800">
                      {userData.proposals_count || 0}
                    </p>
                    <p className="text-sm text-blue-600">
                      Propuestas generadas
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                    bg-blue-50 text-blue-700 border border-blue-200"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Powered by AI</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-900">
                  Inteligencia Instantánea del Agua
                </h1>

                <p className="text-xl text-blue-700/80 leading-relaxed">
                  Soluciones avanzadas de ingeniería y diseño de tratamiento de
                  agua potenciadas por IA.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                    asChild
                  >
                    <Link href="/auth/register">Iniciar Ahora</Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/auth/login">Ya tengo cuenta</Link>
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-center">
            <div className="relative h-80 w-80">
              <div className="absolute inset-0 bg-blue-100/30 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <DropletAvatar
                  size="xl"
                  mood={isAuthenticated ? "happy" : "technical"}
                  animate={true}
                  className="h-80 w-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
