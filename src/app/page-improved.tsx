import HeaderImproved from "@/components/layout/header-improved";
import ChatContainerImproved from "@/components/chat/chat-container-improved";
import TechInfoPanel from "@/components/ui/tech-info-panel";

export default function HomeImproved() {
  return (
    <div className="flex flex-col min-h-screen bg-hydrous-50/30">
      {/* Header mejorado */}
      <HeaderImproved />

      <main className="flex-1 container relative">
        {/* Panel de información tecnológica */}
        <TechInfoPanel />

        {/* Contenedor principal de chat mejorado */}
        <ChatContainerImproved />
      </main>

      {/* Footer minimalista con efecto de agua */}
      <footer className="py-3 border-t border-hydrous-100 bg-white/80 backdrop-blur-sm relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          {/* Logo y copyright */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-hydrous-300 to-hydrous-500 flex items-center justify-center text-white">
              <WaterIcon className="h-3 w-3" />
            </div>
            <span>© 2025 H<sub>2</sub>O Allegiant Technologies</span>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-hydrous-600 transition-colors">Términos</a>
            <a href="#" className="hover:text-hydrous-600 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-hydrous-600 transition-colors">Documentación</a>
            <a href="#" className="hover:text-hydrous-600 transition-colors">Contacto</a>
          </div>

          {/* Efecto de onda en el footer */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hydrous-300/30 to-transparent"></div>
        </div>
      </footer>
    </div>
  );
}

// Icono de agua
function WaterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}
