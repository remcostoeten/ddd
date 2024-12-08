'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils';

interface PageToolbarProps {
  children: ReactNode;
  className?: string;
}

export function PageToolbar({ children, className }: PageToolbarProps) {
  return (
    <div className={cn(
      "flex items-center justify-between pb-4 gap-4",
      "border-b border-border mb-6",
      className
    )}>
      {children}
    </div>
  );
}