"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Brain, 
  FileText, 
  Calculator,
  CheckCircle2,
  Clock,
  Lightbulb,
  Cog,
  BarChart3
} from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LoadingStage {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  estimatedTime: number; // seconds
  status: "pending" | "active" | "completed";
}

interface AdvancedLoadingProps {
  type: "proposal" | "analysis" | "calculation" | "general";
  currentStage?: string;
  progress?: number;
  estimatedTime?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const loadingStages = {
  proposal: [
    {
      id: "requirements",
      label: "Analizando requisitos",
      description: "Procesando información del proyecto y sector",
      icon: Brain,
      estimatedTime: 15
    },
    {
      id: "calculations",
      label: "Realizando cálculos",
      description: "Dimensionamiento de equipos y sistemas",
      icon: Calculator,
      estimatedTime: 30
    },
    {
      id: "design",
      label: "Generando diseño",
      description: "Creando diagramas y especificaciones técnicas",
      icon: Lightbulb,
      estimatedTime: 25
    },
    {
      id: "documentation",
      label: "Compilando propuesta",
      description: "Estructurando documento final con gráficos",
      icon: FileText,
      estimatedTime: 20
    }
  ],
  analysis: [
    {
      id: "data_processing",
      label: "Procesando datos",
      description: "Analizando parámetros de agua y carga orgánica",
      icon: BarChart3,
      estimatedTime: 10
    },
    {
      id: "modeling",
      label: "Modelado hidráulico",
      description: "Simulando procesos de tratamiento",
      icon: Cog,
      estimatedTime: 20
    },
    {
      id: "optimization",
      label: "Optimizando diseño",
      description: "Ajustando parámetros para eficiencia máxima",
      icon: Zap,
      estimatedTime: 15
    }
  ],
  calculation: [
    {
      id: "parameters",
      label: "Calculando parámetros",
      description: "Determinando caudales y cargas de diseño",
      icon: Calculator,
      estimatedTime: 8
    },
    {
      id: "sizing",
      label: "Dimensionamiento",
      description: "Calculando volúmenes y áreas requeridas",
      icon: Cog,
      estimatedTime: 12
    }
  ],
  general: [
    {
      id: "processing",
      label: "Procesando",
      description: "Analizando información con AI",
      icon: Brain,
      estimatedTime: 10
    }
  ]
};

export function AdvancedLoading({ 
  type, 
  currentStage, 
  progress = 0, 
  estimatedTime,
  className,
  size = "md"
}: AdvancedLoadingProps) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  
  const stages = loadingStages[type];
  const totalTime = stages.reduce((sum, stage) => sum + stage.estimatedTime, 0);
  
  // Simulate stage progression if no currentStage provided
  useEffect(() => {
    if (!currentStage) {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        
        // Calculate which stage should be active based on elapsed time
        let cumulativeTime = 0;
        let newStageIndex = 0;
        
        for (let i = 0; i < stages.length; i++) {
          if (elapsedTime < cumulativeTime + stages[i].estimatedTime) {
            newStageIndex = i;
            setStageProgress(((elapsedTime - cumulativeTime) / stages[i].estimatedTime) * 100);
            break;
          }
          cumulativeTime += stages[i].estimatedTime;
        }
        
        setActiveStageIndex(newStageIndex);
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      const stageIndex = stages.findIndex(s => s.id === currentStage);
      if (stageIndex !== -1) setActiveStageIndex(stageIndex);
    }
  }, [currentStage, elapsedTime, stages]);
  
  const sizeConfig = {
    sm: {
      card: "p-3",
      icon: "h-4 w-4",
      title: "text-sm",
      description: "text-xs",
      progress: "h-1"
    },
    md: {
      card: "p-4",
      icon: "h-5 w-5",
      title: "text-base",
      description: "text-sm",
      progress: "h-2"
    },
    lg: {
      card: "p-6",
      icon: "h-6 w-6", 
      title: "text-lg",
      description: "text-base",
      progress: "h-3"
    }
  };
  
  const config = sizeConfig[size];
  
  return (
    <Card className={cn("card-premium bg-gradient-to-br from-primary/5 to-blue/5", className)}>
      <CardContent className={config.card}>
        <div className="space-y-4">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="flex items-center justify-center"
                  >
                    <Zap className={cn("text-primary", config.icon)} />
                  </motion.div>
                </div>
                <div>
                  <h3 className={cn("font-semibold text-primary", config.title)}>
                    AI Trabajando
                  </h3>
                  {estimatedTime && (
                    <p className={cn("text-muted-foreground", config.description)}>
                      ~{Math.max(0, estimatedTime - elapsedTime)}s restantes
                    </p>
                  )}\n                </div>
              </div>
              <div className={cn("text-sm font-medium text-primary", config.description)}>
                {progress > 0 ? `${Math.round(progress)}%` : `${Math.round((elapsedTime / totalTime) * 100)}%`}
              </div>
            </div>
            
            <Progress 
              value={progress > 0 ? progress : (elapsedTime / totalTime) * 100} 
              className={cn("bg-muted", config.progress)}
            />
          </div>
          
          {/* Stage List */}
          <div className="space-y-3">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon;
              const isActive = index === activeStageIndex;
              const isCompleted = index < activeStageIndex || (isActive && stageProgress >= 100);
              const isPending = index > activeStageIndex;
              
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex items-center space-x-3 p-2 rounded-lg transition-all duration-200",
                    isActive && "bg-primary/10 border border-primary/20",
                    isCompleted && "bg-success/5",
                    isPending && "opacity-60"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
                    isCompleted && "bg-success text-success-foreground",
                    isActive && "bg-primary text-primary-foreground",
                    isPending && "bg-muted text-muted-foreground"
                  )}>
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </motion.div>
                      ) : isActive ? (
                        <motion.div
                          key="active"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <StageIcon className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div key="pending">
                          <StageIcon className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={cn(
                        "font-medium transition-colors",
                        isCompleted && "text-success",
                        isActive && "text-primary",
                        isPending && "text-muted-foreground",
                        config.description
                      )}>
                        {stage.label}
                      </p>
                      {isActive && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{stage.estimatedTime}s</span>
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-muted-foreground leading-relaxed",
                      size === "sm" ? "text-xs" : "text-sm"
                    )}>
                      {stage.description}
                    </p>
                    
                    {/* Stage progress bar for active stage */}
                    {isActive && (
                      <div className="mt-2">
                        <Progress 
                          value={stageProgress} 
                          className="h-1 bg-primary/20"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton loader for content that's loading
export function SkeletonLoader({ 
  lines = 3, 
  className,
  showAvatar = false 
}: { 
  lines?: number;
  className?: string;
  showAvatar?: boolean;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {showAvatar && (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 bg-muted rounded animate-pulse",
              i === lines - 1 && "w-3/4", // Last line shorter
              i === 0 && "w-full",
              i > 0 && i < lines - 1 && "w-5/6"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Quick loading indicator for inline use
export function InlineLoader({ 
  text = "Cargando...",
  className 
}: { 
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center space-x-2 text-muted-foreground", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Zap className="h-4 w-4 text-primary" />
      </motion.div>
      <span className="text-sm">{text}</span>
    </div>
  );
}