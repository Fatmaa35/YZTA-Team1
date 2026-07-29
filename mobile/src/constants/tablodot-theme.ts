/**
 * TabloDot design system.
 *
 * Two palettes (dark = the original reference look, light = its inverse) sharing
 * the exact same keys so components can switch by swapping the object. Accent
 * colors (orange / nutrition yellow / star) stay constant across themes.
 */

export interface Palette {
  gradient: [string, string, string];
  screenBg: string;
  tabBar: string;

  card: string;
  cardSolid: string;
  chip: string;
  inputBg: string;
  border: string;

  primary: string;
  primaryPressed: string;
  nutrition: string;
  star: string;

  text: string;
  textSecondary: string;
  textMuted: string;
  textOnAccent: string;

  success: string;
  danger: string;
}

export const darkPalette: Palette = {
  gradient: ['#0E3B2E', '#082017', '#03110B'],
  screenBg: '#03110B',
  tabBar: '#0A241B',

  card: 'rgba(255, 255, 255, 0.06)',
  cardSolid: '#12352A',
  chip: 'rgba(255, 255, 255, 0.10)',
  inputBg: 'rgba(255, 255, 255, 0.05)',
  border: 'rgba(255, 255, 255, 0.15)',

  primary: '#F39C12',
  primaryPressed: '#D68910',
  nutrition: '#F4E409',
  star: '#F4C430',

  text: '#FFFFFF',
  textSecondary: '#B7C4BE',
  textMuted: '#7E8F88',
  textOnAccent: '#1A1A1A',

  success: '#2ECC71',
  danger: '#E74C3C',
};

export const lightPalette: Palette = {
  gradient: ['#E8F1EC', '#F3F8F5', '#FFFFFF'],
  screenBg: '#F3F8F5',
  tabBar: '#FFFFFF',

  card: '#FFFFFF',
  cardSolid: '#FFFFFF',
  chip: 'rgba(16, 46, 34, 0.06)',
  inputBg: 'rgba(16, 46, 34, 0.04)',
  border: 'rgba(16, 46, 34, 0.12)',

  primary: '#F39C12',
  primaryPressed: '#D68910',
  nutrition: '#F4E409',
  star: '#F4C430',

  text: '#132B22',
  textSecondary: '#5A6B63',
  textMuted: '#94A39B',
  textOnAccent: '#1A1A1A',

  success: '#27AE60',
  danger: '#E74C3C',
};

export type ThemeMode = 'light' | 'dark';

export const Palettes: Record<ThemeMode, Palette> = {
  light: lightPalette,
  dark: darkPalette,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const Space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;
