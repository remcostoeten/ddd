'use client';

import { CalendarHeader } from './calendar-header';
import { CalendarGrid } from './calendar-grid';
import { EventDialog } from '../event-dialog';
import { useCalendarStore } from '../../store/calendar-store';

export function CalendarView() {
  const { selectedDate, events } = useCalendarStore();

  return (
    <div className="p-6 bg-background rounded-lg border border-border">
      <CalendarHeader />
      <CalendarGrid selectedDate={selectedDate} events={events} />
      <EventDialog />
    </div>
  );
}