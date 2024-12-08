import { RightSidebarConfig } from './types';

export const rightSidebarRouteConfig: Record<string, RightSidebarConfig> = {
  '/agenda': {
    enabled: true,
    width: 400,
    minWidth: 320,
    maxWidth: 600,
    title: 'Calendar Details',
  },
  '/default': {
    enabled: true,
    width: 320,
    minWidth: 280,
    maxWidth: 480,
  },
};

export function getRightSidebarConfig(path: string): RightSidebarConfig {
  return rightSidebarRouteConfig[path] || rightSidebarRouteConfig['/default'];
}