'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils'
import { ChevronLeft } from 'lucide-react'
import { sidebarMenu } from '@/app/core/config/sidebar-menu'
import { useSidebarStore } from '@/app/store/sidebar-store'

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebarStore()
  const pathname = usePathname()

  return (
    <aside className={cn(
      "h-screen bg-[#1C1C1C] text-white",
      isCollapsed ? "w-[60px]" : "w-[240px]",
      "transition-all duration-300 ease-in-out"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/10">
        <Link href="/" className="flex items-center space-x-2">
          {!isCollapsed && (
            <span className="font-bold text-lg">ISP</span>
          )}
        </Link>
        <button onClick={toggleSidebar} className="p-2 hover:bg-white/10 rounded-md">
          <ChevronLeft className={cn(
            "h-5 w-5 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </button>
      </div>
      <nav className="p-2 space-y-1">
        {sidebarMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-md text-sm",
              "transition-colors duration-200",
              pathname === item.href 
                ? "bg-white/10 text-white" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.tooltip}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  )
} 