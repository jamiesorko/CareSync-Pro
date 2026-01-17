
import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Universal Normalizer
 * Prepares raw keys and technical values for high-fidelity translation.
 */
export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
  
  // Cast numbers to strings so the AI can localize them (e.g. 1.5 -> 1,5)
  if (typeof val === 'number') return val.toString();
  
  const str = String(val).trim();
  if (!str) return "";
  
  // Handle technical keys (e.g., FISCAL_LEDGER)
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
  
  const [translated, setTranslated] = useState(source);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!source || !language || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const run = async () => {
      const cacheKey = `csp_full_v3_${language}_${source}`;
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

/**
 * The Translate Component
 * Use this to wrap ANY text or number in the app.
 */
export const Translate: React.FC<{ children?: React.ReactNode; target?: string }> = ({ children, target }) => {
  const { translated, loading } = useTranslate(children, target);

  return (
    <span className={`${loading ? 'opacity-30' : 'transition-opacity duration-300'} inline-block`}>
      {translated}
    </span>
  );
};

export default Translate;
