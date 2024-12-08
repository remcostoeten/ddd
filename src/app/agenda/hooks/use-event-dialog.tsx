'use client';

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { useCalendarStore } from '../store/calendar-store';
import { CalendarEvent } from '../types/calendar';

interface EventDialogStore {
  isOpen: boolean;
  eventData: Partial<CalendarEvent> | null;
  openDialog: (event?: Partial<CalendarEvent>) => void;
  closeDialog: () => void;
}

export const useEventDialogStore = create<EventDialogStore>((set) => ({
  isOpen: false,
  eventData: null,
  openDialog: (event) => set({ isOpen: true, eventData: event || null }),
  closeDialog: () => set({ isOpen: false, eventData: null }),
}));

export function useEventDialog() {
  const { addEvent } = useCalendarStore();
  const { openDialog, closeDialog } = useEventDialogStore();

  const handleSubmit = (data: Omit<CalendarEvent, 'id'>) => {
    try {
      const event: CalendarEvent = {
        ...data,
        id: uuidv4(),
        startTime: data.startTime,
        endTime: data.endTime,
        type: data.type || 'meeting',
        priority: data.priority || 'medium',
      };
      addEvent(event);
      closeDialog();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return {
    openEventDialog: openDialog,
    closeEventDialog: closeDialog,
    handleSubmit,
  };
}