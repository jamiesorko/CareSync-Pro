
import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Text Normalizer
 * Prepares raw values, numbers, and keys for the AI pipeline.
 */
export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
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

export const useTranslate = (text: any, target?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = target || contextLanguage;
  const source = useMemo(() => normalizeText(text), [text]);
  
  const [translated, setTranslated] = useState(source);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!source || !language || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const run = async () => {
      const cacheKey = `csp_v9_${language}_${source}`;
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

  return (
    <span 
      key={`${language}-${translated}`} 
      className={`${loading ? 'opacity-40 animate-pulse' : 'transition-opacity duration-300'} inline`}
    >
      {translated}
    </span>
  );
};

export default Translate;
