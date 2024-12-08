'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useResize } from '../../hooks/use-resize'
import { useSidebarStore } from '../../store/sidebar-store'

export function RightSidebar() {
  const { isRightCollapsed, toggleRightSidebar } = useSidebarStore()
  const { width, setIsResizing } = useResize(240, 480)
  const [isResizeHovered, setIsResizeHovered] = useState(false)

  return (
    <aside
      style={{ width: isRightCollapsed ? 60 : width }}
      className={`relative h-screen bg-[#181818] text-white p-3 transition-all duration-300 ease-in-out ${
        isRightCollapsed ? 'w-[60px]' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <button onClick={toggleRightSidebar}>
          <ChevronLeft
            className={`w-5 h-5 text-[#4B5563] transition-transform duration-300 ${
              isRightCollapsed ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
        {!isRightCollapsed && <span className="font-medium text-sm">Details</span>}
      </div>
      {!isRightCollapsed && (
        <div className="h-full overflow-y-auto">
          {/* This is where route-specific content will be rendered */}
        </div>
      )}
      {!isRightCollapsed && (
        <div
          onMouseDown={() => setIsResizing(true)}
          onMouseEnter={() => setIsResizeHovered(true)}
          onMouseLeave={() => setIsResizeHovered(false)}
          className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-[#3ECF8E] transition-colors"
        >
          {isResizeHovered && (
            <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-16 bg-[#3ECF8E] rounded-full" />
          )}
        </div>
      )}
    </aside>
  )
}

