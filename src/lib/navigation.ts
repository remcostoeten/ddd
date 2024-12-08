'use server'

export async function redirect(path: string) {
  return new Response(null, {
    status: 302,
    headers: { Location: path },
  });
} 