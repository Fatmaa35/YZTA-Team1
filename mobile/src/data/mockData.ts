/**
 * Mock data layer.
 *
 * Mirrors the future Supabase API shape. A small pool of "base meals" is reused
 * across the today view and a temp monthly calendar of weekly menus, so every
 * meal — wherever it appears — carries full detail (nutrition, description,
 * allergens) and can be opened on the detail screen.
 */

export interface Nutrition {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export interface Allergen {
  id: string;
  label: string;
  /** Ionicons name used to render the chip icon. */
  icon: string;
}

export interface Meal {
  id: string;
  /** Fallback display name (Turkish). UI renders the localized `nameKey`. */
  name: string;
  /** i18n key, e.g. "meal.steak-egg". */
  nameKey: string;
  image: string;
  description: string;
  nutrition: Nutrition;
  allergens: Allergen[];
}

export type DayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

export interface WeeklyMealItem extends Meal {
  dayId: DayId;
}

export interface WeekMenu {
  id: string;
  /** e.g. "3-9 Ağustos 2026" */
  label: string;
  /** e.g. "Ağustos 2026" */
  monthLabel: string;
  range: { start: number; end: number };
  items: WeeklyMealItem[];
}

const LOREM =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
  'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, ' +
  'when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

export const ALL_ALLERGENS: Allergen[] = [
  { id: 'egg', label: 'Yumurta', icon: 'egg-outline' },
  { id: 'milk', label: 'Süt', icon: 'water-outline' },
  { id: 'pepper', label: 'Karabiber', icon: 'flame-outline' },
  { id: 'peanut', label: 'Fıstık', icon: 'nutrition-outline' },
  { id: 'cauliflower', label: 'Karnabahar', icon: 'leaf-outline' },
  { id: 'gluten', label: 'Gluten', icon: 'restaurant-outline' },
];

function a(...ids: string[]): Allergen[] {
  return ALL_ALLERGENS.filter((al) => ids.includes(al.id));
}

/** Distinct base meals reused throughout the app. */
const BASE_MEALS: Record<string, Meal> = {
  steakEgg: {
    id: 'steak-egg',
    name: 'Izgara Biftek & Yumurta',
    nameKey: 'meal.steak-egg',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: LOREM,
    nutrition: { calories: 375, carbs: 375, protein: 375, fat: 375 },
    allergens: a('egg', 'milk', 'pepper'),
  },
  avocadoSalad: {
    id: 'avocado-salad',
    name: 'Avakadolu Bakliyat Salata',
    nameKey: 'meal.avocado-salad',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: LOREM,
    nutrition: { calories: 159, carbs: 180, protein: 90, fat: 120 },
    allergens: a('gluten'),
  },
  mushroomPasta: {
    id: 'mushroom-pasta',
    name: 'Mantarlı Makarna',
    nameKey: 'meal.mushroom-pasta',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
    description: LOREM,
    nutrition: { calories: 490, carbs: 520, protein: 140, fat: 160 },
    allergens: a('gluten', 'milk'),
  },
  fishVeg: {
    id: 'fish-veg',
    name: 'Sebze Yatağında Balık',
    nameKey: 'meal.fish-veg',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    description: LOREM,
    nutrition: { calories: 390, carbs: 210, protein: 320, fat: 150 },
    allergens: a('pepper'),
  },
  riceChicken: {
    id: 'rice-chicken',
    name: 'Pilav & Sebzeli Tavuk',
    nameKey: 'meal.rice-chicken',
    image:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    description: LOREM,
    nutrition: { calories: 420, carbs: 480, protein: 300, fat: 130 },
    allergens: a('pepper'),
  },
  lentilSoup: {
    id: 'lentil-soup',
    name: 'Mercimek Çorbası & Ekmek',
    nameKey: 'meal.lentil-soup',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    description: LOREM,
    nutrition: { calories: 220, carbs: 260, protein: 110, fat: 70 },
    allergens: a('gluten'),
  },
  meatball: {
    id: 'meatball',
    name: 'Izgara Köfte & Bulgur',
    nameKey: 'meal.meatball',
    image:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    description: LOREM,
    nutrition: { calories: 460, carbs: 300, protein: 350, fat: 200 },
    allergens: a('pepper', 'gluten'),
  },
};

export const TODAY_MEAL: Meal = { ...BASE_MEALS.steakEgg, id: 'meal-today' };

const DAY_ORDER: DayId[] = ['mon', 'tue', 'wed', 'thu', 'fri'];

/** Compose a week's 5 items from base-meal keys, giving each a unique id. */
function buildWeek(
  id: string,
  label: string,
  monthLabel: string,
  range: { start: number; end: number },
  mealKeys: (keyof typeof BASE_MEALS)[]
): WeekMenu {
  return {
    id,
    label,
    monthLabel,
    range,
    items: DAY_ORDER.map((dayId, i) => ({
      ...BASE_MEALS[mealKeys[i]],
      id: `${id}-${dayId}`,
      dayId,
    })),
  };
}

const MONTH = 'Ağustos 2026';

/** Temp monthly calendar — the weeks of August 2026, each with its own menu. */
export const MONTH_WEEKS: WeekMenu[] = [
  buildWeek('w1', '3-9 Ağustos 2026', MONTH, { start: 3, end: 9 }, [
    'steakEgg',
    'avocadoSalad',
    'mushroomPasta',
    'fishVeg',
    'riceChicken',
  ]),
  buildWeek('w2', '10-16 Ağustos 2026', MONTH, { start: 10, end: 16 }, [
    'lentilSoup',
    'meatball',
    'steakEgg',
    'avocadoSalad',
    'mushroomPasta',
  ]),
  buildWeek('w3', '17-23 Ağustos 2026', MONTH, { start: 17, end: 23 }, [
    'fishVeg',
    'riceChicken',
    'lentilSoup',
    'meatball',
    'steakEgg',
  ]),
  buildWeek('w4', '24-30 Ağustos 2026', MONTH, { start: 24, end: 30 }, [
    'avocadoSalad',
    'mushroomPasta',
    'fishVeg',
    'riceChicken',
    'lentilSoup',
  ]),
];

/** Flat index of every meal for detail lookups by id. */
export const MEAL_INDEX: Record<string, Meal> = (() => {
  const index: Record<string, Meal> = { [TODAY_MEAL.id]: TODAY_MEAL };
  for (const week of MONTH_WEEKS) {
    for (const item of week.items) index[item.id] = item;
  }
  return index;
})();

export interface Student {
  id: string;
  fullName: string;
  studentNo: string;
  /** Fallback (Turkish). UI renders the localized `departmentKey`. */
  department: string;
  departmentKey: string;
  avatar: string;
}

export const STUDENT: Student = {
  id: 'student-1',
  fullName: 'Sudenaz Kalaycık',
  studentNo: '5165431',
  department: 'Bilgisayar Müh.',
  departmentKey: 'dept.computer',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
};

/**
 * Seed sensitivities stored as allergen ids so they localize. User-added items
 * are stored as free text and shown verbatim.
 */
export const STUDENT_SENSITIVITIES: string[] = [
  'peanut',
  'milk',
  'pepper',
  'cauliflower',
  'egg',
];

/** Mock credentials — any password works, but this documents the "happy path". */
export const MOCK_CREDENTIALS = {
  studentNo: '5165431',
  password: '1234',
};
