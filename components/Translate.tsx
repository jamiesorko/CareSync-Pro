
import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Normalizes technical keys and data strings into human-readable text.
 * Handles SCREAMING_SNAKE_CASE and standard underscores.
 */
export const normalizeText = (val: string | any): string => {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (!str) return "";
  
  // Check for technical keys: UPPER_CASE with underscores or specific patterns
  if ((str === str.toUpperCase() && str.includes('_')) || (str.includes('_') && !str.includes(' '))) {
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return str;
};

/**
 * useTranslate Hook
 * Returns a translated version of the input string based on current global language.
 * Used for attributes (placeholders, tooltips) or raw string logic.
 */
export const useTranslate = (text: string | any, targetOverride?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = targetOverride || contextLanguage;
  const [translated, setTranslated] = useState(normalizeText(text));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const normalizedSource = normalizeText(text);

    if (!normalizedSource || (language && language.toLowerCase() === 'english')) {
      setTranslated(normalizedSource || String(text || ''));
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v11_${language}_${normalizedSource}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const res = await translationService.translate(normalizedSource, language);
        if (res && res !== normalizedSource) {
          localStorage.setItem(cacheKey, res);
          setTranslated(res);
        } else {
          setTranslated(normalizedSource);
        }
      } catch (e) {
        setTranslated(normalizedSource);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [text, language]);

  return { translated, loading };
};

/**
 * Translate Component
 * The primary way to wrap UI labels and dynamic data strings in the JSX.
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
