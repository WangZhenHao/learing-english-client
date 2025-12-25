// lib/auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function requireAuth() {
  const token = cookies().get('Authorization');
  if (!token) {
    redirect('/login');
  }
}
