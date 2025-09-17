"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Upload, FileText, MessageSquare, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TechnicalDataFormsProps {
  projectId: string
}

export function TechnicalDataForms({ projectId }: TechnicalDataFormsProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Form states
  const [generalData, setGeneralData] = useState({
    projectName: "Planta Tratamiento Municipal Norte",
    client: "Municipalidad de San José",
    location: "San José, Costa Rica",
    sector: "Municipal",
    treatmentType: "Agua Potable",
    population: "50000",
    description:
      "Sistema de tratamiento de agua potable para abastecer 50,000 habitantes en la zona norte de San José.",
  })

  const [waterParameters, setWaterParameters] = useState({
    ph: "7.2",
    turbidity: "15.5",
    dbo5: "120",
    dqo: "280",
    sst: "85",
    coliforms: "1.2e4",
    temperature: "24",
    conductivity: "450",
    alkalinity: "180",
    hardness: "120",
  })

  const [flowData, setFlowData] = useState({
    averageFlow: "150",
    maxFlow: "225",
    minFlow: "80",
    peakFactor: "1.5",
    population: "50000",
    dotation: "250",
    connectionEfficiency: "85",
    consumptionPattern: "residential",
  })

  const [treatmentObjectives, setTreatmentObjectives] = useState([
    { parameter: "Turbidez", current: "15.5", target: "1", unit: "NTU", priority: "high" },
    { parameter: "DBO5", current: "120", target: "20", unit: "mg/L", priority: "high" },
    { parameter: "SST", current: "85", target: "30", unit: "mg/L", priority: "medium" },
    { parameter: "Coliformes", current: "1.2e4", target: "1000", unit: "UFC/100ml", priority: "high" },
  ])

  const [regulations, setRegulations] = useState([
    { name: "Reglamento de Vertido y Reuso de Aguas Residuales", code: "DE-33601-MINAE-S", applicable: true },
    { name: "Norma de Calidad del Agua Potable", code: "DE-38924-S", applicable: true },
    { name: "Reglamento de Aprovechamiento de Aguas Subterráneas", code: "DE-32327-MINAE", applicable: false },
  ])

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Datos guardados",
        description: `La sección ${section} ha sido actualizada correctamente.`,
      })
    }, 1000)
  }

  const addObjective = () => {
    setTreatmentObjectives([
      ...treatmentObjectives,
      { parameter: "", current: "", target: "", unit: "", priority: "medium" },
    ])
  }

  const removeObjective = (index: number) => {
    setTreatmentObjectives(treatmentObjectives.filter((_, i) => i !== index))
  }

  const updateObjective = (index: number, field: string, value: string) => {
    const updated = [...treatmentObjectives]
    updated[index] = { ...updated[index], [field]: value }
    setTreatmentObjectives(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ficha Técnica Editable</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar Excel
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Asistente IA
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Datos Generales</TabsTrigger>
          <TabsTrigger value="parameters">Parámetros</TabsTrigger>
          <TabsTrigger value="flow">Caudales</TabsTrigger>
          <TabsTrigger value="objectives">Objetivos</TabsTrigger>
          <TabsTrigger value="regulations">Normativas</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Información General del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Nombre del Proyecto</Label>
                  <Input
                    id="projectName"
                    value={generalData.projectName}
                    onChange={(e) => setGeneralData({ ...generalData, projectName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Input
                    id="client"
                    value={generalData.client}
                    onChange={(e) => setGeneralData({ ...generalData, client: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={generalData.location}
                    onChange={(e) => setGeneralData({ ...generalData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select
                    value={generalData.sector}
                    onValueChange={(value) => setGeneralData({ ...generalData, sector: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Municipal">Municipal</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                      <SelectItem value="Residencial">Residencial</SelectItem>
                      <SelectItem value="Agroindustrial">Agroindustrial</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="treatmentType">Tipo de Tratamiento</Label>
                  <Select
                    value={generalData.treatmentType}
                    onValueChange={(value) => setGeneralData({ ...generalData, treatmentType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Agua Potable">Agua Potable</SelectItem>
                      <SelectItem value="Aguas Residuales">Aguas Residuales</SelectItem>
                      <SelectItem value="Agua Industrial">Agua Industrial</SelectItem>
                      <SelectItem value="Reutilización">Reutilización</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="population">Población Servida</Label>
                  <Input
                    id="population"
                    type="number"
                    value={generalData.population}
                    onChange={(e) => setGeneralData({ ...generalData, population: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción del Proyecto</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={generalData.description}
                  onChange={(e) => setGeneralData({ ...generalData, description: e.target.value })}
                />
              </div>

              <Button onClick={() => handleSave("Datos Generales")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Parámetros Físico-Químicos del Agua</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph">pH</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      value={waterParameters.ph}
                      onChange={(e) => setWaterParameters({ ...waterParameters, ph: e.target.value })}
                    />
                    <Badge variant="outline">unidades</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="turbidity">Turbidez</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="turbidity"
                      type="number"
                      step="0.1"
                      value={waterParameters.turbidity}
                      onChange={(e) => setWaterParameters({ ...waterParameters, turbidity: e.target.value })}
                    />
                    <Badge variant="outline">NTU</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dbo5">DBO5</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="dbo5"
                      type="number"
                      value={waterParameters.dbo5}
                      onChange={(e) => setWaterParameters({ ...waterParameters, dbo5: e.target.value })}
                    />
                    <Badge variant="outline">mg/L</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dqo">DQO</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="dqo"
                      type="number"
                      value={waterParameters.dqo}
                      onChange={(e) => setWaterParameters({ ...waterParameters, dqo: e.target.value })}
                    />
                    <Badge variant="outline">mg/L</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sst">SST</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="sst"
                      type="number"
                      value={waterParameters.sst}
                      onChange={(e) => setWaterParameters({ ...waterParameters, sst: e.target.value })}
                    />
                    <Badge variant="outline">mg/L</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coliforms">Coliformes</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="coliforms"
                      value={waterParameters.coliforms}
                      onChange={(e) => setWaterParameters({ ...waterParameters, coliforms: e.target.value })}
                    />
                    <Badge variant="outline">UFC/100ml</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperatura</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      value={waterParameters.temperature}
                      onChange={(e) => setWaterParameters({ ...waterParameters, temperature: e.target.value })}
                    />
                    <Badge variant="outline">°C</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conductivity">Conductividad</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="conductivity"
                      type="number"
                      value={waterParameters.conductivity}
                      onChange={(e) => setWaterParameters({ ...waterParameters, conductivity: e.target.value })}
                    />
                    <Badge variant="outline">μS/cm</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alkalinity">Alcalinidad</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="alkalinity"
                      type="number"
                      value={waterParameters.alkalinity}
                      onChange={(e) => setWaterParameters({ ...waterParameters, alkalinity: e.target.value })}
                    />
                    <Badge variant="outline">mg CaCO₃/L</Badge>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("Parámetros del Agua")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Parámetros"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flow" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Datos de Caudales y Capacidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Caudales de Diseño</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="averageFlow">Caudal Promedio</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="averageFlow"
                          type="number"
                          step="0.1"
                          value={flowData.averageFlow}
                          onChange={(e) => setFlowData({ ...flowData, averageFlow: e.target.value })}
                        />
                        <Badge variant="outline">L/s</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxFlow">Caudal Máximo</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="maxFlow"
                          type="number"
                          step="0.1"
                          value={flowData.maxFlow}
                          onChange={(e) => setFlowData({ ...flowData, maxFlow: e.target.value })}
                        />
                        <Badge variant="outline">L/s</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minFlow">Caudal Mínimo</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="minFlow"
                          type="number"
                          step="0.1"
                          value={flowData.minFlow}
                          onChange={(e) => setFlowData({ ...flowData, minFlow: e.target.value })}
                        />
                        <Badge variant="outline">L/s</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="peakFactor">Factor Pico</Label>
                      <Input
                        id="peakFactor"
                        type="number"
                        step="0.1"
                        value={flowData.peakFactor}
                        onChange={(e) => setFlowData({ ...flowData, peakFactor: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Parámetros de Población</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="flowPopulation">Población</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="flowPopulation"
                          type="number"
                          value={flowData.population}
                          onChange={(e) => setFlowData({ ...flowData, population: e.target.value })}
                        />
                        <Badge variant="outline">habitantes</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dotation">Dotación</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="dotation"
                          type="number"
                          value={flowData.dotation}
                          onChange={(e) => setFlowData({ ...flowData, dotation: e.target.value })}
                        />
                        <Badge variant="outline">L/hab/día</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="connectionEfficiency">Eficiencia de Conexión</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="connectionEfficiency"
                          type="number"
                          value={flowData.connectionEfficiency}
                          onChange={(e) => setFlowData({ ...flowData, connectionEfficiency: e.target.value })}
                        />
                        <Badge variant="outline">%</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="consumptionPattern">Patrón de Consumo</Label>
                      <Select
                        value={flowData.consumptionPattern}
                        onValueChange={(value) => setFlowData({ ...flowData, consumptionPattern: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residencial</SelectItem>
                          <SelectItem value="commercial">Comercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="mixed">Mixto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("Datos de Caudales")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Caudales"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Objetivos de Tratamiento</CardTitle>
              <Button onClick={addObjective} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Objetivo
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {treatmentObjectives.map((objective, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Objetivo {index + 1}</h4>
                    <Button variant="ghost" size="icon" onClick={() => removeObjective(index)} className="h-6 w-6">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label>Parámetro</Label>
                      <Input
                        value={objective.parameter}
                        onChange={(e) => updateObjective(index, "parameter", e.target.value)}
                        placeholder="ej. Turbidez"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Valor Actual</Label>
                      <Input
                        value={objective.current}
                        onChange={(e) => updateObjective(index, "current", e.target.value)}
                        placeholder="ej. 15.5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Valor Meta</Label>
                      <Input
                        value={objective.target}
                        onChange={(e) => updateObjective(index, "target", e.target.value)}
                        placeholder="ej. 1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Unidad</Label>
                      <Input
                        value={objective.unit}
                        onChange={(e) => updateObjective(index, "unit", e.target.value)}
                        placeholder="ej. NTU"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Prioridad</Label>
                      <Select
                        value={objective.priority}
                        onValueChange={(value) => updateObjective(index, "priority", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="low">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={() => handleSave("Objetivos de Tratamiento")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Objetivos"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Normativas y Regulaciones Aplicables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {regulations.map((regulation, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{regulation.name}</h4>
                    <p className="text-sm text-muted-foreground">{regulation.code}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={regulation.applicable ? "default" : "outline"}>
                      {regulation.applicable ? "Aplicable" : "No Aplicable"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updated = [...regulations]
                        updated[index].applicable = !updated[index].applicable
                        setRegulations(updated)
                      }}
                    >
                      {regulation.applicable ? "Desactivar" : "Activar"}
                    </Button>
                  </div>
                </div>
              ))}

              <Button onClick={() => handleSave("Normativas")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Normativas"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
