export async function getSession() {
  const res = await fetch('/api/auth/session');
  if (!res.ok) return null;
  return res.json();
}

export async function signOut() {
  const res = await fetch('/api/auth/logout', {
    method: 'POST'
  });
  return res.ok;
}

export async function oauthLogin(provider: 'google' | 'github') {
  const res = await fetch(`/api/auth/oauth/${provider}`);
  const { url } = await res.json();
  window.location.href = url;
}