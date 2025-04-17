export default function Header() {
  return (
    <div className="relative overflow-hidden">
      {/* Efectos de fondo del header */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-hydrous-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-water-wave"></div>
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-hydrous-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      </div>

      <header className="relative z-10 border-b border-hydrous-100 bg-white/70 backdrop-blur-sm">
        <div className="container py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Logo y título mejorados */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-hydrous-400 to-hydrous-600 rounded-full flex items-center justify-center shadow-lg">
                  <WaterIcon className="h-7 w-7 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-hydrous-500/40 animate-water-ripple"></div>
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-hydrous-900">
                  H2O Allegiant <span className="font-light">AI</span>
                </h1>
                <div className="flex items-center flex-wrap gap-2">
                  <p className="text-sm font-medium text-hydrous-600">
                    Water Solution Designer
                  </p>
                  <span className="px-1.5 py-0.5 bg-hydrous-100 text-hydrous-700 text-xs rounded-md">Expert</span>

                  {/* Métricas de credibilidad */}
                  <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                    <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                    <div className="flex items-center gap-1">
                      <span className="text-hydrous-700 font-medium">97%</span> precisión técnica
                    </div>
                    <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                    <div className="flex items-center gap-1">
                      <span className="text-hydrous-700 font-medium">36%</span> ahorro promedio
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Métricas de confianza para desktop */}
            <div className="hidden md:flex items-center gap-4 mt-2 sm:mt-0">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-8 w-8 bg-hydrous-50 rounded-full flex items-center justify-center">
                  <CertificateIcon className="h-4 w-4 text-hydrous-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Certificado</span>
                  <span className="font-medium text-gray-700">ISO 14001</span>
                </div>
              </div>

              <div className="h-6 w-px bg-gray-200"></div>

              <div className="flex items-center gap-2 text-xs">
                <div className="h-8 w-8 bg-hydrous-50 rounded-full flex items-center justify-center">
                  <ProjectIcon className="h-4 w-4 text-hydrous-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Proyectos</span>
                  <span className="font-medium text-gray-700">500+ completados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

// Íconos adicionales para el header
function CertificateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function ProjectIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

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
