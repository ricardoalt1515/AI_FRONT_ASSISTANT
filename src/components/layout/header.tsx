export default function Header() {
  return (
    <div className="relative overflow-hidden">
      {/* Efecto ondulante de agua en background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-hydrous-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-water-wave"></div>
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-hydrous-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      </div>

      <header className="relative z-10 border-b border-hydrous-100 bg-white/80 backdrop-blur-sm">
        <div className="container py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-hydrous-400 to-hydrous-600 rounded-full flex items-center justify-center shadow-lg">
                  <WaterIcon className="h-7 w-7 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-hydrous-500/40 animate-water-ripple"></div>
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-hydrous-900">
                  Hydrous <span className="font-light">AI</span>
                </h1>
                <p className="text-sm font-medium text-hydrous-600">
                  Water Solution Designer <span className="px-1 py-0.5 ml-1 bg-hydrous-100 text-hydrous-700 text-xs rounded-md">Expert</span>
                </p>
              </div>
            </div>

            {/* Botones de acción (futura implementación) */}
            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center gap-1 text-sm text-hydrous-600 hover:text-hydrous-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Exportar</span>
              </button>

              <button className="hidden sm:flex items-center gap-1 text-sm text-hydrous-600 hover:text-hydrous-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <rect x="2" y="3" width="20" height="18" rx="2" />
                  <path d="M22 3H2" />
                  <path d="M7 8h.01" />
                  <path d="M12 8h.01" />
                  <path d="M17 8h.01" />
                </svg>
                <span>Nuevo Chat</span>
              </button>
            </div>
          </div>
        </div>
      </header>
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
