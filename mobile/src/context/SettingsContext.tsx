/**
 * App-wide settings: theme mode (light/dark) and language (tr/en).
 *
 * Exposes the active `colors` palette and a `t()` translator so every screen
 * reacts to changes instantly. State is in-memory for now; wire AsyncStorage or
 * Supabase user-prefs later to persist.
 */

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Palette, Palettes, ThemeMode } from '@/constants/tablodot-theme';
import {
  Language,
  TranslationKey,
  translations,
} from '@/i18n/translations';

interface SettingsContextValue {
  mode: ThemeMode;
  colors: Palette;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [language, setLanguage] = useState<Language>('tr');

  const t = useCallback(
    (key: TranslationKey) => translations[language][key] ?? key,
    [language]
  );

  const value = useMemo<SettingsContextValue>(
    () => ({
      mode,
      colors: Palettes[mode],
      isDark: mode === 'dark',
      setMode,
      toggleTheme: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
      language,
      setLanguage,
      t,
    }),
    [mode, language, t]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}
