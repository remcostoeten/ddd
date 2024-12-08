import { cn } from '@/utils'
import { Layout } from '@/shared/shared/components/layout'
export default function KanbanPage() {
  return (
    <Layout>
      <h1 className={cn("text-2xl font-bold mb-4")}>Kanban</h1>
      <p className={cn("text-muted-foreground")}>Your Kanban board for project management will be displayed here.</p>
    </Layout>
  )
}

