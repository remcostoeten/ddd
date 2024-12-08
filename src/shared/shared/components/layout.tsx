'use client'

import { type ReactNode, useState } from 'react'
import { useSettingsStore } from '@/features/settings/settings-store'
import { useSidebarStore } from '@/app/store/sidebar-store'
import { cn } from '@/shared/lib/utils'
import Sidebar from './sidebar'
import Breadcrumbs from '@/components/breadcrumbs'
import CommandPalette from '@/components/command-palette'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { monoFont, fontSize, reducedMotion } = useSettingsStore()
  const [sidebarWidth, setSidebarWidth] = useState(60)
  const { isCollapsed, toggleSidebar } = useSidebarStore()

  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }

  return (
    <div className={cn(
      "flex min-h-screen bg-background",
      monoFont && "font-mono",
      fontSizeClasses[fontSize],
      reducedMotion && "motion-reduce"
    )}>
      <Sidebar 
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        width={sidebarWidth}
        setWidth={setSidebarWidth}
      />
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-border/10">
          <div className="flex items-center gap-4">
            <Breadcrumbs />
          </div>
          <CommandPalette />
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

