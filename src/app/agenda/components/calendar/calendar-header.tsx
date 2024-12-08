'use client';

import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';
import { Button } from '@/shared/components/ui/button';
import { useCalendarStore } from '../../store/calendar-store';
import { CalendarViewType } from '../../types/calendar';
import { useEventDialog } from '../../hooks/use-event-dialog';

const viewOptions: CalendarViewType[] = ['month', 'week', 'day'];

export function CalendarHeader() {
  const { selectedDate, viewType, setSelectedDate, setViewType } = useCalendarStore();
  const { openEventDialog } = useEventDialog();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? subMonths(selectedDate, 1)
      : addMonths(selectedDate, 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="flex items-center justify-between mb-6 px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold min-w-[200px] text-center">
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          {viewOptions.map((view) => (
            <Button
              key={view}
              variant={viewType === view ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType(view)}
              className="capitalize"
            >
              {view}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={() => openEventDialog()} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Event
      </Button>
    </div>
  );
}