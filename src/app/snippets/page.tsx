import { cn } from '@/lib/utils'
import { Layout } from '@/shared/shared/components/layout'
export default function SnippetsPage() {
  return (
    <Layout>
      <h1 className={cn("text-2xl font-bold mb-4")}>Snippets</h1>
      <p className={cn("text-muted-foreground")}>Your code snippets and reusable components will be displayed here.</p>
    </Layout>
  )
}

