import { create } from 'zustand'

type SidebarStore = {
  isCollapsed: boolean
  toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isCollapsed: true,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}))

