'use client'

import { type ReactNode, useState } from 'react'
import { useSidebarStore } from '@/app/store/sidebar-store'
import { useSettingsStore } from '@/features/settings/settings-store'
import { cn } from '@/lib/utils'
import Sidebar from './sidebar'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { isCollapsed, toggleSidebar } = useSidebarStore()
  const { monoFont } = useSettingsStore()
  const [sidebarWidth, setSidebarWidth] = useState<number>(60)

  return (
    <div className={cn(
      "flex h-screen overflow-hidden",
      monoFont && "font-mono"
    )}>
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        width={sidebarWidth}
        setWidth={setSidebarWidth}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

