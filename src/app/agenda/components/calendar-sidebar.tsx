'use client';

import { Calendar, Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/shared/components/ui/button';
import { useCalendarStore } from '../store/calendar-store';
import { cn } from '@/utils';
import { useEventDialog } from '../hooks/use-event-dialog';

export function CalendarSidebar() {
  const { events, selectedDate } = useCalendarStore();
  const { openEventDialog } = useEventDialog();

  const formatEventTime = (time: string | Date) => {
    if (time instanceof Date) {
      return format(time, 'yyyy-MM-dd');
    }
    try {
      return format(new Date(time), 'yyyy-MM-dd');
    } catch {
      return '';
    }
  };

  const todayEvents = events.filter((event) => {
    if (!event?.startTime) return false;
    return formatEventTime(event.startTime) === format(selectedDate, 'yyyy-MM-dd');
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-5 w-5" />
          <span>Today's Events</span>
        </div>
        <Button size="sm" variant="outline" className="gap-1" onClick={() => openEventDialog()}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
      
      <div className="space-y-4">
        {todayEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No events scheduled for today
          </p>
        ) : (
          todayEvents.map((event) => (
            <div
              key={event.id}
              className={cn(
                "p-4 rounded-lg border border-border bg-card",
                "hover:bg-accent/50 transition-colors cursor-pointer"
              )}
            >
              <div className="text-sm font-medium">{event.title}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Clock className="h-3 w-3" />
                <span>
                  {format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
                </span>
              </div>
              {event.description && (
                <p className="text-xs text-muted-foreground mt-2">
                  {event.description}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}