"use client";

import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockProjects } from "@/lib/mock-data";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SmartBreadcrumbProps {
  projectId?: string;
  maxItems?: number;
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export function SmartBreadcrumb({ 
  projectId, 
  maxItems = 4,
  className 
}: SmartBreadcrumbProps) {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [];
    const segments = pathname.split('/').filter(Boolean);

    // Always start with H₂O Allegiant
    items.push({
      label: "H₂O Allegiant",
      href: "/dashboard"
    });

    if (segments[0] === 'dashboard') {
      items.push({
        label: "Dashboard",
        current: true
      });
      return items;
    }

    if (segments[0] === 'projects') {
      items.push({
        label: "Proyectos",
        href: "/dashboard"
      });

      if (segments[1] === 'create') {
        items.push({
          label: "Nuevo Proyecto",
          current: true
        });
        return items;
      }

      if (segments[1] && segments[1] !== 'create') {
        const project = mockProjects.find(p => p.id === segments[1]);
        const projectName = project ? project.name : `Proyecto ${segments[1]}`;
        
        items.push({
          label: projectName,
          href: `/projects/${segments[1]}`
        });

        // Add specific project page
        if (segments[2]) {
          const pageLabels: Record<string, string> = {
            'chat': 'Chat Proyecto',
            'documents': 'Documentos',
            'progress': 'Progreso',
            'settings': 'Configuración',
            'team': 'Equipo',
            'proposal': 'Propuesta',
            'engineering': 'Ingeniería',
            'procurement': 'Procurement',
            'orders': 'Órdenes de Compra'
          };
          
          items.push({
            label: pageLabels[segments[2]] || segments[2],
            current: true
          });
        } else {
          items[items.length - 1].current = true;
        }
      }
    }

    return items;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  // Truncate if exceeds maxItems
  let displayItems = breadcrumbs;
  if (breadcrumbs.length > maxItems) {
    displayItems = [
      breadcrumbs[0], // Always keep first (H₂O Allegiant)
      { label: "...", href: undefined }, // Ellipsis
      ...breadcrumbs.slice(-2) // Keep last 2 items
    ];
  }

  if (displayItems.length <= 1) {
    return null;
  }

  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)}>
      {displayItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          
          {item.href ? (
            <Link 
              href={item.href}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                index === 0 && "flex items-center space-x-1"
              )}
            >
              {index === 0 && <Home className="h-4 w-4" />}
              <span>{item.label}</span>
            </Link>
          ) : item.label === "..." ? (
            <span className="text-muted-foreground">...</span>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}