import ChatContainer from "@/components/chat/chat-container";
import Header from "@/components/layout/header";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      {/* Fondo refinado con efectos sutiles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Gradiente base refinado */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white/90 to-white"></div>

        {/* Patrón sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>

        {/* Formas fluidas simplificadas */}
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-300/10 to-blue-500/5 filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/10 to-blue-500/5 filter blur-3xl opacity-20"></div>

        {/* Líneas fluidas */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/15 to-transparent"></div>
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
