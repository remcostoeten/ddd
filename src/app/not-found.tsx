'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/ui/button'
import SearchPopover from '@/components/search-popover'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
            Be sure to check your spelling.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-full">
            <SearchPopover className="w-full" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="inline-flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground group"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
              Go back
            </Button>
            <Button
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 group"
              asChild
            >
              <Link href="/dashboard">
                <Home className="h-4 w-4 text-primary-foreground" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

