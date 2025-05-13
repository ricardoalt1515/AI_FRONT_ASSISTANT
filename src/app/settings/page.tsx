"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { apiService } from "@/lib/api-client"
import { User, Building, Settings, Shield, Bell, CreditCard } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  // Estados para cada sección
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: ""
  })

  const [company, setCompany] = useState({
    name: "",
    sector: "",
    subsector: "",
    location: "",
    taxId: ""
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    autoSaveConversations: true,
    showTechnicalDetails: true,
    preferredUnits: "metric",
    language: "es",
    timezone: "America/Mexico_City"
  })

  const [technical, setTechnical] = useState({
    defaultWaterFlow: "",
    complianceStandards: "EPA",
    maxBudget: "",
    maxFootprint: "",
    reportTemplate: "standard",
    includeFinancials: true
  })

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataStr = localStorage.getItem('userData')
        if (userDataStr) {
          const data = JSON.parse(userDataStr)
          setUserData(data)

          // Llenar los formularios con los datos existentes
          setProfile({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: data.email || "",
            phone: data.phone || "",
            position: data.position || ""
          })

          setCompany({
            name: data.company_name || "",
            sector: data.sector || "",
            subsector: data.subsector || "",
            location: data.location || "",
            taxId: data.tax_id || ""
          })

          // Los demás estados se podrían cargar de la API si existiera
        } else {
          // Si no hay datos, redirigir al login
          router.push('/auth/login')
        }
      } catch (error) {
        console.error("Error cargando datos:", error)
        toast.error("Error al cargar los datos del usuario")
      }
    }

    loadUserData()
  }, [router])

  // Guardar cambios en el perfil
  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      // Aquí iría la llamada a la API para actualizar el perfil
      // Por ahora, actualizamos localStorage
      const updatedData = {
        ...userData,
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        position: profile.position
      }

      localStorage.setItem('userData', JSON.stringify(updatedData))
      toast.success("Perfil actualizado correctamente")
    } catch (error) {
      toast.error("Error al actualizar el perfil")
    } finally {
      setIsLoading(false)
    }
  }

  // Guardar cambios en la empresa
  const handleSaveCompany = async () => {
    setIsLoading(true)
    try {
      const updatedData = {
        ...userData,
        company_name: company.name,
        sector: company.sector,
        subsector: company.subsector,
        location: company.location,
        tax_id: company.taxId
      }

      localStorage.setItem('userData', JSON.stringify(updatedData))
      toast.success("Datos de empresa actualizados")
    } catch (error) {
      toast.error("Error al actualizar datos de empresa")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Configuración</h1>
        <p className="text-blue-700/80 mt-2">
          Administra tu perfil, preferencias y configuración de la aplicación
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full md:w-auto mb-8 bg-blue-50/50">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Preferencias</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Técnico</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab de Perfil */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información personal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+52 123 456 7890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input
                    id="position"
                    value={profile.position}
                    onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                    placeholder="Ingeniero de Tratamiento de Agua"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Empresa */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
              <CardDescription>
                Actualiza los datos de tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nombre de la empresa</Label>
                <Input
                  id="companyName"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select
                    value={company.sector}
                    onValueChange={(value) => setCompany({ ...company, sector: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="food">Alimenticia</SelectItem>
                      <SelectItem value="pharma">Farmacéutica</SelectItem>
                      <SelectItem value="textile">Textil</SelectItem>
                      <SelectItem value="chemical">Química</SelectItem>
                      <SelectItem value="commercial">Comercial</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subsector">Subsector</Label>
                  <Input
                    id="subsector"
                    value={company.subsector}
                    onChange={(e) => setCompany({ ...company, subsector: e.target.value })}
                    placeholder="Ej: Procesamiento de alimentos"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={company.location}
                  onChange={(e) => setCompany({ ...company, location: e.target.value })}
                  placeholder="Ciudad, Estado, País"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">RFC/ID Fiscal</Label>
                <Input
                  id="taxId"
                  value={company.taxId}
                  onChange={(e) => setCompany({ ...company, taxId: e.target.value })}
                  placeholder="RFC de la empresa"
                />
              </div>

              <Button
                onClick={handleSaveCompany}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Preferencias */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de la Aplicación</CardTitle>
              <CardDescription>
                Personaliza cómo funciona la aplicación para ti
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Notificaciones por email</Label>
                  <p className="text-sm text-blue-600/80">
                    Recibe actualizaciones sobre tus consultas
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSave">Guardar conversaciones automáticamente</Label>
                  <p className="text-sm text-blue-600/80">
                    Guarda el historial de chat automáticamente
                  </p>
                </div>
                <Switch
                  id="autoSave"
                  checked={preferences.autoSaveConversations}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, autoSaveConversations: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="technicalDetails">Mostrar detalles técnicos</Label>
                  <p className="text-sm text-blue-600/80">
                    Ver cálculos y detalles técnicos avanzados
                  </p>
                </div>
                <Switch
                  id="technicalDetails"
                  checked={preferences.showTechnicalDetails}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, showTechnicalDetails: checked })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="units">Sistema de unidades</Label>
                  <Select
                    value={preferences.preferredUnits}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, preferredUnits: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Métrico (m³, kg)</SelectItem>
                      <SelectItem value="imperial">Imperial (gal, lb)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, language: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {isLoading ? "Guardando..." : "Guardar preferencias"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Técnico */}
        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle>Configuración Técnica</CardTitle>
              <CardDescription>
                Parámetros predeterminados para análisis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultFlow">Flujo de agua predeterminado (m³/día)</Label>
                  <Input
                    id="defaultFlow"
                    type="number"
                    value={technical.defaultWaterFlow}
                    onChange={(e) =>
                      setTechnical({ ...technical, defaultWaterFlow: e.target.value })
                    }
                    placeholder="Ej: 100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="standards">Normativa de cumplimiento</Label>
                  <Select
                    value={technical.complianceStandards}
                    onValueChange={(value) =>
                      setTechnical({ ...technical, complianceStandards: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EPA">EPA (USA)</SelectItem>
                      <SelectItem value="EU">Directiva EU</SelectItem>
                      <SelectItem value="LOCAL">Normativa Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxBudget">Presupuesto máximo ($)</Label>
                  <Input
                    id="maxBudget"
                    type="number"
                    value={technical.maxBudget}
                    onChange={(e) =>
                      setTechnical({ ...technical, maxBudget: e.target.value })
                    }
                    placeholder="Ej: 500000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxFootprint">Área máxima disponible (m²)</Label>
                  <Input
                    id="maxFootprint"
                    type="number"
                    value={technical.maxFootprint}
                    onChange={(e) =>
                      setTechnical({ ...technical, maxFootprint: e.target.value })
                    }
                    placeholder="Ej: 250"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportTemplate">Plantilla de reporte</Label>
                <Select
                  value={technical.reportTemplate}
                  onValueChange={(value) =>
                    setTechnical({ ...technical, reportTemplate: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Estándar</SelectItem>
                    <SelectItem value="detailed">Detallado</SelectItem>
                    <SelectItem value="executive">Ejecutivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="includeFinancials">Incluir análisis financiero</Label>
                  <p className="text-sm text-blue-600/80">
                    Agrega ROI y análisis de costos a los reportes
                  </p>
                </div>
                <Switch
                  id="includeFinancials"
                  checked={technical.includeFinancials}
                  onCheckedChange={(checked) =>
                    setTechnical({ ...technical, includeFinancials: checked })
                  }
                />
              </div>

              <Button
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {isLoading ? "Guardando..." : "Guardar configuración"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
