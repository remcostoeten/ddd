import { useCallback } from 'react';
import { addDays, addMonths, addWeeks, addYears, subDays, subMonths, subWeeks, subYears } from 'date-fns';
import { useCalendarStore } from '../store/calendar-store';

export function useCalendarNavigation() {
  const { selectedDate, setSelectedDate } = useCalendarStore();

  const navigate = useCallback((direction: 'prev' | 'next', unit: 'day' | 'week' | 'month' | 'year') => {
    const operations = {
      prev: {
        day: subDays,
        week: subWeeks,
        month: subMonths,
        year: subYears,
      },
      next: {
        day: addDays,
        week: addWeeks,
        month: addMonths,
        year: addYears,
      },
    };

    const operation = operations[direction][unit];
    setSelectedDate(operation(selectedDate, 1));
  }, [selectedDate, setSelectedDate]);

  return {
    navigate,
    selectedDate,
    setSelectedDate,
  };
}