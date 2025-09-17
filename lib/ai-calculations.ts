export interface WaterParameters {
  ph: number
  turbidity: number
  dbo5: number
  dqo: number
  sst: number
  coliforms: number
  flow: number
  population: number
}

export interface TreatmentObjective {
  parameter: string
  current: string
  target: string
  unit: string
  priority: "high" | "medium" | "low"
}

export interface TechnologyRecommendation {
  name: string
  efficiency: number
  capex_factor: number
  opex_factor: number
  applicability_score: number
  pros: string[]
  cons: string[]
}

export class AICalculationEngine {
  static calculateOptimalTechnologies(
    parameters: WaterParameters,
    objectives: TreatmentObjective[],
  ): TechnologyRecommendation[] {
    const technologies: TechnologyRecommendation[] = []

    // Coagulation-Flocculation for turbidity and suspended solids
    if (parameters.turbidity > 5 || parameters.sst > 30) {
      technologies.push({
        name: "Coagulación-Floculación",
        efficiency: 85,
        capex_factor: 0.15,
        opex_factor: 0.08,
        applicability_score: 0.9,
        pros: ["Alta eficiencia para turbidez", "Tecnología probada", "Bajo mantenimiento"],
        cons: ["Requiere químicos", "Genera lodos"],
      })
    }

    // Biological treatment for BOD/COD
    if (parameters.dbo5 > 30 || parameters.dqo > 60) {
      technologies.push({
        name: "Tratamiento Biológico",
        efficiency: 90,
        capex_factor: 0.25,
        opex_factor: 0.12,
        applicability_score: 0.85,
        pros: ["Alta eficiencia orgánicos", "Bajo costo operativo", "Ambientalmente amigable"],
        cons: ["Tiempo de arranque", "Sensible a tóxicos"],
      })
    }

    // Filtration for final polishing
    technologies.push({
      name: "Filtración Rápida",
      efficiency: 95,
      capex_factor: 0.12,
      opex_factor: 0.06,
      applicability_score: 0.95,
      pros: ["Excelente calidad final", "Operación simple", "Bajo costo"],
      cons: ["Requiere retrolavado", "Mantenimiento regular"],
    })

    // UV disinfection for pathogens
    if (parameters.coliforms > 1000) {
      technologies.push({
        name: "Desinfección UV",
        efficiency: 99.9,
        capex_factor: 0.08,
        opex_factor: 0.04,
        applicability_score: 0.88,
        pros: ["Sin químicos", "Efectivo vs patógenos", "Bajo mantenimiento"],
        cons: ["Requiere agua clara", "Costo energético"],
      })
    }

    return technologies.sort((a, b) => b.applicability_score - a.applicability_score)
  }

  static calculateCAPEX(
    flow: number, // L/s
    technologies: TechnologyRecommendation[],
  ): { total: number; breakdown: Record<string, number> } {
    const baseCapexPerLps = 18000 // USD per L/s capacity
    const baseCost = flow * baseCapexPerLps

    const breakdown: Record<string, number> = {
      civil_works: baseCost * 0.4,
      equipment: baseCost * 0.35,
      electrical: baseCost * 0.15,
      instrumentation: baseCost * 0.1,
    }

    // Apply technology factors
    const technologyFactor = technologies.reduce((sum, tech) => sum + tech.capex_factor, 0) / technologies.length
    const adjustedTotal = baseCost * (1 + technologyFactor)

    // Add contingency
    const contingency = adjustedTotal * 0.1
    const total = adjustedTotal + contingency

    breakdown.contingency = contingency

    return { total, breakdown }
  }

  static calculateOPEX(
    capex: number,
    flow: number,
    technologies: TechnologyRecommendation[],
  ): { annual: number; breakdown: Record<string, number> } {
    const baseOpexRate = 0.08 // 8% of CAPEX annually
    const baseOpex = capex * baseOpexRate

    const breakdown: Record<string, number> = {
      labor: baseOpex * 0.35,
      chemicals: baseOpex * 0.25,
      energy: baseOpex * 0.2,
      maintenance: baseOpex * 0.15,
      other: baseOpex * 0.05,
    }

    // Apply technology factors
    const technologyFactor = technologies.reduce((sum, tech) => sum + tech.opex_factor, 0) / technologies.length
    const annual = baseOpex * (1 + technologyFactor)

    return { annual, breakdown }
  }

  static calculateEfficiency(parameters: WaterParameters, technologies: TechnologyRecommendation[]): number {
    // Calculate overall system efficiency based on individual technology efficiencies
    const overallEfficiency =
      technologies.reduce((product, tech) => {
        return product * (tech.efficiency / 100)
      }, 1) * 100

    return Math.min(overallEfficiency, 99.5) // Cap at 99.5%
  }

  static assessRisks(parameters: WaterParameters, technologies: TechnologyRecommendation[]): string[] {
    const risks: string[] = []

    if (parameters.turbidity > 20) {
      risks.push("Alta variabilidad en turbidez del agua cruda")
    }

    if (parameters.ph < 6.5 || parameters.ph > 8.5) {
      risks.push("pH fuera del rango óptimo para tratamiento")
    }

    if (technologies.some((t) => t.name.includes("Biológico"))) {
      risks.push("Sensibilidad del proceso biológico a variaciones de carga")
    }

    if (technologies.some((t) => t.name.includes("Químicos"))) {
      risks.push("Disponibilidad y costo de químicos de tratamiento")
    }

    risks.push("Necesidad de personal especializado para operación")
    risks.push("Cumplimiento de normativas ambientales")

    return risks
  }

  static generateTimeline(capex: number): string {
    // Estimate timeline based on project complexity (CAPEX)
    if (capex < 1000000) return "4-6 meses"
    if (capex < 5000000) return "6-8 meses"
    if (capex < 10000000) return "8-12 meses"
    return "12-18 meses"
  }
}
