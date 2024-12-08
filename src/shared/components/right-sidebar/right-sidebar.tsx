'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/utils';
import { useRightSidebarStore } from './right-sidebar-store';
import { RightSidebarProps } from './types';

const DEFAULT_CONFIG = {
  enabled: true,
  minWidth: 280,
  maxWidth: 600,
  defaultWidth: 320,
};

export function RightSidebar({
  children,
  title,
  config = {},
  className,
}: RightSidebarProps) {
  const [isResizing, setIsResizing] = useState(false);
  const { isOpen, width, toggle, setWidth } = useRightSidebarStore();
  
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleResize = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = window.innerWidth - e.clientX;
      const clampedWidth = Math.min(
        Math.max(newWidth, finalConfig.minWidth),
        finalConfig.maxWidth
      );
      
      setWidth(clampedWidth);
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, finalConfig.minWidth, finalConfig.maxWidth, setWidth]);

  if (!finalConfig.enabled) return null;

  return (
    <aside
      className={cn(
        'fixed top-0 right-0 h-screen bg-background border-l border-border transition-all duration-300 ease-in-out',
        className
      )}
      style={{ width: isOpen ? width : 60 }}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <button
          onClick={toggle}
          className="p-2 hover:bg-accent rounded-md transition-colors"
        >
          <ChevronLeft
            className={cn(
              'h-5 w-5 transition-transform duration-300',
              !isOpen && 'rotate-180'
            )}
          />
        </button>
        {isOpen && title && (
          <h2 className="text-lg font-semibold">{title}</h2>
        )}
      </div>

      {isOpen && (
        <>
          <div className="p-4 overflow-auto h-[calc(100vh-4rem)]">
            {children}
          </div>
          <div
            className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary/20"
            onMouseDown={handleResizeStart}
          />
        </>
      )}
    </aside>
  );
}