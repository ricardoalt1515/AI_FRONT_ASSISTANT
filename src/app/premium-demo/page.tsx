import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Palette, Code, Zap } from 'lucide-react';

import PremiumDashboard from '@/components/dashboard/premium-dashboard';
import PremiumAIAgentsFlow from '@/components/agents/premium-ai-agents-flow';
import PremiumProcurementWizard from '@/components/agents/premium-procurement-wizard';
import PremiumDiscoveryChat from '@/components/chat/premium-discovery-chat';

import { 
  mockPremiumDashboard,
  mockAIWorkflows,
  mockProcurementComparison,
  mockDiscoverySession
} from '@/lib/mock-data';

export default function PremiumDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              H₂O Allegiant Premium UI
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Demostración de la nueva interfaz premium para la plataforma de IA de tratamiento de agua. 
            Diseño minimalista, elegante y centrado en la experiencia del usuario.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge className="bg-green-100 text-green-800 border-green-300 px-3 py-1">
              <Palette className="h-4 w-4 mr-2" />
              shadcn/ui Components
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300 px-3 py-1">
              <Code className="h-4 w-4 mr-2" />
              TypeScript + Tailwind
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-300 px-3 py-1">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered UX
            </Badge>
          </div>
        </div>

        {/* Demo Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="text-sm">
              Dashboard Premium
            </TabsTrigger>
            <TabsTrigger value="agents" className="text-sm">
              AI Agents Flow
            </TabsTrigger>
            <TabsTrigger value="procurement" className="text-sm">
              Procurement Wizard
            </TabsTrigger>
            <TabsTrigger value="discovery" className="text-sm">
              Discovery Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Dashboard Premium</CardTitle>
                <CardDescription className="text-blue-700">
                  Vista ejecutiva con métricas clave, proyectos activos y acciones urgentes. 
                  Diseño limpio con jerarquía visual clara y gradientes profesionales.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <PremiumDashboard 
              executiveMetrics={mockPremiumDashboard.executiveMetrics}
              valueMetrics={mockPremiumDashboard.valueMetrics}
              projects={mockPremiumDashboard.projects}
              quickActions={mockPremiumDashboard.quickActions}
            />
          </TabsContent>

          <TabsContent value="agents" className="space-y-4">
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-900">AI Agents Flow</CardTitle>
                <CardDescription className="text-purple-700">
                  Pipeline visual de agentes de IA trabajando en colaboración. 
                  Incluye métricas en tiempo real, dependencias y línea de tiempo detallada.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <PremiumAIAgentsFlow workflow={mockAIWorkflows[0]} />
          </TabsContent>

          <TabsContent value="procurement" className="space-y-4">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Procurement Wizard</CardTitle>
                <CardDescription className="text-green-700">
                  Herramienta inteligente para comparar equipos, analizar cotizaciones y tomar decisiones de procurement. 
                  Con scoring automatizado y recomendaciones de IA.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <PremiumProcurementWizard comparison={mockProcurementComparison} />
          </TabsContent>

          <TabsContent value="discovery" className="space-y-4">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-900">Discovery Chat</CardTitle>
                <CardDescription className="text-yellow-700">
                  Chat inteligente para descubrir requerimientos técnicos. 
                  La IA extrae y valida información automáticamente mientras conversa con el cliente.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <PremiumDiscoveryChat session={mockDiscoverySession} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardContent className="text-center py-6">
            <p className="text-sm text-muted-foreground">
              Esta demostración muestra los componentes premium de H₂O Allegiant con datos simulados. 
              Todos los componentes utilizan shadcn/ui exclusivamente para garantizar consistencia visual.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}