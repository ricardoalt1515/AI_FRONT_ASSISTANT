"use client";

import { AppLayout } from "@/components/layout/app-layout";
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

  return (
    <AppLayout 
      sidebarType={isProjectWorkspace ? "project" : "dashboard"}
      projectId={projectId}
    >
      {children}
    </AppLayout>
  );
}