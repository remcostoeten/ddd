'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useEventDialogStore } from '../hooks/use-event-dialog';
import { EventForm } from './event-form';

export function EventDialog() {
  const { isOpen, closeDialog, handleSubmit } = useEventDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>
        <EventForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}