
import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Normalizes technical keys and clinical phrases.
 * Ensures the AI receives human-readable strings for 100% translation accuracy.
 */
export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
  const str = String(val).trim();
  if (!str) return "";
  
  // Handle technical constants: 'FISCAL_LEDGER' -> 'Fiscal Ledger'
  if (str.includes('_') || (str === str.toUpperCase() && str.length > 2)) {
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  return str;
};

export const useTranslate = (text: any, targetOverride?: string) => {
  const { language: contextLanguage } = useTranslation();
  const language = targetOverride || contextLanguage;
  const [translated, setTranslated] = useState(normalizeText(text));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = normalizeText(text);

    if (!source || (language && language.toLowerCase() === 'english')) {
      setTranslated(source || String(text || ''));
      return;
    }

    const run = async () => {
      const cacheKey = `cs_v40_${language}_${source}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setTranslated(cached);
        return;
      }

      setLoading(true);
      try {
        const res = await translationService.translate(source, language);
        if (res) {
          localStorage.setItem(cacheKey, res);
          setTranslated(res);
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
    <span className={loading ? 'opacity-40 animate-pulse transition-opacity' : 'transition-opacity duration-300'}>
      {translated}
    </span>
  );
};

export default Translate;
