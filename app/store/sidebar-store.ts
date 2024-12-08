import { create } from 'zustand'

type SidebarStore = {
  isCollapsed: boolean
  toggleSidebar: () => void
  width: number
  setWidth: (width: number) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isCollapsed: true, // Start collapsed
  toggleSidebar: () => set((state) => ({ 
    isCollapsed: !state.isCollapsed,
    width: state.isCollapsed ? 240 : 60
  })),
  width: 60, // Start with collapsed width
  setWidth: (width: number) => set({ width, isCollapsed: width <= 60 }),
}))

