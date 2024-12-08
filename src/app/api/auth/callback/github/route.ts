'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

async function getAccessToken(code: string) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  })

  return response.json()
}

async function getUser(access_token: string) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  })

  return response.json()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect('/login?error=no_code')
  }

  try {
    const { access_token, error } = await getAccessToken(code)
    
    if (error || !access_token) {
      console.error('Failed to get access token:', error)
      return NextResponse.redirect('/login?error=auth_failed')
    }

    const user = await getUser(access_token)
    if (!user.id) {
      console.error('Failed to get user data')
      return NextResponse.redirect('/login?error=auth_failed')
    }

    // Store the user data in a cookie
    cookies().set('oauth_user', JSON.stringify({
      id: user.id,
      name: user.name || user.login,
      email: user.email,
      avatar_url: user.avatar_url,
      provider: 'github',
      access_token,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.redirect('/dashboard')
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect('/login?error=auth_failed')
  }
} 