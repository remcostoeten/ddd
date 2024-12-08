import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  category: z.enum(['meeting', 'task', 'reminder', 'other']),
  priority: z.enum(['low', 'medium', 'high']),
  isRecurring: z.boolean(),
  recurrence: z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    interval: z.number(),
    endDate: z.date().optional(),
  }).optional(),
  attachments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string(),
  })).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
});

export type CalendarEvent = z.infer<typeof eventSchema>;

export type EventFormData = Omit<CalendarEvent, 'id'>;

export type EventFilter = {
  dateRange?: { start: Date; end: Date };
  categories?: CalendarEvent['category'][];
  priorities?: CalendarEvent['priority'][];
  searchTerm?: string;
  customFields?: Record<string, unknown>;
};