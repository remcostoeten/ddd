'use client'

import { useState, useEffect } from 'react'
import { Settings, User, GripVertical, LogOut, Keyboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebarStore } from '@/app/store/sidebar-store'
import { User as UserType, getUser } from '@/app/types/user'
import { sidebarMenu } from '@/app/core/config/sidebar-menu'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/shared/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { useSettingsStore } from '@/features/settings/settings-store'
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut'
import { SettingsModal } from '@/features/settings/components/settings-modal'
import { useReducedMotion } from '../../../hooks/use-reduced-motion'
import { useSettings } from '../../../hooks/use-settings'
import { cn } from '../../../lib/utils'
import AnimatedShieldLogo from '../../../components/ui/animated-shield-logo'

type SidebarProps = {
  isCollapsed: boolean
  toggleSidebar: () => void
  width: number
  setWidth: (width: number) => void
}

export default function Sidebar({ isCollapsed, toggleSidebar, width, setWidth }: SidebarProps) {
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [user, setUser] = useState<UserType | null>(null)
  const pathname = usePathname()
  const { compactMode, reducedMotion, isSettingsOpen, toggleSettingsModal } = useSettingsStore()

  const handleResizeStart = () => {
    setIsResizing(true)
  }

  const handleResizeEnd = () => {
    setIsResizing(false)
    if (width < 120) {
      setWidth(60)
    } else {
      setWidth(240)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return
    const newWidth = e.clientX
    setWidth(Math.max(60, Math.min(newWidth, 240)))
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(1)
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleResizeEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleResizeEnd)
    }
  }, [isResizing])

  const openSettings = () => {
    toggleSettingsModal()
  }

  useKeyboardShortcut(
    [
      { key: 's', ctrl: true },
      { key: 's', meta: true }
    ],
    toggleSettingsModal,
    { preventDefault: true }
  )

  const sortedMenuItems = [...sidebarMenu].sort((a, b) => a.order - b.order)

  return (
    <TooltipProvider>
      <aside
        className={`flex flex-col h-screen bg-[#181818] border-r border-[#2E2E2E] transition-all ${
          reducedMotion ? '' : 'duration-300'
        } ease-in-out relative`}
        style={{ width: `${width}px` }}
      >
        <div className="flex flex-col w-full">
          {/* Logo */}
          <div className={`p-4 ${width <= 120 ? 'items-center' : 'items-start'}`}>
            <AnimatedShieldLogo size="xs" />
          </div>

          <div className="w-full border-t border-[#2E2E2E] mb-4" />

          {/* Menu items */}
          {sortedMenuItems.map((item) => (
            <div key={item.tooltip} className="w-full">
              {item.separator === 'before' && <div className="w-full border-t border-[#2E2E2E] my-2" />}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`p-2 ${compactMode ? 'mb-1' : 'mb-2'} flex items-center rounded-md transition-colors ${
                      reducedMotion ? '' : 'duration-200'
                    } ${
                      pathname.startsWith(item.href)
                        ? 'bg-[#3ECF8E]/20 text-[#3ECF8E]'
                        : 'text-[#4E4E4E] hover:text-white hover:bg-white/10'
                    } ${width <= 120 ? 'mx-2' : 'mx-3'} relative`}
                  >
                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                    {width > 120 && (
                      <>
                        <span className="ml-3 whitespace-nowrap">
                          {item.tooltip}
                        </span>
                        {item.kbd && (
                          <span className="ml-auto pl-4 text-xs text-[#888888]">⌘{item.kbd}</span>
                        )}
                      </>
                    )}
                    {item.notifications && (
                      <>
                        {width <= 120 ? (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#3ECF8E]/50 rounded-full notification-pulse" />
                        ) : (
                          <span className="ml-auto flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-[#3ECF8E] text-[10px] font-medium text-black notification-pulse">
                            {item.notifications}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="tooltip-content">
                  <p>{item.tooltip}</p>
                  {item.kbd && <span className="ml-2 text-xs opacity-60">⌘{item.kbd}</span>}
                </TooltipContent>
              </Tooltip>
              {item.separator === 'after' && <div className="w-full border-t border-[#2E2E2E] my-2" />}
            </div>
          ))}
        </div>

        {/* Bottom items */}
        <div className="mt-auto flex flex-col w-full">
          <div className="w-full border-t border-[#2E2E2E] mb-4" />

          {/* Settings button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={openSettings}
                className={`p-2 mb-2 flex items-center rounded-md text-[#4E4E4E] hover:text-white transition-colors duration-200 ${
                  width <= 120 ? 'mx-2' : 'mx-3'
                }`}
              >
                <Settings className="w-6 h-6" strokeWidth={1.5} />
                {width > 120 && (
                  <>
                    <span className="ml-3 whitespace-nowrap">Settings</span>
                    <span className="ml-auto pl-4 text-xs text-[#888888]">⌘S</span>
                  </>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="tooltip-content">
              <p>Settings</p>
              {width <= 120 && <span className="ml-2 text-xs opacity-60">⌘S</span>}
            </TooltipContent>
          </Tooltip>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`p-2 mb-4 flex items-center text-[#4E4E4E] hover:text-white transition-colors duration-200 ${
                  width <= 120 ? 'mx-2' : 'mx-3'
                }`}
              >
                <div className="relative">
                  {user ? (
                    <>
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#3ECF8E] rounded-full" />
                    </>
                  ) : (
                    <User className="w-6 h-6" strokeWidth={1.5} />
                  )}
                </div>
                {width > 120 && (
                  <div className="ml-3 text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="right"
              className="w-[240px] p-2 bg-[#1E1E1E] border-[#2E2E2E] text-white"
            >
              <div className="flex items-center gap-2 p-2 mb-2">
                <div className="relative">
                  <img
                    src={user?.avatar}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#3ECF8E] rounded-full border-2 border-[#1E1E1E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{user?.name}</p>
                  <p className="text-sm text-[#888888] truncate">{user?.email}</p>
                </div>
              </div>

              <DropdownMenuItem className="text-white hover:bg-[#3ECF8E] hover:text-black focus:bg-[#3ECF8E] focus:text-black">
                <User className="mr-2 h-4 w-4" />
                <span>View profile</span>
                <span className="ml-auto text-xs text-[#888888]">⌘P</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-white hover:bg-[#3ECF8E] hover:text-black focus:bg-[#3ECF8E] focus:text-black">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account settings</span>
                <span className="ml-auto text-xs text-[#888888]">⌘S</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-white hover:bg-[#3ECF8E] hover:text-black focus:bg-[#3ECF8E] focus:text-black">
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <span className="ml-auto text-xs text-[#888888]">?</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <span className="ml-auto text-xs opacity-60">⌘Q</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Resize Handle */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize group"
          onMouseDown={handleResizeStart}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 -mr-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-4 h-4 text-[#4E4E4E]" />
          </div>
        </div>

        {/* Settings Modal */}
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={toggleSettingsModal} 
        />
      </aside>
    </TooltipProvider>
  )
}

