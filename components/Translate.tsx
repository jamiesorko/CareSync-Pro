
import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Robust Text Normalizer
 * Handles numbers, strings, and technical keys.
 */
export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
  
  // If it's a number, convert to string for localization (e.g. 1,000.50 vs 1.000,50)
  if (typeof val === 'number') return val.toString();
  
  const str = String(val).trim();
  if (!str) return "";
  
  // Handle technical keys like OPS_DASHBOARD
  if (str.includes('_') || (str === str.toUpperCase() && str.length > 2 && !str.includes(' '))) {
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  return str;
};

/**
 * useTranslate Hook
 * Forces a re-fetch when language or source text changes.
 */
export const useTranslate = (text: any, targetOverride?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = targetOverride || contextLanguage;
  const source = useMemo(() => normalizeText(text), [text]);
  
  const [translated, setTranslated] = useState(source);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Return original if English or empty
    if (!source || !language || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const run = async () => {
      const cacheKey = `csp_v7_${language}_${source}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const res = await translationService.translate(source, language);
        if (res && res !== source) {
          localStorage.setItem(cacheKey, res);
          setTranslated(res);
        } else {
          setTranslated(source);
        }
      } catch (e) {
        setTranslated(source);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [source, language]);

  return { translated, loading };
};

export const Translate: React.FC<{ children?: React.ReactNode; target?: string }> = ({ children, target }) => {
  const { language } = useTranslation();
  const { translated, loading } = useTranslate(children, target);

  // Key on language to ensure total UI refresh when toggled
  return (
    <span key={language} className={`${loading ? 'opacity-30' : 'transition-opacity duration-300'} inline`}>
      {translated}
    </span>
  );
};

export default Translate;
