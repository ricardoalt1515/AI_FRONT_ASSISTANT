// src/components/chat/welcome-screen.tsx (versión sin SUGGESTED_PROMPTS)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WelcomeScreen({ onStartConversation }: WelcomeScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-6">
      <div className="max-w-3xl w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-hydrous-300 to-hydrous-600 flex items-center justify-center shadow-lg">
                <svg className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-hydrous-500/40 animate-water-ripple"></div>

              {/* Partículas pequeñas de agua alrededor */}
              <div className="absolute -top-4 -left-4 h-6 w-6 bg-hydrous-200 rounded-full opacity-60 animate-water-float"></div>
              <div className="absolute -bottom-2 -right-2 h-4 w-4 bg-hydrous-300 rounded-full opacity-70 animate-water-float animation-delay-1000"></div>
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-hydrous-900 bg-clip-text text-transparent bg-gradient-to-r from-hydrous-700 to-hydrous-900">
            H2O Allegiant AI
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Tu ingeniero experto en soluciones hídricas y tratamiento de agua
          </p>
        </div>

        {/* Estadísticas impactantes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            value="85%"
            label="Reducción promedio de consumo hídrico"
            icon={<WaterDropIcon />}
          />
          <StatCard
            value="36%"
            label="Ahorro en costos operativos"
            icon={<ChartIcon />}
          />
          <StatCard
            value="100%"
            label="Cumplimiento normativo garantizado"
            icon={<ShieldIcon />}
          />
        </div>

        {/* Botón para comenzar directamente */}
        <div className="text-center mt-6">
          <Button
            onClick={() => onStartConversation("Hola, necesito ayuda con un proyecto de tratamiento de agua.")}
            className="px-8 py-6 text-base bg-gradient-to-r from-hydrous-500 to-hydrous-600 hover:from-hydrous-600 hover:to-hydrous-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Comenzar Consulta Técnica
            </div>
          </Button>
        </div>

        {/* Footer con información adicional */}
        <div className="bg-hydrous-50 px-6 py-4 rounded-xl border border-hydrous-100 mt-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-hydrous-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="h-5 w-5 text-hydrous-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-hydrous-800">Cómo funciona</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Comparte tus requerimientos técnicos y H2O Allegiant generará análisis personalizados
                y propuestas profesionales para tu proyecto de tratamiento de agua.
                Puedes subir archivos de análisis para resultados más precisos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares necesarios
function StatCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <Card className="p-5 bg-white/80 border-hydrous-100 hover:border-hydrous-200 transition-all duration-300 overflow-hidden group relative">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 h-12 w-12 bg-hydrous-50 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-hydrous-800 group-hover:text-hydrous-700 transition-colors">
            {value}
          </h3>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>

      {/* Elemento de agua decorativo */}
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-hydrous-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Card>
  );
}

// Íconos necesarios
function WaterDropIcon() {
  return (
    <svg className="h-6 w-6 text-hydrous-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="h-6 w-6 text-hydrous-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-6 w-6 text-hydrous-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
