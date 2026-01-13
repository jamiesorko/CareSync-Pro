
import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Normalizes technical keys (e.g., 'OPS_DASHBOARD') into readable phrases.
 */
const normalizeText = (val: string) => {
  if (!val) return "";
  if (val === val.toUpperCase() && val.includes('_')) {
    return val.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return val;
};

/**
 * useTranslate Hook
 * Returns a translated version of the input string based on current global language.
 * Added: target parameter to allow overriding global language.
 */
export const useTranslate = (text: string, target?: string) => {
  const { language: globalLanguage } = useTranslation();
  // Use provided target or fall back to global language
  const language = target || globalLanguage;
  const [translated, setTranslated] = useState(normalizeText(text));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const normalizedSource = normalizeText(text);

    if (!normalizedSource || (language && language.toLowerCase() === 'english')) {
      setTranslated(normalizedSource);
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v8_${language}_${normalizedSource}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      const res = await translationService.translate(normalizedSource, language);
      localStorage.setItem(cacheKey, res);
      setTranslated(res);
      setLoading(false);
    };
    run();
  }, [text, language]);

  return { translated, loading };
};

/**
 * Translate Component
 * The primary way to internationalize UI strings.
 * Added: target prop to allow local language override.
 */
export const Translate: React.FC<{ children?: React.ReactNode; target?: string }> = ({ children, target }) => {
  const sourceText = typeof children === 'string' ? children : String(children || '');
  const { translated, loading } = useTranslate(sourceText, target);

  return (
    <span className={loading ? 'opacity-40 animate-pulse transition-opacity' : 'transition-opacity duration-300'}>
      {translated}
    </span>
  );
};

export default Translate;
