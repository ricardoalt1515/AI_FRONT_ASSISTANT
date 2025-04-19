import ChatContainer from "@/components/chat/chat-container";
import Header from "@/components/layout/header";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      {/* Fondo con efectos de agua avanzados (sin framer-motion) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Base gradient con efecto profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white/60 to-white/90"></div>

        {/* Malla de puntos sutiles para textura */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>

        {/* Formas fluidas abstractas con animación sutil */}
        <div className="absolute top-20 -left-40 w-[80rem] h-[80rem] rounded-full 
       bg-gradient-to-br from-blue-300/5 to-blue-400/5 
       filter blur-3xl opacity-30 animate-slow-morph">
        </div>

        <div className="absolute -bottom-40 right-0 w-[60rem] h-[60rem] rounded-full 
       bg-gradient-to-br from-blue-400/5 to-blue-500/5
       filter blur-3xl opacity-20 animate-slow-morph animation-delay-2000">
        </div>

        {/* Efecto de "luz ambiental" en esquinas */}
        <div className="absolute -top-20 right-0 w-96 h-96 bg-gradient-radial from-blue-200/10 to-transparent opacity-40 blur-3xl"></div>
        <div className="absolute -bottom-20 left-0 w-96 h-96 bg-gradient-radial from-blue-300/10 to-transparent opacity-30 blur-3xl"></div>

        {/* Líneas de flujo de datos - efecto tecnológico sutil */}
        <div className="absolute top-1/3 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-200/10 to-transparent animate-pulse-subtle animation-delay-1000"></div>
      </div>

      {/* Contenedor principal */}
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        <ChatContainer />
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-blue-100 py-4 bg-white/80 backdrop-blur-md">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-blue-600/80">
              © {new Date().getFullYear()} H₂O Allegiant • Soluciones Avanzadas de Tratamiento de Agua
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
