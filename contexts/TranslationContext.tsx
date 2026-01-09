
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translationService } from '../services/translationService';

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (text: string) => string;
  loading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode, initialLanguage: string }> = ({ children, initialLanguage }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [cache, setCache] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const normalize = (text: string) => text.replace(/_/g, ' ');

  const t = useCallback((text: string): string => {
    if (language.toLowerCase() === 'english' || !text) return normalize(text);
    const key = `${language}_${text}`;
    return cache[key] || normalize(text);
  }, [language, cache]);

  useEffect(() => {
    const translateBatch = async () => {
      // In a real app, we would scan the DOM or use a resource file.
      // Here we allow the hook (useTranslate) to populate the cache as components mount.
    };
    translateBatch();
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, loading }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error("useTranslation must be used within TranslationProvider");
  return context;
};
