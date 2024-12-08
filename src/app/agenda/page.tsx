'use client';

import { Calendar } from 'lucide-react';
import { Page } from '@/shared/components/page/page';
import { CalendarView } from './components/calendar/calendar-view';
import { RightSidebar } from '@/shared/components/right-sidebar/right-sidebar';
import { CalendarSidebar } from './components/calendar-sidebar';
import { getRightSidebarConfig } from '@/shared/components/right-sidebar/route-config';

export default function AgendaPage() {
  const sidebarConfig = getRightSidebarConfig('/agenda');

  return (
    <Page>
      <Page.Header
        title="Calendar"
        description="Manage your schedule and events"
      />
      <Page.Content>
        <CalendarView />
      </Page.Content>
      
      <RightSidebar config={sidebarConfig}>
        <CalendarSidebar />
      </RightSidebar>
    </Page>
  );
}