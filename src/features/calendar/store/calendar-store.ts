import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalendarEvent, EventFilter } from '../types/event';

type ViewType = 'month' | 'week' | 'day' | 'agenda';

interface CalendarState {
  selectedDate: Date;
  viewType: ViewType;
  events: CalendarEvent[];
  filters: EventFilter;
  setSelectedDate: (date: Date) => void;
  setViewType: (type: ViewType) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  setFilters: (filters: EventFilter) => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      selectedDate: new Date(),
      viewType: 'month',
      events: [],
      filters: {},
      setSelectedDate: (date) => set({ selectedDate: date }),
      setViewType: (type) => set({ viewType: type }),
      addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
      updateEvent: (id, updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updatedEvent } : event
          ),
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
      setFilters: (filters) => set({ filters }),
    }),
    {
      name: 'calendar-storage',
    }
  )
);