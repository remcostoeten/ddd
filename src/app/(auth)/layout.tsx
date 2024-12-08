import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const oauthUser = cookies().get('oauth_user');
  
  if (oauthUser) {
    redirect('/dashboard');
  }

  return children;
}