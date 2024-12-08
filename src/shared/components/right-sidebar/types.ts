import { ReactNode } from 'react';

export type RightSidebarConfig = {
  enabled: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  title?: string;
};

export type RightSidebarProps = {
  children?: ReactNode;
  title?: string;
  config?: Partial<RightSidebarConfig>;
  className?: string;
};

export type RightSidebarStore = {
  isOpen: boolean;
  width: number;
  toggle: () => void;
  setWidth: (width: number) => void;
  reset: () => void;
};