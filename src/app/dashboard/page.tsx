import { cn } from '@/lib/utils'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className={cn("text-2xl font-bold mb-4 text-foreground")}>Dashboard</h1>
      <p className={cn("text-muted-foreground")}>Welcome to your dashboard. Here you can see an overview of your project.</p>
    </div>
  )
}

