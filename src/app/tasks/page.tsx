'use client';

import { CheckSquare } from 'lucide-react';
import { Page } from '@/shared/components/page/page';
import { EmptyState } from '@/shared/components/empty-state';

export default function TasksPage() {
  return (
    <Page>
      <Page.Header
        title="Tasks"
        description="Manage your tasks and track your progress"
      />
      <Page.Content>
        <EmptyState
          icon={CheckSquare}
          title="No tasks created"
          description="Create your first task to start organizing your work."
          action={{
            label: "Create Task",
            onClick: () => console.log("Create task")
          }}
        />
      </Page.Content>
    </Page>
  );
}