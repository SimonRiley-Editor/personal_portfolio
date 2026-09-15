'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ja' | 'ru' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
}

// Translations are loaded from JSON files in lib/translations/.
// English is required at module level for instant SSR / first-paint.
// All other languages are dynamically imported only when the user switches language,
// saving ~50KB of unnecessary JS parse cost on initial page load.

// eslint-disable-next-line @typescript-eslint/no-require-imports
const enTranslations: Record<string, string> = require('@/lib/translations/en.json');

const lazyCache: Partial<Record<Language, Record<string, string>>> = {
  en: enTranslations,
};

async function loadTranslations(lang: Language): Promise<Record<string, string>> {
  if (lazyCache[lang]) return lazyCache[lang]!;
  // Dynamic import — only runs when the user actually switches language.
  const mod = await import(`@/lib/translations/${lang}.json`);
  lazyCache[lang] = mod.default as Record<string, string>;
  return lazyCache[lang]!;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [currentTranslations, setCurrentTranslations] =
    useState<Record<string, string>>(enTranslations);

  const setLanguage = React.useCallback(async (lang: Language) => {
    setLanguageState(lang);
    const loaded = await loadTranslations(lang);
    setCurrentTranslations(loaded);
  }, []);

  const t = React.useCallback(
    (key: string): string => currentTranslations[key] ?? enTranslations[key] ?? key,
    [currentTranslations],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
