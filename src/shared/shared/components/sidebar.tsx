'use client'

import { useState, useEffect } from 'react'
import { Settings, User, GripVertical, LogOut, Keyboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebarStore } from '@/app/store/sidebar-store'
import { User as UserType, getUser } from '@/app/types/user'
import { ShieldLogo } from './ShieldLogo'
import { sidebarMenu } from '@/app/core/config/sidebar-menu'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/shared/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { useSettingsStore } from '@/features/settings/settings-store'
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut'
import { SettingsModal } from '@/features/settings/components/settings-modal'

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
    if (width <= 100) {
      setWidth(60)
    } else if (width > 100 && width < 240) {
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
    toast.success('Settings opened', {
      description: 'Use Cmd/Ctrl + S to toggle settings anytime',
    })
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
        } ease-in-out ${isCollapsed ? 'items-center' : 'items-start'} ${
          compactMode ? 'py-2' : 'py-4'
        } relative`}
        style={{ width: `${width}px` }}
      >
        <div className="flex flex-col items-center w-full">
          {/* Logo */}
          <div className="my-4">
            <ShieldLogo
              size="xs"
              animated
              animationVariant="trace"
              hasLink
            />
          </div>

          <div className="w-8 border-t border-[#2E2E2E] mb-4" />

          {/* Menu items */}
          {sortedMenuItems.map((item) => (
            <div key={item.tooltip} className="w-full flex flex-col items-center">
              {item.separator === 'before' && <div className="w-8 border-t border-[#2E2E2E] my-2" />}
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
                    } ${isCollapsed ? 'justify-center w-10' : 'w-full px-3'} relative`}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    {width > 100 && (
                      <>
                        <span className="ml-3 whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {item.tooltip}
                        </span>
                        {item.kbd && (
                          <span className="ml-auto text-xs text-[#888888]">⌘{item.kbd}</span>
                        )}
                      </>
                    )}
                    {item.notifications && (
                      <>
                        {isCollapsed ? (
                          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3ECF8E] rounded-full" />
                        ) : (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#3ECF8E] text-[10px] font-medium text-black">
                            {item.notifications}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.tooltip}</p>
                  {item.kbd && <p className="text-xs text-[#888888]">⌘ {item.kbd}</p>}
                </TooltipContent>
              </Tooltip>
              {item.separator === 'after' && <div className="w-8 border-t border-[#2E2E2E] my-2" />}
            </div>
          ))}
        </div>

        {/* Bottom items */}
        <div className="mt-auto flex flex-col items-center w-full">
          <div className="w-8 border-t border-[#2E2E2E] mb-4" />

          {/* Settings button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={openSettings}
                className={`p-2 mb-2 flex items-center rounded-md text-[#4E4E4E] hover:text-white transition-colors duration-200 ${
                  isCollapsed ? 'justify-center w-10' : 'w-full px-3'
                }`}
              >
                <Settings className="w-5 h-5" strokeWidth={1.5} />
                {!isCollapsed && (
                  <>
                    <span className="ml-3 whitespace-nowrap">Settings</span>
                    <span className="ml-auto text-xs text-[#888888]">⌘S</span>
                  </>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
              <p className="text-xs text-[#888888]">⌘ S</p>
            </TooltipContent>
          </Tooltip>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`p-2 flex items-center rounded-md text-[#4E4E4E] hover:text-white transition-colors duration-200 w-full ${
                  isCollapsed ? 'justify-center' : 'px-3'
                }`}
              >
                <div className="relative">
                  {user ? (
                    <>
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#3ECF8E] rounded-full border-2 border-[#181818]" />
                    </>
                  ) : (
                    <User className="w-6 h-6" strokeWidth={1.5} />
                  )}
                </div>
                {!isCollapsed && (
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

