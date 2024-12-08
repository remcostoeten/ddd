'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

type BreadcrumbsProps = {
  className?: string
}

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}>
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`
        const isLast = index === segments.length - 1

        return (
          <div key={segment} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {isLast ? (
              <span className="capitalize text-foreground">{segment}</span>
            ) : (
              <Link
                href={href}
                className="capitalize hover:text-foreground transition-colors"
              >
                {segment}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
} 