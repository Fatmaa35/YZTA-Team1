/**
 * Profile service (mock).
 *
 * Holds the student profile and their allergen sensitivities. Later these become
 * Supabase reads/writes; for now mutations resolve successfully and the screen
 * keeps the authoritative list in local state (optimistic update).
 */

import { STUDENT, STUDENT_SENSITIVITIES, Student } from '@/data/mockData';

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getProfile(): Promise<Student> {
  return delay(STUDENT);
}

export async function getSensitivities(): Promise<string[]> {
  return delay([...STUDENT_SENSITIVITIES]);
}

export async function addSensitivity(name: string): Promise<{ ok: true }> {
  // TODO(supabase): insert into `student_sensitivities`.
  console.log('addSensitivity', name);
  return delay({ ok: true } as const, 250);
}

export async function removeSensitivity(name: string): Promise<{ ok: true }> {
  // TODO(supabase): delete from `student_sensitivities`.
  console.log('removeSensitivity', name);
  return delay({ ok: true } as const, 250);
}
