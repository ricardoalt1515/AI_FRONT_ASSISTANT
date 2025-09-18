
export interface BrandConfig {
  name: string
  logo: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  features: {
    showPricing: boolean
    showTestimonials: boolean
    customModules: string[]
  }
  metadata: {
    title: string
    description: string
    keywords: string[]
  }
}

// Configuración por defecto
export const defaultBrand: BrandConfig = {
  name: "H₂O Allegiant AI",
  logo: "/logo.svg",
  colors: {
    primary: "#0ea5e9", // blue-500
    secondary: "#0284c7", // blue-600
    accent: "#38bdf8" // blue-400
  },
  features: {
    showPricing: true,
    showTestimonials: true,
    customModules: []
  },
  metadata: {
    title: "H₂O Allegiant AI | Smart Water Solutions",
    description: "Intelligent chatbot specialized in engineering and design of advanced water treatment solutions",
    keywords: ["water treatment", "AI", "engineering", "wastewater"]
  }
}

// Función para obtener la configuración de marca actual
export function getBrandConfig(): BrandConfig {
  // Primero, intentar obtener configuración del entorno
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME

  if (brandName && brandName !== 'default') {
    // Aquí cargarías configuraciones personalizadas según el brand
    // Por ejemplo, podrías importar desde archivos diferentes:
    // return require(`./brands/${brandName}.config`).default
  }

  // Por defecto, usar la configuración de H₂O Allegiant
  return defaultBrand
}

// Ejemplo de configuración para otro cliente
export const clientABrand: BrandConfig = {
  name: "AquaPure Solutions",
  logo: "/client-a-logo.svg",
  colors: {
    primary: "#10b981", // green-500
    secondary: "#059669", // green-600
    accent: "#34d399" // green-400
  },
  features: {
    showPricing: false,
    showTestimonials: false,
    customModules: ["compliance-tracker"]
  },
  metadata: {
    title: "AquaPure Solutions | Water Treatment AI",
    description: "Custom water treatment solutions powered by artificial intelligence",
    keywords: ["water treatment", "AI", "AquaPure"]
  }
}
