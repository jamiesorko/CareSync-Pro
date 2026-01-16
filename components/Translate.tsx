
import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Advanced Semantic Normalizer
 * Humanizes SNAKE_CASE, UPPER_CASE, and complex medical strings before AI translation.
 */
export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
  const str = String(val).trim();
  if (!str) return "";
  
  // 1. Handle typical keys: 'FISCAL_LEDGER', 'OPS_DASHBOARD'
  if (str.includes('_') || (str === str.toUpperCase() && str.length > 2 && !str.includes(' '))) {
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  // 2. Handle clinical phrases that are often passed as identifiers
  if (str === "Complex Wound Care") return "Specialized Complex Wound Care";
  
  return str;
};

export const useTranslate = (text: any, targetOverride?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = targetOverride || contextLanguage;
  const [translated, setTranslated] = useState(normalizeText(text));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = normalizeText(text);

    // Skip AI if English is selected
    if (!source || (language && language.toLowerCase() === 'english')) {
      setTranslated(source || String(text || ''));
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v100_${language}_${source}`;
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
  }, [text, language]);

  return { translated, loading };
};

export const Translate: React.FC<{ children?: React.ReactNode; target?: string }> = ({ children, target }) => {
  const sourceText = typeof children === 'string' ? children : String(children || '');
  const { translated, loading } = useTranslate(sourceText, target);

  return (
    <span className={loading ? 'opacity-30 animate-pulse' : 'transition-opacity duration-500'}>
      {translated}
    </span>
  );
};

export default Translate;
