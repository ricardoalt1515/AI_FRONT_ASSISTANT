import ChatContainer from "@/components/chat/chat-container";
import Header from "@/components/layout/header";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      {/* Fondo con efectos de agua avanzados (sin framer-motion) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Gradiente base enriquecido */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/70 via-blue-50/40 to-white/90"></div>

        {/* Patrones de ondas de agua */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,50 Q25,30 40,50 T70,50 T100,50' stroke='%230ea5e9' fill='none' stroke-width='2'/%3E%3Cpath d='M0,60 Q15,40 30,60 T60,60 T90,60' stroke='%230ea5e9' fill='none' stroke-width='1.5'/%3E%3Cpath d='M0,70 Q20,50 40,70 T80,70' stroke='%230ea5e9' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '400px 400px',
          }}
        ></div>

        {/* Formas fluidas abstractas */}
        <div
          className="absolute top-10 left-1/4 w-[70rem] h-[70rem] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-blue-300/5 
             filter blur-3xl animate-slow-morph"
        ></div>

        <div
          className="absolute -bottom-20 right-1/4 w-[60rem] h-[60rem] rounded-[60%_40%_30%_70%/50%_60%_40%_60%] bg-blue-400/5 
             filter blur-3xl animate-slow-morph animation-delay-2000"
        ></div>

        {/* Partículas flotantes */}
        <div className="absolute top-1/4 left-1/3 h-3 w-3 bg-blue-200/30 rounded-full animate-water-float"></div>
        <div className="absolute top-2/3 right-1/4 h-5 w-5 bg-blue-200/20 rounded-full animate-water-float animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 h-4 w-4 bg-blue-300/10 rounded-full animate-water-float animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 h-2 w-2 bg-blue-400/20 rounded-full animate-water-float animation-delay-1500"></div>
        <div className="absolute bottom-1/4 left-1/4 h-4 w-4 bg-blue-300/15 rounded-full animate-water-float animation-delay-500"></div>

        {/* Líneas de flujo de datos/agua */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent animate-pulse-subtle"></div>
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent animate-pulse-subtle animation-delay-1000"></div>
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
