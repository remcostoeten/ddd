'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { CalendarEvent, eventSchema } from '../types/calendar';
import { format } from 'date-fns';

type EventFormData = Omit<CalendarEvent, 'id'>;

type EventFormProps = {
  onSubmit: (data: EventFormData) => void;
  initialData?: Partial<EventFormData>;
}

export default function EventForm({ onSubmit, initialData }: EventFormProps) {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema.omit({ id: true })),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      startTime: initialData?.startTime || format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endTime: initialData?.endTime || format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      type: initialData?.type || 'meeting',
      priority: initialData?.priority || 'medium',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          {...form.register('title')} 
          className={form.formState.errors.title ? 'border-red-500' : ''}
        />
        {form.formState.errors.title && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          {...form.register('description')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="datetime-local"
            {...form.register('startTime')}
          />
          {form.formState.errors.startTime && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.startTime.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="datetime-local"
            {...form.register('endTime')}
          />
          {form.formState.errors.endTime && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.endTime.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          {...form.register('type')}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="meeting">Meeting</option>
          <option value="task">Task</option>
          <option value="reminder">Reminder</option>
        </select>
        {form.formState.errors.type && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.type.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="priority">Priority</Label>
        <select
          id="priority"
          {...form.register('priority')}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {form.formState.errors.priority && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.priority.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Save Event
      </Button>
    </form>
  );
}