'use client';

import { format } from 'date-fns';
import { cn } from '@/utils';
import { CalendarEvent } from '../../types/calendar';
import { useCalendarStore } from '../../store/calendar-store';
import { Badge } from '@/shared/components/ui/badge';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export function CalendarDay({ date, isCurrentMonth, isToday, events }: CalendarDayProps) {
  const { setSelectedDate, selectedDate } = useCalendarStore();
  const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

  return (
    <button
      onClick={() => setSelectedDate(date)}
      className={cn(
        'w-full min-h-[120px] p-2 border rounded-lg',
        'hover:bg-accent/50 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isSelected && 'border-primary',
        !isCurrentMonth && 'opacity-50',
        isToday && 'bg-primary/10 border-primary'
      )}
    >
      <div className="flex flex-col h-full">
        <span className={cn(
          'text-sm font-medium',
          isToday && 'text-primary'
        )}>
          {format(date, 'd')}
        </span>
        
        <div className="mt-1 space-y-1 flex-1">
          {events.map((event) => (
            <div
              key={event.id}
              className={cn(
                'px-2 py-1 rounded text-xs truncate',
                'bg-primary/10 text-primary'
              )}
              title={event.title}
            >
              {format(event.startTime, 'HH:mm')} {event.title}
            </div>
          ))}
        </div>

        {events.length > 2 && (
          <Badge variant="secondary" className="mt-1 text-xs">
            +{events.length - 2} more
          </Badge>
        )}
      </div>
    </button>
  );
}