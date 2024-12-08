'use client';

import { useTransition } from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { toast } from 'sonner';
import { logout } from '@/lib/auth/actions';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logout();
      } catch (error) {
        toast.error('Failed to logout');
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isPending}
      className="w-full justify-start"
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isPending ? 'Logging out...' : 'Log out'}
    </Button>
  );
}