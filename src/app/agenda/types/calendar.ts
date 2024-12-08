import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  startTime: z.string().or(z.date()),
  endTime: z.string().or(z.date()),
  type: z.enum(['meeting', 'task', 'reminder']).default('meeting'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export type CalendarEvent = z.infer<typeof eventSchema>;

export type CalendarViewType = 'month' | 'week' | 'day';

export type CalendarState = {
  selectedDate: Date;
  viewType: CalendarViewType;
  events: CalendarEvent[];
  setSelectedDate: (date: Date) => void;
  setViewType: (type: CalendarViewType) => void;
  addEvent: (event: CalendarEvent) => void;
  removeEvent: (eventId: string) => void;
};