import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SUGGESTED_PROMPTS = [
  {
    title: "Diseño de sistema",
    text: "Necesito una solución para tratar aguas residuales de una planta de 500 m³/día en el sector textil",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Análisis de agua",
    text: "¿Qué significan estos parámetros en mi análisis de agua? DBO: 350 mg/L, SST: 180 mg/L, pH: 6.8",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Normativa",
    text: "¿Cuáles son los límites máximos permisibles para descarga de aguas residuales industriales?",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Costos",
    text: "¿Cuánto costaría implementar un sistema de MBR para tratar 200 m³/día de agua residual?",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

interface WelcomeScreenProps {
  onStartConversation: (message: string) => void;
}

export default function WelcomeScreen({ onStartConversation }: WelcomeScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-hydrous-300 to-hydrous-600 flex items-center justify-center shadow-lg">
                <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-hydrous-500/40 animate-water-ripple"></div>
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-hydrous-900">
            Bienvenido a Hydrous AI
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Tu ingeniero experto en soluciones hídricas y tratamiento de agua
          </p>
        </div>

        {/* Características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            icon={
              <svg className="h-6 w-6 text-hydrous-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="Diseño Personalizado"
            description="Soluciones de ingeniería adaptadas a tus necesidades específicas"
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6 text-hydrous-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            }
            title="Información Técnica"
            description="Datos precisos sobre normativas, parámetros y tecnologías"
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6 text-hydrous-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="Propuestas Detalladas"
            description="Generación de documentos profesionales para tu proyecto"
          />
        </div>

        {/* Sugerencias de prompts */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-gray-700">Prueba estos ejemplos:</h2>
          <div className="grid grid-cols-1 gap-3">
            {SUGGESTED_PROMPTS.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-3 px-4 bg-white hover:bg-hydrous-50 border-hydrous-200 text-left"
                onClick={() => onStartConversation(prompt.text)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-hydrous-100 rounded-full flex items-center justify-center mr-3">
                    {prompt.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{prompt.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{prompt.text}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Sube archivos de análisis de agua o especificaciones para una propuesta más precisa.</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="p-5 bg-white border-hydrous-100 hover:border-hydrous-200 transition-colors">
      <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 bg-hydrous-50 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-base font-medium text-hydrous-800">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Card>
  );
}
