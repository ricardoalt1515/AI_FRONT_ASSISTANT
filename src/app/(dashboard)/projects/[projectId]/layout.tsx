import React from 'react';
import { ProjectProvider } from '@/contexts/project-context';
import { ProjectSidebar } from '@/components/project/project-sidebar';
import { ProjectHeader } from '@/components/project/project-header';

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: { projectId: string };
}

export default function ProjectLayout({ children, params }: ProjectLayoutProps) {
  return (
    <ProjectProvider projectId={params.projectId}>
      <div className="h-screen flex overflow-hidden bg-background">
        {/* Project Sidebar */}
        <ProjectSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Project Header */}
          <ProjectHeader />
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ProjectProvider>
  );
}