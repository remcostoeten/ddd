'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-4 pb-6", className)}>
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center justify-between">
          {children}
        </div>
      )}
    </div>
  );
}