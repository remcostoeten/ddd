import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RightSidebarStore } from './types';

const DEFAULT_WIDTH = 320;

export const useRightSidebarStore = create<RightSidebarStore>()(
  persist(
    (set) => ({
      isOpen: true,
      width: DEFAULT_WIDTH,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setWidth: (width: number) => set({ width }),
      reset: () => set({ width: DEFAULT_WIDTH, isOpen: true }),
    }),
    {
      name: 'right-sidebar-storage',
    }
  )
);