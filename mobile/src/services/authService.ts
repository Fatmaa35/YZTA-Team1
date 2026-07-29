/**
 * Auth service (mock).
 *
 * Replace with Supabase auth (`supabase.auth.signInWithPassword`) later.
 * For now any non-empty credentials succeed.
 */

import { MOCK_CREDENTIALS, STUDENT, Student } from '@/data/mockData';

function delay<T>(value: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface LoginResult {
  student: Student;
  token: string;
}

export async function login(
  studentNo: string,
  password: string
): Promise<LoginResult> {
  if (!studentNo.trim() || !password.trim()) {
    throw new Error('Öğrenci numarası ve şifre gereklidir.');
  }
  // TODO(supabase): swap for supabase.auth.signInWithPassword(...)
  void MOCK_CREDENTIALS; // documents the canonical demo login
  return delay({ student: STUDENT, token: 'mock-token' });
}

export async function logout(): Promise<void> {
  // TODO(supabase): supabase.auth.signOut()
  return delay(undefined, 150);
}
