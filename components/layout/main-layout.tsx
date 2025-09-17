"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { TopNavigation } from "@/components/layout/top-navigation"
import { SmartBreadcrumbs } from "@/components/navigation/smart-breadcrumbs"
import { FloatingChatAssistant } from "@/components/chat/floating-chat-assistant"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
  showChatAssistant?: boolean
  breadcrumbs?: React.ReactNode
}

export function MainLayout({
  children,
  className,
  showChatAssistant = true,
  breadcrumbs
}: MainLayoutProps) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--sidebar-width-mobile": "18rem"
      } as React.CSSProperties}
    >
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <TopNavigation />

          {/* Breadcrumbs Section */}
          {(breadcrumbs || true) && (
            <div className="border-b bg-background/50 backdrop-blur-sm">
              <div className="container py-3">
                {breadcrumbs || <SmartBreadcrumbs />}
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <main className={cn(
            "flex-1 p-4 md:p-8 pt-6 space-y-6",
            "bg-gradient-to-br from-background via-muted/10 to-background",
            "min-h-[calc(100vh-8rem)]",
            className
          )}>
            <div className="scale-in max-w-full">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>

      {/* Floating Chat Assistant */}
      {showChatAssistant && <FloatingChatAssistant />}
    </SidebarProvider>
  )
}