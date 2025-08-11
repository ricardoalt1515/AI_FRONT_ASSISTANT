'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { DashboardMetrics } from '@/components/dashboard/dashboard-metrics';
import { ProjectCards } from '@/components/dashboard/project-cards';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  Calendar,
  MessageCircle,
  FileText,
  Clock
} from 'lucide-react';
import Link from 'next/link';

// Mock user data - in production, get from auth context
const mockUser = {
  name: 'Dr. Sarah Chen',
  email: 'sarah.chen@h2oallegiant.com',
  avatar: undefined
};

// Mock recent activities data
const recentActivities = [
  {
    id: '1',
    type: 'proposal',
    title: 'New proposal generated for Municipal Water Plant',
    client: 'City of Denver',
    timestamp: '2 hours ago',
    status: 'completed'
  },
  {
    id: '2', 
    type: 'chat',
    title: 'Chat session completed for Industrial Treatment project',
    client: 'TechManufacturing Corp',
    timestamp: '4 hours ago',
    status: 'active'
  },
  {
    id: '3',
    type: 'document',
    title: 'Technical specifications updated',
    client: 'Metro Water Authority',
    timestamp: '1 day ago', 
    status: 'completed'
  },
  {
    id: '4',
    type: 'meeting',
    title: 'Project review meeting scheduled',
    client: 'Greenfield Developments',
    timestamp: '2 days ago',
    status: 'pending'
  },
];

export default function DashboardPage() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'proposal':
        return <FileText className="h-4 w-4 text-primary" />;
      case 'chat':
        return <MessageCircle className="h-4 w-4 text-accent" />;
      case 'document':
        return <FileText className="h-4 w-4 text-warning" />;
      case 'meeting':
        return <Calendar className="h-4 w-4 text-success" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <AppLayout currentPage="dashboard" user={mockUser}>
      <div className="section-padding content-spacing animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-display-lg mb-2">
              Good morning, {mockUser.name.split(' ')[1]} 👋
            </h1>
            <p className="text-body-lg">
              Here's what's happening with your water treatment projects today.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Link href="/chat">
              <Button variant="outline" className="btn-water-secondary">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
            </Link>
            <Button className="btn-water-primary">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-heading-xl">Executive Overview</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <DashboardMetrics />
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-xl">Active Projects</h2>
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <ProjectCards limit={4} />
          </section>

          {/* Recent Activity */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-xl">Recent Activity</h2>
            </div>
            
            <Card className="card-premium p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 pb-4 last:pb-0 border-b border-border last:border-0">
                    <div className="flex-shrink-0 p-2 bg-muted rounded-lg">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body font-medium mb-1">
                        {activity.title}
                      </p>
                      <p className="text-body text-muted-foreground mb-2">
                        {activity.client}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-caption text-muted-foreground">
                          {activity.timestamp}
                        </span>
                        <span className={`status-${activity.status}`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full">
                  View All Activity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="card-premium p-6 mt-6">
              <h3 className="text-heading-md mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/chat">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <MessageCircle className="mr-3 h-4 w-4" />
                    Start AI Consultation
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <FileText className="mr-3 h-4 w-4" />
                  Generate Proposal
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Plus className="mr-3 h-4 w-4" />
                  Create New Project
                </Button>
                <Link href="/documents">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <FileText className="mr-3 h-4 w-4" />
                    View Documents
                  </Button>
                </Link>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}