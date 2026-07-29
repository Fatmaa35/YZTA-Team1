/**
 * Meal service.
 *
 * Returns mock data through async functions so the UI already treats data as
 * remote. Replace the bodies with Supabase queries later — signatures stay put.
 */

import {
  Meal,
  MEAL_INDEX,
  MONTH_WEEKS,
  TODAY_MEAL,
  WeekMenu,
} from '@/data/mockData';

/** Simulate network latency so loading states are exercised. */
function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getTodayMeal(): Promise<Meal> {
  // TODO(supabase): return today's meal row.
  return delay(TODAY_MEAL);
}

export async function getMealById(id: string): Promise<Meal | null> {
  // TODO(supabase): supabase.from('meals').select().eq('id', id).single()
  return delay(MEAL_INDEX[id] ?? null);
}

/** All weeks of the (temp) current month, for the calendar picker. */
export async function getMonthWeeks(): Promise<WeekMenu[]> {
  // TODO(supabase): fetch the weeks/menus of the selected month.
  return delay(MONTH_WEEKS);
}

/** A single week's menu. Defaults to the first (current) week. */
export async function getWeeklyMenu(weekId?: string): Promise<WeekMenu> {
  // TODO(supabase): fetch a specific week's meals ordered by weekday.
  const week = MONTH_WEEKS.find((w) => w.id === weekId) ?? MONTH_WEEKS[0];
  return delay(week);
}

export interface RatingPayload {
  mealId: string;
  stars: number;
  comment: string;
  taste: boolean | null;
  temperature: boolean | null;
  portion: boolean | null;
}

export async function submitRating(payload: RatingPayload): Promise<{ ok: true }> {
  // TODO(supabase): insert into `ratings`.
  console.log('submitRating payload', payload);
  return delay({ ok: true } as const, 400);
}
