"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { apiService } from "@/lib/api-client"

// Datos de sectores y subsectores para el selector
const INDUSTRY_SECTORS = [
  {
    id: "industrial",
    name: "Industrial",
    subsectors: [
      "Food and Beverages",
      "Textile",
      "Petrochemical",
      "Pharmaceutical",
      "Mining",
      "Oil and Gas",
      "Metal/Automotive",
      "Cement"
    ]
  },
  {
    id: "commercial",
    name: "Commercial",
    subsectors: [
      "Hotel",
      "Office Building",
      "Shopping Mall/Retail",
      "Restaurant"
    ]
  },
  {
    id: "municipal",
    name: "Municipal",
    subsectors: [
      "City Government",
      "Town/Village",
      "Water Utility Authority"
    ]
  },
  {
    id: "residential",
    name: "Residential",
    subsectors: [
      "Single-family housing",
      "Multi-family building"
    ]
  }
];

export default function RegisterPage() {
  const router = useRouter(); // Para redireccionar después del registro
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSector, setSelectedSector] = useState("")
  const [subsectors, setSubsectors] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    location: "",
    sector: "",
    subsector: "",
    password: ""
  })

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir al chat
    if (apiService.isAuthenticated()) {
      router.push('/chat');
    }
  }, [router]);

  // Update subsectors when sector changes
  useEffect(() => {
    if (!selectedSector) {
      setSubsectors([]);
      return;
    }

    const sector = INDUSTRY_SECTORS.find(s => s.id === selectedSector);
    if (sector) {
      setSubsectors(sector.subsectors);
      // Reset subsector selection when sector changes
      setFormData(prev => ({ ...prev, subsector: "", sector: selectedSector }));
    }
  }, [selectedSector]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Limpiar mensaje de error al editar
    if (errorMessage) setErrorMessage(null);
  };

  // Handle sector selection
  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
    // El sector se actualiza en useEffect
  };

  // Handle subsector selection
  const handleSubsectorChange = (value: string) => {
    setFormData(prev => ({ ...prev, subsector: value }));
    // Limpiar mensaje de error al editar
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      // Prepare data for API
      const registrationData = {
        first_name: formData.firstName,     // Convertir a snake_case para el backend
        last_name: formData.lastName,
        email: formData.email,
        company_name: formData.company,
        location: formData.location,
        sector: formData.sector,
        subsector: formData.subsector,
        password: formData.password
      };

      console.log("Enviando datos de registro:", registrationData);

      // Llamar a la API de registro
      const response = await apiService.registerUser(registrationData);
      console.log("Registro exitoso:", response);

      // Redireccionar al chat en caso de éxito
      router.push('/chat');
    } catch (error: any) {
      console.error("Error durante el registro:", error);

      // Manejar error de registro
      if (error.response && error.response.data) {
        if (error.response.data.detail) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error en el registro. Por favor, inténtalo de nuevo.");
        }
      } else {
        setErrorMessage("Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Helper component para tooltips de información
  const InfoTooltip = ({ content }: { content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-5 w-5 text-blue-500 hover:text-blue-700 hover:bg-transparent -mt-0.5">
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Información</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-blue-50 text-blue-800 border border-blue-200">
          <p className="text-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-blue-100 shadow-lg overflow-hidden">
        {/* Efecto decorativo superior con degradado */}
        <div className="h-1.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 w-full"></div>

        {/* Ondas decorativas sutiles */}
        <div className="absolute right-0 top-24 w-32 h-32 bg-blue-100/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute left-0 bottom-24 w-36 h-36 bg-blue-200/10 rounded-full blur-3xl -z-10"></div>

        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-blue-300/20 rounded-full blur-xl scale-150"></div>
              <div className="h-16 w-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </motion.div>
          </div>

          <CardTitle className="text-center text-2xl text-blue-800">Crear Cuenta</CardTitle>
          <CardDescription className="text-center">
            Únete a H₂O Allegiant para soluciones avanzadas de tratamiento de agua
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Mensaje de error */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sección: Datos personales */}
            <div className="space-y-1 mb-1">
              <p className="text-xs font-medium text-blue-600">Datos personales</p>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  autoComplete="given-name"
                  className="focus-visible:ring-blue-500/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  autoComplete="family-name"
                  className="focus-visible:ring-blue-500/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@correo.com"
                required
                autoComplete="email"
                className="focus-visible:ring-blue-500/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="new-password"
                className="focus-visible:ring-blue-500/30"
              />
            </div>

            {/* Sección: Datos de empresa */}
            <div className="space-y-1 pt-2 mb-1">
              <p className="text-xs font-medium text-blue-600">Datos de empresa</p>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="company">Nombre de Empresa</Label>
                <InfoTooltip content="El nombre de su empresa para personalizar las soluciones" />
              </div>
              <Input
                id="company"
                value={formData.company}
                onChange={handleInputChange}
                autoComplete="organization"
                className="focus-visible:ring-blue-500/30"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="location">Ubicación</Label>
                <InfoTooltip content="La ubicación nos ayuda a considerar normativas locales aplicables" />
              </div>
              <Input
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ciudad, Estado, País"
                className="focus-visible:ring-blue-500/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="sector">Sector Industrial</Label>
                  <InfoTooltip content="El sector industrial permite ofrecer soluciones específicas para su área" />
                </div>
                <Select onValueChange={handleSectorChange} value={selectedSector}>
                  <SelectTrigger className="focus-visible:ring-blue-500/30">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[240px]">
                    {INDUSTRY_SECTORS.map(sector => (
                      <SelectItem key={sector.id} value={sector.id}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="subsector">Subsector</Label>
                  <InfoTooltip content="El subsector permite afinar aún más las recomendaciones técnicas" />
                </div>
                <Select
                  onValueChange={handleSubsectorChange}
                  value={formData.subsector}
                  disabled={!selectedSector || subsectors.length === 0}
                >
                  <SelectTrigger className="focus-visible:ring-blue-500/30">
                    <SelectValue placeholder={selectedSector ? "Seleccionar..." : "Elija sector primero"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {subsectors.map(subsector => (
                      <SelectItem key={subsector} value={subsector}>
                        {subsector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <motion.div
              className="pt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creando cuenta...</span>
                  </div>
                ) : (
                  <span>Crear Cuenta</span>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-blue-50 pt-4 pb-6">
          <p className="text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/auth/login"
              className="text-blue-700 font-medium hover:text-blue-800 hover:underline transition-colors"
            >
              Iniciar Sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
