import ChatContainer from "@/components/chat/chat-container";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      {/* Fondo con efectos de agua */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white/80 to-white/90"></div>

        {/* Patrón sutil de agua */}
        <div className="absolute inset-0 bg-water-pattern opacity-20"></div>
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
