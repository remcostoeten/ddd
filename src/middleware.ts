// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check if we're coming from the OAuth callback
  if (request.nextUrl.pathname === '/dashboard') {
    const oauthUser = request.cookies.get('oauth_user');
    
    if (oauthUser) {
      // Add script to store user data in localStorage
      const script = `
        <script>
          localStorage.setItem('oauth_user', '${oauthUser.value}');
          document.cookie = 'oauth_user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        </script>
      `;
      
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            ${script}
            <meta http-equiv="refresh" content="0; url=/dashboard">
          </head>
        </html>
      `;
      
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }
  }

  return response;
}

export const config = {
  matcher: '/dashboard',
};