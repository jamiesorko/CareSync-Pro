'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translationService } from '../services/translationService';

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (text: string) => string;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode, initialLanguage: string }> = ({ children, initialLanguage }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [dictionary, setDictionary] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  const t = useCallback((text: string) => {
    if (language.toLowerCase() === 'english') return text;
    return dictionary[text] || text;
  }, [dictionary, language]);

  // Clean dictionary on language shift to prevent term collision
  useEffect(() => {
    setDictionary({});
  }, [language]);

  const translateMany = useCallback(async (strings: string[]) => {
    if (language.toLowerCase() === 'english') return;
    
    const missing = strings.filter(s => !dictionary[s]);
    if (missing.length === 0) return;

    setIsTranslating(true);
    try {
      const results = await translationService.translateBatch(missing, language);
      setDictionary(prev => ({ ...prev, ...results }));
    } finally {
      setIsTranslating(false);
    }
  }, [dictionary, language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isTranslating }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error("useTranslation must be used within TranslationProvider");
  return context;
};