'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, type EventFormData } from '../../types/event';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { DatePicker } from '@/shared/components/ui/date-picker';
import { TimePicker } from '@/shared/components/ui/time-picker';
import { Select } from '@/shared/components/ui/select';
import { Switch } from '@/shared/components/ui/switch';

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  initialData?: Partial<EventFormData>;
}

export function EventForm({ onSubmit, initialData }: EventFormProps) {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...form.register('title')}
            placeholder="Event title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...form.register('description')}
            placeholder="Event description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <DatePicker
              selected={form.watch('startDate')}
              onSelect={(date) => form.setValue('startDate', date)}
            />
          </div>
          <div>
            <Label>End Date</Label>
            <DatePicker
              selected={form.watch('endDate')}
              onSelect={(date) => form.setValue('endDate', date)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Time</Label>
            <TimePicker
              value={form.watch('startTime')}
              onChange={(time) => form.setValue('startTime', time)}
            />
          </div>
          <div>
            <Label>End Time</Label>
            <TimePicker
              value={form.watch('endTime')}
              onChange={(time) => form.setValue('endTime', time)}
            />
          </div>
        </div>

        <div>
          <Label>Category</Label>
          <Select
            value={form.watch('category')}
            onValueChange={(value) => form.setValue('category', value)}
            options={[
              { label: 'Meeting', value: 'meeting' },
              { label: 'Task', value: 'task' },
              { label: 'Reminder', value: 'reminder' },
              { label: 'Other', value: 'other' },
            ]}
          />
        </div>

        <div>
          <Label>Priority</Label>
          <Select
            value={form.watch('priority')}
            onValueChange={(value) => form.setValue('priority', value)}
            options={[
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
            ]}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={form.watch('isRecurring')}
            onCheckedChange={(checked) => form.setValue('isRecurring', checked)}
          />
          <Label>Recurring Event</Label>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Event
      </Button>
    </form>
  );
}