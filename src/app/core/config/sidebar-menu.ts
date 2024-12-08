import { Home, FileText, ClipboardList, StickyNote, Code, Calendar, FileSearch, Package, Settings, Settings2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export type MenuItem = {
  icon: LucideIcon;
  href: string;
  tooltip: string;
  order: number;
  separator?: 'before' | 'after';
  notifications?: number;
  kbd?: string;
}

export const sidebarMenu: MenuItem[] = [
  {
    icon: Home,
    href: '/dashboard',
    tooltip: 'Dashboard',
    order: 1,
    separator: 'after',
  },
  {
    icon: FileText,
    href: '/finance',
    tooltip: 'Finance',
    order: 2,
  },
  {
    icon: ClipboardList,
    href: '/tasks',
    tooltip: 'Tasks',
    order: 3,
  },
  {
    icon: StickyNote,
    href: '/notes',
    tooltip: 'Notes',
    order: 4,
  },
  {
    icon: Code,
    href: '/snippets',
    tooltip: 'Snippets',
    order: 5,
    separator: 'after',
  },
  {
    icon: Calendar,
    href: '/agenda',
    tooltip: 'Agenda',
    order: 6,
  },
  {
    icon: Settings2,
    href: '/settings',
    tooltip: 'Settings',
    order: 99,
    kbd: 'S',
  },
];

