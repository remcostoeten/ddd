import '@/app/globals.css';
import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { cn } from '@/shared/lib/utils';
// import { Layout } from '@/shared/shared/components/layout';
import { metadata as metadataConfig } from '@/core/config/metadata';
import { SessionProvider } from '@/lib/auth/session-provider';
import Layout from '@/shared/shared/components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = metadataConfig.default;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn(
        inter.className,
        "min-h-screen bg-background font-sans antialiased"
      )}>
        <SessionProvider>
          <Layout>{children}</Layout>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}