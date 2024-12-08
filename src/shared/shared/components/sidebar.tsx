'use client'

import { useState, useEffect } from 'react'
import { Settings, User, GripVertical, LogOut, Keyboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebarStore } from '@/app/store/sidebar-store'
import { sidebarMenu } from '@/app/core/config/sidebar-menu'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/shared/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { useSettingsStore } from '@/features/settings/settings-store'
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut'
import { SettingsModal } from '@/features/settings/components/settings-modal'
import { useSession } from '@/lib/auth/session-provider'
import { oauthLogin } from '@/lib/auth/client'
import AnimatedShieldLogo from '@/components/ui/animated-shield-logo'

type SidebarProps = {
  isCollapsed: boolean
  toggleSidebar: () => void
  width: number
  setWidth: (width: number) => void
}

export default function Sidebar({ isCollapsed, toggleSidebar, width, setWidth }: SidebarProps) {
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const pathname = usePathname()
  const { compactMode, reducedMotion, isSettingsOpen, toggleSettingsModal } = useSettingsStore()
  const { user, loading, signOut } = useSession()

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

  const handleLogin = async (provider: 'google' | 'github') => {
    try {
      await oauthLogin(provider)
    } catch (error) {
      toast.error('Failed to start login')
    }
  }

  useKeyboardShortcut(
    [
      { key: 's', ctrl: true },
      { key: 's', meta: true }
    ],
    openSettings,
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
          <div className={`p-3 ${width <= 120 ? 'items-center' : 'items-start'}`}>
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
                    className={`p-2 ${compactMode ? 'mb-1' : 'mb-2'} flex items-center justify-center rounded-md transition-colors ${
                      reducedMotion ? '' : 'duration-200'
                    } ${
                      pathname.startsWith(item.href)
                        ? 'bg-[#3ECF8E]/20 text-[#3ECF8E]'
                        : 'text-[#4E4E4E] hover:text-white hover:bg-white/10'
                    } ${width <= 120 ? 'mx-2' : 'mx-3'} relative`}
                  >
                    <item.icon className="w-9 h-9" />
                    {width > 120 && (
                      <>
                        <span className="ml-4 whitespace-nowrap">
                          {item.tooltip}
                        </span>
                        {item.tooltip === 'Settings' && (
                          <span className="ml-auto pl-4 text-xs text-[#888888]">⌘S</span>
                        )}
                      </>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="tooltip-content">
                  <p>{item.tooltip}</p>
                  {item.tooltip === 'Settings' && <span className="ml-2 text-xs opacity-60">⌘S</span>}
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
                className={`p-2 mb-2 flex items-center justify-center rounded-md text-[#4E4E4E] hover:text-white transition-colors duration-200 ${
                  width <= 120 ? 'mx-2' : 'mx-3'
                }`}
              >
                <Settings className="w-9 h-9" />
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

          {/* User section */}
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-center p-2 rounded-md text-[#4E4E4E] hover:text-white transition-colors duration-200">
                    <User className="w-9 h-9" />
                    {width > 120 && <span className="ml-3">Account</span>}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-[#1E1E1E] border-[#2E2E2E]">
                    <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#2E2E2E]" />
                    <DropdownMenuItem className="text-white hover:bg-[#3ECF8E] hover:text-black focus:bg-[#3ECF8E] focus:text-black">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Account settings</span>
                      <span className="ml-auto text-xs text-[#888888]">⌘S</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-[#3ECF8E] hover:text-black focus:bg-[#3ECF8E] focus:text-black">
                      <Keyboard className="mr-2 h-4 w-4" />
                      <span>Keyboard shortcuts</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#2E2E2E]" />
                    <DropdownMenuItem 
                      onClick={signOut}
                      className="text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className={`p-2 ${width <= 120 ? 'mx-2' : 'mx-3'}`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleLogin('github')}
                          className="w-full p-2 flex items-center justify-center rounded-md bg-[#2E2E2E] text-white hover:bg-[#3ECF8E] hover:text-black transition-colors duration-200"
                        >
                          {width <= 120 ? (
                            <User className="w-6 h-6" />
                          ) : (
                            <span>Login with GitHub</span>
                          )}
                        </button>
                        <button
                          onClick={() => handleLogin('google')}
                          className="w-full p-2 flex items-center justify-center rounded-md bg-[#2E2E2E] text-white hover:bg-[#3ECF8E] hover:text-black transition-colors duration-200"
                        >
                          {width <= 120 ? (
                            <User className="w-6 h-6" />
                          ) : (
                            <span>Login with Google</span>
                          )}
                        </button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="tooltip-content">
                      <p>Login to your account</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </>
          )}
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

