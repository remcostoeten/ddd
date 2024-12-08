'use client'

import { useState, useEffect } from 'react'
import { Home, FileText, ClipboardList, StickyNote, Code, Calendar, FileSearch, Package, Settings, User, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeModal } from './theme-modal'
import { useSidebarStore } from '../../store/sidebar-store'
import { User as UserType, getUser } from '../../types/user'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type IconMenuItem = {
  icon: React.ElementType;
  href: string;
  tooltip: string;
  order: number;
  separator?: 'before' | 'after';
}

const iconMenuItems: IconMenuItem[] = [
  { icon: Home, href: '/dashboard', tooltip: 'Dashboard', order: 1, separator: 'after' },
  { icon: FileText, href: '/finance', tooltip: 'Finance', order: 2 },
  { icon: ClipboardList, href: '/tasks', tooltip: 'Tasks', order: 3 },
  { icon: StickyNote, href: '/notes', tooltip: 'Notes', order: 4 },
  { icon: Code, href: '/snippets', tooltip: 'Snippets', order: 5, separator: 'after' },
  { icon: Calendar, href: '/agenda', tooltip: 'Agenda', order: 6 },
  { icon: FileSearch, href: '/parse-tool', tooltip: 'Parse Tool', order: 7 },
  { icon: Package, href: '/misc', tooltip: 'Miscellaneous', order: 8 },
  { icon: Settings, href: '/settings', tooltip: 'Settings', order: 99 },
]

export function IconAside() {
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const { isLeftCollapsed } = useSidebarStore()
  const pathname = usePathname()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(1) // Assuming user ID 1 for this example
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }
    fetchUser()
  }, [])

  const openTheme = () => setIsThemeOpen(true)

  const sortedIconMenuItems = [...iconMenuItems].sort((a, b) => a.order - b.order)

  return (
    <TooltipProvider>
      <aside className="flex flex-col justify-between w-[60px] h-screen py-4 bg-[#1B1B1B] border-r border-[#2E2E2E]">
        <div className="flex flex-col items-center">
          {sortedIconMenuItems.map((item, index) => (
            <div key={item.tooltip} className="w-full flex flex-col items-center">
              {item.separator === 'before' && <div className="my-2 w-8 border-t border-[#2E2E2E]" />}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`p-2 mb-2 flex justify-center rounded-md transition-colors duration-200 ${
                      pathname === item.href
                        ? 'bg-[#3ECF8E] text-black'
                        : 'text-[#4E4E4E] hover:text-white'
                    } ${
                      item.order === 99 ? 'mt-auto' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.tooltip}</p>
                </TooltipContent>
              </Tooltip>
              {item.separator === 'after' && <div className="my-2 w-8 border-t border-[#2E2E2E]" />}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 mb-2 flex justify-center items-center text-[#4E4E4E] hover:text-white transition-colors duration-200">
                    {user ? (
                      <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    ) : (
                      <User className="w-5 h-5" strokeWidth={1.5} />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-bold">{user?.name}</span>
                      <span className="text-xs text-gray-500">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={openTheme}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>User Menu</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
      <ThemeModal isOpen={isThemeOpen} onClose={() => setIsThemeOpen(false)} />
    </TooltipProvider>
  )
}

