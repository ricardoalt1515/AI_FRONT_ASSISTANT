"use client";

import * as React from "react";
import { ChevronRight, MoreHorizontal, Home, FolderOpen, Building2, MessageSquare, FileText, BarChart3, Settings, Users } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { mockProjects } from "@/lib/mock-data";
import { useSidebarState } from "@/hooks/use-mobile";

const BreadcrumbRoot = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ className, ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
));
BreadcrumbRoot.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors hover:text-foreground inline-flex items-center gap-1.5",
        className
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// Smart breadcrumb component that automatically generates breadcrumbs
interface SmartBreadcrumbProps {
  className?: string;
  projectId?: string;
  maxItems?: number;
}

export function SmartBreadcrumb({ className, projectId, maxItems = 4 }: SmartBreadcrumbProps) {
  const pathname = usePathname();
  const { adaptiveState, deviceType } = useSidebarState();
  
  // Generate breadcrumb items based on current path
  const breadcrumbItems = React.useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const items: Array<{
      label: string;
      href: string;
      icon?: React.ComponentType<{ className?: string }>;
      isActive: boolean;
    }> = [];

    // Always start with Dashboard
    items.push({
      label: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      isActive: pathname === '/dashboard'
    });

    // Handle different page types
    if (pathSegments[0] === 'projects') {
      if (pathSegments[1] === 'create') {
        items.push({
          label: 'Nuevo Proyecto',
          href: '/projects/create',
          icon: FolderOpen,
          isActive: true
        });
      } else if (pathSegments[1] && pathSegments[1] !== 'create') {
        // Project-specific pages
        const project = mockProjects.find(p => p.id === pathSegments[1]);
        const projectName = project ? project.name : `Proyecto ${pathSegments[1]}`;
        
        items.push({
          label: projectName,
          href: `/projects/${pathSegments[1]}`,
          icon: Building2,
          isActive: pathname === `/projects/${pathSegments[1]}`
        });

        // Handle project sub-pages
        if (pathSegments[2]) {
          const subPageMap: Record<string, { label: string; icon: any }> = {
            'chat': { label: 'Chat Proyecto', icon: MessageSquare },
            'documents': { label: 'Documentos', icon: FileText },
            'progress': { label: 'Progreso', icon: BarChart3 },
            'settings': { label: 'Configuración', icon: Settings },
            'team': { label: 'Equipo', icon: Users }
          };

          const subPage = subPageMap[pathSegments[2]];
          if (subPage) {
            items.push({
              label: subPage.label,
              href: pathname,
              icon: subPage.icon,
              isActive: true
            });
          }
        }
      }
    } else if (pathSegments[0] === 'documents') {
      items.push({
        label: 'Documentos',
        href: '/documents',
        icon: FileText,
        isActive: true
      });
    } else if (pathSegments[0] === 'reports') {
      items.push({
        label: 'Reportes',
        href: '/reports',
        icon: BarChart3,
        isActive: true
      });
    } else if (pathSegments[0] === 'settings') {
      items.push({
        label: 'Configuración',
        href: '/settings',
        icon: Settings,
        isActive: true
      });
    } else if (pathSegments[0] === 'chat') {
      items.push({
        label: 'Chat IA Global',
        href: '/chat',
        icon: MessageSquare,
        isActive: true
      });
    }

    return items;
  }, [pathname]);

  // Don't show breadcrumbs on dashboard page or if only one item
  if (pathname === '/dashboard' || breadcrumbItems.length <= 1) {
    return null;
  }

  // Responsive truncation
  const shouldTruncate = breadcrumbItems.length > maxItems;
  const displayItems = shouldTruncate 
    ? [
        breadcrumbItems[0], // Always show first (Dashboard)
        ...breadcrumbItems.slice(-2) // Show last 2 items
      ]
    : breadcrumbItems;

  // Adjust for mobile/tablet
  const isCompact = deviceType === 'mobile' || deviceType === 'tablet' || adaptiveState === 'task-minimized';

  return (
    <BreadcrumbRoot className={cn("mb-4", className)}>
      <BreadcrumbList>
        {displayItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {/* Show ellipsis if we truncated */}
            {shouldTruncate && index === 1 && (
              <>
                <BreadcrumbEllipsis />
                <BreadcrumbSeparator />
              </>
            )}
            
            <BreadcrumbItem>
              {item.isActive ? (
                <BreadcrumbPage className="flex items-center gap-1.5">
                  {item.icon && !isCompact && (
                    <item.icon className="h-4 w-4" />
                  )}
                  <span className={cn(
                    isCompact && item.label.length > 20 
                      ? "truncate max-w-[150px]" 
                      : ""
                  )}>
                    {item.label}
                  </span>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href} className="flex items-center gap-1.5">
                    {item.icon && !isCompact && (
                      <item.icon className="h-4 w-4" />
                    )}
                    <span className={cn(
                      isCompact && item.label.length > 20 
                        ? "truncate max-w-[120px]" 
                        : ""
                    )}>
                      {item.label}
                    </span>
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            
            {/* Don't show separator after last item */}
            {index < displayItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}

export {
  BreadcrumbRoot as Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};