"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  Brain, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Sparkles 
} from "lucide-react";
import { Badge } from "./badge";

interface AIStatusIndicatorProps {
  status: "idle" | "thinking" | "generating" | "completed" | "error";
  message?: string;
  progress?: number;
  estimatedTime?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  idle: {
    icon: Sparkles,
    color: "text-muted-foreground",
    bgColor: "bg-muted/10",
    label: "AI Listo",
    message: "Asistente disponible para consultas"
  },
  thinking: {
    icon: Brain,
    color: "text-primary",
    bgColor: "bg-primary/10",
    label: "Analizando",
    message: "AI procesando tu consulta..."
  },
  generating: {
    icon: Zap,
    color: "text-warning",
    bgColor: "bg-warning/10",
    label: "Generando",
    message: "Creando propuesta técnica..."
  },
  completed: {
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
    label: "Completado",
    message: "Operación finalizada exitosamente"
  },
  error: {
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    label: "Error",
    message: "Ha ocurrido un error, reintenta"
  }
};

export function AIStatusIndicator({ 
  status, 
  message, 
  progress, 
  estimatedTime, 
  className,
  size = "md" 
}: AIStatusIndicatorProps) {
  const config = statusConfig[status];
  const IconComponent = config.icon;
  
  const sizeConfig = {
    sm: {
      container: "px-2 py-1",
      icon: "h-3 w-3",
      text: "text-xs",
      badge: "text-xs px-1.5 py-0.5"
    },
    md: {
      container: "px-3 py-2",
      icon: "h-4 w-4",
      text: "text-sm",
      badge: "text-xs px-2 py-1"
    },
    lg: {
      container: "px-4 py-3",
      icon: "h-5 w-5",
      text: "text-base",
      badge: "text-sm px-3 py-1.5"
    }
  };
  
  const sConfig = sizeConfig[size];
  
  return (
    <div className={cn(
      "flex items-center space-x-2 rounded-lg transition-all duration-200",
      config.bgColor,
      sConfig.container,
      className
    )}>
      <motion.div
        animate={
          status === "thinking" || status === "generating" 
            ? { rotate: 360 } 
            : { rotate: 0 }
        }
        transition={{ 
          duration: status === "thinking" ? 2 : 1.5, 
          repeat: status === "thinking" || status === "generating" ? Infinity : 0,
          ease: "linear" 
        }}
        className="flex items-center justify-center"
      >
        <IconComponent className={cn(config.color, sConfig.icon)} />
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className={cn(config.color, "border-current", sConfig.badge)}
          >
            {config.label}
          </Badge>
          
          {progress !== undefined && (
            <span className={cn("font-medium", config.color, sConfig.text)}>
              {Math.round(progress)}%
            </span>
          )}
        </div>
        
        <p className={cn("truncate", sConfig.text, config.color, "opacity-80")}>
          {message || config.message}
        </p>
        
        {estimatedTime && estimatedTime > 0 && (
          <div className="flex items-center space-x-1 mt-1">
            <Clock className={cn("h-3 w-3", config.color, "opacity-60")} />
            <span className={cn("text-xs", config.color, "opacity-60")}>
              ~{estimatedTime}s restantes
            </span>
          </div>
        )}
      </div>
      
      {(status === "thinking" || status === "generating") && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={cn("w-2 h-2 rounded-full", config.color === "text-primary" ? "bg-primary" : "bg-warning")}
        />
      )}
    </div>
  );
}

// Compact version for headers and toolbars
export function CompactAIStatus({ 
  status, 
  className 
}: { 
  status: AIStatusIndicatorProps["status"];
  className?: string;
}) {
  const config = statusConfig[status];
  const IconComponent = config.icon;
  
  return (
    <div className={cn(
      "flex items-center space-x-1 px-2 py-1 rounded-full",
      config.bgColor,
      className
    )}>
      <motion.div
        animate={
          status === "thinking" || status === "generating" 
            ? { rotate: 360 } 
            : { rotate: 0 }
        }
        transition={{ 
          duration: 2, 
          repeat: status === "thinking" || status === "generating" ? Infinity : 0,
          ease: "linear" 
        }}
      >
        <IconComponent className={cn("h-3 w-3", config.color)} />
      </motion.div>
      <span className={cn("text-xs font-medium", config.color)}>
        {config.label}
      </span>
    </div>
  );
}