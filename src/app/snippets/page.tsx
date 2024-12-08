'use client';

import { Code } from 'lucide-react';
import { Page } from '@/shared/components/page/page';
import { EmptyState } from '@/shared/components/empty-state';

export default function SnippetsPage() {
  return (
    <Page>
      <Page.Header
        title="Snippets"
        description="Store and organize your code snippets"
      />
      <Page.Content>
        <EmptyState
          icon={Code}
          title="No code snippets"
          description="Create your first code snippet to start building your library."
          action={{
            label: "Create Snippet",
            onClick: () => console.log("Create snippet")
          }}
        />
      </Page.Content>
    </Page>
  );
}