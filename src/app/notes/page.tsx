'use client';

import { StickyNote } from 'lucide-react';
import { Page } from '@/shared/components/page/page';
import { EmptyState } from '@/shared/components/empty-state';

export default function NotesPage() {
  return (
    <Page>
      <Page.Header
        title="Notes"
        description="Capture and organize your thoughts"
      />
      <Page.Content>
        <EmptyState
          icon={StickyNote}
          title="No notes yet"
          description="Start writing your first note to capture your ideas."
          action={{
            label: "Create Note",
            onClick: () => console.log("Create note")
          }}
        />
      </Page.Content>
    </Page>
  );
}