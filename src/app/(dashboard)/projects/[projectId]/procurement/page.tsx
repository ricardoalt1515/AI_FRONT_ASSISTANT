'use client';

import React, { useState } from 'react';
import { useProject } from '@/contexts/project-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import {
  ShoppingCart,
  Search,
  Filter,
  TrendingDown,
  TrendingUp,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Bot,
  Zap,
  Target,
  Award,
  ArrowRight,
  Eye,
  ArrowRight as Compare,
  Heart,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

export default function ProcurementPage() {
  const params = useParams<{ projectId: string }>();
  const { project, phaseProgress, completePhase } = useProject();
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'quotes' | 'comparison' | 'orders'>('overview');
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const procurementProgress = phaseProgress.procurement;

  const handleCompleteProject = () => {
    completePhase('procurement');
    // Project completion logic
  };

  const mockEquipmentNeeds = [
    {
      id: 'eq-001',
      name: 'Primary Clarifiers',
      quantity: 2,
      specification: '15,000 m³/day capacity, stainless steel',
      budget: 145000,
      priority: 'high',
      status: 'sourcing'
    },
    {
      id: 'eq-002',
      name: 'Aeration Blowers',
      quantity: 3,
      specification: '2,500 Nm³/h, energy efficient',
      budget: 320000,
      priority: 'high',
      status: 'quoted'
    },
    {
      id: 'eq-003',
      name: 'MBR Membrane Modules',
      quantity: 48,
      specification: '550 LMH flux rate, PVDF material',
      budget: 680000,
      priority: 'critical',
      status: 'comparing'
    }
  ];

  const mockVendors = [
    {
      id: 'vendor-001',
      name: 'AquaTech Solutions',
      rating: 4.8,
      location: 'Mexico City, MX',
      specialties: ['Clarifiers', 'Water Treatment'],
      yearsInBusiness: 15,
      certifications: ['ISO 9001', 'ISO 14001'],
      responseTime: '2-4 hours',
      priceRange: '$$',
      totalProjects: 342,
      equipment: ['Primary Clarifiers', 'Secondary Treatment'],
      contact: {
        email: 'sales@aquatech.mx',
        phone: '+52 55 1234-5678'
      },
      savings: 12,
      status: 'preferred'
    },
    {
      id: 'vendor-002',
      name: 'BlowerMax Industries',
      rating: 4.6,
      location: 'Guadalajara, MX',
      specialties: ['Blowers', 'Aeration Systems'],
      yearsInBusiness: 22,
      certifications: ['ISO 9001', 'CE Mark'],
      responseTime: '4-6 hours',
      priceRange: '$$$',
      totalProjects: 156,
      equipment: ['Aeration Blowers', 'Air Distribution'],
      contact: {
        email: 'quotes@blowermax.com',
        phone: '+52 33 9876-5432'
      },
      savings: 8,
      status: 'evaluating'
    },
    {
      id: 'vendor-003',
      name: 'MembraTech Global',
      rating: 4.9,
      location: 'Monterrey, MX',
      specialties: ['Membranes', 'MBR Systems'],
      yearsInBusiness: 18,
      certifications: ['ISO 9001', 'NSF', 'WQA'],
      responseTime: '1-2 hours',
      priceRange: '$$$$',
      totalProjects: 89,
      equipment: ['MBR Membranes', 'Filtration Systems'],
      contact: {
        email: 'sales@membratech.global',
        phone: '+52 81 2468-1357'
      },
      savings: 15,
      status: 'preferred'
    }
  ];

  const mockQuotes = [
    {
      id: 'quote-001',
      vendorId: 'vendor-001',
      vendorName: 'AquaTech Solutions',
      equipment: 'Primary Clarifiers',
      price: 132000,
      originalPrice: 145000,
      savings: 13000,
      deliveryTime: '8-10 weeks',
      warranty: '2 years',
      status: 'received',
      validUntil: '2024-02-15'
    },
    {
      id: 'quote-002',
      vendorId: 'vendor-002',
      vendorName: 'BlowerMax Industries',
      equipment: 'Aeration Blowers',
      price: 295000,
      originalPrice: 320000,
      savings: 25000,
      deliveryTime: '6-8 weeks',
      warranty: '3 years',
      status: 'received',
      validUntil: '2024-02-20'
    },
    {
      id: 'quote-003',
      vendorId: 'vendor-003',
      vendorName: 'MembraTech Global',
      equipment: 'MBR Membrane Modules',
      price: 578000,
      originalPrice: 680000,
      savings: 102000,
      deliveryTime: '12-14 weeks',
      warranty: '5 years',
      status: 'received',
      validUntil: '2024-02-10'
    }
  ];

  const totalBudget = mockEquipmentNeeds.reduce((sum, item) => sum + item.budget, 0);
  const totalQuoted = mockQuotes.reduce((sum, quote) => sum + quote.price, 0);
  const totalSavings = mockQuotes.reduce((sum, quote) => sum + quote.savings, 0);

  const toggleVendorSelection = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Procurement & Sourcing</h1>
              <p className="text-gray-600">AI-optimized supplier selection and cost optimization</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              <Bot className="h-3 w-3 mr-1" />
              AI Procurement Active
            </Badge>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Vendors
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    ${totalSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Potential Savings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <TrendingDown className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {((totalSavings / totalBudget) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">Cost Reduction</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{mockVendors.length}</div>
                  <div className="text-sm text-gray-500">Qualified Vendors</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">8-14</div>
                  <div className="text-sm text-gray-500">Weeks Delivery</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Procurement Status */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="h-5 w-5 text-orange-600" />
              <div>
                <span className="font-medium">AI Procurement Agent found {mockVendors.length} qualified suppliers</span>
                <div className="text-sm text-gray-600">
                  Analyzed 127 vendors • Identified ${totalSavings.toLocaleString()} in potential savings
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Optimization Complete
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vendors">Vendors ({mockVendors.length})</TabsTrigger>
            <TabsTrigger value="quotes">Quotes ({mockQuotes.length})</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="mt-0 h-full">
              <div className="p-6 space-y-6">
                {/* Equipment Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Equipment Requirements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockEquipmentNeeds.map((equipment) => (
                        <div key={equipment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              equipment.priority === 'critical' ? 'bg-red-100' :
                              equipment.priority === 'high' ? 'bg-orange-100' :
                              'bg-blue-100'
                            }`}>
                              <ShoppingCart className={`h-4 w-4 ${
                                equipment.priority === 'critical' ? 'text-red-600' :
                                equipment.priority === 'high' ? 'text-orange-600' :
                                'text-blue-600'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium">{equipment.name}</div>
                              <div className="text-sm text-gray-600">
                                Qty: {equipment.quantity} • {equipment.specification}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold">${equipment.budget.toLocaleString()}</div>
                            <Badge 
                              variant="outline"
                              className={
                                equipment.status === 'comparing' ? 'bg-yellow-100 text-yellow-700' :
                                equipment.status === 'quoted' ? 'bg-blue-100 text-blue-700' :
                                'bg-orange-100 text-orange-700'
                              }
                            >
                              {equipment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Optimization */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingDown className="h-5 w-5 text-green-600" />
                      <span>Cost Optimization Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Original Budget</span>
                        <span className="text-lg font-semibold">${totalBudget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Optimized Cost</span>
                        <span className="text-lg font-semibold text-blue-600">${totalQuoted.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Savings</span>
                        <span className="text-xl font-bold text-green-600">${totalSavings.toLocaleString()}</span>
                      </div>
                      
                      <div className="mt-4">
                        <Progress value={(totalSavings / totalBudget) * 100} className="h-3" />
                        <div className="text-center mt-2 text-sm text-gray-600">
                          {((totalSavings / totalBudget) * 100).toFixed(1)}% cost reduction achieved
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="vendors" className="mt-0 h-full">
              <div className="p-6 space-y-4">
                {/* Search and Filter */}
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search vendors..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Vendor Cards */}
                <div className="grid gap-4">
                  {mockVendors.map((vendor) => (
                    <Card key={vendor.id} className={`cursor-pointer transition-all ${
                      selectedVendors.includes(vendor.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="p-3 bg-gray-100 rounded-lg">
                              <Truck className="h-6 w-6 text-gray-600" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-lg">{vendor.name}</h3>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{vendor.rating}</span>
                                </div>
                                {vendor.status === 'preferred' && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                                    <Award className="h-3 w-3 mr-1" />
                                    Preferred
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span>{vendor.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <span>{vendor.yearsInBusiness} years</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span>{vendor.responseTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <TrendingDown className="h-4 w-4 text-green-500" />
                                  <span className="text-green-600">{vendor.savings}% savings</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {vendor.specialties.map((specialty) => (
                                  <Badge key={specialty} variant="outline" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="text-sm text-gray-600">
                                Equipment: {vendor.equipment.join(', ')}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button 
                              variant={selectedVendors.includes(vendor.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleVendorSelection(vendor.id)}
                            >
                              {selectedVendors.includes(vendor.id) ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Selected
                                </>
                              ) : (
                                'Select'
                              )}
                            </Button>
                            
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quotes" className="mt-0 h-full">
              <div className="p-6">
                <div className="grid gap-4">
                  {mockQuotes.map((quote) => (
                    <Card key={quote.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                              <DollarSign className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{quote.equipment}</h4>
                              <p className="text-sm text-gray-600">{quote.vendorName}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <div className="flex items-center space-x-1">
                                  <Truck className="h-4 w-4 text-gray-400" />
                                  <span>{quote.deliveryTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <CheckCircle className="h-4 w-4 text-gray-400" />
                                  <span>{quote.warranty} warranty</span>
                                </div>
                                <div className="text-orange-600">
                                  Valid until {quote.validUntil}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              ${quote.price.toLocaleString()}
                            </div>
                            {quote.originalPrice > quote.price && (
                              <div className="text-sm">
                                <span className="line-through text-gray-500">
                                  ${quote.originalPrice.toLocaleString()}
                                </span>
                                <span className="text-green-600 ml-2">
                                  Save ${quote.savings.toLocaleString()}
                                </span>
                              </div>
                            )}
                            <div className="flex space-x-2 mt-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Details
                              </Button>
                              <Button size="sm">
                                Accept Quote
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="mt-0 h-full">
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Compare className="h-5 w-5" />
                      <span>Vendor Comparison</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Compare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Select vendors from the Vendors tab to compare</p>
                      <Button variant="outline">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Go to Vendors
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-0 h-full">
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchase Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No purchase orders created yet</p>
                      <p className="text-sm text-gray-500">Accept quotes to generate purchase orders</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <Zap className="inline h-4 w-4 mr-1" />
            AI found {mockVendors.length} qualified vendors • ${totalSavings.toLocaleString()} potential savings
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              Request Additional Quotes
            </Button>
            <Button onClick={handleCompleteProject}>
              Finalize Procurement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}