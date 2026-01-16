
import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Advanced Semantic Normalizer
 * Prepares raw keys, technical identifiers, and numbers for clinical-grade translation.
 */
export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
  
  // Handle Numbers: Convert to string for the AI to localize units if needed
  if (typeof val === 'number') return val.toLocaleString();
  
  const str = String(val).trim();
  if (!str) return "";
  
  // Detect technical SNAKE_CASE or UPPER_CASE keys
  if (str.includes('_') || (str === str.toUpperCase() && str.length > 2 && !str.includes(' '))) {
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  return str;
};

export const useTranslate = (text: any, targetOverride?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = targetOverride || contextLanguage;
  const source = useMemo(() => normalizeText(text), [text]);
  
  // Initial state should be the source to avoid empty UI
  const [translated, setTranslated] = useState(source);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If language is English, just use the normalized source
    if (!source || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const run = async () => {
      const cacheKey = `csp_v110_${language}_${source}`;
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
  const { translated, loading } = useTranslate(children, target);

  return (
    <span className={`${loading ? 'opacity-40 animate-pulse' : 'transition-opacity duration-300'} inline`}>
      {translated}
    </span>
  );
};

export default Translate;
