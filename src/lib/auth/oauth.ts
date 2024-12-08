'use server';

export type OAuthProvider = 'google' | 'github';

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  authUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
}

const configs: Record<OAuthProvider, OAuthConfig> = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo'
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/github`,
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userInfoUrl: 'https://api.github.com/user'
  }
};

export async function getOAuthLoginUrl(provider: OAuthProvider) {
  const config = configs[provider];
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: provider === 'google' ? 'email profile' : 'read:user user:email'
  });

  return `${config.authUrl}?${params.toString()}`;
}

export async function handleOAuthCallback(provider: OAuthProvider, code: string) {
  const config = configs[provider];
  
  // Exchange code for access token
  const tokenResponse = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code'
    })
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Get user info
  const userResponse = await fetch(config.userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const userData = await userResponse.json();
  return userData;
}