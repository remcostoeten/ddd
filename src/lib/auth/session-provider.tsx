'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  provider?: 'github' | 'google';
} | null;

type SessionContextType = {
  user: User;
  loading: boolean;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextType>({
  user: null,
  loading: true,
  signOut: () => {},
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have user data in localStorage (from OAuth callback)
    const storedUser = localStorage.getItem('oauth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('oauth_user');
      }
    }
    setLoading(false);
  }, []);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('oauth_user');
    window.location.href = '/login';
  };

  return (
    <SessionContext.Provider value={{ user, loading, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}