'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils';
import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
  className?: string;
}

export function EmptyState({ 
  icon: Icon,
  title,
  description,
  action,
  children,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center",
      "min-h-[400px] rounded-lg border border-dashed",
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full bg-primary/10 p-4">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        </div>
        {action && (
          <Button onClick={action.onClick} className="mt-4">
            {action.label}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}