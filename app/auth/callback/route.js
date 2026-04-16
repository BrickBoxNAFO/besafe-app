import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/dashboard';
  const type = searchParams.get('type');

  // Open redirect prevention
  if (!next.startsWith('/') || next.startsWith('//')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/auth/error', request.url));
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL('/auth/error', request.url));
  }

  // Redirect to password update if this is a recovery flow
  if (type === 'recovery') {
    return NextResponse.redirect(new URL('/update-password', request.url));
  }

  return NextResponse.redirect(new URL(next, request.url));
}
