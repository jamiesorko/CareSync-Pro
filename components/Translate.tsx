
import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * useTranslate Hook
 * Returns a translated version of the input string based on current global language.
 * Now includes normalization for technical keys.
 */
export const useTranslate = (text: string, targetOverride?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = targetOverride || contextLanguage;
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);

  // Normalizes keys like "OPS_DASHBOARD" to "Ops Dashboard"
  const normalizeKey = (val: string) => {
    if (!val) return "";
    // If it looks like a technical key (UPPER_CASE)
    if (val === val.toUpperCase() && val.includes('_')) {
      return val.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    return val;
  };

  useEffect(() => {
    const normalizedSource = normalizeKey(text);

    if (!normalizedSource || (language && language.toLowerCase() === 'english')) {
      setTranslated(normalizedSource || text);
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v7_${language}_${normalizedSource}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      const res = await translationService.translate(normalizedSource, language);
      
      if (res && res !== normalizedSource) {
        localStorage.setItem(cacheKey, res);
        setTranslated(res);
      } else {
        setTranslated(normalizedSource);
      }
      setLoading(false);
    };

    run();
  }, [text, language]);

  return { translated, loading };
};

/**
 * Translate Component
 * Wraps hardcoded UI strings for automatic translation.
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
