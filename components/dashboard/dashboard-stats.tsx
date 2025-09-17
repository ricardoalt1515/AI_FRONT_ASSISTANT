import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FolderOpen, Clock, CheckCircle, FileText, TrendingUp, TrendingDown } from "lucide-react"
import { mockStats } from "@/lib/mock-data"

const stats = [
  {
    title: "Proyectos Activos",
    value: mockStats.activeProjects.toString(),
    change: "+1 este mes",
    trend: "up",
    percentage: 8.3,
    icon: FolderOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
    progress: 75,
  },
  {
    title: "En Desarrollo",
    value: mockStats.inDevelopment.toString(),
    change: "2 próximos a completar",
    trend: "up",
    percentage: 12.5,
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    progress: 60,
  },
  {
    title: "Completados",
    value: mockStats.completed.toString(),
    change: "+1 este mes",
    trend: "up",
    percentage: 25.0,
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    progress: 100,
  },
  {
    title: "Propuestas Generadas",
    value: mockStats.generatedProposals.toString(),
    change: "+2 esta semana",
    trend: "up",
    percentage: 40.0,
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    progress: 85,
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <div
                className={`flex items-center text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stat.percentage}%
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={stat.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
