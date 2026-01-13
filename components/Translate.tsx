
import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Normalizes technical keys (e.g., 'OPS_DASHBOARD') into readable phrases.
 */
const normalizeText = (val: string) => {
  if (!val) return "";
  // Check if it's a technical key: UPPER_CASE or contains underscores
  if ((val === val.toUpperCase() && val.includes('_')) || val.includes('_')) {
    return val.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return val;
};

/**
 * useTranslate Hook
 * Returns a translated version of the input string based on current global language.
 */
export const useTranslate = (text: string, targetOverride?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = targetOverride || contextLanguage;
  const [translated, setTranslated] = useState(normalizeText(text));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const normalizedSource = normalizeText(text);

    // Default to normalized source if English or empty
    if (!normalizedSource || (language && language.toLowerCase() === 'english')) {
      setTranslated(normalizedSource || text);
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v9_${language}_${normalizedSource}`;
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
 * The primary way to internationalize UI strings. 
 * Automatically handles strings, keys, and React context updates.
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
