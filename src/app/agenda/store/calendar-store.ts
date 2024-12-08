import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalendarEvent, CalendarState } from '../types/calendar';

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      selectedDate: new Date(),
      viewType: 'month',
      events: [],
      setSelectedDate: (date) => set({ selectedDate: date }),
      setViewType: (type) => set({ viewType: type }),
      addEvent: (event) => set((state) => ({ 
        events: [...state.events, event] 
      })),
      removeEvent: (eventId) => set((state) => ({
        events: state.events.filter((event) => event.id !== eventId)
      })),
    }),
    {
      name: 'calendar-storage',
    }
  )
);