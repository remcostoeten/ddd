'use client';

import { Button } from '@/shared/components/ui/button';
import { toast } from 'sonner';
import { oauthLogin } from '@/lib/auth/client';

export default function AuthForm() {
  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      await oauthLogin(provider);
    } catch (error) {
      toast.error('Failed to start OAuth login');
    }
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin('github')}
            className="w-full"
          >
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin('google')}
            className="w-full"
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}