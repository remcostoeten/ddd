'use server'

import { NextResponse } from 'next/server'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const REDIRECT_URI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/github'

export async function GET() {
  if (!GITHUB_CLIENT_ID) {
    return NextResponse.json({ error: 'GitHub client ID not configured' }, { status: 500 })
  }

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'read:user user:email',
    response_type: 'code',
  })

  const url = `https://github.com/login/oauth/authorize?${params.toString()}`
  
  return NextResponse.json({ url })
} 