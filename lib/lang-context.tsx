'use client';
import { createContext, useContext, useState } from 'react';
import { translations, type Lang, type T } from './i18n';

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: T };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return <LangCtx.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang outside LangProvider');
  return ctx;
}
