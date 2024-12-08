'use client';

import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

interface TransactionFiltersProps {
  filters: {
    type: string;
    category: string;
    startDate: Date | null;
    endDate: Date | null;
  };
  onFilterChange: (filters: any) => void;
}

const CATEGORIES = [
  'Salary',
  'Freelance',
  'Investments',
  'Rent',
  'Utilities',
  'Groceries',
  'Transportation',
  'Entertainment',
  'Healthcare',
  'Other'
];

export function TransactionFilters({ filters, onFilterChange }: TransactionFiltersProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 rounded-lg border bg-card">
      <div className="space-y-2">
        <Label>Type</Label>
        <Select
          value={filters.type}
          onValueChange={(value) => onFilterChange({ ...filters, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => onFilterChange({ ...filters, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !filters.startDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.startDate ? (
                format(filters.startDate, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.startDate || undefined}
              onSelect={(date) => onFilterChange({ ...filters, startDate: date })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>End Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !filters.endDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.endDate ? (
                format(filters.endDate, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.endDate || undefined}
              onSelect={(date) => onFilterChange({ ...filters, endDate: date })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}