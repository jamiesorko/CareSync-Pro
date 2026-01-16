
import React, { useState, useEffect, useMemo } from 'react';
import { translationService } from '../services/translationService';
import { useTranslation } from '../contexts/TranslationContext';

/**
 * Advanced Semantic Normalizer
 * Prepares all content, including numbers and units, for deep localization.
 */
export const normalizeText = (val: any): string => {
  if (val === null || val === undefined) return "";
  
  // If it's a number, return it as a string to be localized by the AI
  if (typeof val === 'number') return val.toString();
  
  const str = String(val).trim();
  if (!str) return "";
  
  // Handle technical SNAKE_CASE keys
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
    if (!source || language.toLowerCase() === 'english') {
      setTranslated(source);
      return;
    }

    const run = async () => {
      const cacheKey = `csp_deep_v2_${language}_${source}`;
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
    <span className={`${loading ? 'opacity-30' : 'transition-opacity duration-300'} inline`}>
      {translated}
    </span>
  );
};

export default Translate;
