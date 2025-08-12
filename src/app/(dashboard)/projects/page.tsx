'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  Settings,
  MoreHorizontal,
  Factory,
  Droplets,
  Building,
  CheckCircle,
  Clock,
  Play,
  Pause
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Mock projects data
const mockProjects = [
  {
    id: 'mun-municipal-treatment-facility-lx9k2m',
    name: 'Municipal Treatment Facility',
    description: 'Advanced biological water treatment system for 25,000 m³/day capacity',
    sector: 'Municipal Water Treatment',
    location: 'México, CDMX',
    currentPhase: 'proposal' as const,
    progress: 65,
    estimatedValue: 2400000,
    createdAt: '2024-01-15',
    status: 'active' as const,
    icon: Building,
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  {
    id: 'ind-chemical-plant-wastewater-m8n7k2',
    name: 'Chemical Plant Wastewater',
    description: 'Industrial wastewater treatment for pharmaceutical manufacturing',
    sector: 'Industrial Wastewater',
    location: 'Guadalajara, MX',
    currentPhase: 'engineering' as const,
    progress: 40,
    estimatedValue: 4200000,
    createdAt: '2024-01-10',
    status: 'active' as const,
    icon: Factory,
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'agr-irrigation-system-p9q8r7',
    name: 'Irrigation System',
    description: 'Smart irrigation and water recycling for large-scale agriculture',
    sector: 'Agricultural Systems',
    location: 'Sonora, MX',
    currentPhase: 'procurement' as const,
    progress: 85,
    estimatedValue: 1800000,
    createdAt: '2024-01-05',
    status: 'active' as const,
    icon: Droplets,
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  {
    id: 'mun-water-recycling-center-k5m9n2',
    name: 'Water Recycling Center',
    description: 'Municipal water recycling and reuse facility',
    sector: 'Municipal Water Treatment',
    location: 'Monterrey, MX',
    currentPhase: 'discovery' as const,
    progress: 20,
    estimatedValue: 3100000,
    createdAt: '2024-01-12',
    status: 'paused' as const,
    icon: Building,
    color: 'bg-green-100 text-green-700 border-green-200'
  }
];

const phaseConfig = {
  discovery: { label: 'Discovery', color: 'bg-blue-100 text-blue-700', icon: Search },
  proposal: { label: 'Proposal', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  engineering: { label: 'Engineering', color: 'bg-purple-100 text-purple-700', icon: Settings },
  procurement: { label: 'Procurement', color: 'bg-orange-100 text-orange-700', icon: DollarSign }
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'paused'>('all');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const totalValue = mockProjects.reduce((sum, p) => sum + p.estimatedValue, 0);
  const avgProgress = Math.round(mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                <p className="mt-2 text-gray-600">
                  Manage your water treatment projects and track progress across all phases
                </p>
              </div>
              
              <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                <Link href="/onboarding">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Play className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">{activeProjects}</div>
                      <div className="text-sm text-gray-500">Active Projects</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">${(totalValue / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-gray-500">Total Value</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">{avgProgress}%</div>
                      <div className="text-sm text-gray-500">Avg Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-8 w-8 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold">{mockProjects.length}</div>
                      <div className="text-sm text-gray-500">Total Projects</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={selectedFilter === 'active' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('active')}
              size="sm"
            >
              Active
            </Button>
            <Button
              variant={selectedFilter === 'paused' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('paused')}
              size="sm"
            >
              Paused
            </Button>
          </div>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            const phaseInfo = phaseConfig[project.currentPhase];
            const PhaseIcon = phaseInfo.icon;

            return (
              <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${project.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{project.sector}</p>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={phaseInfo.color}>
                        <PhaseIcon className="h-3 w-3 mr-1" />
                        {phaseInfo.label}
                      </Badge>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-green-600">
                        ${project.estimatedValue.toLocaleString()}
                      </span>
                      <span className="text-gray-500 ml-1">estimated value</span>
                    </div>
                    
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status === 'active' ? (
                        <Play className="h-3 w-3 mr-1" />
                      ) : (
                        <Pause className="h-3 w-3 mr-1" />
                      )}
                      {project.status}
                    </Badge>
                  </div>

                  <Link href={`/projects/${project.id}`}>
                    <Button className="w-full group-hover:bg-blue-600 transition-colors">
                      View Project
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ? 'Try adjusting your search terms' : 'Get started by creating your first project'}
              </p>
              <Button asChild>
                <Link href="/onboarding">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}