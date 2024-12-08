import { cn } from '@/lib/utils'
import { Layout } from '@/shared/shared/components/layout'
export default function FinancePage() {
  return (
    <Layout>
      <h1 className={cn("text-2xl font-bold mb-4")}>Finance</h1>
      <p className={cn("text-muted-foreground")}>Your financial information and reports will be displayed here.</p>
    </Layout>
  )
}

