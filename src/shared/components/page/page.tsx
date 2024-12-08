'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils';
import { PageHeader } from './page-header';
import { PageToolbar } from './page-toolbar';
import { PageContent } from './page-content';

interface PageProps {
  children: ReactNode;
  className?: string;
}

export function Page({ children, className }: PageProps) {
  return (
    <div className={cn("flex flex-col flex-1 p-6", className)}>
      {children}
    </div>
  );
}

Page.Header = PageHeader;
Page.Toolbar = PageToolbar;
Page.Content = PageContent;