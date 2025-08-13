"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { ContextualFAB } from "./contextual-fab";
import { SmartBreadcrumb } from "@/components/ui/smart-breadcrumb";
import { cn } from "@/lib/utils";
import { useSidebarPersistence } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
  sidebarType?: "dashboard" | "project";
  projectId?: string;
  showBreadcrumbs?: boolean;
  showFAB?: boolean;
  className?: string;
}

// Internal component that uses the hooks (must be inside SidebarProvider)
function AppLayoutInternal({ 
  children, 
  sidebarType = "dashboard", 
  projectId,
  showBreadcrumbs = true,
  showFAB = true,
  className
}: AppLayoutProps) {
  const { deviceType, isMobile } = useSidebarPersistence();
  
  // Simplified layout classes
  const layoutClasses = cn(
    "flex min-h-screen w-full transition-all duration-300 ease-out bg-background",
    isMobile ? "flex-col" : "flex-row",
    className
  );

  return (
    <div className={layoutClasses}>
      <AppSidebar 
        type={sidebarType} 
        projectId={projectId}
        className="transition-all duration-300 ease-out flex-shrink-0"
      />
      
      <div className="flex flex-1 flex-col min-w-0">
        {/* Global App Header - always visible with updated height */}
        <AppHeader className="flex-shrink-0 h-16" />
        
        {/* Main Content Area with improved overflow handling */}
        <SidebarInset className="flex-1 overflow-auto p-0">
          <div className={cn(
            "min-h-full container mx-auto",
            // Responsive padding
            deviceType === 'mobile' ? "px-4 py-3" :
            deviceType === 'tablet' ? "px-4 py-4" :
            deviceType === 'desktop' ? "px-6 py-5" : "px-8 py-6",
            // Container constraints to prevent overflow
            "max-w-full"
          )}>
            {/* Smart Breadcrumbs */}
            {showBreadcrumbs && (
              <SmartBreadcrumb 
                projectId={projectId}
                className="mb-6 overflow-hidden"
                maxItems={deviceType === 'mobile' ? 2 : 4}
              />
            )}
            
            {/* Page Content with proper spacing */}
            <div className={cn(
              "min-h-0 flex-1",
              // Responsive content spacing
              deviceType === 'mobile' ? "space-y-4" :
              deviceType === 'tablet' ? "space-y-4" :
              deviceType === 'desktop' ? "space-y-6" : "space-y-8"
            )}>
              {children}
            </div>
          </div>
        </SidebarInset>
      </div>
      
      {/* Contextual FAB - positioned absolutely */}
      {showFAB && (
        <ContextualFAB 
          projectId={projectId}
          className="z-50"
        />
      )}
    </div>
  );
}

export function AppLayout(props: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppLayoutInternal {...props} />
    </SidebarProvider>
  );
}