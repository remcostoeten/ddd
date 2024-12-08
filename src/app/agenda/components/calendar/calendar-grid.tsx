'use client';

import { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns';
import { useCalendarStore } from '../../store/calendar-store';
import { CalendarDay } from './calendar-day';

export  function CalendarGrid({ selectedDate, events }: { selectedDate: Date; events: any[] }) {
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(selectedDate));
    const end = endOfWeek(endOfMonth(selectedDate));
    return eachDayOfInterval({ start, end });
  }, [selectedDate]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="rounded-lg border bg-card">
      <div className="grid grid-cols-7 gap-px border-b">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center bg-muted text-sm font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px">
        {days.map((date) => {
          const dayEvents = events.filter(
            (event) => event.startTime && format(event.startTime, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          );

          return (
            <CalendarDay
              key={date.toString()}
              date={date}
              isCurrentMonth={isSameMonth(date, selectedDate)}
              isToday={isToday(date)}
              events={dayEvents}
            />
          );
        })}
      </div>
    </div>
  );
}