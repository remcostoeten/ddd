import { useCallback, useState } from 'react';
import { EventFilter } from '../types/event';
import { useCalendarStore } from '../store/calendar-store';

export function useEventFilters() {
  const [filters, setFilters] = useState<EventFilter>({});
  const { events } = useCalendarStore();

  const applyFilters = useCallback((events: CalendarEvent[]) => {
    return events.filter(event => {
      // Date range filter
      if (filters.dateRange) {
        const eventDate = new Date(event.startDate);
        if (
          eventDate < filters.dateRange.start ||
          eventDate > filters.dateRange.end
        ) {
          return false;
        }
      }

      // Categories filter
      if (filters.categories?.length) {
        if (!filters.categories.includes(event.category)) {
          return false;
        }
      }

      // Priorities filter
      if (filters.priorities?.length) {
        if (!filters.priorities.includes(event.priority)) {
          return false;
        }
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchRegex = new RegExp(filters.searchTerm, 'i');
        const searchableText = `${event.title} ${event.description || ''}`;
        if (!searchRegex.test(searchableText)) {
          return false;
        }
      }

      // Custom fields filter
      if (filters.customFields) {
        for (const [key, value] of Object.entries(filters.customFields)) {
          if (event.customFields?.[key] !== value) {
            return false;
          }
        }
      }

      return true;
    });
  }, [filters]);

  const filteredEvents = applyFilters(events);

  return {
    filters,
    setFilters,
    filteredEvents,
  };
}