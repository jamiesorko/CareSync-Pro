
import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Normalizes technical keys (e.g., 'OPS_DASHBOARD', 'PSW', 'Sector_4') into readable phrases.
 * This ensures the AI receives natural language for better translation quality.
 */
export const normalizeText = (val: string | any): string => {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (!str) return "";
  
  // Detect technical keys: UPPER_CASE with underscores, Camel_Case with underscores, or single-word codes
  const isCode = (str === str.toUpperCase() && str.length <= 5) || 
                 (str.includes('_')) || 
                 (str === str.toUpperCase() && !str.includes(' '));

  if (isCode) {
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return str;
};

/**
 * useTranslate Hook
 * Used for attributes like placeholders, tooltips, or dynamic data logic.
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
      const cacheKey = `cs_v16_${language}_${normalizedSource}`;
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
 * The primary standard for translating UI strings and dynamic data nodes.
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
