import { FileText, StickyNote, Code, ClipboardList, LayoutGrid, Calendar, Settings, Home, Bell } from 'lucide-react'
import { TypeIcon as type, LucideIcon } from 'lucide-react'

export type MenuItem = {
  icon: LucideIcon
  href: string
  tooltip: string
  order: number
  separator?: 'before' | 'after'
  notifications?: number
  kbd?: string
}

export const sidebarMenu: MenuItem[] = [
  { 
    icon: Home, 
    href: '/dashboard', 
    tooltip: 'Dashboard', 
    order: 0,
    kbd: 'H'
  },
  { 
    icon: Bell, 
    href: '/notifications', 
    tooltip: 'Notifications', 
    order: 1,
    notifications: 4,
    kbd: 'N'
  },
  { 
    icon: FileText, 
    href: '/finance', 
    tooltip: 'Finance', 
    order: 2,
    kbd: 'F'
  },
  { 
    icon: StickyNote, 
    href: '/notes', 
    tooltip: 'Notes', 
    order: 3,
    kbd: 'T'
  },
  { 
    icon: Code, 
    href: '/snippets', 
    tooltip: 'Snippets', 
    order: 4, 
    separator: 'after',
    kbd: 'S'
  },
  { 
    icon: ClipboardList, 
    href: '/tasks', 
    tooltip: 'Tasks', 
    order: 5,
    kbd: 'K'
  },
  { 
    icon: LayoutGrid, 
    href: '/kanban', 
    tooltip: 'Kanban', 
    order: 6,
    kbd: 'B'
  },
  { 
    icon: Calendar, 
    href: '/agenda', 
    tooltip: 'Agenda', 
    order: 7,
    kbd: 'A'
  },
]

