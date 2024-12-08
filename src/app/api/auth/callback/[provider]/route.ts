import { NextResponse } from 'next/server';
import { handleOAuthCallback } from '@/lib/auth/oauth';
import type { OAuthProvider } from '@/lib/auth/oauth';

export async function GET(
  request: Request,
  { params }: { params: { provider: OAuthProvider } }
) {
  const searchParams = new URL(request.url).searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/login?error=no_code');
  }

  try {
    const userData = await handleOAuthCallback(params.provider, code);
    
    // Create the response with redirect
    const response = NextResponse.redirect('/dashboard');
    
    // Add user data to response
    response.headers.set(
      'Set-Cookie',
      `oauth_user=${JSON.stringify(userData)}; Path=/; HttpOnly; SameSite=Lax`
    );

    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect('/login?error=auth_failed');
  }
}