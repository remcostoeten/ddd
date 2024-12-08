import { cn } from '@/lib/utils'
import { Layout } from '@/shared/shared/components/layout'
export default function TasksPage() {
  return (
    <Layout>
      <h1 className={cn("text-2xl font-bold mb-4")}>Tasks</h1>
      <p className={cn("text-muted-foreground")}>Your to-do list and task management interface will appear here.</p>
    </Layout>
  )
}

