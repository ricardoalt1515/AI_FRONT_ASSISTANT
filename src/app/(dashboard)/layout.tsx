"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { ProjectProvider } from "@/contexts/project-context";
import { ProjectSubnav } from "@/components/project/project-subnav";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Determine if we're in a project workspace
  const isProjectWorkspace = pathname.startsWith("/projects/") && 
                           pathname.split("/").length >= 3 &&
                           pathname.split("/")[2] !== "create";
                           
  const projectId = isProjectWorkspace ? pathname.split("/")[2] : undefined;

  // If in project context, wrap with ProjectProvider and add ProjectSubnav
  if (isProjectWorkspace && projectId) {
    return (
      <ProjectProvider projectId={projectId}>
        <AppLayout 
          sidebarType="project"
          projectId={projectId}
        >
          <div className="flex flex-col h-full">
            <ProjectSubnav />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </AppLayout>
      </ProjectProvider>
    );
  }

  return (
    <AppLayout 
      sidebarType="dashboard"
    >
      {children}
    </AppLayout>
  );
}