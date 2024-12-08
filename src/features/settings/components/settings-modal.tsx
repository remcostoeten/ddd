import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { SettingsContent } from './settings-content';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useEffect } from 'react';
import { useKeyboardShortcut } from '@/shared/shared/hooks/use-keyboard-shortcut';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  useKeyboardShortcut(
    [
      { key: 's', ctrl: true },
      { key: 's', meta: true },
      { key: 'Escape' }
    ],
    onClose,
    { preventDefault: true }
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl bg-background text-foreground rounded-lg shadow-xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="settings-title"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 id="settings-title" className="text-2xl font-semibold">Site Settings</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <ScrollArea className="max-h-[calc(100vh-10rem)]">
                <div className="p-6">
                  <SettingsContent />
                </div>
              </ScrollArea>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

