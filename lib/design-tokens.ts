// Design tokens extendidos para H₂O Allegiant
// Basado en las especificaciones UI y enfocado en ingeniería de aguas

export const designTokens = {
  // Colores específicos del dominio
  colors: {
    // Estados de badge para fuente de datos
    badge: {
      manual: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800"
      },
      imported: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        text: "text-orange-700 dark:text-orange-300",
        border: "border-orange-200 dark:border-orange-800"
      },
      ai: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-700 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800"
      }
    },
    // Estados de proyecto específicos
    projectStatus: {
      planning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      review: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "on-hold": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    },
    // Tipos de tratamiento
    treatmentType: {
      municipal: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
      industrial: "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
      residential: "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
      agricultural: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
    }
  },

  // Espaciado específico
  spacing: {
    sectionGap: "space-y-6",
    cardPadding: "p-6",
    formPadding: "p-4",
    tabPadding: "px-4 py-2"
  },

  // Animaciones para ingeniería profesional
  animations: {
    slideIn: "transition-all duration-300 ease-in-out",
    fadeIn: "transition-opacity duration-200 ease-in-out",
    scaleHover: "transition-transform duration-200 hover:scale-[1.02]",
    bounceIn: "animate-in slide-in-from-bottom-4 duration-300"
  },

  // Efectos visuales
  effects: {
    cardHover: "hover:shadow-lg transition-all duration-300",
    glassEffect: "backdrop-filter backdrop-blur-lg bg-white/80 dark:bg-slate-800/80",
    gradientBorder: "bg-gradient-to-r from-primary to-secondary p-[1px] rounded-lg",
    shimmer: "relative overflow-hidden before:absolute before:inset-0 before:translate-x-[-100%] before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
  },

  // Tamaños específicos para componentes
  sizes: {
    projectCard: {
      width: "w-full max-w-sm",
      height: "min-h-[320px]"
    },
    chatAssistant: {
      width: "w-80",
      height: "h-96"
    },
    editableTable: {
      cellHeight: "h-12",
      rowGap: "gap-2"
    }
  }
} as const

// Utilidades para aplicar tokens
export const getStatusColor = (status: string) => {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '-') as keyof typeof designTokens.colors.projectStatus
  return designTokens.colors.projectStatus[normalizedStatus] || designTokens.colors.projectStatus.planning
}

export const getBadgeColor = (source: 'manual' | 'imported' | 'ai') => {
  return designTokens.colors.badge[source]
}

export const getTreatmentTypeColor = (type: string) => {
  const normalizedType = type.toLowerCase() as keyof typeof designTokens.colors.treatmentType
  return designTokens.colors.treatmentType[normalizedType] || designTokens.colors.treatmentType.municipal
}